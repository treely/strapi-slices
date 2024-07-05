import minimalGlobalData from '../test/strapiMocks/minimalGlobalData';
import mergeGlobalAndStrapiPageData from './mergeGlobalAndStrapiPageData';
import { strapiPageMock } from '../test/strapiMocks/strapiPage';
import getStaticPropsContextMock from '../test/mocks/getStaticPropsContext';
import { strapiMetadataMock } from '../test/strapiMocks/strapiMetadata';
import { strapiBlogPostMock } from '../test/strapiMocks/strapiBlogPost';
import { strapiCustomerStoryMock } from '../test/strapiMocks/strapiCustomerStory';
import portfolioProjectMock from '../test/integrationMocks/portfolioProjectMock';

describe('The mergeGlobalAndStrapiPageData util', () => {
  it('returns the global metadata if there is no page metadata', () => {
    const pageDataWithoutMetadata = {
      ...strapiPageMock,
      attributes: {
        ...strapiPageMock.attributes,
        metadata: null,
      },
    };

    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      pageDataWithoutMetadata,
      [],
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
    expect(result.isFallbackLocale).toBeFalsy();
  });

  it('returns the pages metadata if the page data includes metadata', () => {
    const pageDataWithMetadata = {
      ...strapiPageMock,
      attributes: {
        ...strapiPageMock.attributes,
        metadata: strapiMetadataMock,
      },
    };

    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      pageDataWithMetadata,
      [],
      [],
      []
    );

    expect(result.attributes.metadata?.title).toBe(strapiMetadataMock.title);
    expect(result.metadata?.title).toBe(strapiMetadataMock.title);
  });

  it('returns a light theme header type if the first slice of the page is not a hero', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [{ __component: 'no.hero.section' }],
        },
      },
      [],
      [],
      []
    );

    expect(result.headerType?.theme).toBe('light');
  });

  it('returns a light theme header type if the slices array is empty', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [],
        },
      },
      [],
      [],
      []
    );

    expect(result.headerType?.theme).toBe('light');
  });

  it('returns a dark theme header type if the first slice of the page is a hero', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [{ __component: 'sections.hero' }],
        },
      },
      [],
      [],
      []
    );

    expect(result.headerType?.theme).toBe('dark');
  });

  it('returns a not extendable header type if the first slice of the page is not a hero', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [{ __component: 'no.hero.section' }],
        },
      },
      [],
      [],
      []
    );

    expect(result.headerType?.extendable).toBe(false);
  });

  it('returns a not extendable header type if the slices array is empty', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [],
        },
      },
      [],
      [],
      []
    );

    expect(result.headerType?.extendable).toBe(false);
  });

  it('returns an extendable header type if the first slice of the page is a hero', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [{ __component: 'sections.hero' }],
        },
      },
      [],
      [],
      []
    );

    expect(result.headerType?.extendable).toBe(true);
  });

  it('returns the navbar links if there are links in the global data', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      {
        ...minimalGlobalData,
        attributes: {
          ...minimalGlobalData.attributes,
          navbar: {
            ...minimalGlobalData.attributes.navbar,
            navMenus: [
              {
                link: { id: Infinity, text: 'Text', url: '/' },
                title: 'Title',
                items: [],
              },
            ],
          },
        },
      },
      strapiPageMock,
      [],
      [],
      []
    );

    expect(result.headerNavMenus).toStrictEqual([
      {
        link: { id: Infinity, text: 'Text', url: '/' },
        items: [],
        title: 'Title',
      },
    ]);
  });

  it('returns the navbar buttons if there are buttons in the global data', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      {
        ...minimalGlobalData,
        attributes: {
          ...minimalGlobalData.attributes,
          navbar: {
            ...minimalGlobalData.attributes.navbar,
            buttons: [{ id: Infinity, text: 'Header button', url: '/' }],
          },
        },
      },
      strapiPageMock,
      [],
      [],
      []
    );

    expect(result.headerButtons).toStrictEqual([
      { id: Infinity, text: 'Header button', url: '/' },
    ]);
  });

  it('returns the footer links if there are links in the global data', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      {
        ...minimalGlobalData,
        attributes: {
          ...minimalGlobalData.attributes,
          footer: {
            ...minimalGlobalData.attributes.footer,
            links: [{ id: Infinity, title: 'Text', links: [] }],
          },
        },
      },
      strapiPageMock,
      [],
      [],
      []
    );

    expect(result.footerLinks).toStrictEqual([
      { id: Infinity, title: 'Text', links: [] },
    ]);
  });

  it('returns the blog posts if the page includes slices which need blog posts', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [{ __component: 'sections.blog-cards' }],
        },
      },
      [strapiBlogPostMock],
      [],
      []
    );

    expect(result.blogPosts).toStrictEqual([strapiBlogPostMock]);
    expect(result.customerStories).toStrictEqual([]);
    expect(result.projects).toStrictEqual([]);
  });

  it('returns the customer stories if the page includes slices which need customer stories', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [{ __component: 'sections.customer-stories' }],
        },
      },
      [],
      [strapiCustomerStoryMock],
      []
    );

    expect(result.customerStories).toStrictEqual([strapiCustomerStoryMock]);
    expect(result.blogPosts).toStrictEqual([]);
    expect(result.projects).toStrictEqual([]);
  });

  it('returns the projects if the page includes slices which need projects', () => {
    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiPageMock,
        attributes: {
          ...strapiPageMock.attributes,
          slices: [{ __component: 'sections.projects-grid' }],
        },
      },
      [],
      [],
      [portfolioProjectMock]
    );

    expect(result.projects).toStrictEqual([portfolioProjectMock]);
    expect(result.blogPosts).toStrictEqual([]);
    expect(result.customerStories).toStrictEqual([]);
  });

  it('returns isFallbackLocale=true if the page is in a different language', () => {
    const pageDataInDe = {
      ...strapiPageMock,
      attributes: {
        ...strapiPageMock.attributes,
        locale: 'de',
      },
    };

    const result = mergeGlobalAndStrapiPageData(
      getStaticPropsContextMock,
      minimalGlobalData,
      pageDataInDe,
      [],
      [],
      []
    );

    expect(result.isFallbackLocale).toBeTruthy();
  });
});
