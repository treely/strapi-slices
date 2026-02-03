import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { Global } from '@emotion/react';
import mapboxgl from 'mapbox-gl';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Wrapper,
} from 'boemly';
import { MAPBOX_MAX_ZOOM, MAPBOX_TOKEN } from '../../constants/mapbox';
import { IntlContext } from '../../components/ContextProvider';
import mapboxStyle from './mapboxStyle';
import { FeatureCollection } from 'geojson';
import debounce from 'lodash/debounce';
import getFpmProjectsByBbox from '../../integrations/strapi/getFpmProjectsByBbox';
import getStrapiProjects from '../../integrations/strapi/getStrapiProjects';
import mergeProjectData from '../../utils/mergeProjectData';
import { CreditAvailability } from '../../models/fpm/FPMProject';
import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiProject from '../../models/strapi/StrapiProject';

const projectPinImage =
  'https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.0.2/assets/fill/map-pin-fill.svg';

mapboxgl.accessToken = MAPBOX_TOKEN;

export interface ProjectsMapProps {
  slice: {
    tagline?: string;
    title?: string;
    text?: string;
    defaultCenterCoordinates?: { latitude: number; longitude: number };
    defaultZoomLevel?: number;
    minZoomLevel?: number; // 1 = zoom out fully, 15 = very close
    disableUserLocationZoom?: boolean; // If true, won't zoom to user's location
  };
  /** When true, renders just the map without DefaultSectionContainer/Wrapper (for embedding in other sections) */
  embedded?: boolean;
  /** Height of the map when embedded (not exposed to slice users, only for internal component use) */
  embeddedHeight?: string;
}

const FALLBACK_BBOX =
  '-1.9950830850086163,44.4464186384987,21.995083085002875,54.12644342419196';

