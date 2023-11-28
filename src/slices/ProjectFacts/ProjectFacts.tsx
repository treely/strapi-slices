import React from 'react';
import { DefaultSectionContainer, Flex, Wrapper } from 'boemly';
import StrapiLink from '../../models/strapi/StrapiLink';
import PortfolioProject from '../../models/PortfolioProject';
import SmallCheckout from '../../components/portfolio/SmallCheckout';
import ProjectInfo from '../../components/portfolio/ProjectInfo';
import DocumentsDownloadList from '../../components/portfolio/DocumentsDownloadList';
import Contact from '../../components/portfolio/Contact';
import StrapiImage from '../../models/strapi/StrapiImage';

export interface ProjectFactsProps {
  project?: PortfolioProject;
  slice: {
    projectId: string;

    batchId?: string;
    currency?: 'EUR' | 'CHF';
    pricePerKg?: number;
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
    forecastedAmountSubtitle?: string;
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
  if (!project) {
    return (
      <>Invalid configuration, check if a project this id exists in the FPM</>
    );
  }

  return (
    <DefaultSectionContainer>
      <Wrapper>
        <Flex flexDir={['column', null, null, 'row']} gap="4" width="full">
          <ProjectInfo project={project} subtitles={slice} />
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
