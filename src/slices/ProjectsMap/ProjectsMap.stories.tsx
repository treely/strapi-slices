import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import fpmProjectMock from '@/test/integrationMocks/fpmProjectMock';
import CreditsAvailableState from '@/models/CreditsAvailableState';
import ProjectsMap from '.';

export default {
  title: 'sections/ProjectsMap',
  component: ProjectsMap,
} as Meta<typeof ProjectsMap>;

const Template: StoryFn<typeof ProjectsMap> = (args) => (
  <ProjectsMap {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {},
  projects: [
    fpmProjectMock,
    {
      isPublic: true,
      ...fpmProjectMock,
      geom: {
        type: 'Point',
        coordinates: [10.336542145100883, 47.82636837845707],
      },
    },
  ],
};

export const WithHero = Template.bind({});
WithHero.args = {
  slice: {
    tagline: 'Projects Map Tagline',
    text: 'Projects Map Text',
    title: 'Projects Map Title',
  },

  projects: [
    fpmProjectMock,
    {
      isPublic: true,
      ...fpmProjectMock,
      geom: {
        type: 'Point',
        coordinates: [10.336542145100883, 47.82636837845707],
      },
    },
  ],
};

export const InitialPosition = Template.bind({});
InitialPosition.args = {
  slice: {
    defaultCenterCoordinates: {
      latitude: 47.42636837845707,
      longitude: 10.036542145100883,
    },
    defaultZoomLevel: 10,
  },
  projects: [
    fpmProjectMock,
    {
      ...fpmProjectMock,
      isPublic: true,
      geom: {
        type: 'Point',
        coordinates: [10.336542145100883, 47.82636837845707],
      },
    },
  ],
};

export const FullProps = Template.bind({});
FullProps.args = {
  slice: {
    tagline: 'Projects Map Tagline',
    text: 'Projects Map Text',
    title: 'Projects Map Title',

    defaultCenterCoordinates: {
      latitude: 47.82636837845707,
      longitude: 10.336542145100883,
    },
    defaultZoomLevel: 10,
  },
  projects: [
    fpmProjectMock,
    {
      ...fpmProjectMock,
      slug: 'project-slug',
      creditsAvailable: CreditsAvailableState.YES,
      isPublic: true,
      geom: {
        type: 'Point',
        coordinates: [10.336542145100883, 47.82636837845707],
      },
    },
  ],
};
