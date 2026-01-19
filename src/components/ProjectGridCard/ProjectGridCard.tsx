import { BoemlyTag, Box, Container, Flex, Heading, Text } from 'boemly';
import React, { useContext } from 'react';
import Image from 'next/image';
import PortfolioProject from '../../models/PortfolioProject';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import { FORMAT_AS_HECTARE_CONFIG } from '../../constants/formatter';
import CreditsAvailableBadge from '../../components/CreditsAvailableBadge';
import CertificationBadge from '../../components/CertificationBadge';
import { IntlContext } from '../ContextProvider';

export interface ProjectGridCardProps {
  project: PortfolioProject;
}

export const ProjectGridCard = ({
  project,
}: ProjectGridCardProps): React.JSX.Element => {
  const { formatNumber } = useContext(IntlContext);

  return (
    <Container height="full">
      <Flex flexDir="column" height="full">
        {project.thumbnail && (
          <Box borderRadius="xl" position="relative" height="36" mb="2">
            <Image
              src={strapiMediaUrl(project.thumbnail?.img, 'medium')}
              alt={project.thumbnail?.alt}
              fill
              style={{
                objectFit: project.thumbnail?.objectFit || 'cover',
                borderRadius: 'var(--boemly-radii-xl)',
              }}
            />
          </Box>
        )}
        <Heading my="4" size="lg">
          {project.friendlyName || project.title}
        </Heading>
        <Flex flexDir="row" gap="2" flexWrap="wrap">
          <BoemlyTag backgroundColor="gray.100">
            <Text size="xsLowBold" color="gray.800">
              {formatNumber(
                (project.area || 0) / 10000,
                FORMAT_AS_HECTARE_CONFIG
              )}
            </Text>
          </BoemlyTag>
          <BoemlyTag backgroundColor="gray.100">
            <Text size="xsLowBold" color="gray.800">
              {project.location}
            </Text>
          </BoemlyTag>
          <CertificationBadge certificationDate={project.certificationDate} />
          <CreditsAvailableBadge status={project.creditAvailability} />
        </Flex>
      </Flex>
    </Container>
  );
};
