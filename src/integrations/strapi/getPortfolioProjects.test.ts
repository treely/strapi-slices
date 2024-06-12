import MockAxios from 'jest-mock-axios';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import getPortfolioProjects from './getPortfolioProjects';

describe('The getPortfolioProjects function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  it('returns the FPM projects with the slug from strapi', async () => {
    const projectsPromise = getPortfolioProjects();

    MockAxios.mockResponseFor(
      { url: '/public/projects' },
      { data: [fpmProjectMock] }
    );
    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: { data: [strapiProjectMock] } }
    );
    MockAxios.mockResponseFor({ url: '/projects' }, { data: { data: [] } });

    const projects = await projectsPromise;

    expect(projects.length).toBe(1);
    expect(projects[0]).toStrictEqual({
      ...fpmProjectMock,
      slug: strapiProjectMock.attributes.slug,
      creditsAvailable: strapiProjectMock.attributes.creditsAvailable,
    });
  });

  it('returns the FPM project in english if no localized version is available', async () => {
    const projectsPromise = getPortfolioProjects('de');

    MockAxios.mockResponseFor(
      { url: '/public/projects' },
      { data: [fpmProjectMock] }
    );
    MockAxios.mockResponseFor({ url: '/projects' }, { data: { data: [] } });
    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: { data: [strapiProjectMock] } }
    );

    const projects = await projectsPromise;

    expect(projects.length).toBe(1);
    expect(projects[0]).toStrictEqual({
      ...fpmProjectMock,
      slug: strapiProjectMock.attributes.slug,
      creditsAvailable: strapiProjectMock.attributes.creditsAvailable,
    });
  });
});
