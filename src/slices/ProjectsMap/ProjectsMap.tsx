import React, { useContext } from 'react';
import {
  MAPBOX_INITIAL_ZOOM,
  MAPBOX_MAX_ZOOM,
  MAPBOX_TOKEN,
  MapBoxStyle,
} from '../../constants/mapbox';
import BBox from '../../models/BBox';
import mergeBoundingBoxes from '../../utils/mergeBoundingBoxes';
import { css } from '@emotion/react';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Wrapper,
} from 'boemly';
import mapboxgl, { LngLatBoundsLike, LngLatLike, Map, Marker } from 'mapbox-gl';
import { MutableRefObject, createRef, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import PortfolioProject from '../../models/PortfolioProject';
import MinimalProviders from '../../components/MinimalProviders';
import MapMarker from './MapMarker';
import mapboxStyle from './mapboxStyle';
import { IntlContext } from '../../components/ContextProvider';

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

  projects: PortfolioProject[];
}

export const ProjectsMap: React.FC<ProjectsMapProps> = ({
  slice,
  projects,
}: ProjectsMapProps) => {
  const { locale } = useContext(IntlContext);

  const filteredProjects = projects.filter(
    (project) => project.geom
  ) as (PortfolioProject & {
    geom: Pick<PortfolioProject, 'geom'>;
  })[];

  const center: LngLatLike | undefined = slice.defaultCenterCoordinates
    ? [
        slice.defaultCenterCoordinates.longitude,
        slice.defaultCenterCoordinates.latitude,
      ]
    : undefined;

  const bounds: LngLatBoundsLike | undefined = center
    ? undefined
    : mergeBoundingBoxes(
        filteredProjects.map(
          (p): BBox =>
            [
              ...p.geom.coordinates.map((c) => c - 0.2),
              ...p.geom.coordinates.map((c) => c + 0.2),
            ] as BBox
        )
      );

  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new Map({
      container: mapContainer.current || '',
      style: MapBoxStyle.CaliTerrain,
      center,
      zoom: slice.defaultZoomLevel || MAPBOX_INITIAL_ZOOM,
      maxZoom: MAPBOX_MAX_ZOOM,
      bounds,
    });

    filteredProjects
      // Sort by longitude, so that the markers are rendeed form right to left
      .sort((a, b) => b.geom.coordinates[0] - a.geom.coordinates[0])
      .forEach((project) => {
        const ref =
          createRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
        ref.current = document.createElement('div');

        createRoot(ref.current).render(
          <MinimalProviders locale={locale}>
            <MapMarker
              title={project.friendlyName || project.title}
              isPublic={project.isPublic}
              portfolioHost={project.portfolioHost}
              slug={project.slug}
              creditAvailability={project.creditAvailability}
              projectDeveloper={project.projectDeveloper?.name}
            />
          </MinimalProviders>
        );

        // Offset is needed to center the marker on the coordinates
        const marker = new Marker(ref.current, { offset: [-20, -40] });

        // No chaining here, because the mocks don't support it
        marker.setLngLat(project.geom.coordinates);
        marker.addTo(map);
      });

    // Clean up on unmount
    return () => map.remove();
  }, [locale]);

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
        </Wrapper>
      </Box>
    </DefaultSectionContainer>
  );
};
