import React from 'react';
import {
  strapiCustomerStoryMock,
  strapiCustomerStoryWithCustomerQuoteCardMock,
  strapiCustomerStoryWithLogoCardMock,
} from '../../test/strapiMocks/strapiCustomerStory';
import { Meta, StoryFn } from '@storybook/nextjs';
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
    customer_stories: [strapiCustomerStoryWithCustomerQuoteCardMock],
  },
  customerStories: [strapiCustomerStoryWithCustomerQuoteCardMock],
};

export const WithLogoCard = Template.bind({});
WithLogoCard.args = {
  slice: {
    customer_stories: [strapiCustomerStoryWithLogoCardMock],
  },
  customerStories: [strapiCustomerStoryWithLogoCardMock],
};

export const WithMultipleCards = Template.bind({});
WithMultipleCards.args = {
  slice: {
    customer_stories: [
      strapiCustomerStoryMock,
      strapiCustomerStoryWithCustomerQuoteCardMock,
      strapiCustomerStoryWithLogoCardMock,
      strapiCustomerStoryWithLogoCardMock,
      strapiCustomerStoryMock,
      strapiCustomerStoryWithCustomerQuoteCardMock,
    ],
  },
  customerStories: [
    strapiCustomerStoryMock,
    strapiCustomerStoryWithCustomerQuoteCardMock,
    strapiCustomerStoryWithLogoCardMock,
    strapiCustomerStoryWithLogoCardMock,
    strapiCustomerStoryMock,
    strapiCustomerStoryWithCustomerQuoteCardMock,
  ],
};
