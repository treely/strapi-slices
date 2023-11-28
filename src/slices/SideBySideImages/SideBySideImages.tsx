import React from 'react';
import {
  Box,
  DefaultSectionContainer,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import StrapiImage from '../../models/strapi/StrapiImage';
import strapiMediaUrl from '../../utils/strapiMediaUrl';

export interface SideBySideImagesProps {
  slice: {
    images: {
      id: number;
      caption: string;
      img: StrapiImage;
    }[];
  };
}
export const SideBySideImages: React.FC<SideBySideImagesProps> = ({
  slice,
}: SideBySideImagesProps) => (
  <DefaultSectionContainer>
    <Wrapper>
      <Grid templateColumns="repeat(12, 1fr)" gap="4">
        <GridItem colSpan={[12, null, null, 7]}>
          <SimpleGrid
            columns={[1, null, null, 2]}
            gap={['12', null, null, '6']}
          >
            {slice.images.map((image) => (
              <Box key={image.id}>
                <Box height="md" position="relative" borderRadius="xl">
                  <Image
                    src={strapiMediaUrl(image.img.img, 'large')}
                    alt={image.img.alt}
                    fill
                    style={{
                      objectFit: image.img.objectFit || 'cover',
                      borderRadius: 'var(--boemly-radii-xl)',
                    }}
                  />
                </Box>
                <Text mt="3" size="xsLowNormal">
                  {image.caption}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </Wrapper>
  </DefaultSectionContainer>
);
