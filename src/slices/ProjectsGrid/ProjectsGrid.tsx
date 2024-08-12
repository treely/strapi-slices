import React from 'react';
import { Box, DefaultSectionContainer, SimpleGrid, Wrapper } from 'boemly';
import Link from 'next/link';
import { MEDIUM_TRANSITION_DURATION } from '../../constants/animations';
import PortfolioProject from '../../models/PortfolioProject';
import IStrapi from '../../models/strapi/IStrapi';
import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiProject from '../../models/strapi/StrapiProject';
import ProjectGridCard from '../../components/ProjectGridCard';

export interface ProjectsGridProps {
  slice: {
    projects: IStrapi<IStrapiData<StrapiProject>[]>;
  };
  projects: PortfolioProject[];
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}) => (condition ? wrapper(children) : children);

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  slice,
}: ProjectsGridProps) => {
  const filteredProjects = projects.filter(
    (fpmProject) =>
      fpmProject.thumbnail &&
      slice.projects.data.some(
        (strapiProject) =>
          strapiProject.attributes.fpmProjectId === fpmProject.id
      )
  );

  return (
    <DefaultSectionContainer>
      <Wrapper>
        <SimpleGrid columns={[1, null, null, 2, null, 3]} gap="16">
          {filteredProjects.map((project) => (
            <ConditionalWrapper
              key={project.id}
              condition={!!project.slug}
              wrapper={(children: JSX.Element) => (
                <Link
                  href={`${project.portfolioHost || ''}/portfolio/${
                    project.slug
                  }`}
                  passHref
                  key={project.id}
                  legacyBehavior
                >
                  {children}
                </Link>
              )}
            >
              <Box
                width="full"
                as="a"
                cursor="pointer"
                borderRadius="2xl"
                transition={`box-shadow ease ${MEDIUM_TRANSITION_DURATION}s`}
                _hover={{ boxShadow: 'lg' }}
              >
                <ProjectGridCard project={project} />
              </Box>
            </ConditionalWrapper>
          ))}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
