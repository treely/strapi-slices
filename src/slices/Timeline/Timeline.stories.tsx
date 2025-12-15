import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';
import {
  storybookStrapiAvatarMock,
  storybookStrapiCoverMock,
  storybookStrapiTreeIconMock,
} from '../../test/storybookMocks/storybookStrapiMedia';
import Timeline from '.';
import { TimelineItem } from './Timeline';
import { StrapiImage } from '../..';

export default {
  title: 'slices/Timeline',
  component: Timeline,
} as Meta<typeof Timeline>;

const Template: StoryFn<typeof Timeline> = (args) => <Timeline {...args} />;

const timelineItem: TimelineItem = {
  id: 1,
  tagline: '08 Jan 2024',
  title: 'Title',
  text: 'After a site visit in the summer of 2022, the project has now been successfully audited by TÜV Nord Cert according to ISO 14064-2, making it the second certified forest adaption climate protection project in the world.',
  backgroundShapes: false,
};
const button = {
  id: 1,
  text: 'Button',
  url: 'https://tree.ly',
};
const badge: { text: string; variant: 'orange' | 'green' | 'red' | 'gray' } = {
  text: 'Badge',
  variant: 'green',
};
const image = { id: 71, alt: 'Alt', img: { data: storybookStrapiCoverMock } };
const icon = {
  id: 1,
  alt: 'Icon alt text',
  img: { data: storybookStrapiTreeIconMock },
};
const logo: StrapiImage = {
  id: 2,
  alt: 'Avatar image alt text',
  img: { data: storybookStrapiAvatarMock },
  objectFit: 'contain',
};

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    timelineItems: [
      timelineItem,
      timelineItem,
      timelineItem,
      timelineItem,
      timelineItem,
    ],
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Tree.ly connects forest owners with companies, helping forest owners earn extra income by managing forests for climate resilience. Companies can purchase high-quality CO₂ credits, backing forest owners and showing their commitment to measurable climate protection.',
    timelineItems: [
      timelineItem,
      timelineItem,
      timelineItem,
      timelineItem,
      timelineItem,
    ],
  },
};

export const WithBackgroundShapes = Template.bind({});
WithBackgroundShapes.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    timelineItems: [
      { ...timelineItem, backgroundShapes: true },
      { ...timelineItem, backgroundShapes: true },
      { ...timelineItem, backgroundShapes: true },
      { ...timelineItem, backgroundShapes: true },
      { ...timelineItem, backgroundShapes: true },
    ],
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    timelineItems: [
      {
        ...timelineItem,
        button,
      },
      {
        ...timelineItem,
        button,
      },
      {
        ...timelineItem,
        button,
      },
      {
        ...timelineItem,
        button,
      },
      {
        ...timelineItem,
        button,
      },
    ],
  },
};

export const WithBadgeOrLogo = Template.bind({});
WithBadgeOrLogo.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    timelineItems: [
      { ...timelineItem, badge },
      {
        ...timelineItem,
        logo,
      },
      { ...timelineItem, logo, badge },
      { ...timelineItem, badge },
      { ...timelineItem, badge },
    ],
  },
};

export const WithImage = Template.bind({});
WithImage.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    timelineItems: [
      {
        ...timelineItem,
        image,
      },
      {
        ...timelineItem,
        image,
      },
      {
        ...timelineItem,
        image,
      },
      {
        ...timelineItem,
        image,
      },
      {
        ...timelineItem,
        image,
      },
    ],
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    timelineItems: [
      {
        ...timelineItem,
        icon,
      },
      {
        ...timelineItem,
        icon,
      },
      {
        ...timelineItem,
        icon,
      },
      {
        ...timelineItem,
        icon,
      },
    ],
  },
};
