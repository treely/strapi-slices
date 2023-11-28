import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import Cta from '.';
import { CtaCard } from './Cta';

export default {
  title: 'slices/Cta',
  component: Cta,
} as Meta<typeof Cta>;

const Template: StoryFn<typeof Cta> = (args) => <Cta {...args} />;

const ctaCard: CtaCard = {
  id: 1,
  tagline: 'Tagline',
  title: 'Title',
  subTitle: 'Subtitle',
  image: { id: 71, alt: 'Alt', img: { data: storybookStrapiCoverMock } },
  buttons: [
    {
      button: {
        id: 1,
        text: 'Button',
        url: 'https://tree.ly',
      },
      variant: 'solid',
    },
    {
      button: {
        id: 2,
        text: 'Button',
        url: 'https://tree.ly',
      },
      variant: 'outline',
    },
  ],
  variant: 'gray',
  backgroundShape: true,
  textAlign: 'left',
};

export const Left = Template.bind({});
Left.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Subtitle',
    variant: 'white',
    ctaCards: [ctaCard],
  },
};

export const Right = Template.bind({});
Right.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Subtitle',
    variant: 'white',
    ctaCards: [
      {
        ...ctaCard,
        textAlign: 'right',
      },
    ],
  },
};

export const RightWithoutShapes = Template.bind({});
RightWithoutShapes.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Subtitle',
    variant: 'white',
    ctaCards: [{ ...ctaCard, backgroundShape: false, textAlign: 'right' }],
  },
};

export const CenterWithGreenBackground = Template.bind({});
CenterWithGreenBackground.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Subtitle',
    variant: 'green',
    ctaCards: [
      {
        ...ctaCard,
        variant: 'gray',
        textAlign: 'center',
        image: undefined,
      },
    ],
  },
};

export const CenterGreen = Template.bind({});
CenterGreen.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Subtitle',
    variant: 'gray',
    ctaCards: [
      {
        ...ctaCard,
        textAlign: 'center',
        variant: 'green',
        image: undefined,
      },
    ],
  },
};

export const CenterWhite = Template.bind({});
CenterWhite.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Subtitle',
    variant: 'gray',
    ctaCards: [
      {
        ...ctaCard,
        textAlign: 'center',
        variant: 'white',
        image: undefined,
      },
    ],
  },
};

export const CenterWithImage = Template.bind({});
CenterWithImage.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Subtitle',
    variant: 'gray',
    ctaCards: [
      {
        ...ctaCard,
        variant: 'white',
        textAlign: 'center',
      },
    ],
  },
};
