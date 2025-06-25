import React, { useEffect, useState } from 'react';
import { DefaultSectionContainer, Flex, Wrapper } from 'boemly';
import StrapiLink from '../../models/strapi/StrapiLink';
import PortfolioProject from '../../models/PortfolioProject';
import SmallCheckout from '../../components/portfolio/SmallCheckout';
import ProjectInfo from '../../components/portfolio/ProjectInfo';
import DocumentsDownloadList from '../../components/portfolio/DocumentsDownloadList';
import Contact from '../../components/portfolio/Contact';
import StrapiImage from '../../models/strapi/StrapiImage';
import getFpmProjectById from '../../integrations/strapi/getFpmProjectById';

export interface ProjectFactsProps {
  project?: PortfolioProject;
  slice: {
    projectId: string;

    batchId?: string;
    currency?: 'EUR' | 'CHF';
    pricePerKg?: number;
    taxInPercent?: number;
    initialContributionValue?: number;
    checkoutText?: string;

    customTitle?: string;
    customSubtitle?: string;
    customButton?: StrapiLink;
    documentUrls?: StrapiLink[];

    areaSubtitle?: string;
    locationSubtitle?: string;
    startSubtitle?: string;
    timeSpanSubtitle?: string;
    projectTypeSubtitle?: string;
    projectDeveloperSubtitle?: string;
    verificationStandardSubtitle?: string;
    averageSellableAmountPerYearSubtitle?: string;
    riskBufferSubtitle?: string;
    buyCreditsSubtitle?: string;

    contactTitle?: string;
    contactText?: string;
    contactButton?: StrapiLink;
    contactAvatar?: StrapiImage;
  };
}

export const ProjectFacts: React.FC<ProjectFactsProps> = ({
  slice,
  project,
}: ProjectFactsProps) => {
  const [enhancedProject, setEnhancedProject] = useState<
    PortfolioProject | undefined
  >(project);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompleteProjectData = async () => {
      if (project && project.id) {
        setIsLoading(true);
        try {
          const completeFpmProject = await getFpmProjectById(project.id);

          // Merge the complete FPM data with existing project data (preserving Strapi fields like slug, portfolioHost, thumbnail)
          const mergedProject: PortfolioProject = {
            ...completeFpmProject,
            slug: project.slug,
            portfolioHost: project.portfolioHost,
            thumbnail: project.thumbnail,
          };

          setEnhancedProject(mergedProject);
        } catch (error) {
          console.error('Error fetching complete project data:', error);
          // Fallback to original project data if fetch fails
          setEnhancedProject(project);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCompleteProjectData();
  }, [project]);

  if (!enhancedProject) {
    return (
      <>Invalid configuration, check if a project this id exists in the FPM</>
    );
  }

  if (isLoading) {
    return (
      <DefaultSectionContainer>
        <Wrapper>
          <div>Loading project data...</div>
        </Wrapper>
      </DefaultSectionContainer>
    );
  }

  return (
    <DefaultSectionContainer>
      <Wrapper>
        <Flex flexDir={['column', null, null, 'row']} gap="4" width="full">
          <ProjectInfo project={enhancedProject} subtitles={slice} />
          <Flex flexDir="column" gap="4" width="full">
            {slice.documentUrls && slice.documentUrls.length > 0 && (
              <DocumentsDownloadList documentUrls={slice.documentUrls} />
            )}
            {slice.batchId &&
            slice.pricePerKg &&
            slice.currency &&
            slice.initialContributionValue ? (
              <SmallCheckout
                batchId={slice.batchId}
                checkoutText={slice.checkoutText}
                currency={slice.currency}
                initialContributionValue={slice.initialContributionValue}
                pricePerKg={slice.pricePerKg}
                title={slice.customTitle}
                subtitle={slice.customSubtitle}
                button={slice.customButton}
                taxInPercent={slice.taxInPercent}
              />
            ) : (
              (slice.contactTitle ||
                slice.contactText ||
                slice.contactButton ||
                slice.contactAvatar) && (
                <Contact
                  title={slice.contactTitle}
                  text={slice.contactText}
                  button={slice.contactButton}
                  avatar={slice.contactAvatar}
                />
              )
            )}
          </Flex>
        </Flex>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
