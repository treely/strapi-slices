import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Video from '.';

export default {
  title: 'slices/Video',
  component: Video,
} as Meta<typeof Video>;

const Template: StoryFn<typeof Video> = (args) => <Video {...args} />;

export const Default = Template.bind({});
Default.args = {
  slice: {
    title: 'Title',
    youTubeID: 'QnzFqtWIJCI',
  },
};
