import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiAvatarMock } from '@/test/storybookMocks/storybookStrapiMedia';
import FullWidthHighlightQuote from '.';

export default {
  title: 'sections/FullWidthHighlightQuote',
  component: FullWidthHighlightQuote,
} as Meta<typeof FullWidthHighlightQuote>;

const Template: StoryFn<typeof FullWidthHighlightQuote> = (args) => (
  <FullWidthHighlightQuote {...args} />
);

const avatar = {
  id: 1,
  name: 'Avatar name',
  description: 'Avatar description',
  image: {
    id: 1,
    alt: 'Avatar image alt text',
    img: { data: storybookStrapiAvatarMock },
  },
};

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    quote: '"Quote"',
    avatarWithName: avatar,
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    quote: '"Quote"',
    avatarWithName: avatar,
  },
};
