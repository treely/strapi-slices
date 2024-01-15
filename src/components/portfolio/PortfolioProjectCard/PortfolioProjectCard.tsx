import React, { useContext } from 'react';
import { ProjectCard } from 'boemly';
import { PortfolioProject, strapiMediaUrl } from '../../..';
import CreditsAvailableState from '../../../models/CreditsAvailableState';
import { FORMAT_AS_HECTARE_CONFIG } from '../../../constants/formatter';
import Image from 'next/image';
import { IntlContext } from '../../ContextProvider';

export interface PortfolioProjectCardProps {
  project: PortfolioProject;
}

export const PortfolioProjectCard = ({
  project,
}: PortfolioProjectCardProps) => {
  const { formatMessage, formatNumber } = useContext(IntlContext);

  const creditsAvailableMessages: Record<CreditsAvailableState, string> = {
    [CreditsAvailableState.YES]: formatMessage({
      id: 'components.portfolioProjectCard.text.yes',
    }),

    [CreditsAvailableState.SOME]: formatMessage({
      id: 'components.portfolioProjectCard.text.some',
    }),

    [CreditsAvailableState.NO]: formatMessage({
      id: 'components.portfolioProjectCard.text.no',
    }),

    [CreditsAvailableState.NOT_YET]: formatMessage({
      id: 'components.portfolioProjectCard.text.notYet',
    }),
  };

  return (
    <ProjectCard
      title={project.title}
      facts={[
        {
          id: 1,
          text: formatNumber(
            (project.area || 0) / 10000,
            FORMAT_AS_HECTARE_CONFIG
          ),
        },
        { id: 2, text: project.location || '' },
      ]}
      footerTitle={
        creditsAvailableMessages[
          project.creditsAvailable ?? CreditsAvailableState.NOT_YET
        ]
      }
      footerSubTitle={project.footerSubTitle || ''}
      image={
        project.thumbnail && (
          <Image
            src={strapiMediaUrl(project.thumbnail?.img, 'medium')}
            alt={project.thumbnail?.alt}
            fill
            style={{
              objectFit: project.thumbnail?.objectFit || 'cover',
            }}
          />
        )
      }
    />
  );
};
