import React from 'react';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Heading,
  Text,
  Wrapper,
} from 'boemly';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiLink from '../../models/strapi/StrapiLink';
import ProjectsMap from '../ProjectsMap';
import { FACTS_COLOR_VARIANTS } from '../Facts/Facts';

export interface FactsWithProjectsMapProps {
  slice: {
    // Facts props
    tagline?: string;
    title?: string;
    subTitle?: string;
    button?: StrapiLink;
    variant: 'gray' | 'green' | 'white';
    facts: { key: string; value: string }[];
    alignFacts?: 'left' | 'center' | 'right';
    
    // Map props
    defaultCenterCoordinates?: { latitude: number; longitude: number };
    defaultZoomLevel?: number;
    minZoomLevel?: number;
    disableUserLocationZoom?: boolean;
  };
}

export const FactsWithProjectsMap: React.FC<FactsWithProjectsMapProps> = ({
  slice,
}: FactsWithProjectsMapProps) => {
  const colorVariant = FACTS_COLOR_VARIANTS[slice.variant] || FACTS_COLOR_VARIANTS.green;
  const alignFacts = slice.alignFacts || 'center';
  
  return (
    <DefaultSectionContainer
      backgroundColor={colorVariant.backgroundColor}
      title={slice.title}
      paddingY="8"
    >
      <Wrapper>
        {slice.title && (
          <DefaultSectionHeader
            tagline={slice.tagline}
            text={slice.subTitle}
            title={slice.title}
            taglineProps={{
              color: colorVariant.tagLineColor,
              textAlign: 'center',
            }}
            titleProps={{
              color: colorVariant.titleColor,
              textAlign: 'center',
              maxW: '6xl',
              marginX: 'auto',
            }}
            textProps={{
              color: colorVariant.subTitleColor,
              textAlign: 'center',
              maxW: '3xl',
              marginX: 'auto',
            }}
          />
        )}

        <Flex
          flexDir={['column', null, null, 'row']}
          alignItems="center"
          padding="8"
          gap="8"
        >
          {/* Facts Section */}
          <Flex
            flexDir={['column', 'column', 'row', 'column']}
            flex="1"
            flexShrink="1"
            gap="6"
            mb={['8', '8', '8', '0']}
            w={['100%', '100%', '100%', 'auto']}
            justifyContent={['flex-start', 'center', 'center', 'flex-start']}
          >
            {slice.facts.map((fact) => (
              <Flex key={fact.key} flexDir="column" textAlign={['center', 'center', 'center', alignFacts]}>
                <Heading
                  textAlign={['center', 'center', 'center', alignFacts]}
                  fontSize="5xl"
                  fontFamily="display"
                  lineHeight="1.1"
                  fontWeight="700"
                  color={colorVariant.factValueColor}
                  mb="1"
                  as="p"
                >
                  {fact.value}
                </Heading>
                <Text size="mdLowNormal" color={colorVariant.factKeyColor} textAlign={['center', 'center', 'center', alignFacts]}>
                  {fact.key}
                </Text>
              </Flex>
            ))}
          </Flex>

          {/* Map Section */}
          <Box flex="2" minW={['100%', null, null, '500px']}> 
            <ProjectsMap
              slice={{
                defaultCenterCoordinates: slice.defaultCenterCoordinates,
                defaultZoomLevel: slice.defaultZoomLevel,
                minZoomLevel: slice.minZoomLevel,
                disableUserLocationZoom: slice.disableUserLocationZoom,
              }}
              embedded
              embeddedHeight="sm"
            />
          </Box>
        </Flex>
        {slice.button && (
            <Flex justifyContent="center" alignItems="center">
                <StrapiLinkButton
                    link={slice.button}
                    size="md"
                    variant="outline"
                    component="FactsWithProjectsMap"
                />
            </Flex>
        )}
      </Wrapper>
    </DefaultSectionContainer>
  );
};

export default FactsWithProjectsMap;
