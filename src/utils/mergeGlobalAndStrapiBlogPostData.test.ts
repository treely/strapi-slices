import mergeGlobalAndStrapiBlogPostData from './mergeGlobalAndStrapiBlogPostData';
import { strapiBlogPostMock } from '../test/strapiMocks/strapiBlogPost';
import minimalGlobalData from '../test/strapiMocks/minimalGlobalData';
import getStaticPropsContextMock from '../test/mocks/getStaticPropsContext';
import { strapiMetadataMock } from '../test/strapiMocks/strapiMetadata';

describe('The mergeGlobalAndStrapiBlogPostData util', () => {
  it('returns the global metadata if there is no page metadata', () => {
    const pageDataWithoutMetadata = {
      ...strapiBlogPostMock,
      attributes: {
        ...strapiBlogPostMock.attributes,
        metadata: null,
      },
    };

    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      minimalGlobalData,
      pageDataWithoutMetadata,
      [],
      []
    );

    expect(result.attributes.metadata).toBe(
      minimalGlobalData.attributes.metadata
    );
    expect(result.metadata.title).toBe(
      minimalGlobalData.attributes.metadata.title
    );
    expect(result.metadata.description).toBe(
      minimalGlobalData.attributes.metadata.description
    );
  });

  it('returns the pages metadata if the page data includes metadata', () => {
    const pageDataWithMetadata = {
      ...strapiBlogPostMock,
      data: {
        ...strapiBlogPostMock,
        attributes: {
          ...strapiBlogPostMock.attributes,
          metadata: strapiMetadataMock,
        },
      },
    };

    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      minimalGlobalData,
      pageDataWithMetadata,
      [],
      []
    );

    expect(result.attributes.metadata?.title).toBe(strapiMetadataMock.title);
    expect(result.metadata?.title).toBe(strapiMetadataMock.title);
  });

  it('returns the navbar links if there are links in the global data', () => {
    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      {
        ...minimalGlobalData,
        attributes: {
          ...minimalGlobalData.attributes,
          navbar: {
            ...minimalGlobalData.attributes.navbar,
            navMenus: [
              {
                link: {
                  id: Infinity,
                  text: 'Text',
                  url: '/',
                },
                title: 'Title',
                items: [],
              },
            ],
          },
        },
      },
      strapiBlogPostMock,
      [],
      []
    );

    expect(result.headerNavMenus).toStrictEqual([
      {
        title: 'Title',
        items: [],
        link: { id: Infinity, text: 'Text', url: '/' },
      },
    ]);
  });

  it('returns the navbar buttons if there are buttons in the global data', () => {
    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      {
        ...minimalGlobalData,
        attributes: {
          ...minimalGlobalData.attributes,
          navbar: {
            ...minimalGlobalData.attributes.navbar,
            buttons: [
              {
                id: Infinity,
                text: 'Header button',
                url: '/',
              },
            ],
          },
        },
      },
      strapiBlogPostMock,
      [],
      []
    );

    expect(result.headerButtons).toStrictEqual([
      { id: Infinity, text: 'Header button', url: '/' },
    ]);
  });

  it('returns the footer links if there are links in the global data', () => {
    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      {
        ...minimalGlobalData,
        attributes: {
          ...minimalGlobalData.attributes,
          footer: {
            ...minimalGlobalData.attributes.footer,
            links: [
              {
                id: Infinity,
                title: 'Title',
                links: [],
              },
            ],
          },
        },
      },
      strapiBlogPostMock,
      [],
      []
    );

    expect(result.footerLinks).toStrictEqual([
      { id: Infinity, title: 'Title', links: [] },
    ]);
  });
});
