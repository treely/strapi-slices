import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '@/test/storybookMocks/storybookStrapiMedia';
import Locale from '@/models/Locale';
import ProjectsGrid from '.';

export default {
  title: 'sections/ProjectsGrid',
  component: ProjectsGrid,
} as Meta<typeof ProjectsGrid>;

const Template: StoryFn<typeof ProjectsGrid> = (args) => (
  <ProjectsGrid {...args} />
);

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
  ],
  footerTitle: 'Footer title',
  footerSubTitle: 'Footer sub title',
  project: {
    data: {
      id: 1,
      attributes: {
        slug: 'slug',
        metadata: null,
        slices: [],
        locale: 'en' as Locale,
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z',
        localizations: [],
        portfolio: { data: undefined },
      },
    },
  },
};

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    projects: [
      {
        ...card,
        project: {
          data: {
            ...card.project.data,
            attributes: { ...card.project.data.attributes, slug: 'slug-1' },
          },
        },
      },
      {
        ...card,
        id: 2,
        project: {
          data: {
            ...card.project.data,
            attributes: { ...card.project.data.attributes, slug: 'slug-2' },
          },
        },
      },
    ],
  },
};
