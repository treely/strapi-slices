import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiTreeIconMock } from '@/test/storybookMocks/storybookStrapiMedia';
import TextCarousel from '.';

export default {
  title: 'sections/TextCarousel',
  component: TextCarousel,
} as Meta<typeof TextCarousel>;

const Template: StoryFn<typeof TextCarousel> = (args) => (
  <TextCarousel {...args} />
);

const slides = [
  {
    id: 1,
    title: 'Title 1',
    text: 'Text 1',
    icon: {
      id: 1,
      alt: 'Icon alt text',
      img: { data: storybookStrapiTreeIconMock },
    },
  },
  {
    id: 2,
    title: 'Title 2',
    text: 'Text 2',
    icon: {
      id: 1,
      alt: 'Icon alt text',
      img: { data: storybookStrapiTreeIconMock },
    },
  },
  {
    id: 3,
    title: 'Title 3',
    text: 'Text 3',
    icon: {
      id: 1,
      alt: 'Icon alt text',
      img: { data: storybookStrapiTreeIconMock },
    },
  },
  {
    id: 4,
    title: 'Title 4',
    text: 'Text 4',
    icon: {
      id: 1,
      alt: 'Icon alt text',
      img: { data: storybookStrapiTreeIconMock },
    },
  },
  {
    id: 5,
    title: 'Title 5',
    text: 'Text 5',
    icon: {
      id: 1,
      alt: 'Icon alt text',
      img: { data: storybookStrapiTreeIconMock },
    },
  },
];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    slides,
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    slides,
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    slides,
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    slides,
    button: { id: 1, text: 'Button', url: 'https://tree.ly' },
  },
};
