import React from 'react';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useToken,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import StrapiLinkButtonWithIcon from '../../components/StrapiLinkButtonWithIcon';
import StrapiDefaultHeader from '../../models/strapi/StrapiDefaultHeader';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLinkWithIcon from '../../models/strapi/StrapiLinkWithIcon';
import strapiMediaUrl from '../../utils/strapiMediaUrl';

interface ImageGridSlice extends StrapiDefaultHeader {
  images: {
    id: number;
    title: string;
    subTitle?: string;
    image: StrapiImage;
    links: StrapiLinkWithIcon[];
  }[];
}
export interface ImageGridProps {
  slice: ImageGridSlice;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  slice,
}: ImageGridProps) => {
  const [primary50] = useToken('colors', ['primary.50']);

  return (
    <DefaultSectionContainer backgroundColor={primary50} title={slice.title}>
      <Wrapper>
        <DefaultSectionHeader
          tagline={slice.tagline}
          title={slice.title}
          text={slice.text}
          taglineProps={{ textAlign: 'center' }}
          titleProps={{ textAlign: 'center', maxW: '6xl', marginX: 'auto' }}
          textProps={{ textAlign: 'center', maxW: '2xl', marginX: 'auto' }}
        />

        <SimpleGrid
          mt="24"
          columns={3}
          gap="24"
          rowGap="16"
          minChildWidth="16rem"
        >
          {slice.images.map(({ id, title, subTitle, image, links }) => (
            <Box key={id}>
              <Box position="relative" height="sm" borderRadius="xl">
                <Image
                  src={strapiMediaUrl(image.img, 'medium')}
                  alt={image.alt}
                  fill
                  style={{
                    objectFit: image.objectFit || 'cover',
                    borderRadius: 'var(--boemly-radii-xl)',
                  }}
                />
              </Box>
              <Heading size="xl" mt="4">
                {title}
              </Heading>
              {subTitle && <Text size="mdRegularNormal">{subTitle}</Text>}
              {links && links.length > 0 && (
                <Flex mt="3" flexDir="row" gap="2" flexWrap="wrap">
                  {links.map((link) => (
                    <StrapiLinkButtonWithIcon
                      key={link.id}
                      link={link}
                      size="sm"
                      variant="outline"
                      component="ImageGrid"
                    />
                  ))}
                </Flex>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
