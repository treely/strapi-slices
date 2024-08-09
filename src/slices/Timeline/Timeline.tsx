import React, { useContext } from 'react';
import {
  Button,
  Box,
  Container,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Heading,
  RichText,
  SimpleGrid,
  Spacer,
  Tag,
  Text,
  Wrapper,
  useMediaQuery,
} from 'boemly';
import Image from 'next/image';
import StrapiImage from '../../models/strapi/StrapiImage';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiLink from '../../models/strapi/StrapiLink';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import { CDN_URI } from '../../constants/api';
import { IntlContext } from 'react-intl';
import { BREAKPOINT_MD_QUERY } from '../../constants/breakpoints';
import { useState } from 'react';
import FullScreenImage from '../../components/FullScreenImage';

export interface TimelineProps {
  slice: {
    title: string;
    text?: string;
    tagline?: string;

    timelineItems: TimelineItem[];
  };
}

export interface TimelineItem {
  id: number;
  tagline?: string;
  title: string;
  text?: string;
  badge?: { text: string; variant: 'orange' | 'green' | 'red' | 'gray' };
  logo?: StrapiImage;
  icon?: StrapiImage;
  image?: StrapiImage;
  button?: StrapiLink;
  backgroundShapes?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ slice }: TimelineProps) => {
  const { formatMessage } = useContext(IntlContext);
  const [visibleItems, setVisibleItems] = useState(3);
  const [mobile] = useMediaQuery(BREAKPOINT_MD_QUERY);
  const [isOpen, setIsOpen] = useState(false);

  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
  };

  return (
    <DefaultSectionContainer>
      <Wrapper>
        <Flex flexDir={['column', null, null, 'row']}>
          <Box
            width={['full', null, null, '50%']}
            position={[null, null, null, 'sticky']}
            top={['16', null, null, '32']}
            height="full"
            paddingRight={[null, null, null, '28']}
          >
            <DefaultSectionHeader
              tagline={slice.tagline}
              title={slice.title}
              text={slice.text}
            />
            {mobile && (
              <>
                <Spacer h="10" />
                <Flex justifyContent="center">
                  <Box
                    borderRadius="full"
                    width="3"
                    height="3"
                    margin="1.5"
                    backgroundColor="gray"
                  />
                </Flex>
                <Box
                  overflow="visible"
                  borderRight="dashed 1px var(--boemly-colors-gray-200)"
                  transform="translateX(-50%)"
                  position="relative"
                  height="20"
                />
              </>
            )}
          </Box>
          <Box
            overflow="visible"
            maxWidth={['full', null, null, '50%']}
            borderLeft={[
              null,
              null,
              null,
              'dashed 1px var(--boemly-colors-gray-200)',
            ]}
            position="relative"
            width="full"
          >
            <Flex
              flexDir="column"
              overflow="visible"
              gap={[null, null, null, '8']}
            >
              {slice.timelineItems.slice(0, visibleItems).map((item, index) => (
                <SimpleGrid
                  gap={['none', null, null, '4']}
                  key={item.id}
                  columns={[1, null, null, 2]}
                  alignContent="center"
                  gridTemplateColumns={[null, null, null, '1fr 16fr']}
                  position="relative"
                >
                  <Flex
                    alignItems="center"
                    justifyContent={['center', null, null, 'flex-start']}
                  >
                    <Box
                      position="absolute"
                      transform={[null, null, null, 'translateX(-50%)']}
                      backgroundColor="white"
                    >
                      {item.icon ? (
                        <Box padding="2">
                          <Image
                            src={strapiMediaUrl(item.icon.img, 'xSmall')}
                            alt={item.icon.alt}
                            width="21"
                            height="21"
                          />
                        </Box>
                      ) : (
                        <Box padding="2">
                          <Box
                            borderRadius="full"
                            backgroundColor="primary.800"
                            width="2"
                            height="2"
                          />
                        </Box>
                      )}
                      {mobile && (
                        <Box
                          overflow="visible"
                          borderRight="dashed 1px var(--boemly-colors-gray-200)"
                          transform="translateX(-50%)"
                          position="relative"
                          height="10"
                        />
                      )}
                    </Box>
                  </Flex>
                  <Container
                    p={[null, null, null, '3']}
                    zIndex="base"
                    position="relative"
                    elevation="none"
                  >
                    {item.backgroundShapes ? (
                      <Box
                        position="absolute"
                        left="0"
                        top="0"
                        width="full"
                        height="full"
                        zIndex="-1"
                      >
                        <Image
                          src={`${CDN_URI}/assets/v3/strapi-slices/timeline-shapes.svg`}
                          alt={formatMessage({
                            id: 'sections.timeline.backgroundShapes',
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

                    <Flex flexDir="column">
                      <Flex
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        <Box>
                          {item.tagline && (
                            <>
                              <Text color="primary.800" size="smMonoUppercase">
                                {item.tagline}
                              </Text>
                              <Spacer h="2" />
                            </>
                          )}
                        </Box>
                        <Flex>
                          {item.badge && (
                            <Tag
                              colorScheme={item.badge.variant}
                              borderRadius="md"
                            >
                              {item.badge.text}
                            </Tag>
                          )}
                          {item.logo && (
                            <Box position="relative" height="8" width="16">
                              <Image
                                src={strapiMediaUrl(item.logo.img, 'small')}
                                alt={item.logo.alt}
                                fill
                                style={{
                                  objectFit: item.logo.objectFit,
                                }}
                              />
                            </Box>
                          )}
                        </Flex>
                      </Flex>
                      <Heading
                        size="lg"
                        mt={['6', null, null, '3']}
                        maxWidth="xs"
                      >
                        {item.title}
                      </Heading>
                      {item.text && (
                        <Box mt="3">
                          <RichText content={item.text} />
                        </Box>
                      )}
                      {item.button && (
                        <Box textAlign="left">
                          <Spacer h="4" />
                          <StrapiLinkButton
                            link={item.button}
                            size="sm"
                            variant="outline"
                          />
                        </Box>
                      )}
                      {item.image ? (
                        <>
                          <Box
                            position="relative"
                            mt="4"
                            height={['2xs', null, null, null, '48']}
                            minWidth={[null, null, null, null, '50%']}
                          >
                            <Image
                              src={strapiMediaUrl(item.image.img, 'xLarge')}
                              alt={item.image.alt}
                              fill
                              style={{
                                cursor: mobile ? 'unset' : 'pointer',
                                objectFit: item.image.objectFit || 'cover',
                                borderRadius: 'var(--boemly-radii-xl)',
                              }}
                              onClick={() => !mobile && setIsOpen(true)}
                            />
                            <FullScreenImage
                              images={[item.image]}
                              isOpen={isOpen}
                              onClose={() => setIsOpen(false)}
                            />
                          </Box>
                        </>
                      ) : (
                        <></>
                      )}
                    </Flex>
                  </Container>
                  {mobile && index + 1 < slice.timelineItems.length && (
                    <Box
                      overflow="visible"
                      borderRight="dashed 1px var(--boemly-colors-gray-200)"
                      transform="translateX(-50%)"
                      position="relative"
                      height="20"
                    />
                  )}
                </SimpleGrid>
              ))}
            </Flex>
            {visibleItems < slice.timelineItems.length && (
              <>
                <Box
                  width="full"
                  height={['36', null, null, '64']}
                  position="absolute"
                  bottom="0"
                  zIndex="1"
                  background="linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.98) 76.54%, #FFF 100%)"
                />
                <Box
                  bottom="0"
                  textAlign="center"
                  zIndex="overlay"
                  position="relative"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={showMoreItems}
                    m={[null, null, null, '8']}
                  >
                    {formatMessage({ id: 'sections.timeline.showMoreButton' })}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Flex>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
