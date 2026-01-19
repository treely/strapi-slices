import { render, screen } from '../../test/testUtils';
import { ProjectsGridV2Props } from './ProjectsGridV2';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import ProjectsGridV2 from '.';

const defaultProps: ProjectsGridV2Props = {
  slice: {
    projects: { data: [strapiProjectMock] },
  },
  projects: [
    {
      ...fpmProjectMock,
      slug: 'slug',
      isPublic: true,
      thumbnail: { img: { data: strapiMediaMock }, alt: 'Alt Text', id: 1 },
    },
  ],
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ProjectsGridV2 {...combinedProps} />);
};

describe('The ProjectsGridV2 component', () => {
  it('displays the project cards', () => {
    setup();

    expect(screen.getByText(fpmProjectMock.title)).toBeInTheDocument();
  });

  it('links to the portfolio', () => {
    setup();

    expect(screen.getByRole('link')).toHaveProperty(
      'href',
      'http://localhost/portfolio/slug'
    );
  });

  it('prefixes the url with the portfolio host', () => {
    setup({
      ...defaultProps,
      projects: [
        { ...defaultProps.projects[0], portfolioHost: 'https://example.org' },
      ],
    });

    expect(screen.getByRole('link')).toHaveProperty(
      'href',
      'https://example.org/portfolio/slug'
    );
  });
});
