import React from 'react';
import { render, screen, waitFor, act } from '../../test/testUtils';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import ProjectsMap from '.';
import { ProjectsMapProps } from './ProjectsMap';
import {
  markerSetLngLatSpy,
  markerAddToSpy,
  mapConstructorMock,
  mapIsStyleLoadedSpy,
  mapGetSourceSpy,
  mapQuerySourceFeaturesSpy,
} from '../../../__mocks__/mapbox-gl';
import getPortfolioProjectsByBbox from '../../integrations/strapi/getPortfolioProjectsByBbox';

// Mock getPortfolioProjectsByBbox
jest.mock('../../integrations/strapi/getPortfolioProjectsByBbox', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    type: 'FeatureCollection',
    features: [],
  }),
}));

// Ensure fpmProjectMock has valid coordinates
const mockProject = {
  ...fpmProjectMock,
  geom: {
    coordinates: [10.036542145100883, 47.42636837845707], // Match expected format
  },
};

const defaultProps: ProjectsMapProps = {
  slice: {},
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

  it('renders successfully with minimal props', async () => {
    await act(async () => {
      setup({});
    });
  });

  it('renders the title, tagline and text', async () => {
    await act(async () => {
      setup({
        slice: {
          title: 'title',
          tagline: 'tagline',
          text: 'text',
        },
      });
    });

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('tagline')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('adds the projects to the map', async () => {
    // Mock the getBounds method to return the fallback bbox
    const mockBounds = {
      getWest: () => -1.9950830850086163,
      getSouth: () => 44.4464186384987,
      getEast: () => 21.995083085002875,
      getNorth: () => 54.12644342419196,
    };

    await act(async () => {
      setup({});
    });

    // Wait for map to be initialized
    await waitFor(() => {
      expect(mapConstructorMock).toHaveBeenCalled();
    });

    // Get the map instance and mock required methods
    const mapInstance = mapConstructorMock.mock.results[0].value;
    mapInstance.getBounds = jest.fn().mockReturnValue(mockBounds);
    mapIsStyleLoadedSpy.mockReturnValue(true);

    // Verify the API was called with the correct bbox
    await waitFor(() => {
      expect(getPortfolioProjectsByBbox).toHaveBeenCalledWith(
        '-1.9950830850086163,44.4464186384987,21.995083085002875,54.12644342419196'
      );
    });

    // Verify the map was initialized with the correct style
    expect(mapConstructorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        style: 'mapbox://styles/mapbox/streets-v12',
      })
    );
  });

  it('sets the center to the bounding box of the projects coordinates by default', async () => {
    const mockFeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            ...mockProject,
            isPublic: true,
          },
          geometry: {
            type: 'Point',
            coordinates: mockProject.geom.coordinates,
          },
        },
      ],
    };

    (getPortfolioProjectsByBbox as jest.Mock).mockResolvedValueOnce(
      mockFeatureCollection
    );
    mapGetSourceSpy.mockReturnValue(null);
    mapQuerySourceFeaturesSpy.mockReturnValue([]);

    await act(async () => {
      setup({
        projects: [mockProject],
      });
    });

    expect(mapConstructorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        center: expect.any(Array),
        zoom: expect.any(Number),
      })
    );
  });

  it('sets the and zoom to the specified ones if they are provided', async () => {
    await act(async () => {
      setup({
        slice: {
          defaultCenterCoordinates: {
            latitude: 47.42636837845707,
            longitude: 10.036542145100883,
          },
          defaultZoomLevel: 10,
        },
        projects: [mockProject],
      });
    });

    expect(mapConstructorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        center: [10.036542145100883, 47.42636837845707],
        zoom: 10,
      })
    );
  });
});
