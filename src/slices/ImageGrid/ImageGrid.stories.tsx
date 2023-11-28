import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import StrapiLinkWithIcon from '../../models/strapi/StrapiLinkWithIcon';
import ImageGrid from '.';

export default {
  title: 'slices/ImageGrid',
  component: ImageGrid,
} as Meta<typeof ImageGrid>;

const Template: StoryFn<typeof ImageGrid> = (args) => <ImageGrid {...args} />;

const link: StrapiLinkWithIcon = {
  id: 1,
  link: { id: 1, text: 'Link', url: 'https://tree.ly' },
  destination: 'linkedin',
};

const images = [
  {
    id: 1,
    title: 'Title 1',
    subTitle: 'Sub title 1',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    links: [link],
  },
  {
    id: 2,
    title: 'Title 2',
    subTitle: 'Sub title 2',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    links: [],
  },
  {
    id: 3,
    title: 'Title 3',
    subTitle: 'Sub title 3',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    links: [],
  },
  {
    id: 4,
    title: 'Title 4',
    subTitle: 'Sub title 4',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    links: [],
  },
];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    images,
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    images,
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    images,
  },
};
