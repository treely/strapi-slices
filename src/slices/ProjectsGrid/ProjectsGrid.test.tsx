import React from 'react';
import { render, screen } from '../../test/testUtils';
import ProjectsGrid from '.';
import { ProjectsGridProps } from './ProjectsGrid';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';

const defaultProps: ProjectsGridProps = {
  slice: {
    projects: { data: [strapiProjectMock] },
  },
  projects: [
    {
      ...fpmProjectMock,
      slug: 'slug',
      isPublic: true,
      thumbnail: { img: { data: strapiMediaMock }, alt: 'Alt Text', id: 1 },
      footerSubTitle: 'certified-123',
    },
  ],
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ProjectsGrid {...combinedProps} />);
};

describe('The ProjectsGrid component', () => {
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
