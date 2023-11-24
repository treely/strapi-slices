import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiTreeIconMock } from '@/test/storybookMocks/storybookStrapiMedia';
import LogoGridWithText from '.';

export default {
  title: 'sections/LogoGridWithText',
  component: LogoGridWithText,
} as Meta<typeof LogoGridWithText>;

const Template: StoryFn<typeof LogoGridWithText> = (args) => (
  <LogoGridWithText {...args} />
);

const logos = [
  { id: 1, alt: 'Alt text 1', img: { data: storybookStrapiTreeIconMock } },
  { id: 2, alt: 'Alt text 2', img: { data: storybookStrapiTreeIconMock } },
];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    text: 'Text',
    logos,
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    title: 'Title',
    text: 'Text',
    button: { id: 1, text: 'Button', url: 'https://tree.ly' },
    logos,
  },
};

export const WithMoreThan2Logos = Template.bind({});
WithMoreThan2Logos.args = {
  slice: {
    title: 'Title',
    text: 'Text',
    button: { id: 1, text: 'Button', url: 'https://tree.ly' },
    logos: [
      ...logos,
      { id: 3, alt: 'Alt text 3', img: { data: storybookStrapiTreeIconMock } },
      { id: 4, alt: 'Alt text 4', img: { data: storybookStrapiTreeIconMock } },
    ],
  },
};

export const WithLogosWithLinks = Template.bind({});
WithLogosWithLinks.args = {
  slice: {
    title: 'Title',
    text: 'Text',
    logos: [
      {
        id: 1,
        alt: 'Logo with link 1',
        img: { data: storybookStrapiTreeIconMock },
        link: { id: 1, text: 'Link', url: 'https://tree.ly' },
      },
      {
        id: 2,
        alt: 'Logo with link 2',
        img: { data: storybookStrapiTreeIconMock },
        link: { id: 2, text: 'Link', url: 'https://tree.ly' },
      },
    ],
  },
};
