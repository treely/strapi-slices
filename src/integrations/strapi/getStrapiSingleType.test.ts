import MockAxios from 'jest-mock-axios';
import getStrapiSingleType from './getStrapiSingleType';
import StrapiPage from '../../models/strapi/StrapiPage';
import minimalGlobalData from '../../test/strapiMocks/minimalGlobalData';
import { waitFor } from '@testing-library/react';

describe('The getStrapiSingleType function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  it('returns the localized versions if available', async () => {
    const globalPromise = getStrapiSingleType<StrapiPage>('/api/global', {});

    MockAxios.mockResponseFor(
      { url: '/api/global' },
      { data: { data: minimalGlobalData } }
    );

    const global = await globalPromise;

    expect(global).toStrictEqual(minimalGlobalData);
  });

  it('returns the localized versions if available', async () => {
    const globalPromise = getStrapiSingleType<StrapiPage>('/api/global', {
      locale: 'de',
    });

    let firstRequestInfo = MockAxios.lastReqGet();

    MockAxios.mockError(
      { isAxiosError: true, response: { status: 404 } },
      firstRequestInfo
    );

    let secondRequestInfo;

    await waitFor(() => {
      secondRequestInfo = MockAxios.lastReqGet();
      expect(secondRequestInfo).toBeDefined();
    });

    MockAxios.mockResponse(
      { data: { data: minimalGlobalData } },
      secondRequestInfo
    );

    const global = await globalPromise;

    await expect(global).toStrictEqual(minimalGlobalData);
  });
});
