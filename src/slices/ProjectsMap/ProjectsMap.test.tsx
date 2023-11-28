import React from 'react';
import { render, screen } from '../../test/testUtils';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { MAPBOX_INITIAL_ZOOM } from '../../constants/mapbox';
import ProjectsMap from '.';
import { ProjectsMapProps } from './ProjectsMap';
import {
  markerSetLngLatSpy,
  markerAddToSpy,
  mapConstructorMock,
} from '../../../__mocks__/mapbox-gl';

const defaultProps: ProjectsMapProps = {
  slice: {},
  projects: [],
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ProjectsMap {...combinedProps} />);
};

describe('The ProjectsMap component', () => {
  afterEach(() => {
    markerSetLngLatSpy.mockClear();
    markerAddToSpy.mockClear();
    mapConstructorMock.mockClear();
  });

  it('renders successfully with minimal props', () => {
    setup({});
  });

  it('renders the title, tagline and text', () => {
    setup({
      slice: {
        title: 'title',
        tagline: 'tagline',
        text: 'text',
      },
    });

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('tagline')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('adds the projects to the map', () => {
    setup({
      projects: [fpmProjectMock],
    });

    expect(markerSetLngLatSpy).toHaveBeenCalledWith(
      fpmProjectMock.geom?.coordinates
    );
    expect(markerAddToSpy).toHaveBeenCalledTimes(1);
  });

  it('sets the center to the bounding box of the projects coordinates by default', () => {
    setup({
      projects: [fpmProjectMock],
    });

    expect(mapConstructorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        bounds: [
          9.836542145100884, 47.22636837845707, 10.236542145100882,
          47.62636837845707,
        ],
        center: undefined,
        zoom: MAPBOX_INITIAL_ZOOM,
      })
    );
  });

  it('sets the and zoom to the specified ones if they are provided', () => {
    setup({
      slice: {
        defaultCenterCoordinates: {
          latitude: 13,
          longitude: 23,
        },
        defaultZoomLevel: 7,
      },
      projects: [fpmProjectMock],
    });

    expect(mapConstructorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        bounds: undefined,
        center: [23, 13],
        zoom: 7,
      })
    );
  });
});
