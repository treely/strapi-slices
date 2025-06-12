import MockAxios from 'jest-mock-axios';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import getStrapiProjects from './getStrapiProjects';

describe('The getStrapiProjects function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  const mockStrapiResponse = {
    data: {
      data: [strapiProjectMock],
    },
  };

  const mockEmptyResponse = {
    data: {
      data: [],
    },
  };

  it('fetches Strapi projects successfully with default parameters', async () => {
    const projectsPromise = getStrapiProjects();

    MockAxios.mockResponseFor({ url: '/projects' }, mockStrapiResponse);
    MockAxios.mockResponseFor({ url: '/projects' }, mockStrapiResponse);

    const result = await projectsPromise;

    expect(result).toBeInstanceOf(Map);
    expect(result.size).toBe(1);
    expect(result.get(strapiProjectMock.attributes.fpmProjectId!)).toEqual(
      strapiProjectMock
    );
  });

  it('fetches projects in specified locale and English fallback', async () => {
    const locale = 'de';
    const pLevel = '2';
    const projectsPromise = getStrapiProjects(locale, pLevel);

    MockAxios.mockResponseFor({ url: '/projects' }, mockStrapiResponse);
    MockAxios.mockResponseFor({ url: '/projects' }, mockStrapiResponse);

    await projectsPromise;

    expect(MockAxios.get).toHaveBeenCalledWith('/projects', {
      params: {
        pLevel: '2',
        locale: 'de',
        'pagination[pageSize]': '100',
        status: 'published',
      },
      cache: undefined,
    });

    expect(MockAxios.get).toHaveBeenCalledWith('/projects', {
      params: {
        pLevel: '2',
        locale: 'en',
        'pagination[pageSize]': '100',
        status: 'published',
      },
      cache: undefined,
    });
  });

  it('handles preview mode correctly', async () => {
    const projectsPromise = getStrapiProjects('en', '1', true);

    MockAxios.mockResponseFor({ url: '/projects' }, mockStrapiResponse);
    MockAxios.mockResponseFor({ url: '/projects' }, mockStrapiResponse);

    await projectsPromise;

    expect(MockAxios.get).toHaveBeenCalledWith('/projects', {
      params: {
        pLevel: '1',
        locale: 'en',
        'pagination[pageSize]': '100',
        status: 'draft',
      },
      cache: false,
    });

    expect(MockAxios.get).toHaveBeenCalledWith('/projects', {
      params: {
        pLevel: '1',
        locale: 'en',
        'pagination[pageSize]': '100',
        status: 'draft',
      },
      cache: false,
    });
  });

  it('combines projects from both locale and English requests', async () => {
    const germanProject = {
      ...strapiProjectMock,
      id: 2,
      attributes: {
        ...strapiProjectMock.attributes,
        fpmProjectId: 'german-project-id',
      },
    };

    const englishProject = {
      ...strapiProjectMock,
      id: 3,
      attributes: {
        ...strapiProjectMock.attributes,
        fpmProjectId: 'english-project-id',
      },
    };

    const projectsPromise = getStrapiProjects('de');

    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: { data: [germanProject] } }
    );
    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: { data: [englishProject] } }
    );

    const result = await projectsPromise;

    expect(result.size).toBe(2);
    expect(result.get('german-project-id')).toEqual(germanProject);
    expect(result.get('english-project-id')).toEqual(englishProject);
  });

  it('filters out projects without fpmProjectId', async () => {
    const projectWithoutFpmId = {
      ...strapiProjectMock,
      attributes: {
        ...strapiProjectMock.attributes,
        fpmProjectId: null,
      },
    };

    const projectsPromise = getStrapiProjects();

    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: { data: [projectWithoutFpmId] } }
    );
    MockAxios.mockResponseFor({ url: '/projects' }, mockEmptyResponse);

    const result = await projectsPromise;

    expect(result.size).toBe(0);
  });

  it('returns empty map when no projects are found', async () => {
    const projectsPromise = getStrapiProjects();

    MockAxios.mockResponseFor({ url: '/projects' }, mockEmptyResponse);
    MockAxios.mockResponseFor({ url: '/projects' }, mockEmptyResponse);

    const result = await projectsPromise;

    expect(result).toBeInstanceOf(Map);
    expect(result.size).toBe(0);
  });
});
