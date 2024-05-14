import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  storybookStrapiAvatarMock,
  storybookStrapiCoverMock,
} from '../../test/storybookMocks/storybookStrapiMedia';
import StrapiBlogPost from '../../models/strapi/StrapiBlogPost';
import IStrapiData from '../../models/strapi/IStrapiData';
import BlogCards from '.';
import { IStrapi, StrapiCategory } from '../..';

export default {
  title: 'slices/BlogCards',
  component: BlogCards,
} as Meta<typeof BlogCards>;

const Template: StoryFn<typeof BlogCards> = (args) => <BlogCards {...args} />;
const blogPostCategory: IStrapi<IStrapiData<StrapiCategory>> = {
  data: {
    id: 1,
    attributes: {
      name: 'Business',
      locale: 'en',
      createdAt: '2022-01-10T14:59:44.830Z',
      updatedAt: '2022-01-10T14:59:44.839Z',
    },
  },
};
const blogPost: IStrapiData<StrapiBlogPost> = {
  id: 1,
  attributes: {
    title: 'Title',
    slug: 'slug',
    teaser:
      'A collection of helpful tips to guide anyone who’s just getting started with learning about accessibility and accessible design.',

    author: {
      data: {
        id: 1,
        attributes: {
          name: 'Lukas Bals',
          locale: 'en',
          createdAt: '2022-01-10T15:36:45.012Z',
          updatedAt: '2022-01-10T15:36:45.042Z',
          img: {
            id: 72,
            alt: 'Lukas Bals',
            img: {
              data: storybookStrapiAvatarMock,
            },
          },
        },
      },
    },
    category: blogPostCategory,
    locale: 'en',
    createdAt: '2022-01-10T15:04:32.897Z',
    updatedAt: '2022-01-11T10:21:42.317Z',
    metadata: null,
    img: {
      id: 71,
      alt: 'Alt',
      img: {
        data: storybookStrapiCoverMock,
      },
    },
    slices: [
      {
        __component: 'sections.rich-text',
        id: 6,
        content: '# This is my rich text!',
      },
    ],
    localizations: [
      {
        id: 2,
        locale: 'de',
      },
    ],
  },
};

export const White = Template.bind({});
White.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    variant: 'white',
    blogPostCategory,
  },
  blogPosts: [
    blogPost,
    {
      ...blogPost,
      id: 2,
      attributes: { ...blogPost.attributes, title: 'Title 2' },
    },
    {
      ...blogPost,
      id: 3,
      attributes: { ...blogPost.attributes, title: 'Title 3' },
    },
  ],
};

export const Gray = Template.bind({});
Gray.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    variant: 'gray',
    blogPostCategory,
  },
  blogPosts: [
    blogPost,
    {
      ...blogPost,
      id: 2,
      attributes: { ...blogPost.attributes, title: 'Title 2' },
    },
    {
      ...blogPost,
      id: 3,
      attributes: { ...blogPost.attributes, title: 'Title 3' },
    },
  ],
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    variant: 'white',
    blogPostCategory,
    button: { id: 1, url: 'url', text: 'Button' },
  },
  blogPosts: [
    blogPost,
    {
      ...blogPost,
      id: 2,
      attributes: { ...blogPost.attributes, title: 'Title 2' },
    },
    {
      ...blogPost,
      id: 3,
      attributes: { ...blogPost.attributes, title: 'Title 3' },
    },
  ],
};
