import React from 'react';
import { strapiCustomerStoryMock } from '../../test/strapiMocks/strapiCustomerStory';
import { Meta, StoryFn } from '@storybook/react';
import CustomerStories from '.';

export default {
  title: 'slices/CustomerStories',
  component: CustomerStories,
} as Meta<typeof CustomerStories>;

const Template: StoryFn<typeof CustomerStories> = (args) => (
  <CustomerStories {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    customer_stories: [strapiCustomerStoryMock],
  },
  customerStories: [strapiCustomerStoryMock],
};
