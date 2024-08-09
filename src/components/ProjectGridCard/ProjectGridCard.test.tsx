import { render, screen } from '../../test/testUtils';
import { ProjectGridCardProps } from './ProjectGridCard';
import ProjectGridCard from '.';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import React from 'react';
import messagesEn from '../CreditsAvailableBadge/messages.en';

const defaultProps: ProjectGridCardProps = {
  project: {
    ...fpmProjectMock,
    slug: 'slug',
    thumbnail: { img: { data: strapiMediaMock }, alt: 'Alt Text', id: 1 },
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ProjectGridCard {...combinedProps} />);
};

describe('The ProjectGridCard component', () => {
  it('displays the project card', () => {
    setup();

    expect(screen.getByText(fpmProjectMock.title)).toBeInTheDocument();
  });

  it('displays the project thumbnail', () => {
    setup();

    expect(screen.getByRole('img')).toHaveProperty('alt', 'Alt Text');
  });

  it('displays the project area', () => {
    setup();

    expect(screen.getByText('140 ha')).toBeInTheDocument();
  });

  it('displays the project location', () => {
    setup();

    expect(screen.getByText('Austria')).toBeInTheDocument();
  });

  it('displays the certification date if it is defined', () => {
    setup();

    expect(screen.getByText('Certified, 2020')).toBeInTheDocument();
  });

  it('displays the credits available badge', () => {
    setup();

    expect(
      screen.getByText(messagesEn['components.creditsAvailableBadge.text.yes'])
    ).toBeInTheDocument();
  });
});
