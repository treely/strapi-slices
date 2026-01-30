import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';
import ProjectsMap from '.';

export default {
  title: 'slices/ProjectsMap',
  component: ProjectsMap,
} as Meta<typeof ProjectsMap>;

const Template: StoryFn<typeof ProjectsMap> = (args) => (
  <ProjectsMap {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {},
};

export const WithHero = Template.bind({});
WithHero.args = {
  slice: {
    tagline: 'Projects Map Tagline',
    text: 'Projects Map Text',
    title: 'Projects Map Title',
    defaultZoomLevel: 8,
    minZoomLevel: 4,
  },
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
};

export const WithoutDefaultZoomLevel = Template.bind({});
WithoutDefaultZoomLevel.args = {
  slice: {
    minZoomLevel: 4,
    disableUserLocationZoom: true,
  },
};

export const FullProps = Template.bind({});
FullProps.args = {
  slice: {
    tagline: 'Projects Map Tagline',
    text: 'Projects Map Text',
    title: 'Projects Map Title',
    defaultZoomLevel: 8,
    minZoomLevel: 4,
    disableUserLocationZoom: false,
  },
};
