import MockAxios from 'jest-mock-axios';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import getPortfolioProjects from './getPortfolioProjects';
import fpmClient from '../fpmClient';
import strapiClient from './strapiClient';

// Mock the fpmClient module
jest.mock('../fpmClient', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

// Mock the strapiClient module
jest.mock('./strapiClient', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe('The getPortfolioProjects function', () => {
  afterEach(() => {
    MockAxios.reset();
    jest.clearAllMocks();
  });

  it('returns the FPM projects with the slug from strapi', async () => {
    // Mock fpmClient responses
    (fpmClient.get as jest.Mock)
      .mockResolvedValueOnce({ data: [fpmProjectMock] }) // /public/projects
      .mockResolvedValueOnce({
        data: { ...fpmProjectMock, averageSellableAmountPerYear: 1000 },
      }); // /public/projects/${id}

    // Mock strapiClient responses
    (strapiClient.get as jest.Mock)
      .mockResolvedValueOnce({ data: { data: [strapiProjectMock] } }) // First /projects call
      .mockResolvedValueOnce({ data: { data: [] } }); // Second /projects call

    const projects = await getPortfolioProjects();

    expect(projects.length).toBe(1);
    expect(projects[0]).toStrictEqual({
      ...fpmProjectMock,
      slug: strapiProjectMock.attributes.slug,
      creditAvailability: fpmProjectMock.creditAvailability,
      averageSellableAmountPerYear: 1000,
    });
  });

  it('returns the FPM project in english if no localized version is available', async () => {
    // Mock fpmClient responses
    (fpmClient.get as jest.Mock)
      .mockResolvedValueOnce({ data: [fpmProjectMock] }) // /public/projects
      .mockResolvedValueOnce({
        data: { ...fpmProjectMock, averageSellableAmountPerYear: 1000 },
      }); // /public/projects/${id}

    // Mock strapiClient responses
    (strapiClient.get as jest.Mock)
      .mockResolvedValueOnce({ data: { data: [] } }) // First /projects call (localized)
      .mockResolvedValueOnce({ data: { data: [strapiProjectMock] } }); // Second /projects call (english fallback)

    const projects = await getPortfolioProjects('de');

    expect(projects.length).toBe(1);
    expect(projects[0]).toStrictEqual({
      ...fpmProjectMock,
      slug: strapiProjectMock.attributes.slug,
      creditAvailability: fpmProjectMock.creditAvailability,
      averageSellableAmountPerYear: 1000,
    });
  });
});
