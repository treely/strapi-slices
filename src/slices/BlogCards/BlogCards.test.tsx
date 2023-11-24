import { render, screen } from '@/test/testUtils';
import { strapiBlogPostMock } from '@/test/strapiMocks/strapiBlogPost';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import { mergeDeep } from '@/utils/mergeDeep';
import BlogCards from '.';
import { BlogCardsProps } from './BlogCards';

const defaultProps: BlogCardsProps = {
  slice: {
    tagline: 'Tagline',
    title: 'Main Title',
    subTitle: 'Subtitle',
    variant: 'white',
  },
  blogPosts: [strapiBlogPostMock],
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<BlogCards {...combinedProps} />);
};

describe('The BlogCards component', () => {
  it('displays the title', () => {
    setup();

    expect(screen.getByText('Main Title')).toBeInTheDocument();
  });

  it('displays the post titles', () => {
    setup();

    expect(
      screen.getByText(strapiBlogPostMock.attributes.title)
    ).toBeInTheDocument();
  });

  it('displays the category', () => {
    setup({
      blogPosts: [
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            category: {
              data: {
                attributes: {
                  name: 'Category',
                },
              },
            },
          },
        },
      ],
    });

    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('displays a teaser if the blog post includes a teaser', () => {
    setup({
      blogPosts: [
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            teaser: 'Teaser',
          },
        },
      ],
    });

    expect(screen.getByText('Teaser')).toBeInTheDocument();
  });
  it('displays a button if the button is defined in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        button: { url: 'url', text: 'Button' },
      },
    });

    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('displays an author if the blog post includes an author', () => {
    setup({
      blogPosts: [
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            author: {
              data: {
                attributes: {
                  name: 'Author',
                  img: { id: 1, alt: 'Alt', img: { data: strapiMediaMock } },
                },
              },
            },
          },
        },
      ],
    });

    expect(screen.getByText('Author')).toBeInTheDocument();
  });

  it('displays nothing if the blog post that should be displayed does not exists in the delivered blog posts', () => {
    setup({ blogPosts: [] });

    expect(
      screen.queryByText(strapiBlogPostMock.attributes.title)
    ).not.toBeInTheDocument();
  });

  it('displays only three latest blog posts', () => {
    setup({
      blogPosts: [
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: strapiBlogPostMock.attributes.slug,
            createdAt: '2022-01-10T15:04:32.897Z',
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'my-slug',
            createdAt: '2022-01-12T15:04:32.897Z',
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'slug-1',
            createdAt: '2022-01-16T15:04:32.897Z',
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'slug-2',
            createdAt: '2022-01-14T15:04:32.897Z',
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'slug-3',
            createdAt: '2022-01-20T15:04:32.897Z',
          },
        },
      ],
    });

    expect(screen.getByText('1/14/2022')).toBeInTheDocument();
    expect(screen.getByText('1/16/2022')).toBeInTheDocument();
    expect(screen.getByText('1/20/2022')).toBeInTheDocument();
  });

  it('displays three latest filtered by category blog posts, if the filter is applied', () => {
    setup({
      slice: {
        blogPostCategory: {
          data: {
            attributes: {
              name: 'About',
            },
          },
        },
      },
      blogPosts: [
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: strapiBlogPostMock.attributes.slug,
            createdAt: '2022-01-10T15:04:32.897Z',
            category: {
              data: {
                attributes: {
                  name: 'About',
                },
              },
            },
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'my-slug',
            createdAt: '2022-01-12T15:04:32.897Z',
            category: {
              data: {
                attributes: {
                  name: 'About',
                },
              },
            },
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'slug-1',
            createdAt: '2022-01-16T15:04:32.897Z',
            category: {
              data: {
                attributes: {
                  name: 'Forest',
                },
              },
            },
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'slug-2',
            createdAt: '2022-01-14T15:04:32.897Z',
            category: {
              data: {
                attributes: {
                  name: 'Tech',
                },
              },
            },
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'slug-3',
            createdAt: '2022-01-20T15:04:32.897Z',
            category: {
              data: {
                attributes: {
                  name: 'About',
                },
              },
            },
          },
        },
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'slug-4',
            createdAt: '2022-01-11T15:04:32.897Z',
            category: {
              data: {
                attributes: {
                  name: 'About',
                },
              },
            },
          },
        },
      ],
    });

    expect(screen.getByText('1/11/2022')).toBeInTheDocument();
    expect(screen.getByText('1/12/2022')).toBeInTheDocument();
    expect(screen.getByText('1/20/2022')).toBeInTheDocument();
  });
});
