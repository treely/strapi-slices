import React, { useContext } from 'react';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLink from '../../models/strapi/StrapiLink';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import {
  Container,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Wrapper,
  Text,
  Flex,
  Box,
  Spacer,
  Divider,
  Heading,
  Badge,
  SimpleGrid,
} from 'boemly';
import Image from 'next/image';
import { CaretRight } from '@phosphor-icons/react';
import { Icon } from './Icon';
import { CDN_URI } from '../../constants/api';
import { IntlContext } from '../../components/ContextProvider';

export interface ComparisonProps {
  slice: {
    title?: string;
    subTitle?: string;
    tagline?: string;

    comparisonCards: ComparisonCard[];
  };
}

export interface ComparisonCard {
  id: number;
  title: string;
  subTitle: string;
  badge?: string;
  variant: 'gray' | 'green' | 'white';
  image?: StrapiImage;
  button?: StrapiLink;
  factTitle?: string;
  factSubtitle?: string;
  lists: {
    id: string;
    title: string;
    items: { id: string; text: string; icon: 'bullet' | 'check' | 'cross' }[];
  }[];
}

const VARIANTS = {
  gray: {
    backgroundColor: 'primary.50',
    textColor: 'black',
    subTitleColor: 'gray.500',
    factColor: 'primary.800',
    dividerColor: 'gray.200',
  },
  green: {
    backgroundColor: 'primary.800',
    textColor: 'white',
    subTitleColor: 'whiteAlpha.900',
    factColor: 'white',
    dividerColor: 'whiteAlpha.200',
  },
  white: {
    backgroundColor: 'white',
    textColor: 'black',
    subTitleColor: 'gray.500',
    factColor: 'primary.800',
    dividerColor: 'gray.200',
  },
};

export const Comparison: React.FC<ComparisonProps> = ({
  slice,
}: ComparisonProps) => {
  const { formatMessage } = useContext(IntlContext);

  return (
    <DefaultSectionContainer>
      <Wrapper>
        {slice.title ? (
          <>
            <Flex alignItems="center" flexDirection="column">
              <DefaultSectionHeader
                tagline={slice.tagline}
                title={slice.title}
                text={slice.subTitle}
                textProps={{ maxW: '2xl', textAlign: 'center' }}
                titleProps={{
                  textAlign: 'center',
                  maxWidth: '3xl',
                }}
                taglineProps={{ textAlign: 'center', maxWidth: '3xl' }}
              />
            </Flex>
            <Spacer height="12" />
          </>
        ) : (
          <></>
        )}
        <SimpleGrid
          columns={[1, null, null, null, slice.comparisonCards.length]}
          spacing="4"
        >
          {slice.comparisonCards.map((comparisonCard) => (
            <Container
              boxShadow={comparisonCard.variant === 'green' ? 'xl' : 'base'}
              border={
                comparisonCard.variant === 'green' ? 'primary.800' : undefined
              }
              zIndex="base"
              key={comparisonCard.id}
              position="relative"
              elevation="none"
              p="3"
              backgroundColor={VARIANTS[comparisonCard.variant].backgroundColor}
            >
              {comparisonCard.variant === 'green' ? (
                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  width="full"
                  height="full"
                  zIndex="-1"
                >
                  <Image
                    src={`${CDN_URI}/assets/v3/strapi-slices/shapes-comparison.svg`}
                    alt={formatMessage({
                      id: 'sections.comparison.backgroundShapes',
                    })}
                    fill
                    style={{
                      objectFit: 'cover',
                      borderRadius: 'var(--boemly-radii-xl)',
                    }}
                  />
                </Box>
              ) : (
                <></>
              )}
              <Flex flexDir="column" gap="4">
                {comparisonCard.image && (
                  <Box position="relative" height="7" width="100%">
                    <Image
                      src={strapiMediaUrl(comparisonCard.image.img, 'small')}
                      alt={comparisonCard.image.alt}
                      fill
                      style={{
                        objectFit: comparisonCard.image.objectFit,
                      }}
                    />
                  </Box>
                )}
                <Flex gap="2" alignItems="center" flexWrap="wrap">
                  <Heading
                    size="xl"
                    color={VARIANTS[comparisonCard.variant].textColor}
                    whiteSpace="pre-line"
                  >
                    {comparisonCard.title}
                  </Heading>
                  {comparisonCard.badge && (
                    <Badge
                      backgroundColor="green.100"
                      borderRadius="md"
                      whiteSpace="pre-line"
                    >
                      {comparisonCard.badge}
                    </Badge>
                  )}
                </Flex>
              </Flex>
              <Spacer height="4" />
              <Text
                size="smRegularNormal"
                color={VARIANTS[comparisonCard.variant].subTitleColor}
              >
                {comparisonCard.subTitle}
              </Text>

              {comparisonCard.factTitle ||
              comparisonCard.factSubtitle ||
              comparisonCard.button ? (
                <>
                  <Spacer height="6" />
                  <Flex flexDir="column">
                    {comparisonCard.factTitle && (
                      <>
                        <Text
                          color={VARIANTS[comparisonCard.variant].factColor}
                          size="lgMonoNormal"
                        >
                          {comparisonCard.factTitle}
                        </Text>
                        <Text
                          color={VARIANTS[comparisonCard.variant].factColor}
                          size="smLowNormal"
                        >
                          {comparisonCard.factSubtitle}
                        </Text>
                      </>
                    )}
                    {comparisonCard.button && (
                      <StrapiLinkButton
                        mt="6"
                        link={comparisonCard.button}
                        size="md"
                        variant="outline"
                        rightIcon={<CaretRight size={16} weight="bold" />}
                        component="Comparison"
                      />
                    )}
                  </Flex>
                </>
              ) : (
                <></>
              )}
              <>
                {comparisonCard.lists.map((list) => (
                  <Box key={list.id}>
                    <Divider
                      my="8"
                      color={VARIANTS[comparisonCard.variant].dividerColor}
                    />
                    <Text
                      size="smLowBold"
                      color={VARIANTS[comparisonCard.variant].textColor}
                    >
                      {list.title}
                    </Text>
                    <>
                      {list.items.map((item) => (
                        <Box key={item.id}>
                          <Spacer height="4" />
                          <Flex gap="4" alignItems="center">
                            <Box>
                              <Icon
                                variant={comparisonCard.variant}
                                icon={item.icon}
                              />
                            </Box>
                            <Text
                              size="smLowNormal"
                              color={VARIANTS[comparisonCard.variant].textColor}
                            >
                              {item.text}
                            </Text>
                          </Flex>
                        </Box>
                      ))}
                    </>
                  </Box>
                ))}
              </>
            </Container>
          ))}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
export default Comparison;
