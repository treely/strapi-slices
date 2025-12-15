import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';

import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import TextWithCard from '.';
import { IStrapiData, PortfolioProject, StrapiProject } from '../..';
import { CreditAvailability } from '../../models/fpm/FPMProject';

export default {
  title: 'slices/TextWithCard',
  component: TextWithCard,
} as Meta<typeof TextWithCard>;

const Template: StoryFn<typeof TextWithCard> = (args) => (
  <TextWithCard {...args} />
);

const listItems = [
  { id: 1, text: 'List item 1' },
  { id: 2, text: 'List item 2' },
  { id: 3, text: 'List item 3' },
];
const button = { id: 1, text: 'Button', url: 'https://tree.ly' };
const card = {
  id: 1,
  image: {
    id: 1,
    alt: 'Image alt text',
    img: { data: storybookStrapiCoverMock },
  },
  title: 'Card title',
  facts: [
    { id: 1, text: 'Fact 1' },
    { id: 2, text: 'Fact 2' },
    { id: 3, text: 'Fact 3' },
    { id: 4, text: 'Fact 4' },
  ],
  footerTitle: 'Footer title',
  footerSubTitle: 'Footer sub title',
};
const portfolioProject: PortfolioProject = {
  id: '1',
  title: 'Project 1',
  geom: {
    type: 'Point',
    coordinates: [10.036542145100883, 47.42636837845707],
  },
  area: 2000000,
  location: 'Austria',
  countryCode: 'AT',
  start: new Date('2020-01-01'),
  end: new Date('2050-12-31'),
  projectType: {
    title: 'Project Type 1',
    id: '1',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  projectDeveloper: {
    name: 'Project Developer 1',
    id: '1',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  verificationStandard: {
    id: 'SilvaconsultFCSISO14',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  forecastedAmountYearly: 100,
  averageSellableAmountPerYear: 80,
  riskBuffer: 10,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
  creditAvailability: CreditAvailability.CREDITS_AVAILABLE,
  slug: 'portfolio-slug',
  thumbnail: {
    img: { data: storybookStrapiCoverMock },
    alt: 'Project Thumbnail',
    id: 1,
  },
};
const project: IStrapiData<StrapiProject> = {
  id: 1,
  attributes: {
    slug: 'slug',
    locale: 'en',
    fpmProjectId: portfolioProject.id,
    footerSubTitle: 'Certified, 2023',
    createdAt: '2022-01-10T15:04:32.897Z',
    updatedAt: '2022-01-11T10:21:42.317Z',
    metadata: null,
    slices: [
      {
        __component: 'sections.rich-text',
        id: 6,
        content: '# This is my rich text!',
      },
    ],
    portfolio: {
      data: {
        id: 1,
        attributes: {
          name: 'my-portfolio',
          title: 'My Portfolio',
          locale: 'en',
          createdAt: '2022-01-10T15:04:32.897Z',
          updatedAt: '2022-01-11T10:21:42.317Z',
          slices: [
            {
              __component: 'sections.rich-text',
              id: 6,
              content: '# This is my rich text!',
            },
          ],
        },
      },
    },
    thumbnail: {
      img: { data: storybookStrapiCoverMock },
      alt: 'Project Thumbnail',
      id: 1,
    },
    localizations: [
      {
        id: 2,
        locale: 'de',
      },
    ],
  },
};

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    cardPosition: 'left',
  },
  projects: [],
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    cardPosition: 'left',
  },
  projects: [],
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cardPosition: 'left',
  },
  projects: [],
};

export const WithList = Template.bind({});
WithList.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    listItems,
    cardPosition: 'left',
  },
  projects: [],
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    listItems,
    button,
    cardPosition: 'left',
  },
  projects: [],
};

export const WithCard = Template.bind({});
WithCard.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    listItems,
    button,
    card,
    cardPosition: 'left',
  },
  projects: [],
};

export const WithCardOnRight = Template.bind({});
WithCardOnRight.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    listItems,
    button,
    card,
    cardPosition: 'right',
  },
  projects: [],
};

export const WithProjects = Template.bind({});
WithProjects.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cardPosition: 'left',
    project: { data: project },
  },
  projects: [portfolioProject],
};
