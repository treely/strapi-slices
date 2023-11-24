import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '@/test/storybookMocks/storybookStrapiMedia';
import SideBySideImages from '.';

export default {
  title: 'sections/SideBySideImages',
  component: SideBySideImages,
} as Meta<typeof SideBySideImages>;

const Template: StoryFn<typeof SideBySideImages> = (args) => (
  <SideBySideImages {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
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
    ],
  },
};
