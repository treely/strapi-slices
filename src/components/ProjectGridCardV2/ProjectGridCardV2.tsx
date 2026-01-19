import { BoemlyTag, Box, Flex, Heading, Text } from 'boemly';
import React, { useContext } from 'react';
import Image from 'next/image';
import { MapPinIcon, ArrowsOutIcon } from '@phosphor-icons/react';
import PortfolioProject from '../../models/PortfolioProject';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import { FORMAT_AS_HECTARE_CONFIG } from '../../constants/formatter';
import { IntlContext } from '../ContextProvider';
import CreditsAvailableBadge from '../CreditsAvailableBadge';
import CertificationBadge from '../CertificationBadge';
import getCountryFlag from '../../utils/getCountryFlag';

export interface ProjectGridCardV2Props {
  project: PortfolioProject;
}

export const ProjectGridCardV2 = ({
  project,
}: ProjectGridCardV2Props): React.JSX.Element => {
  const { formatNumber } = useContext(IntlContext);

  return (
    <Box height="full" borderRadius="lg" boxShadow="sm" overflow="hidden">
      <Flex flexDir="column" height="full">
        {/* Image Section with Overlaid Tags */}
        <Box position="relative" height="56">
          {project.thumbnail && (
            <Image
              src={strapiMediaUrl(project.thumbnail?.img, 'medium')}
              alt={project.thumbnail?.alt}
              fill
              style={{
                objectFit: project.thumbnail?.objectFit || 'cover',
              }}
            />
          )}

          {/* Project Type Badge - Top Left */}
          {project.projectType?.title && (
            <Box position="absolute" top="4" left="4">
              <BoemlyTag backgroundColor="gray.900" borderRadius="full">
                <Text size="smRegularNormalBold" color="white">
                  {project.projectType.title}
                </Text>
              </BoemlyTag>
            </Box>
          )}

          {/* Status Tags - Bottom Right */}
          <Flex
            position="absolute"
            bottom="4"
            right="4"
            flexDir="column"
            gap="2"
            alignItems="flex-end"
          >
            <CertificationBadge
              certificationDate={project.certificationDate}
              variant="withIcon"
            />
            <CreditsAvailableBadge
              variant="withIcon"
              status={project.creditAvailability}
            />
          </Flex>
        </Box>

        {/* Content Section */}
        <Box padding="6" backgroundColor="white">
          <Heading size="2xl" color="primary.700" mb="2">
            {project.friendlyName || project.title}
          </Heading>

          <Flex flexDir="column" gap="2">
            {/* Location */}
            <Flex alignItems="center" gap="3">
              <MapPinIcon size={20} color="var(--boemly-colors-gray-400)" />
              <Text fontSize="lg" color="gray.500">
                {project.location} {getCountryFlag(project.countryCode)}
              </Text>
            </Flex>

            {/* Area */}
            <Flex alignItems="center" gap="3">
              <ArrowsOutIcon size={20} color="var(--boemly-colors-gray-400)" />
              <Text fontSize="lg" color="gray.500">
                {formatNumber(
                  (project.area || 0) / 10000,
                  FORMAT_AS_HECTARE_CONFIG
                )}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
