import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiTreeIconMock } from '../../test/storybookMocks/storybookStrapiMedia';
import IconGrid from '.';

export default {
  title: 'slices/IconGrid',
  component: IconGrid,
} as Meta<typeof IconGrid>;

const Template: StoryFn<typeof IconGrid> = (args) => <IconGrid {...args} />;

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    iconsWithTextAndButton: [
      {
        id: 1,
        title: 'Title 1',
        text: 'Text 1',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
      },
      {
        id: 2,
        title: 'Title 2',
        text: 'Text 2',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
      },
      {
        id: 3,
        title: 'Title 3',
        text: 'Text 3',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
      },
      {
        id: 4,
        title: 'Title 4',
        text: 'Text 4',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
      },
    ],
  },
};

export const WithTaglineTitleAndText = Template.bind({});
WithTaglineTitleAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Text',
    iconsWithTextAndButton: [
      {
        id: 1,
        title: 'Title 1',
        text: 'Text 1',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
      },
      {
        id: 2,
        title: 'Title 2',
        text: 'Text 2',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
      },
      {
        id: 3,
        title: 'Title 3',
        text: 'Text 3',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
      },
      {
        id: 4,
        title: 'Title 4',
        text: 'Text 4',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
      },
    ],
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    iconsWithTextAndButton: [
      {
        id: 1,
        title: 'Title 1',
        text: 'Text 1',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
        button: {
          id: 1,
          text: 'Button',
          url: 'https://tree.ly',
        },
      },
      {
        id: 2,
        title: 'Title 2',
        text: 'Text 2',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
        button: {
          id: 1,
          text: 'Button',
          url: 'https://tree.ly',
        },
      },
      {
        id: 3,
        title: 'Title 3',
        text: 'Text 3',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
        button: {
          id: 1,
          text: 'Button',
          url: 'https://tree.ly',
        },
      },
      {
        id: 4,
        title: 'Title 4',
        text: 'Text 4',
        icon: {
          id: 1,
          alt: 'Alt text',
          img: { data: storybookStrapiTreeIconMock },
        },
        button: {
          id: 1,
          text: 'Button',
          url: 'https://tree.ly',
        },
      },
    ],
  },
};
