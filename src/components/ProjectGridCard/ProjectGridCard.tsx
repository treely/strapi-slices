import { Box, Container, Flex, Heading, Tag, Text } from 'boemly';
import React, { useContext } from 'react';
import Image from 'next/image';
import PortfolioProject from '../../models/PortfolioProject';
import { strapiMediaUrl } from '../..';
import { FORMAT_AS_HECTARE_CONFIG } from '../../constants/formatter';
import CreditsAvailableBadge from '../../components/CreditsAvailableBadge';
import { IntlContext } from '../ContextProvider';

export interface ProjectGridCardProps {
  project: PortfolioProject;
}

export const ProjectGridCard = ({
  project,
}: ProjectGridCardProps): JSX.Element => {
  const { formatNumber, formatMessage } = useContext(IntlContext);

  return (
    <Container>
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
          {project.title}
        </Heading>
        <Flex flexDir="row" gap="2" flexWrap="wrap">
          <Tag>
            <Text size="xsLowBold" color="gray.800">
              {formatNumber(
                (project.area || 0) / 10000,
                FORMAT_AS_HECTARE_CONFIG
              )}
            </Text>
          </Tag>
          <Tag>
            <Text size="xsLowBold" color="gray.800">
              {project.location}
            </Text>
          </Tag>
          {project.certificationDate ? (
            <Tag>
              <Text size="xsLowBold" color="gray.800">
                {formatMessage(
                  { id: 'components.projectGridCard.certified' },
                  { year: new Date(project.certificationDate).getFullYear() }
                )}
              </Text>
            </Tag>
          ) : (
            <Tag>
              <Text size="xsLowBold" color="gray.800">
                {formatMessage({
                  id: 'components.projectGridCard.certificationInProgress',
                })}
              </Text>
            </Tag>
          )}
          <CreditsAvailableBadge status={project.creditAvailability} />
        </Flex>
      </Flex>
    </Container>
  );
};
