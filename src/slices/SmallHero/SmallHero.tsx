import React from 'react';
import {
  Box,
  DefaultSectionHeader,
  Flex,
  Gradient,
  Tag,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLink from '../../models/strapi/StrapiLink';
import strapiMediaUrl from '../../utils/strapiMediaUrl';

export interface SmallHeroProps {
  slice: {
    tags?: {
      id: number;
      text: string;
      colorScheme: string;
    }[];
    tagline?: string;
    title: string;
    subTitle?: string;
    button?: StrapiLink;
    image?: StrapiImage;
    gradient?: boolean;
  };
  theme: 'dark' | 'light';
}

const colors = {
  dark: {
    tagline: 'white',
    title: 'white',
    text: 'white',
    background: 'gray.900',
  },
  light: {
    tagline: 'primary.500',
    title: 'black',
    text: 'gray.500',
    background: 'primary.50',
  },
};

export const SmallHero: React.FC<SmallHeroProps> = ({
  slice,
  theme,
}: SmallHeroProps) => (
  <Box
    position="relative"
    width="full"
    height="xl"
    backgroundColor={colors[theme].background}
  >
    {slice.image && (
      <>
        <Image
          src={strapiMediaUrl(slice.image.img, 'xLarge')}
          alt={slice.image.alt}
          fill
          style={{ objectFit: slice.image.objectFit || 'cover' }}
        />
        {slice.gradient && <Gradient />}
      </>
    )}
    <Box
      position="absolute"
      left="0"
      top="60%"
      width="full"
      textAlign="center"
      transform="translateY(-50%)"
    >
      <Wrapper>
        <>
          {slice.tags && (
            <Flex direction="row" justify="center" gap="2" mb="4" wrap="wrap">
              {slice.tags.map(({ id, text, colorScheme }) => (
                <Tag
                  key={id}
                  colorScheme={colorScheme}
                  size="md"
                  variant="subtle"
                >
                  {text}
                </Tag>
              ))}
            </Flex>
          )}
          <DefaultSectionHeader
            isHero
            tagline={slice.tagline}
            title={slice.title}
            text={slice.subTitle}
            taglineProps={{
              color: colors[theme].tagline,
              textAlign: 'center',
              mx: 'auto',
            }}
            titleProps={{
              color: colors[theme].title,
              maxW: '4xl',
              textAlign: 'center',
              mx: 'auto',
            }}
            textProps={{
              maxW: '2xl',
              textAlign: 'center',
              mx: 'auto',
              color: colors[theme].text,
            }}
          />
          {slice.button && (
            <StrapiLinkButton link={slice.button} mt="6" size="lg" />
          )}
        </>
      </Wrapper>
    </Box>
  </Box>
);
