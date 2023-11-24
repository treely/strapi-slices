import {
  Box,
  Container,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Gradient,
  Spacer,
  Wrapper,
} from 'boemly';
import StrapiButtonWithVariant from '@/models/strapi/StrapiButtonWithVariant';
import StrapiLinkButton from '@/components/StrapiLinkButton';
import Image from 'next/image';
import strapiMediaUrl from '@/utils/strapiMediaUrl';
import StrapiImage from '@/models/strapi/StrapiImage';
import { useIntl } from 'react-intl';
import { CDN_URI } from '@/constants/api';

type Variant = 'gray' | 'green' | 'white';

enum CtaCardType {
  Left = 'left',
  CenterWithoutImage = 'centerWithoutImage',
  CenterWithImage = 'centerWithImage',
  Right = 'right',
}

export interface CtaProps {
  slice: {
    tagline?: string;
    title?: string;
    subTitle?: string;
    variant: Variant;
    ctaCards: CtaCard[];
  };
}

export interface CtaCard {
  id: number;
  tagline?: string;
  title: string;
  subTitle?: string;
  image?: StrapiImage;
  buttons?: StrapiButtonWithVariant[];
  variant: Variant;
  backgroundShape: boolean;
  textAlign: 'left' | 'right' | 'center';
}

const STATES: Record<CtaCardType, Record<string, any>> = {
  left: {
    textAlign: 'left',
    paddingTagline: '0',
    paddingTitle: '0',
    justifyContent: 'space-between',
    buttonJustifyContent: 'start',
    textMarginLeft: ['0', null, null, null, '14'],
  },
  centerWithoutImage: {
    textAlign: 'center',
    paddingTagline: '28',
    paddingTitle: '20',
    justifyContent: 'center',
    buttonJustifyContent: 'center',
    textMarginLeft: '0',
  },
  centerWithImage: {
    textAlign: 'center',
    paddingTagline: '28',
    paddingTitle: '20',
    justifyContent: 'center',
    buttonJustifyContent: 'center',
    textMarginLeft: '0',
  },
  right: {
    textAlign: 'left',
    paddingTagline: '0',
    paddingTitle: '0',
    justifyContent: 'start',
    buttonJustifyContent: 'start',
    textMarginLeft: '0',
  },
};

const VARIANTS: Record<Variant, Record<string, Record<CtaCardType, string>>> = {
  gray: {
    backgroundColor: {
      left: 'primary.50',
      centerWithoutImage: 'primary.50',
      centerWithImage: 'primary.50',
      right: 'primary.50',
    },
    taglineColor: {
      left: 'primary.500',
      centerWithoutImage: 'primary.500',
      centerWithImage: 'white',
      right: 'primary.500',
    },
    titleColor: {
      left: 'black',
      centerWithoutImage: 'black',
      centerWithImage: 'white',
      right: 'black',
    },
    subTitleColor: {
      left: 'black',
      centerWithoutImage: 'black',
      centerWithImage: 'white',
      right: 'black',
    },
  },
  green: {
    backgroundColor: {
      left: 'primary.800',
      centerWithoutImage: 'primary.800',
      centerWithImage: 'primary.800',
      right: 'primary.800',
    },
    taglineColor: {
      left: 'white',
      centerWithoutImage: 'white',
      centerWithImage: 'white',
      right: 'white',
    },
    titleColor: {
      left: 'white',
      centerWithoutImage: 'white',
      centerWithImage: 'white',
      right: 'white',
    },
    subTitleColor: {
      left: 'white',
      centerWithoutImage: 'white',
      centerWithImage: 'white',
      right: 'white',
    },
  },
  white: {
    backgroundColor: {
      left: 'white',
      centerWithoutImage: 'white',
      centerWithImage: 'primary.800',
      right: 'white',
    },
    taglineColor: {
      left: 'primary.500',
      centerWithoutImage: 'primary.500',
      centerWithImage: 'white',
      right: 'primary.500',
    },
    titleColor: {
      left: 'black',
      centerWithoutImage: 'black',
      centerWithImage: 'white',
      right: 'black',
    },
    subTitleColor: {
      left: 'black',
      centerWithoutImage: 'black',
      centerWithImage: 'white',
      right: 'black',
    },
  },
};

const getTypeOfCard = (ctaCard: CtaCard): CtaCardType => {
  if (ctaCard.textAlign === 'center') {
    if (ctaCard.image) {
      return CtaCardType.CenterWithImage;
    }
    return CtaCardType.CenterWithoutImage;
  }
  if (ctaCard.textAlign === 'left') {
    return CtaCardType.Left;
  }
  return CtaCardType.Right;
};

