import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiProjectCardMock } from '../../test/strapiMocks/strapiProjectCard';
import ProjectsGrid from '.';
import { ProjectsGridProps } from './ProjectsGrid';

const defaultProps: ProjectsGridProps = {
  slice: {
    projects: [strapiProjectCardMock],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ProjectsGrid {...combinedProps} />);
};

describe('The ProjectsGrid component', () => {
  it('displays the project cards', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.projects[0].title)
    ).toBeInTheDocument();
  });

  it('displays a link to a project', () => {
    setup();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/portfolio/slug');
  });
});
