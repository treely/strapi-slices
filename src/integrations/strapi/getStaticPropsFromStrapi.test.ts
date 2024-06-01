import MockAxios from 'jest-mock-axios';
import getStaticPropsFromStrapi from './getStaticPropsFromStrapi';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';

describe('The getStaticPropsFromStrapi function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  it('returns the data from Strapi', async () => {
    const resultPromise = getStaticPropsFromStrapi('/projects', {
      locale: 'en',
    });

    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: [strapiProjectMock] }
    );

    const result = await resultPromise;

    expect(result.data).toStrictEqual([strapiProjectMock]);
  });

  it('returns the data from Strapi filtered by a slug', async () => {
    const resultPromise = getStaticPropsFromStrapi('/projects', {
      locale: 'en',
      slug: 'test',
    });

    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: [strapiProjectMock] }
    );

    const result = await resultPromise;

    expect(result.data).toStrictEqual([strapiProjectMock]);
  });

  it('returns the data from Strapi in preview mode', async () => {
    const resultPromise = getStaticPropsFromStrapi('/projects', {
      locale: 'en',
      preview: true,
    });

    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: [strapiProjectMock] }
    );

    const result = await resultPromise;

    expect(result.data).toStrictEqual([strapiProjectMock]);
  });
});
