import { StoryFn, Meta } from '@storybook/react';

import LinkCardsGrid from '.';

export default {
  title: 'sections/LinkCardsGrid',
  component: LinkCardsGrid,
} as Meta<typeof LinkCardsGrid>;

const Template: StoryFn<typeof LinkCardsGrid> = (args) => (
  <LinkCardsGrid {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    cards: [
      {
        id: 1,
        title: 'Title',
        text: 'Text',
        link: { id: 1, text: 'Text', url: '/' },
      },
    ],
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    cards: [
      {
        id: 1,
        title: 'Title',
        text: 'Text',
        link: { id: 1, text: 'Text', url: '/' },
      },
    ],
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cards: [
      {
        id: 1,
        title: 'Title',
        text: 'Text',
        link: { id: 1, text: 'Text', url: '/' },
      },
    ],
  },
};
