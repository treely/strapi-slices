import React from 'react';
import { css } from '@emotion/react';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Heading,
  RichText,
  SimpleGrid,
  Text,
  useToken,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import { CaretRight } from '@phosphor-icons/react';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiDefaultHeader from '../../models/strapi/StrapiDefaultHeader';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLink from '../../models/strapi/StrapiLink';
import strapiMediaUrl from '../../utils/strapiMediaUrl';

interface TextCardGridSlice extends StrapiDefaultHeader {
  variant: 'shape' | 'image';
  cards: {
    id: number;
    tagline?: string;
    title: string;
    text: string;
    image: StrapiImage;
    buttons?: StrapiLink[];
  }[];
}
export interface TextCardGridProps {
  slice: TextCardGridSlice;
}

enum ShapePosition {
  topLeft = 'top-left',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  unset = 'unset',
}

const shapePositions: ShapePosition[] = [
  ShapePosition.topLeft,
  ShapePosition.bottomRight,
  ShapePosition.topRight,
  ShapePosition.bottomLeft,
  ShapePosition.topRight,
  ShapePosition.bottomLeft,
  ShapePosition.topLeft,
  ShapePosition.bottomRight,
];

const oppositesOfCorners = {
  [ShapePosition.bottomLeft]: ShapePosition.topRight,
  [ShapePosition.topRight]: ShapePosition.bottomLeft,
  [ShapePosition.bottomRight]: ShapePosition.topLeft,
  [ShapePosition.topLeft]: ShapePosition.bottomRight,
  [ShapePosition.unset]: ShapePosition.unset,
};

type Variant = {
  padding: (string | null)[];
  positionIcon: (index: number) => ShapePosition;
  width: string;
  height: string;
  position: 'absolute' | 'relative';
  mb: string;
};

const variants: { shape: Variant; image: Variant } = {
  shape: {
    padding: ['6', null, null, '8'],
    positionIcon: (index: number) =>
      shapePositions[index % shapePositions.length],
    width: '40',
    height: '40',
    position: 'absolute',
    mb: 'unset',
  },
  image: {
    padding: ['6', null, null, '8'],
    positionIcon: () => ShapePosition.unset,
    width: '24',
    height: '24',
    position: 'relative',
    mb: '10',
  },
};

export const TextCardGrid: React.FC<TextCardGridProps> = ({
  slice,
}: TextCardGridProps) => {
  const [primary800] = useToken('colors', ['primary.800']);

  return (
    <DefaultSectionContainer backgroundColor={primary800} title={slice.title}>
      <Wrapper>
        <DefaultSectionHeader
          tagline={slice.tagline}
          title={slice.title}
          text={slice.text}
          taglineProps={{ textAlign: 'center', color: 'white' }}
          titleProps={{
            textAlign: 'center',
            maxW: '2xl',
            marginX: 'auto',
            color: 'white',
          }}
          textProps={{
            textAlign: 'center',
            maxW: 'xl',
            marginX: 'auto',
            color: 'whiteAlpha.800',
          }}
        />

        <SimpleGrid
          mt={['14', null, null, '24']}
          columns={3}
          justifyItems="center"
          gap="20"
          rowGap="16"
          minChildWidth={['100%', null, '16rem']}
        >
          {slice.cards.map(
            ({ id, tagline, title, text, image, buttons }, index) => (
              <Box
                key={id}
                backgroundColor="white"
                zIndex="base"
                padding={variants[slice.variant].padding}
                boxShadow="lg"
                borderRadius="2xl"
                minHeight="2xs"
                width="full"
                maxWidth={slice.cards.length > 1 ? 'unset' : 'xl'}
                position="relative"
                display="flex"
                flexDir="column"
                alignItems="flex-start"
                justifyContent={
                  slice.variant === 'shape' ? 'flex-end' : 'flex-start'
                }
                overflow="hidden"
              >
                <Box
                  position={variants[slice.variant].position}
                  width={variants[slice.variant].width}
                  height={variants[slice.variant].height}
                  mb={variants[slice.variant].mb}
                  top={
                    variants[slice.variant].positionIcon(index).includes('top')
                      ? '-4'
                      : 'unset'
                  }
                  left={
                    variants[slice.variant].positionIcon(index).includes('left')
                      ? '-4'
                      : 'unset'
                  }
                  right={
                    variants[slice.variant]
                      .positionIcon(index)
                      .includes('right')
                      ? '-4'
                      : 'unset'
                  }
                  bottom={
                    variants[slice.variant]
                      .positionIcon(index)
                      .includes('bottom')
                      ? '-4'
                      : 'unset'
                  }
                  borderBottomRightRadius={
                    oppositesOfCorners[
                      variants[slice.variant].positionIcon(index)
                    ].includes('bottomRight')
                      ? 'full'
                      : 'unset'
                  }
                  borderBottomLeftRadius={
                    oppositesOfCorners[
                      variants[slice.variant].positionIcon(index)
                    ].includes('bottomLeft')
                      ? 'full'
                      : 'unset'
                  }
                  borderTopRightRadius={
                    oppositesOfCorners[
                      variants[slice.variant].positionIcon(index)
                    ].includes('topRight')
                      ? 'full'
                      : 'unset'
                  }
                  borderTopLeftRadius={
                    oppositesOfCorners[
                      variants[slice.variant].positionIcon(index)
                    ].includes('topLeft')
                      ? 'full'
                      : 'unset'
                  }
                  css={
                    variants[slice.variant]
                      .positionIcon(index)
                      .includes('unset')
                      ? css`
                          & span,
                          div,
                          img {
                            border-radius: var(--boemly-radii-xl);
                          }
                        `
                      : css`
                    & span,
                    div,
                    img {
                      border-${
                        oppositesOfCorners[
                          variants[slice.variant].positionIcon(index)
                        ]
                      }-radius: var(--boemly-radii-full);
                    }
                  `
                  }
                >
                  <Image
                    src={strapiMediaUrl(image.img, 'small')}
                    alt={image.alt}
                    fill
                    style={{ objectFit: image.objectFit || 'cover' }}
                  />
                </Box>
                <Box zIndex="aboveBase" width="full">
                  {tagline && (
                    <Text color="black" size="smMonoNormal" mb="2">
                      {tagline}
                    </Text>
                  )}
                  <Heading as="h4" size="xl" mb="3">
                    {title}
                  </Heading>
                  <RichText
                    content={text}
                    listProps={{
                      textColor: 'gray.500',
                      textSize: 'smRegularNormal',
                    }}
                    textProps={{
                      color: 'gray.500',
                      size: 'smRegularNormal',
                    }}
                  />
                  {buttons && !!buttons.length && (
                    <Flex
                      mt="4"
                      gap="3"
                      flexDir={['column', null, null, null, 'row']}
                    >
                      {buttons.map((button, buttonIndex) => (
                        <StrapiLinkButton
                          key={button.id}
                          link={button}
                          size="sm"
                          rightIcon={
                            buttonIndex === 0 ? (
                              <CaretRight size="10" weight="bold" />
                            ) : undefined
                          }
                          variant={buttonIndex === 0 ? 'outline' : 'ghost'}
                        />
                      ))}
                    </Flex>
                  )}
                </Box>
              </Box>
            )
          )}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
