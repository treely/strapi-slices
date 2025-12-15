import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';

import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import FullWidthImageSlider from '.';

export default {
  title: 'slices/FullWidthImageSlider',
  component: FullWidthImageSlider,
} as Meta<typeof FullWidthImageSlider>;

const Template: StoryFn<typeof FullWidthImageSlider> = (args) => (
  <FullWidthImageSlider {...args} />
);

export const Default = Template.bind({});
Default.args = {
  slice: {
    images: [
      {
        id: 1,
        caption: 'Caption 1',
        img: {
          id: 1,
          alt: 'Alt text 1',
          img: { data: storybookStrapiCoverMock },
        },
      },
      {
        id: 2,
        caption: 'Caption 2',
        img: {
          id: 2,
          alt: 'Alt text 2',
          img: { data: storybookStrapiCoverMock },
        },
      },
      {
        id: 3,
        caption: 'Caption 3',
        img: {
          id: 3,
          alt: 'Alt text 3',
          img: { data: storybookStrapiCoverMock },
        },
      },
      {
        id: 4,
        caption: 'Caption 4',
        img: {
          id: 4,
          alt: 'Alt text 4',
          img: { data: storybookStrapiCoverMock },
        },
      },
      {
        id: 5,
        caption: 'Caption 5',
        img: {
          id: 5,
          alt: 'Alt text 5',
          img: { data: storybookStrapiCoverMock },
        },
      },
      {
        id: 6,
        caption: 'Caption 6',
        img: {
          id: 6,
          alt: 'Alt text 6',
          img: { data: storybookStrapiCoverMock },
        },
      },
    ],
  },
};
