import MockAxios from 'jest-mock-axios';
import { FeatureCollection } from 'geojson';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import getPortfolioProjectsByBbox from './getPortfolioProjectsByBbox';

describe('The getPortfolioProjectsByBbox function', () => {
  const mockFeatureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          id: fpmProjectMock.id,
          title: fpmProjectMock.title,
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0],
        },
      },
    ],
  };

  afterEach(() => {
    MockAxios.reset();
  });

  it('returns the FPM projects as FeatureCollection with the slug from strapi', async () => {
    const bbox = '0,0,1,1';
    const projectsPromise = getPortfolioProjectsByBbox(bbox);

    MockAxios.mockResponseFor(
      { url: '/public/projects' },
      { data: mockFeatureCollection }
    );
    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: { data: [strapiProjectMock] } }
    );
    MockAxios.mockResponseFor({ url: '/projects' }, { data: { data: [] } });

    const result = await projectsPromise;

    expect(result.type).toBe('FeatureCollection');
    expect(result.features.length).toBe(1);
    expect(result.features[0].properties).toStrictEqual({
      id: fpmProjectMock.id,
      title: fpmProjectMock.title,
      slug: strapiProjectMock.attributes.slug,
      portfolioHost:
        strapiProjectMock.attributes.portfolio.data?.attributes.host,
    });
  });

  it('returns the FPM projects as FeatureCollection in english if no localized version is available', async () => {
    const bbox = '0,0,1,1';
    const projectsPromise = getPortfolioProjectsByBbox(bbox, 'de');

    MockAxios.mockResponseFor(
      { url: '/public/projects' },
      { data: mockFeatureCollection }
    );
    MockAxios.mockResponseFor({ url: '/projects' }, { data: { data: [] } });
    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: { data: [strapiProjectMock] } }
    );

    const result = await projectsPromise;

    expect(result.type).toBe('FeatureCollection');
    expect(result.features.length).toBe(1);
    expect(result.features[0].properties).toStrictEqual({
      id: fpmProjectMock.id,
      title: fpmProjectMock.title,
      slug: strapiProjectMock.attributes.slug,
      portfolioHost:
        strapiProjectMock.attributes.portfolio.data?.attributes.host,
    });
  });
});
