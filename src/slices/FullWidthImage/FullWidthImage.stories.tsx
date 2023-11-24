import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '@/test/storybookMocks/storybookStrapiMedia';
import FullWidthImage from '.';

export default {
  title: 'sections/FullWidthImage',
  component: FullWidthImage,
} as Meta<typeof FullWidthImage>;

const Template: StoryFn<typeof FullWidthImage> = (args) => (
  <FullWidthImage {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    image: { id: 1, alt: 'Alt text', img: { data: storybookStrapiCoverMock } },
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    image: { id: 1, alt: 'Alt text', img: { data: storybookStrapiCoverMock } },
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    image: { id: 1, alt: 'Alt text', img: { data: storybookStrapiCoverMock } },
  },
};
