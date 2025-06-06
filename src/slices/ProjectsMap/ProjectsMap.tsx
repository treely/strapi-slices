import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import mapboxgl from 'mapbox-gl';
import { css } from '@emotion/react';
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
import getPortfolioProjectsByBbox from '../../integrations/strapi/getPortfolioProjectsByBbox';
import { CreditAvailability } from '../../models/fpm/FPMProject';

mapboxgl.accessToken = MAPBOX_TOKEN;

export interface ProjectsMapProps {
  slice: {
    tagline?: string;
    title?: string;
    text?: string;

    defaultCenterCoordinates?: {
      latitude: number;
      longitude: number;
    };
    defaultZoomLevel?: number;
  };
}

const FALLBACK_BBOX =
  '-1.9950830850086163,44.4464186384987,21.995083085002875,54.12644342419196';

export const ProjectsMap: React.FC<ProjectsMapProps> = ({
  slice,
}: ProjectsMapProps) => {
  const { locale, formatMessage } = useContext(IntlContext);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [featureCollection, setFeatureCollection] =
    useState<FeatureCollection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const initialBboxRef = useRef<string | null>(null);
  const hasUpdatedInitialBbox = useRef(false);
  const isInitializing = useRef(true);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const currentFeatureIds = useRef<Set<string>>(new Set());

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

  const fetchProjectsData = useCallback(async (bbox: string) => {
    setIsLoading(true);
    try {
      const data = await getPortfolioProjectsByBbox(bbox);
      setFeatureCollection(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedUpdateBbox = useCallback(
    debounce(() => {
      if (!map.current || !initialBboxRef.current) return;
      const bounds = map.current.getBounds();
      const newBbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
      if (!isBboxContained(newBbox, initialBboxRef.current)) {
        fetchProjectsData(newBbox);
      }
    }, 500),
    [fetchProjectsData, isBboxContained]
  );

  const addProjectsLayer = useCallback(() => {
    if (!map.current || !featureCollection || !map.current.isStyleLoaded())
      return;

    const filteredFeatureCollection = {
      ...featureCollection,
      features: featureCollection.features.filter(
        (feature) => feature.properties?.isPublic !== false
      ),
    };

    const source = map.current.getSource('projects') as mapboxgl.GeoJSONSource;

    const clearMarkers = () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };

    const addMarkers = () => {
      if (!map.current) return;

      const features = map.current.querySourceFeatures('projects', {
        filter: ['!', ['has', 'point_count']],
      });

      const newFeatureIds = new Set(
        features
          .filter((feature) => feature.properties?.id)
          .map((feature) => feature.properties!.id.toString())
      );

      // Check if features have changed
      const featuresChanged =
        newFeatureIds.size !== currentFeatureIds.current.size ||
        [...newFeatureIds].some((id) => !currentFeatureIds.current.has(id));

      if (!featuresChanged) return;

      currentFeatureIds.current = newFeatureIds;

      // Clear existing markers
      clearMarkers();

      // Add new markers
      features.forEach((feature) => {
        if (feature.geometry.type !== 'Point' || !feature.properties) return;

        const coordinates = feature.geometry.coordinates as [number, number];
        const {
          title,
          projectDeveloper,
          slug,
          portfolioHost,
          creditAvailability,
        } = feature.properties;

        let developer = 'Unknown';
        try {
          const projectDeveloperRaw = projectDeveloper;
          if (projectDeveloperRaw) {
            const parsed = JSON.parse(projectDeveloperRaw as string);
            developer = parsed?.name ?? 'Unknown';
          }
        } catch {
          developer = 'Unknown';
        }

        const projectUrl =
          slug && portfolioHost ? `${portfolioHost}/portfolio/${slug}` : null;

        // Get translated message based on credit availability
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

        // Define badge colors based on credit availability
        const getBadgeColor = (status: string) => {
          switch (status) {
            case CreditAvailability.CREDITS_AVAILABLE:
              return '#15803d'; // green.600
            case CreditAvailability.NO_CREDITS_AVAILABLE:
              return '#b91c1c'; // red.600
            case CreditAvailability.SOME_CREDITS_AVAILABLE:
              return '#ea580c'; // orange.500
            case CreditAvailability.SOON_CREDITS_AVAILABLE:
              return '#2563eb'; // blue.500
            default:
              return '#e0e7ff';
          }
        };

        const badgeColor = getBadgeColor(creditAvailability);
        const badgeMessage = getBadgeMessage(creditAvailability);

        const badge = `<a href="${projectUrl}" target="_blank" rel="noopener" style="text-decoration: none;"><span style="display: inline-block; background: ${badgeColor}; color: white; font-weight: 600; border-radius: 4px; padding: 2px 8px; font-size: 12px; margin-bottom: 6px; cursor: pointer;">${badgeMessage}</span></a>`;

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

        if (map.current) {
          const marker = new mapboxgl.Marker({
            color: '#2A3FBA',
            scale: 0.7,
          })
            .setLngLat(coordinates)
            .setPopup(
              new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: true,
                className: 'custom-popup',
              }).setHTML(description)
            )
            .addTo(map.current);

          markersRef.current.push(marker);
        }
      });
    };

    if (!source) {
      map.current.addSource('projects', {
        type: 'geojson',
        data: filteredFeatureCollection,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Add the cluster layer
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

      // Set up pulsing animation for clusters
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
      // Add the cluster count layer
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

      // Handle clicks on clusters
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

          map.current.easeTo({
            center: coordinates,
            zoom: zoom,
          });
        });
      });

      // Change the cursor to a pointer when the mouse is over the clusters
      map.current.on('mouseenter', 'clusters', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });

      // Update markers when source data changes
      map.current.on('data', (e) => {
        if (e.sourceId === 'projects' && e.isSourceLoaded) {
          addMarkers();
        }
      });

      // Update markers on significant zoom or move events
      map.current.on('zoomend', () => {
        addMarkers();
        // Restart pulsing animation if clusters are visible
        if (map.current?.getLayer('clusters')) {
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
            map.current.setPaintProperty(
              'clusters',
              'circle-radius',
              expression
            );
          }, 50);
        }
      });

      map.current.on('moveend', () => {
        addMarkers();
      });

      const style = document.createElement('style');
      style.textContent = `
        .custom-popup .mapboxgl-popup-content {
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .mapboxgl-popup {
          max-width: 300px !important;
        }
        .mapboxgl-popup-content {
          background: white;
          color: #333;
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

      // Initial marker addition
      addMarkers();
    } else {
      source.setData(filteredFeatureCollection);
      addMarkers();
    }

    // Cleanup markers and animation on unmount
    return () => {
      clearMarkers();
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [featureCollection, locale, formatMessage]);

  useEffect(() => {
    if (map.current?.isStyleLoaded()) {
      const cleanup = addProjectsLayer();
      return cleanup;
    } else {
      map.current?.on('style.load', addProjectsLayer);
      return () => {
        map.current?.off('style.load', addProjectsLayer);
      };
    }
  }, [addProjectsLayer]);

  useEffect(() => {
    if (slice.defaultCenterCoordinates && slice.defaultZoomLevel) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setUserLocation(userLoc);
          const buffer = 1;
          const bbox = `${userLoc.lon - buffer},${userLoc.lat - buffer},${
            userLoc.lon + buffer
          },${userLoc.lat + buffer}`;
          initialBboxRef.current = bbox;
          fetchProjectsData(bbox);
        },
        () => {
          setUserLocation(null);
          initialBboxRef.current = FALLBACK_BBOX;
          fetchProjectsData(FALLBACK_BBOX);
        }
      );
    } else {
      setUserLocation(null);
      initialBboxRef.current = FALLBACK_BBOX;
      fetchProjectsData(FALLBACK_BBOX);
    }
  }, [
    slice.defaultCenterCoordinates,
    slice.defaultZoomLevel,
    fetchProjectsData,
  ]);

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
    } else if (userLocation) {
      initialCenter = [userLocation.lon, userLocation.lat];
      initialZoom = 10;
    } else {
      // fallback to bbox center
      const bbox = initialBboxRef.current || FALLBACK_BBOX;
      const [west, south, east, north] = bbox.split(',').map(Number);
      const bounds = new mapboxgl.LngLatBounds([west, south], [east, north]);
      const center = bounds.getCenter();
      initialCenter = [center.lng, center.lat];
      initialZoom = 6;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
      maxZoom: MAPBOX_MAX_ZOOM,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Only fit to bbox if not using user location or default center/zoom
      if (
        !(slice.defaultCenterCoordinates && slice.defaultZoomLevel) &&
        !userLocation
      ) {
        const bbox = initialBboxRef.current || FALLBACK_BBOX;
        const [west, south, east, north] = bbox.split(',').map(Number);
        const bounds = new mapboxgl.LngLatBounds([west, south], [east, north]);
        map.current?.fitBounds(bounds, { padding: 20 });
      }

      map.current?.once('moveend', () => {
        if (!hasUpdatedInitialBbox.current) {
          const newBounds = map.current?.getBounds();
          if (newBounds) {
            const newBbox = `${newBounds.getWest()},${newBounds.getSouth()},${newBounds.getEast()},${newBounds.getNorth()}`;
            hasUpdatedInitialBbox.current = true;
            isInitializing.current = false;
            initialBboxRef.current = newBbox;
            fetchProjectsData(newBbox);
          }
        }
      });
    });

    map.current.on('moveend', () => {
      if (!isInitializing.current && hasUpdatedInitialBbox.current) {
        debouncedUpdateBbox();
      }
    });

    return () => {
      debouncedUpdateBbox.cancel();
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      map.current?.remove();
      map.current = null;
    };
  }, [
    debouncedUpdateBbox,
    fetchProjectsData,
    slice.defaultCenterCoordinates,
    slice.defaultZoomLevel,
    userLocation,
  ]);

  return (
    <DefaultSectionContainer>
      <Box css={mapboxStyle}>
        <Wrapper>
          {slice.title ? (
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
          ) : (
            <></>
          )}

          <Box
            height="xl"
            ref={mapContainer}
            borderRadius="xl"
            overflow="hidden"
            boxShadow={['md', null, null, 'none']}
            css={css`
              mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
            `}
          />
          <>{isLoading && <Box>Loading projects...</Box>}</>
        </Wrapper>
      </Box>
    </DefaultSectionContainer>
  );
};
