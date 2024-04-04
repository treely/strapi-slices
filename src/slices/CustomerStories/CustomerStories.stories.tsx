import React from 'react';
import {
  strapiCustomerStoryMock,
  strapiCustomerStoryMock1,
} from '../../test/strapiMocks/strapiCustomerStory';
import { Meta, StoryFn } from '@storybook/react';
import CustomerStories from '.';

export default {
  title: 'slices/CustomerStories',
  component: CustomerStories,
} as Meta<typeof CustomerStories>;

const Template: StoryFn<typeof CustomerStories> = (args) => (
  <CustomerStories {...args} />
);

export const WithCustomerCard = Template.bind({});
WithCustomerCard.args = {
  slice: {
    customer_stories: [strapiCustomerStoryMock],
  },
  customerStories: [strapiCustomerStoryMock],
};

export const WithQuoteCard = Template.bind({});
WithQuoteCard.args = {
  slice: {
    customer_stories: [strapiCustomerStoryMock1],
  },
  customerStories: [strapiCustomerStoryMock1],
};

export const WithMultipleCards = Template.bind({});
WithMultipleCards.args = {
  slice: {
    customer_stories: [
      strapiCustomerStoryMock1,
      strapiCustomerStoryMock,
      strapiCustomerStoryMock,
      strapiCustomerStoryMock1,
    ],
  },
  customerStories: [
    strapiCustomerStoryMock1,
    strapiCustomerStoryMock,
    strapiCustomerStoryMock,
    strapiCustomerStoryMock1,
  ],
};
