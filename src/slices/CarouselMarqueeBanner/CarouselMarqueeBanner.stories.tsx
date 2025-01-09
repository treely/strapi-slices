import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CarouselMarqueeBanner from '.';
import {
  storybookStrapiAvatarMock,
  storybookStrapiCoverMock,
  storybookStrapiTreeIconMock,
} from '../../test/storybookMocks/storybookStrapiMedia';

export default {
  title: 'slices/CarouselMarqueeBanner',
  component: CarouselMarqueeBanner,
} as Meta<typeof CarouselMarqueeBanner>;

const Template: StoryFn<typeof CarouselMarqueeBanner> = (args) => (
  <CarouselMarqueeBanner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  slice: {
    logos: [
      {
        id: 1,
        alt: 'Alt text 1',
        img: { data: storybookStrapiAvatarMock },
      },
      {
        id: 2,

        alt: 'Alt text 1',
        img: { data: storybookStrapiAvatarMock },
      },
      {
        id: 3,
        alt: 'Alt text 1',
        img: { data: storybookStrapiAvatarMock },
      },
      {
        id: 4,
        alt: 'Alt text 1',
        img: { data: storybookStrapiTreeIconMock },
      },
      {
        id: 5,
        alt: 'Alt text 1',
        img: { data: storybookStrapiCoverMock },
      },
    ],
  },
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  slice: {
    title: 'Supported by strong partners',
    logos: [
      {
        id: 1,
        alt: 'Partner Logo 1',
        img: { data: storybookStrapiAvatarMock },
      },
      {
        id: 2,
        alt: 'Partner Logo 2',
        img: { data: storybookStrapiAvatarMock },
      },
      {
        id: 3,
        alt: 'Partner Logo 3',
        img: { data: storybookStrapiAvatarMock },
      },
      {
        id: 4,
        alt: 'Partner Logo 4',
        img: { data: storybookStrapiTreeIconMock },
      },
      {
        id: 5,
        alt: 'Partner Logo 5',
        img: { data: storybookStrapiCoverMock },
      },
    ],
  },
};
