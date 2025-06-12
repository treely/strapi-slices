import MockAxios from 'jest-mock-axios';
import { FeatureCollection } from 'geojson';
import getFpmProjectsByBbox from './getFpmProjectsByBbox';

describe('The getFpmProjectsByBbox function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  const mockFeatureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [10.0, 20.0],
        },
        properties: {
          id: 'test-project-1',
          name: 'Test Project 1',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [15.0, 25.0],
        },
        properties: {
          id: 'test-project-2',
          name: 'Test Project 2',
        },
      },
    ],
  };

  it('fetches FPM projects by bounding box successfully', async () => {
    const bbox = '5,15,20,30';
    const projectsPromise = getFpmProjectsByBbox(bbox);

    MockAxios.mockResponseFor(
      { url: '/public/projects' },
      { data: mockFeatureCollection }
    );

    const result = await projectsPromise;

    expect(result).toEqual(mockFeatureCollection);
    expect(MockAxios.get).toHaveBeenCalledWith('/public/projects', {
      params: {
        bbox: '5,15,20,30',
      },
      cache: undefined,
    });
  });

  it('handles preview mode correctly', async () => {
    const bbox = '0,0,10,10';
    const projectsPromise = getFpmProjectsByBbox(bbox, true);

    MockAxios.mockResponseFor(
      { url: '/public/projects' },
      { data: mockFeatureCollection }
    );

    await projectsPromise;

    expect(MockAxios.get).toHaveBeenCalledWith('/public/projects', {
      params: {
        bbox: '0,0,10,10',
      },
      cache: false,
    });
  });

  it('handles non-preview mode with cache undefined', async () => {
    const bbox = '0,0,10,10';
    const projectsPromise = getFpmProjectsByBbox(bbox, false);

    MockAxios.mockResponseFor(
      { url: '/public/projects' },
      { data: mockFeatureCollection }
    );

    await projectsPromise;

    expect(MockAxios.get).toHaveBeenCalledWith('/public/projects', {
      params: {
        bbox: '0,0,10,10',
      },
      cache: undefined,
    });
  });

  it('returns empty feature collection when no projects found', async () => {
    const bbox = '0,0,10,10';
    const emptyFeatureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };

    const projectsPromise = getFpmProjectsByBbox(bbox);

    MockAxios.mockResponseFor(
      { url: '/public/projects' },
      { data: emptyFeatureCollection }
    );

    const result = await projectsPromise;

    expect(result).toEqual(emptyFeatureCollection);
    expect(result.features).toHaveLength(0);
  });
});
