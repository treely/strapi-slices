import { render, screen } from '@/test/testUtils';
import { strapiBlogPostMock } from '@/test/strapiMocks/strapiBlogPost';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import { mergeDeep } from '@/utils/mergeDeep';
import { BlogProps } from './Blog';
import Blog from '.';

const defaultProps: BlogProps = {
  slice: {
    blog_posts: [
      {
        ...strapiBlogPostMock,
        attributes: {
          ...strapiBlogPostMock.attributes,
          createdAt: '2022-01-10T15:04:32.897Z',
        },
      },
    ],
  },
  blogPosts: [strapiBlogPostMock],
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Blog {...combinedProps} />);
};

describe('The Blog component', () => {
  it('displays all the post titles', () => {
    setup();

    expect(
      screen.getByText(strapiBlogPostMock.attributes.title)
    ).toBeInTheDocument();
  });

  it('displays the category if the blog post includes a category', () => {
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

  it('sorts the blog posts by date', () => {
    setup({
      slice: {
        blog_posts: [
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
        ],
      },
      blogPosts: [
        strapiBlogPostMock,
        {
          ...strapiBlogPostMock,
          attributes: {
            ...strapiBlogPostMock.attributes,
            slug: 'my-slug',
            title: 'My Title',
          },
        },
      ],
    });

    expect(screen.getAllByRole('heading')[0].textContent).toBe('My Title');
    expect(screen.getAllByRole('heading')[1].textContent).toBe(
      strapiBlogPostMock.attributes.title
    );
  });
});
