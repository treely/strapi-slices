import React, { useContext } from 'react';
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  LabelTextPair,
  SimpleGrid,
  Spacer,
  Tooltip,
} from 'boemly';
import Image from 'next/image';
import convertAreaM2ToHa from '../../../utils/convertAreaM2ToHa';
import convertCo2AmountKgToTons from '../../../utils/convertCo2AmountKgToTons';
import CreditsAvailableBadge from '../../../components/CreditsAvailableBadge';
import PortfolioProject from '../../../models/PortfolioProject';
import {
  FORMAT_AS_HECTARE_CONFIG,
  FORMAT_AS_PERCENT_CONFIG,
} from '../../../constants/formatter';
import getTimeSpanInYears from '../../../utils/getTimeSpanInYears';
import { IntlContext } from '../../ContextProvider';

export interface ProjectInfoProps {
  project: PortfolioProject;
  subtitles: {
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
  };
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  project,
  subtitles,
}: ProjectInfoProps) => {
  const { formatMessage, formatNumber, formatDate } = useContext(IntlContext);

  return (
    <Container p="2" width="full">
      <Heading size="xl" textAlign="left">
        {formatMessage({ id: 'features.projectInfo.projectInfo.value' })}
      </Heading>

      <Spacer height="8" />

      <SimpleGrid
        columns={[1, null, null, 2]}
        gap="8"
        spacingX="10"
        spacingY="8"
      >
        {project.area && (
          <Box>
            <LabelTextPair
              label={formatMessage({
                id: 'features.projectInfo.properties.area',
              })}
              text={formatNumber(
                convertAreaM2ToHa(project.area.toString()),
                FORMAT_AS_HECTARE_CONFIG
              )}
              caption={subtitles.areaSubtitle}
            />
          </Box>
        )}

        {project.location && (
          <Box>
            <LabelTextPair
              label={formatMessage({
                id: 'features.projectInfo.properties.location',
              })}
              text={project.location}
              caption={subtitles.locationSubtitle}
            />
          </Box>
        )}

        {project.start && (
          <Box>
            <LabelTextPair
              label={formatMessage({
                id: 'features.projectInfo.properties.start',
              })}
              text={formatDate(project.start, {
                year: 'numeric',
                month: 'long',
              })}
              caption={subtitles.startSubtitle}
            />
          </Box>
        )}

        {project.start && project.end && (
          <Box>
            <LabelTextPair
              label={formatMessage({
                id: 'features.projectInfo.properties.timeSpan',
              })}
              text={formatMessage(
                {
                  id: 'features.projectInfo.properties.year',
                },
                {
                  years: getTimeSpanInYears(
                    new Date(project.start),
                    new Date(project.end)
                  ),
                }
              )}
              caption={subtitles.timeSpanSubtitle}
            />
          </Box>
        )}
      </SimpleGrid>

      {project.projectType ||
      project.projectDeveloper ||
      project.verificationStandard ? (
        <>
          <Spacer height="6" />
          <Divider />
          <Spacer height="6" />
        </>
      ) : (
        <></>
      )}
      <SimpleGrid columns={[1, null, null, 2]} spacingX="10" spacingY="8">
        {project.projectType && (
          <Box>
            <LabelTextPair
              label={formatMessage({
                id: 'features.projectInfo.properties.projectType',
              })}
              text={project.projectType.title}
              caption={subtitles.projectTypeSubtitle}
            />
          </Box>
        )}
        {project.projectDeveloper && (
          <Box>
            <LabelTextPair
              label={formatMessage({
                id: 'features.projectInfo.properties.projectDeveloper',
              })}
              text={project.projectDeveloper.name}
              caption={subtitles.projectDeveloperSubtitle}
            />
          </Box>
        )}
      </SimpleGrid>

      {project.verificationStandard ? (
        <>
          {project.projectType || project.projectDeveloper ? (
            <Spacer height="6" />
          ) : (
            <></>
          )}
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <LabelTextPair
                label={formatMessage({
                  id: 'features.projectInfo.properties.verificationStandard.label',
                })}
                text={formatMessage({
                  id: `features.projectInfo.properties.verificationStandard.value.${project.verificationStandard.id}`,
                  defaultMessage: project.verificationStandard.id,
                })}
                caption={subtitles.verificationStandardSubtitle}
              />
            </Box>

            {project.defaultIssuer && (
              <Box position="relative" width="14" height="8">
                <Image
                  src={project.defaultIssuer.logoUrl}
                  alt={`${project.defaultIssuer.name} logo`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            )}
          </Flex>
        </>
      ) : (
        <></>
      )}

      {(project.averageSellableAmountPerYear &&
        project.averageSellableAmountPerYear > 0) ||
      project.riskBuffer ? (
        <>
          <Spacer height="8" />
          <Divider />
          <Spacer height="8" />
        </>
      ) : (
        <></>
      )}
      <SimpleGrid columns={[1, null, null, 2]} spacingX="10" spacingY="8">
        {project.averageSellableAmountPerYear > 0 ? (
          <Tooltip
            label={formatMessage({
              id: 'features.projectInfo.properties.projectVolume.toolTip',
            })}
          >
            <Box>
              <LabelTextPair
                label={formatMessage({
                  id: 'features.projectInfo.properties.projectVolume.label',
                })}
                text={formatMessage(
                  {
                    id: 'unit.formatter.tonsCo2PerYear',
                  },
                  {
                    number: formatNumber(
                      convertCo2AmountKgToTons(
                        project.averageSellableAmountPerYear.toString()
                      ),
                      { maximumFractionDigits: 0 }
                    ),
                  }
                )}
                caption={subtitles.averageSellableAmountPerYearSubtitle}
              />
            </Box>
          </Tooltip>
        ) : (
          <Box>
            <CreditsAvailableBadge status={project.creditAvailability} />
          </Box>
        )}

        {project.riskBuffer && (
          <Box>
            <LabelTextPair
              label={formatMessage({
                id: 'features.projectInfo.properties.riskBuffer',
              })}
              text={formatNumber(
                project.riskBuffer / 100,
                FORMAT_AS_PERCENT_CONFIG
              )}
              caption={subtitles.riskBufferSubtitle}
            />
          </Box>
        )}
      </SimpleGrid>

      {project.averageSellableAmountPerYear > 0 ? (
        <Box mt="2">
          <CreditsAvailableBadge status={project.creditAvailability} />
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};
