import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import ProjectsGrid from '.';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';

export default {
  title: 'slices/ProjectsGrid',
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
  footerTitle: 'Footer title',
  footerSubTitle: 'Footer sub title',
  project: { data: strapiProjectMock },
};

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    projects: [
      {
        ...card,
      },
      {
        ...card,
        id: 2,
      },
    ],
  },
  projects: [{ ...fpmProjectMock, slug: 'slug' }],
};