export const Cta: React.FC<CtaProps> = ({ slice }: CtaProps) => {
  const { formatMessage } = useIntl();

  return (
    <DefaultSectionContainer
      backgroundColor={VARIANTS[slice.variant].backgroundColor.left}
    >
      <Wrapper>
        {slice.title ? (
          <>
            <Flex alignItems="center" flexDirection="column">
              <DefaultSectionHeader
                tagline={slice.tagline}
                taglineProps={{
                  color: VARIANTS[slice.variant].taglineColor.left,
                  textAlign: 'center',
                  maxWidth: '3xl',
                }}
                title={slice.title}
                titleProps={{
                  color: VARIANTS[slice.variant].titleColor.left,
                  textAlign: 'center',
                  width: 'full',
                  maxWidth: '3xl',
                }}
                text={slice.subTitle}
                textProps={{
                  color: VARIANTS[slice.variant].subTitleColor.left,
                  textAlign: 'center',
                  maxWidth: '3xl',
                }}
              />
            </Flex>
            <Spacer height={['16', null, null, null, '20']} />
          </>
        ) : (
          <></>
        )}
        <Flex gap="4" flexDirection="column">
          {slice.ctaCards.map((ctaCard) => {
            const ctaCardType = getTypeOfCard(ctaCard);

            return (
              <Container
                backgroundColor={
                  VARIANTS[ctaCard.variant].backgroundColor[ctaCardType]
                }
                key={ctaCard.id}
                position="relative"
                elevation="none"
              >
                {ctaCard.image &&
                ctaCardType === CtaCardType.CenterWithImage ? (
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    width="full"
                    height="full"
                    borderRadius="xl"
                    overflow="hidden"
                  >
                    <Image
                      src={strapiMediaUrl(ctaCard.image.img, 'large')}
                      alt={ctaCard.image.alt}
                      fill
                      style={{
                        objectFit: ctaCard.image.objectFit || 'cover',
                        borderRadius: 'var(--boemly-radii-xl)',
                      }}
                    />
                    <Gradient />
                  </Box>
                ) : (
                  <></>
                )}
                {ctaCard.backgroundShape ? (
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    width="full"
                    height="full"
                  >
                    <Image
                      src={
                        ctaCardType === CtaCardType.CenterWithImage ||
                        ctaCard.variant === 'green'
                          ? `${CDN_URI}/assets/v3/strapi-slices/shapes-dark.svg`
                          : `${CDN_URI}/assets/v3/strapi-slices/shapes-light.svg`
                      }
                      alt={formatMessage({
                        id: `sections.cta.backgroundShapes${
                          ctaCardType === CtaCardType.CenterWithImage ||
                          ctaCard.variant === 'green'
                            ? 'Dark'
                            : 'Light'
                        }`,
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

                <Flex
                  flexDir={['column', null, null, null, 'row']}
                  flexGrow="1"
                  gap={['8', null, null, null, '16']}
                  justifyContent={STATES[ctaCardType].justifyContent}
                >
                  {ctaCard.image && ctaCardType === CtaCardType.Right ? (
                    <Box
                      position="relative"
                      height={['3xs', null, null, null, 'auto']}
                      minWidth={[null, null, null, null, '50%']}
                    >
                      <Image
                        src={strapiMediaUrl(ctaCard.image.img, 'medium')}
                        alt={ctaCard.image.alt}
                        fill
                        style={{
                          objectFit: ctaCard.image.objectFit || 'cover',
                          borderRadius: 'var(--boemly-radii-xl)',
                        }}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}

                  <Box
                    zIndex="base"
                    marginLeft={STATES[ctaCardType].textMarginLeft}
                    maxWidth="3xl"
                  >
                    <Spacer height={['0', null, null, null, '20']} />

                    <DefaultSectionHeader
                      tagline={ctaCard.tagline}
                      taglineProps={{
                        textAlign: STATES[ctaCardType].textAlign,
                        color:
                          VARIANTS[ctaCard.variant].taglineColor[ctaCardType],
                        paddingX: [
                          '0',
                          null,
                          null,
                          null,
                          STATES[ctaCardType].paddingTagline,
                        ],
                      }}
                      title={ctaCard.title}
                      titleProps={{
                        fontFamily: 'Inter',
                        fontSize: '4xl',
                        fontWeight: '600',
                        lineHeight: '9',
                        textAlign: STATES[ctaCardType].textAlign,
                        paddingX: [
                          '0',
                          null,
                          null,
                          null,
                          STATES[ctaCardType].paddingTitle,
                        ],
                        color:
                          VARIANTS[ctaCard.variant].titleColor[ctaCardType],
                      }}
                      text={ctaCard.subTitle}
                      textProps={{
                        textAlign: STATES[ctaCardType].textAlign,
                        color:
                          VARIANTS[ctaCard.variant].subTitleColor[ctaCardType],
                      }}
                    />
                    {ctaCard.buttons && ctaCard.buttons.length > 0 ? (
                      <>
                        <Spacer height="8" />
                        <Flex
                          gap="2"
                          justifyContent={
                            STATES[ctaCardType].buttonJustifyContent
                          }
                        >
                          {ctaCard.buttons &&
                            ctaCard.buttons.map((button) => (
                              <StrapiLinkButton
                                key={button.button.id}
                                link={button.button}
                                size="md"
                                variant={button.variant}
                              />
                            ))}
                        </Flex>
                      </>
                    ) : (
                      <></>
                    )}
                    <Spacer height={['1', null, null, null, '20']} />
                  </Box>
                  {ctaCard.image && ctaCardType === CtaCardType.Left ? (
                    <Box
                      position="relative"
                      height={['3xs', null, null, null, 'auto']}
                      minWidth={[null, null, null, null, '50%']}
                    >
                      <Image
                        src={strapiMediaUrl(ctaCard.image.img, 'medium')}
                        alt={ctaCard.image.alt}
                        fill
                        style={{
                          objectFit: ctaCard.image.objectFit || 'cover',
                          borderRadius: 'var(--boemly-radii-xl)',
                        }}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}
                </Flex>
              </Container>
            );
          })}
        </Flex>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