export const ProjectsMap: React.FC<ProjectsMapProps> = ({
  slice,
  embedded = false,
  embeddedHeight = 'md',
}: ProjectsMapProps) => {
  const { locale, formatMessage } = useContext(IntlContext);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [featureCollection, setFeatureCollection] =
    useState<FeatureCollection | null>(null);
  const initialBboxRef = useRef<string | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [strapiProjects, setStrapiProjects] = useState<Map<
    string,
    IStrapiData<StrapiProject>
  > | null>(null);

  const isBboxContained = useCallback(
    (innerBbox: string, outerBbox: string): boolean => {
      const [innerWest, innerSouth, innerEast, innerNorth] = innerBbox
        .split(',')
        .map(Number);
      const [outerWest, outerSouth, outerEast, outerNorth] = outerBbox
        .split(',')
        .map(Number);
      return (
        innerWest >= outerWest &&
        innerEast <= outerEast &&
        innerSouth >= outerSouth &&
        innerNorth <= outerNorth
      );
    },
    []
  );

  const fetchStrapiData = useCallback(async () => {
    if (strapiProjects) return; // If we already have Strapi data, don't fetch it again

    try {
      const data = await getStrapiProjects(locale, '2'); // pLevel = Population depth which is a param in the API request. 2 is enough to get the slug and the portfolioHost
      setStrapiProjects(data);
    } catch (error) {
      console.error('❌ Error fetching Strapi projects:', error);
    }
  }, [locale, strapiProjects]);

  const fetchProjectsData = useCallback(
    async (bbox: string) => {
      try {
        const fpmData = await getFpmProjectsByBbox(bbox);

        // If we have Strapi data, merge it, otherwise show FPM data immediately
        const mergedData = strapiProjects
          ? mergeProjectData(fpmData, strapiProjects)
          : fpmData;

        setFeatureCollection(mergedData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    [strapiProjects]
  );

  const debouncedUpdateBbox = useCallback(
    debounce(() => {
      if (!map.current || !initialBboxRef.current) return;
      const bounds = map.current.getBounds();
      const newBbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
      if (!isBboxContained(newBbox, initialBboxRef.current)) {
        fetchProjectsData(newBbox);
        initialBboxRef.current = newBbox;
      }
    }, 500),
    [fetchProjectsData, isBboxContained]
  );

  const addProjectsLayer = useCallback(() => {
    if (!map.current || !featureCollection) {
      return;
    }

    if (!map.current.isStyleLoaded()) {
      setTimeout(() => addProjectsLayer(), 100);
      return;
    }

    const filteredFeatureCollection = {
      ...featureCollection,
      features: featureCollection.features.filter(
        (feature) => feature.properties?.isPublic !== false
      ),
    };

    const source = map.current.getSource('projects') as mapboxgl.GeoJSONSource;

    if (!source) {
      map.current.addSource('projects', {
        type: 'geojson',
        data: filteredFeatureCollection,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'projects',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            2,
            '#2A3FBA',
          ],
          'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 30, 40],
          'circle-radius-transition': { duration: 300 },
          'circle-stroke-width': 5,
          'circle-stroke-color': '#2A3FBA',
          'circle-stroke-opacity': 0.4,
        },
      });

      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      animationIntervalRef.current = setInterval(() => {
        if (!map.current) return;
        const now = Date.now() / 1000;
        const pulseFactor = 1 + 0.05 * Math.sin((now * 2 * Math.PI) / 2.8);
        const expression = [
          'step',
          ['get', 'point_count'],
          20 * pulseFactor,
          10,
          30 * pulseFactor,
          30,
          40 * pulseFactor,
        ] as mapboxgl.ExpressionSpecification;
        map.current.setPaintProperty('clusters', 'circle-radius', expression);
      }, 50);

      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'projects',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#fff',
        },
      });

      // Load SVG as PNG
      fetch(projectPinImage)
        .then((response) => response.text())
        .then((svgText) => {
          // Modify SVG color
          const modifiedSvg = svgText.replace(/fill="[^"]*"/, `fill="#2A3FBA"`);
          const img = new Image();
          img.src = `data:image/svg+xml;base64,${btoa(modifiedSvg)}`;
          return new Promise<HTMLImageElement>((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = reject;
          });
        })
        .then((img) => {
          if (!map.current) return;
          const canvas = document.createElement('canvas');
          canvas.width = 80;
          canvas.height = 80;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(img, 10, 10, 60, 60);
          const pngImg = new Image();
          pngImg.src = canvas.toDataURL('image/png');
          pngImg.onload = () => {
            map.current?.addImage('project-pin', pngImg, { pixelRatio: 2 });
            map.current?.addLayer({
              id: 'unclustered-point',
              type: 'symbol',
              source: 'projects',
              filter: ['!', ['has', 'point_count']],
              layout: {
                'icon-image': 'project-pin',
              },
            });
          };
        })
        .catch((error) => {
          console.error('Error loading project pin image:', error);
        });

      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        className: 'custom-popup',
        offset: [0, -20],
      });

      const style = document.createElement('style');
      style.textContent = `
        .custom-popup .mapboxgl-popup-content {
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          background: white;
          color: #333;
        }
        .mapboxgl-popup {
          max-width: 300px !important;
        }
        .mapboxgl-popup-close-button {
          padding: 4px 8px;
          font-size: 16px;
          color: #666;
        }
        .mapboxgl-popup-close-button:hover {
          background: #f0f0f0;
          color: #333;
        }
      `;
      document.head.appendChild(style);

      map.current.on('click', 'unclustered-point', (e) => {
        if (!e.features || !e.features[0].properties) return;
        map.current!.getCanvas().style.cursor = 'pointer';

        const coordinates = (e.features[0].geometry as any).coordinates.slice();
        const {
          title,
          projectDeveloper,
          slug,
          portfolioHost,
          creditAvailability,
        } = e.features[0].properties;

        // Calculate if popup would go off screen at the top
        const point = map.current!.project(coordinates);
        const popupHeight = 150; // Approximate height of popup
        const offset: [number, number] =
          point.y - popupHeight - 20 < 0 ? [0, 20] : [0, -20];

        let developer = 'Unknown';
        try {
          const projectDeveloperRaw = projectDeveloper;
          if (projectDeveloperRaw) {
            developer =
              JSON.parse(projectDeveloperRaw as string)?.name ?? 'Unknown';
          }
        } catch {
          developer = 'Unknown';
        }

        const projectUrl =
          slug && portfolioHost ? `${portfolioHost}/portfolio/${slug}` : null;

        const getBadgeMessage = (status: string) => {
          switch (status) {
            case CreditAvailability.CREDITS_AVAILABLE:
              return formatMessage({
                id: 'components.creditsAvailableBadge.text.yes',
              });
            case CreditAvailability.NO_CREDITS_AVAILABLE:
              return formatMessage({
                id: 'components.creditsAvailableBadge.text.no',
              });
            case CreditAvailability.SOME_CREDITS_AVAILABLE:
              return formatMessage({
                id: 'components.creditsAvailableBadge.text.some',
              });
            case CreditAvailability.SOON_CREDITS_AVAILABLE:
              return formatMessage({
                id: 'components.creditsAvailableBadge.text.notYet',
              });
            default:
              return '';
          }
        };

        const getBadgeColor = (status: string) => {
          switch (status) {
            case CreditAvailability.CREDITS_AVAILABLE:
              return '#15803d';
            case CreditAvailability.NO_CREDITS_AVAILABLE:
              return '#b91c1c';
            case CreditAvailability.SOME_CREDITS_AVAILABLE:
              return '#ea580c';
            case CreditAvailability.SOON_CREDITS_AVAILABLE:
              return '#2563eb';
            default:
              return '#e0e7ff';
          }
        };

        const badgeColor = getBadgeColor(creditAvailability);
        const badgeMessage = getBadgeMessage(creditAvailability);

        const badge = projectUrl
          ? `<a href="${projectUrl}" target="_blank" rel="noopener" style="text-decoration: none;"><span style="display: inline-block; background: ${badgeColor}; color: white; font-weight: 600; border-radius: 4px; padding: 2px 8px; font-size: 12px; margin-bottom: 6px; cursor: pointer;">${badgeMessage}</span></a>`
          : `<span style="display: inline-block; background: ${badgeColor}; color: white; font-weight: 600; border-radius: 4px; padding: 2px 8px; font-size: 12px; margin-bottom: 6px;">${badgeMessage}</span>`;

        const button = projectUrl
          ? `<a href="${projectUrl}" target="_blank" rel="noopener" style="display: inline-block; margin-top: 12px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; background: #fff; font-size: 14px; font-weight: 700; text-decoration: none;">Show more info</a>`
          : '';

        const description = `
          <div style="padding: 2px; padding-right: 16px; min-width: 180px; max-width: 260px;">
            ${badge}
            <h3 style="font-size: 15px; font-weight: bold;">${title}</h3>
            <p style="font-size: 15px; color: #64748b;">${developer}</p>
            ${button}
          </div>
        `;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup
          .setOffset(offset)
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.current!);
      });

      map.current.on('click', 'clusters', (e) => {
        const features = map.current?.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        if (!features || !features[0].properties) return;

        const clusterId = features[0].properties.cluster_id;
        const projectSource = map.current?.getSource(
          'projects'
        ) as mapboxgl.GeoJSONSource;

        projectSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err || !map.current) return;
          const coordinates = (features[0].geometry as any).coordinates;
          map.current.easeTo({ center: coordinates, zoom });
        });
      });

      map.current.on('mouseenter', 'clusters', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });

      map.current.on('mouseenter', 'unclustered-point', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'unclustered-point', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    } else {
      source.setData(filteredFeatureCollection);
    }
  }, [featureCollection, formatMessage]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    let initialCenter: [number, number];
    let initialZoom: number;

    if (slice.defaultCenterCoordinates && slice.defaultZoomLevel) {
      initialCenter = [
        slice.defaultCenterCoordinates.longitude,
        slice.defaultCenterCoordinates.latitude,
      ];
      initialZoom = slice.defaultZoomLevel;
    } else {
      // 1. Calculate center from Fallback
      const bbox = initialBboxRef.current || FALLBACK_BBOX;
      const [west, south, east, north] = bbox.split(',').map(Number);
      const bounds = new mapboxgl.LngLatBounds([west, south], [east, north]);
      const center = bounds.getCenter();
      
      initialCenter = [center.lng, center.lat];
      
      // Use the slice.defaultZoomLevel if provided (e.g., 8), otherwise default to 6
      initialZoom = slice.defaultZoomLevel ?? 6;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
      maxZoom: MAPBOX_MAX_ZOOM,
      minZoom: slice.minZoomLevel,
      cooperativeGestures: true,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if(map.current?.getLayer('road-number-shield')) {
        map.current?.setLayoutProperty('road-number-shield', 'visibility', 'none');
      }
      setIsMapReady(true);
    });

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      map.current?.remove();
      map.current = null;
    };
  }, [
    slice.defaultCenterCoordinates,
    slice.defaultZoomLevel,
    slice.minZoomLevel,
  ]);


  useEffect(() => {
    if (!map.current || !isMapReady) return;
    const currentMap = map.current;
    currentMap.on('moveend', debouncedUpdateBbox);

    return () => {
      debouncedUpdateBbox.cancel();
      currentMap.off('moveend', debouncedUpdateBbox);
    };
  }, [isMapReady, debouncedUpdateBbox]);

  // Fetch Strapi data once on component mount (non-blocking)
  useEffect(() => {
    fetchStrapiData();
  }, [fetchStrapiData]);

  // Handle re-merging data when Strapi data becomes available
  useEffect(() => {
    if (strapiProjects && featureCollection) {
      const mergedData = mergeProjectData(featureCollection, strapiProjects);
      setFeatureCollection(mergedData);
    }
  }, [strapiProjects]);

  // Request user location (non-blocking)
  useEffect(() => {
    if (slice.defaultCenterCoordinates && slice.defaultZoomLevel) {
      // Use provided default coordinates
      const { latitude, longitude } = slice.defaultCenterCoordinates;
      const buffer = 10;
      const bbox = `${longitude - buffer},${latitude - buffer},${
        longitude + buffer
      },${latitude + buffer}`;
      initialBboxRef.current = bbox;
      fetchProjectsData(bbox);
    } else if (navigator.geolocation && !slice.disableUserLocationZoom) {
      // Set fallback immediately (non-blocking)
      initialBboxRef.current = FALLBACK_BBOX;
      fetchProjectsData(FALLBACK_BBOX);

      // Request user location asynchronously
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          if (map.current) {
            map.current.easeTo({
              center: [userLoc.lon, userLoc.lat],
              zoom: slice.defaultZoomLevel ?? 10,
              duration: 1500,
            });

          // Update bbox for this location
          const buffer = 1;
          const bbox = `${userLoc.lon - buffer},${userLoc.lat - buffer},${
            userLoc.lon + buffer
          },${userLoc.lat + buffer}`;
          initialBboxRef.current = bbox;
          fetchProjectsData(bbox);
        }
      },
      () => {
        // Permission denied or error - already have fallback data loaded
        // No need to re-fetch since we already loaded FALLBACK_BBOX data
      });
    } else {
      // Geolocation not supported or disabled - use fallback
      initialBboxRef.current = FALLBACK_BBOX;
      fetchProjectsData(FALLBACK_BBOX);
    }
  }, [
    slice.defaultCenterCoordinates,
    slice.defaultZoomLevel,
    slice.disableUserLocationZoom,
    fetchProjectsData,
  ]);

  useEffect(() => {
    if (isMapReady && featureCollection) {
      addProjectsLayer();
    }
  }, [isMapReady, featureCollection, addProjectsLayer]);

  if (embedded) {
    return (
      <>
        <Global styles={mapboxStyle} />
          <Box
            height={embeddedHeight}
            ref={mapContainer}
            borderRadius="xl"
            overflow="hidden"
          />
      </>
    );
  }

  return (
    <DefaultSectionContainer>
      <Global styles={mapboxStyle} />
      <Wrapper>
        {slice.title && (
          <>
            <DefaultSectionHeader
              tagline={slice.tagline}
              title={slice.title}
              text={slice.text}
              taglineProps={{ textAlign: 'center' }}
              titleProps={{
                textAlign: 'center',
                maxW: '6xl',
                marginX: 'auto',
              }}
              textProps={{
                textAlign: 'center',
                maxW: '3xl',
                marginX: 'auto',
              }}
            />
            <Box height="16" />
          </>
        )}
          <Box
            height="xl"
            ref={mapContainer}
            borderRadius="xl"
            overflow="hidden"
            boxShadow={['md', null, null, 'none']}
          />
      </Wrapper>
    </DefaultSectionContainer>
  );
};

export default ProjectsMap;
