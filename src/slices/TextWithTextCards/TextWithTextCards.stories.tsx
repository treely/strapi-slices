import { StoryFn, Meta } from '@storybook/react';

import {
  storybookStrapiAvatarMock,
  storybookStrapiGradientTopDownMock,
  storybookStrapiTreeIconMock,
} from '@/test/storybookMocks/storybookStrapiMedia';
import TextWithTextCards from '.';

export default {
  title: 'sections/TextWithTextCards',
  component: TextWithTextCards,
} as Meta<typeof TextWithTextCards>;

const Template: StoryFn<typeof TextWithTextCards> = (args) => (
  <TextWithTextCards {...args} />
);

const cards = [
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
];

const contact = {
  id: 1,
  title: 'Title',
  text: 'Text',
  avatar: {
    id: 1,
    name: 'Avatar name',
    description: 'Avatar description',
    image: {
      id: 1,
      alt: 'Image alt text',
      img: { data: storybookStrapiAvatarMock },
    },
  },
  button: { id: 1, text: 'Button', url: 'https://tree.ly' },
};

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    cards,
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    cards,
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cards,
  },
};

export const WithContact = Template.bind({});
WithContact.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cards,
    contact,
  },
};

export const WithShape = Template.bind({});
WithShape.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cards,
    contact,
    shape: {
      id: 1,
      alt: 'Shape alt text',
      img: { data: storybookStrapiGradientTopDownMock },
    },
  },
};
