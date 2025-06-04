import portfolioProjectMock from '../test/integrationMocks/portfolioProjectMock';
import getStaticPropsContextMock from '../test/mocks/getStaticPropsContext';
import minimalGlobalData from '../test/strapiMocks/minimalGlobalData';
import { strapiBlogPostMock } from '../test/strapiMocks/strapiBlogPost';
import { strapiMetadataMock } from '../test/strapiMocks/strapiMetadata';
import { strapiProjectMock } from '../test/strapiMocks/strapiProject';
import mergeGlobalAndStrapiProjectData from './mergeGlobalAndStrapiProjectData';

describe('The mergeGlobalAndStrapiProjectData util', () => {
  it('returns the global metadata if there is no page metadata', () => {
    const projectDataWithoutMetadata = {
      ...strapiProjectMock,
      attributes: {
        ...strapiProjectMock.attributes,
        metadata: null,
      },
    };

    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      projectDataWithoutMetadata,
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
    const projectDataWithMetadata = {
      ...strapiProjectMock,
      attributes: {
        ...strapiProjectMock.attributes,
        metadata: strapiMetadataMock,
      },
    };

    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      projectDataWithMetadata,
      [],
      []
    );

    expect(result.attributes.metadata?.title).toBe(strapiMetadataMock.title);
    expect(result.metadata?.title).toBe(strapiMetadataMock.title);
  });

  it('returns the navbar links if there are links in the global data', () => {
    const result = mergeGlobalAndStrapiProjectData(
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
      strapiProjectMock,
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
    const result = mergeGlobalAndStrapiProjectData(
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
      strapiProjectMock,
      [],
      []
    );

    expect(result.headerButtons).toStrictEqual([
      { id: Infinity, text: 'Header button', url: '/' },
    ]);
  });

  it('returns the footer links if there are links in the global data', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      {
        ...minimalGlobalData,
        attributes: {
          ...minimalGlobalData.attributes,
          footer: {
            ...minimalGlobalData.attributes.footer,
            links: [{ id: Infinity, title: 'Title', links: [] }],
          },
        },
      },
      strapiProjectMock,
      [],
      []
    );

    expect(result.footerLinks).toStrictEqual([
      { id: Infinity, title: 'Title', links: [] },
    ]);
  });

  it('returns a light theme header type if the first slice of the page is not a hero', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiProjectMock,
        attributes: {
          ...strapiProjectMock.attributes,
          slices: [{ __component: 'no.hero.section' }],
        },
      },
      [],
      []
    );

    expect(result.headerType?.theme).toBe('light');
  });

  it('returns a light theme header type if the slices array is empty', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiProjectMock,
        attributes: {
          ...strapiProjectMock.attributes,
          slices: [],
        },
      },
      [],
      []
    );

    expect(result.headerType?.theme).toBe('light');
  });

  it('returns a dark theme header type if the first slice of the page is a hero', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiProjectMock,
        attributes: {
          ...strapiProjectMock.attributes,
          slices: [{ __component: 'sections.hero' }],
        },
      },
      [],
      []
    );

    expect(result.headerType?.theme).toBe('dark');
  });

  it('returns a not extendable header type if the first slice of the page is not a hero', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiProjectMock,
        attributes: {
          ...strapiProjectMock.attributes,
          slices: [{ __component: 'no.hero.section' }],
        },
      },
      [],
      []
    );

    expect(result.headerType?.extendable).toBe(false);
  });

  it('returns a not extendable header type if the slices array is empty', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiProjectMock,
        attributes: {
          ...strapiProjectMock.attributes,
          slices: [],
        },
      },
      [],
      []
    );

    expect(result.headerType?.extendable).toBe(false);
  });

  it('returns an extendable header type if the first slice of the page is a hero', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiProjectMock,
        attributes: {
          ...strapiProjectMock.attributes,
          slices: [{ __component: 'sections.hero' }],
        },
      },
      [],
      []
    );

    expect(result.headerType?.extendable).toBe(true);
  });

  it('returns the blog posts if the page includes slices which need blog posts', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiProjectMock,
        attributes: {
          ...strapiProjectMock.attributes,
          slices: [{ __component: 'sections.blog-cards' }],
        },
      },
      [strapiBlogPostMock],
      []
    );

    expect(result.blogPosts).toStrictEqual([strapiBlogPostMock]);
    expect(result.projects).toStrictEqual([]);
  });

  it('returns the projects if the page includes slices which need projects', () => {
    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      {
        ...strapiProjectMock,
        attributes: {
          ...strapiProjectMock.attributes,
          slices: [{ __component: 'sections.projects-grid' }],
        },
      },
      [],
      [portfolioProjectMock]
    );

    expect(result.blogPosts).toStrictEqual([]);
    expect(result.projects).toStrictEqual([portfolioProjectMock]);
  });

  it('returns isFallbackLocale=true if the project is in a different language', () => {
    const projectDataInDe = {
      ...strapiProjectMock,
      attributes: {
        ...strapiProjectMock.attributes,
        locale: 'de',
      },
    };

    const result = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      minimalGlobalData,
      projectDataInDe,
      [],
      []
    );

    expect(result.isFallbackLocale).toBeTruthy();
  });

  it('handles schema markup types correctly', () => {
    const globalDataWithSchemaMarkup = {
      ...minimalGlobalData,
      attributes: {
        ...minimalGlobalData.attributes,
        metadata: {
          ...minimalGlobalData.attributes.metadata,
          schemaMarkupTypes: ['Organization'],
        },
      },
    };

    const projectDataWithSchemaMarkup = {
      ...strapiProjectMock,
      attributes: {
        ...strapiProjectMock.attributes,
        metadata: {
          ...strapiMetadataMock,
          schemaMarkupTypes: ['Article', 'BlogPosting'],
        },
      },
    };

    // Test project-level schema markup
    const resultWithProjectSchema = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      globalDataWithSchemaMarkup,
      projectDataWithSchemaMarkup,
      [],
      []
    );
    expect(resultWithProjectSchema.metadata.schemaMarkupTypes).toEqual([
      'Article',
      'BlogPosting',
    ]);

    // Test global fallback
    const projectDataWithoutSchema = {
      ...strapiProjectMock,
      attributes: {
        ...strapiProjectMock.attributes,
        metadata: {
          ...strapiMetadataMock,
          schemaMarkupTypes: undefined,
        },
      },
    };

    const resultWithGlobalSchema = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      globalDataWithSchemaMarkup,
      projectDataWithoutSchema,
      [],
      []
    );
    expect(resultWithGlobalSchema.metadata.schemaMarkupTypes).toEqual([
      'Organization',
    ]);

    // Test empty array fallback
    const globalDataWithoutSchema = {
      ...minimalGlobalData,
      attributes: {
        ...minimalGlobalData.attributes,
        metadata: {
          ...minimalGlobalData.attributes.metadata,
          schemaMarkupTypes: undefined,
        },
      },
    };

    const resultWithNoSchema = mergeGlobalAndStrapiProjectData(
      getStaticPropsContextMock,
      globalDataWithoutSchema,
      projectDataWithoutSchema,
      [],
      []
    );
    expect(resultWithNoSchema.metadata.schemaMarkupTypes).toEqual([]);
  });
});
