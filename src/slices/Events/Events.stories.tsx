import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Events from '.';

export default {
  title: 'slices/Events',
  component: Events,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Events>;

const Template: StoryFn<typeof Events> = (args) => <Events {...args} />;

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    upcomingTitle: 'Tree.ly Events',
    upcomingDescription: 'Join us for these amazing events',
    pastTitle: 'Past Events',
    pastDescription: 'Check out our past events',
    filterSearch: false,
  },
};

export const WithFilterSearch = Template.bind({});
WithFilterSearch.args = {
  slice: {
    upcomingTitle: 'Tree.ly Events',
    upcomingDescription: 'Join us for these amazing events',
    pastTitle: 'Past Events',
    pastDescription: 'Check out our past events',
    filterSearch: true,
  },
};
