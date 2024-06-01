import MockAxios from 'jest-mock-axios';
import getStaticPathsFromStrapi from './getStaticPathsFromStrapi';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';

describe('The getStaticPathsFromStrapi function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  it('returns the data from Strapi', async () => {
    const resultPromise = getStaticPathsFromStrapi('/projects');

    MockAxios.mockResponseFor(
      { url: '/projects' },
      { data: [strapiProjectMock] }
    );

    const result = await resultPromise;

    expect(result.data).toStrictEqual([strapiProjectMock]);
  });
});
