import React from 'react';
import { Meta, StoryFn } from '@storybook/nextjs';
import FactsWithProjectsMap from '.';

export default {
  title: 'slices/FactsWithProjectsMap',
  component: FactsWithProjectsMap,
} as Meta<typeof FactsWithProjectsMap>;

const Template: StoryFn<typeof FactsWithProjectsMap> = (args) => (
  <FactsWithProjectsMap {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    facts: [
      { key: 'Carbon Credits', value: '10M+' },
      { key: 'Projects', value: '150+' },
      { key: 'Countries', value: '30+' },
    ],
  },
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  slice: {
    tagline: 'Our Impact',
    title: 'Making a Difference Worldwide',
    subTitle: 'Explore our global network of carbon offset projects',
    facts: [
      { key: 'Carbon Credits', value: '10M+' },
      { key: 'Projects', value: '150+' },
      { key: 'Countries', value: '30+' },
    ],
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Our Impact',
    title: 'Making a Difference Worldwide',
    subTitle: 'Explore our global network of carbon offset projects',
    button: {
      id: 1,
      text: 'View All Projects',
      url: '/projects',
    },
    facts: [
      { key: 'Carbon Credits', value: '10M+' },
      { key: 'Projects', value: '150+' },
      { key: 'Countries', value: '30+' },
      { key: 'Partners', value: '500+' },
    ],
  },
};

export const FullProps = Template.bind({});
FullProps.args = {
  slice: {
    tagline: 'Global Impact',
    title: 'Carbon Offset Projects Around the World',
    subTitle:
      'Discover our diverse portfolio of verified carbon offset projects spanning multiple continents',
    button: {
      id: 1,
      text: 'Explore Projects',
      url: '/portfolio',
    },
    variant: 'green',
    facts: [
      { key: 'Verified Carbon Credits', value: '25M+' },
      { key: 'Active Projects', value: '200+' },
      { key: 'Countries Covered', value: '45+' },
      { key: 'Partner Organizations', value: '1,000+' },
    ],
    alignFacts: 'left',
    defaultCenterCoordinates: {
      latitude: 48.5,
      longitude: 10.0,
    },
    defaultZoomLevel: 4,
    minZoomLevel: 2,
    disableUserLocationZoom: true,
  },
};
