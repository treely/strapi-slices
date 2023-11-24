import {
  Box,
  DefaultSectionContainer,
  ProjectCard,
  SimpleGrid,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import Link from 'next/link';
import { MEDIUM_TRANSITION_DURATION } from '@/constants/animations';
import strapiMediaUrl from '@/utils/strapiMediaUrl';
import StrapiProjectCard from '@/models/strapi/StrapiProjectCard';

export interface ProjectsGridProps {
  slice: {
    projects: StrapiProjectCard[];
  };
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
  slice,
}: ProjectsGridProps) => (
  <DefaultSectionContainer>
    <Wrapper>
      <SimpleGrid columns={[1, null, null, 2, null, 3]} gap="16">
        {slice.projects.map((card) => (
          <ConditionalWrapper
            key={card.id}
            condition={!!card.project?.data}
            wrapper={(children: JSX.Element) => (
              <Link
                href={`/portfolio/${card.project?.data?.attributes.slug}`}
                passHref
                key={card.id}
                legacyBehavior
              >
                {children}
              </Link>
            )}
          >
            <Box
              as="a"
              cursor="pointer"
              borderRadius="2xl"
              width="fit-content"
              height="fit-content"
              transition={`box-shadow ease ${MEDIUM_TRANSITION_DURATION}s`}
              _hover={{ boxShadow: 'lg' }}
            >
              <ProjectCard
                title={card.title}
                facts={card.facts}
                footerTitle={card.footerTitle}
                footerSubTitle={card.footerSubTitle}
                image={
                  <Image
                    src={strapiMediaUrl(card.image.img, 'medium')}
                    alt={card.image.alt}
                    fill
                    style={{ objectFit: card.image.objectFit || 'cover' }}
                  />
                }
              />
            </Box>
          </ConditionalWrapper>
        ))}
      </SimpleGrid>
    </Wrapper>
  </DefaultSectionContainer>
);
