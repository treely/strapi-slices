import mergeGlobalAndStrapiBlogPostData from './mergeGlobalAndStrapiBlogPostData';
import { strapiBlogPostMock } from '../test/strapiMocks/strapiBlogPost';
import minimalGlobalData from '../test/strapiMocks/minimalGlobalData';
import getStaticPropsContextMock from '../test/mocks/getStaticPropsContext';
import { strapiMetadataMock } from '../test/strapiMocks/strapiMetadata';
import portfolioProjectMock from '../test/integrationMocks/portfolioProjectMock';

describe('The mergeGlobalAndStrapiBlogPostData util', () => {
  it('returns the global metadata if there is no page metadata', () => {
    const blogPostDataWithoutMetadata = {
      ...strapiBlogPostMock,
      attributes: {
        ...strapiBlogPostMock.attributes,
        metadata: null,
      },
    };

    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      minimalGlobalData,
      blogPostDataWithoutMetadata,
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
    const blogPostDataWithMetadata = {
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
      blogPostDataWithMetadata,
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

  it('returns the blog posts if the page includes slices which need blog posts', () => {
    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiBlogPostMock,
        attributes: {
          ...strapiBlogPostMock.attributes,
          slices: [
            {
              __component: 'sections.blog',
            },
          ],
        },
      },
      [strapiBlogPostMock],
      []
    );

    expect(result.blogPosts).toStrictEqual([strapiBlogPostMock]);
    expect(result.projects).toStrictEqual([]);
  });

  it('returns the projects if the page includes slices which need projects', () => {
    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiBlogPostMock,
        attributes: {
          ...strapiBlogPostMock.attributes,
          slices: [
            {
              __component: 'sections.projects-grid',
            },
          ],
        },
      },
      [],
      [portfolioProjectMock]
    );

    expect(result.blogPosts).toStrictEqual([]);
    expect(result.projects).toStrictEqual([portfolioProjectMock]);
  });

  it('returns isFallbackLocale=true if the blog post is in a different language', () => {
    const blogPostDataInDe = {
      ...strapiBlogPostMock,
      attributes: {
        ...strapiBlogPostMock.attributes,
        locale: 'de',
      },
    };

    const result = mergeGlobalAndStrapiBlogPostData(
      getStaticPropsContextMock,
      minimalGlobalData,
      blogPostDataInDe,
      [],
      []
    );

    expect(result.isFallbackLocale).toBeTruthy();
  });
});
