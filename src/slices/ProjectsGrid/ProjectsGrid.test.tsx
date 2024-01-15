import React from 'react';
import { render, screen } from '../../test/testUtils';
import ProjectsGrid from '.';
import { ProjectsGridProps } from './ProjectsGrid';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import CreditsAvailableState from '../../models/CreditsAvailableState';
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
      creditsAvailable: CreditsAvailableState.YES,
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
});
