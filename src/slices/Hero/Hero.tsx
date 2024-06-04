import React from 'react';
import { Box, DefaultSectionHeader, Flex, Gradient, Wrapper } from 'boemly';
import Image from 'next/image';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLink from '../../models/strapi/StrapiLink';
import StrapiButtonWithVariant from '../../models/strapi/StrapiButtonWithVariant';

export interface HeroProps {
  slice: {
    tagline?: string;
    title: string;
    subTitle: string;
    button?: StrapiLink;
    additionalButtons: StrapiButtonWithVariant[];
    image?: StrapiImage;
    textAlign: 'left' | 'center';
    shape?: StrapiImage;
  };
}

export const Hero = ({ slice }: HeroProps): JSX.Element => (
  <Box
    position="relative"
    width="full"
    height="var(--default-hero-height)"
    minHeight="2xl"
    backgroundColor="gray.900"
    overflowX="hidden"
  >
    {slice.image && (
      <>
        <Image
          src={strapiMediaUrl(slice.image.img, 'xLarge')}
          alt={slice.image.alt}
          fill
          style={{ objectFit: slice.image.objectFit || 'cover' }}
        />
        <Gradient />
      </>
    )}
    {slice.shape && (
      <Box
        position="absolute"
        bottom="0"
        borderTopRightRadius="full"
        width={['3xs', null, '2xs', null, 'sm']}
        height={['3xs', null, '2xs', null, 'sm']}
        right={['-16', null, '24']}
      >
        <Image
          src={strapiMediaUrl(slice.shape.img, 'medium')}
          alt={slice.shape.alt}
          fill
          style={{
            objectFit: slice.shape.objectFit || 'cover',
            borderTopRightRadius: 'var(--boemly-radii-full)',
          }}
        />
      </Box>
    )}
    <Box
      position="absolute"
      left="0"
      top="56%"
      width="full"
      textAlign={slice.textAlign}
      transform="translateY(-50%)"
    >
      <Wrapper>
        <>
          <DefaultSectionHeader
            isHero
            tagline={slice.tagline}
            title={slice.title}
            text={slice.subTitle}
            taglineProps={{ color: 'white' }}
            titleProps={{
              color: 'white',
              maxW: slice.textAlign === 'center' ? '4xl' : '3xl',
              mx: slice.textAlign === 'center' ? 'auto' : 'unset',
              textAlign: slice.textAlign,
            }}
            textProps={{
              maxW: '2xl',
              mx: slice.textAlign === 'center' ? 'auto' : 'unset',
              textAlign: slice.textAlign,
              color: 'white',
            }}
          />

          <Flex
            gap="8"
            justifyContent={slice.textAlign === 'center' ? 'center' : 'start'}
          >
            {slice.button && (
              <StrapiLinkButton
                key={slice.button.id}
                mt="10"
                size="xl"
                link={slice.button}
              />
            )}
            {slice.additionalButtons.map((button) => (
              <StrapiLinkButton
                key={button.button.id}
                mt="10"
                size="xl"
                variant={button.variant}
                link={button.button}
              />
            ))}
          </Flex>
        </>
      </Wrapper>
    </Box>
  </Box>
);
