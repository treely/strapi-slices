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

    const projects = await projectsPromise;

    expect(projects.length).toBe(1);
    expect(projects[0]).toStrictEqual({
      ...fpmProjectMock,
      slug: strapiProjectMock.attributes.slug,
      creditsAvailable: strapiProjectMock.attributes.creditsAvailable,
    });
  });
});
