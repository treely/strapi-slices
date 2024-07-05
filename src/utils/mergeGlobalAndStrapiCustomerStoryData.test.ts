import mergeGlobalAndStrapiCustomerStoryData from './mergeGlobalAndStrapiCustomerStoryData';
import { strapiCustomerStoryMock } from '../test/strapiMocks/strapiCustomerStory';
import getStaticPropsContextMock from '../test/mocks/getStaticPropsContext';
import minimalGlobalData from '../test/strapiMocks/minimalGlobalData';
import { strapiMetadataMock } from '../test/strapiMocks/strapiMetadata';

describe('The mergeGlobalAndStrapiCustomerStoryData util', () => {
  it('returns the global metadata if there is no page metadata', () => {
    const customerStoryDataWithoutMetadata = {
      ...strapiCustomerStoryMock,
      attributes: {
        ...strapiCustomerStoryMock.attributes,
        metadata: null,
      },
    };

    const result = mergeGlobalAndStrapiCustomerStoryData(
      getStaticPropsContextMock,
      minimalGlobalData,
      customerStoryDataWithoutMetadata,
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
    expect(result.isFallbackLocale).toBeFalsy();
  });

  it('returns the pages metadata if the page data includes metadata', () => {
    const customerStoryDataWithMetadata = {
      ...strapiCustomerStoryMock,
      data: {
        ...strapiCustomerStoryMock,
        attributes: {
          ...strapiCustomerStoryMock.attributes,
          metadata: strapiMetadataMock,
        },
      },
    };

    const result = mergeGlobalAndStrapiCustomerStoryData(
      getStaticPropsContextMock,
      minimalGlobalData,
      customerStoryDataWithMetadata,
      []
    );

    expect(result.attributes.metadata?.title).toBe(strapiMetadataMock.title);
    expect(result.metadata?.title).toBe(strapiMetadataMock.title);
  });

  it('returns the navbar links if there are links in the global data', () => {
    const result = mergeGlobalAndStrapiCustomerStoryData(
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
      strapiCustomerStoryMock,
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
    const result = mergeGlobalAndStrapiCustomerStoryData(
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
      strapiCustomerStoryMock,
      []
    );

    expect(result.headerButtons).toStrictEqual([
      { id: Infinity, text: 'Header button', url: '/' },
    ]);
  });

  it('returns the footer links if there are links in the global data', () => {
    const result = mergeGlobalAndStrapiCustomerStoryData(
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
      strapiCustomerStoryMock,
      []
    );

    expect(result.footerLinks).toStrictEqual([
      { id: Infinity, title: 'Title', links: [] },
    ]);
  });

  it('returns the customer stories if the page includes slices which need customer stories', () => {
    const result = mergeGlobalAndStrapiCustomerStoryData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiCustomerStoryMock,
        attributes: {
          ...strapiCustomerStoryMock.attributes,
          slices: [
            {
              __component: 'sections.customer-stories',
            },
          ],
        },
      },
      [strapiCustomerStoryMock]
    );

    expect(result.customerStories).toStrictEqual([strapiCustomerStoryMock]);
  });

  it('returns isFallbackLocale=true if the customer story is in a different language', () => {
    const customerStoryDataInDe = {
      ...strapiCustomerStoryMock,
      attributes: {
        ...strapiCustomerStoryMock.attributes,
        locale: 'de',
      },
    };

    const result = mergeGlobalAndStrapiCustomerStoryData(
      getStaticPropsContextMock,
      minimalGlobalData,
      customerStoryDataInDe,
      []
    );

    expect(result.isFallbackLocale).toBeTruthy();
  });
});
