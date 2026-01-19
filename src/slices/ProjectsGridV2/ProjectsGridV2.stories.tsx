import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';

import ProjectsGridV2 from '.';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import portfolioProjectMock from '../../test/integrationMocks/portfolioProjectMock';
import { CreditAvailability } from '../../models/fpm/FPMProject';

export default {
  title: 'slices/ProjectsGridV2',
  component: ProjectsGridV2,
} as Meta<typeof ProjectsGridV2>;

const Template: StoryFn<typeof ProjectsGridV2> = (args) => (
  <ProjectsGridV2 {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  projects: [portfolioProjectMock],
  slice: {
    projects: { data: [strapiProjectMock] },
  },
};

export const WithoutCertificationDate = Template.bind({});
WithoutCertificationDate.args = {
  projects: [{ ...portfolioProjectMock, certificationDate: undefined }],
  slice: {
    projects: { data: [strapiProjectMock] },
  },
};

export const WithCreditsAvailabilityVariants = Template.bind({});
WithCreditsAvailabilityVariants.args = {
  projects: [
    portfolioProjectMock,
    {
      ...portfolioProjectMock,
      title: 'Project 2',
      creditAvailability: CreditAvailability.SOME_CREDITS_AVAILABLE,
    },
    {
      ...portfolioProjectMock,
      title: 'Project 3',
      creditAvailability: CreditAvailability.SOON_CREDITS_AVAILABLE,
    },
    {
      ...portfolioProjectMock,
      title: 'Project 4',
      creditAvailability: CreditAvailability.NO_CREDITS_AVAILABLE,
    },
    {
      ...portfolioProjectMock,
      title: 'Project 5',
      creditAvailability: CreditAvailability.CREDITS_AVAILABLE,
    },
    {
      ...portfolioProjectMock,
      title: 'Project 6',
      creditAvailability: CreditAvailability.CREDITS_AVAILABLE,
    },
  ],
  slice: {
    projects: { data: [strapiProjectMock] },
  },
};
