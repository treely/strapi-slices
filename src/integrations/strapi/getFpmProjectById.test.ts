import MockAxios from 'jest-mock-axios';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import getFpmProjectById from './getFpmProjectById';

describe('The getFpmProjectById function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  it('fetches FPM project by ID successfully', async () => {
    const projectId = 'test-project-1';
    const projectPromise = getFpmProjectById(projectId);

    MockAxios.mockResponseFor(
      { url: `/public/projects/${projectId}` },
      { data: fpmProjectMock }
    );

    const result = await projectPromise;

    expect(result).toEqual(fpmProjectMock);
    expect(MockAxios.get).toHaveBeenCalledWith(`/public/projects/${projectId}`);
  });
});
