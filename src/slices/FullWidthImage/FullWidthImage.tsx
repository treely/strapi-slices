import React, { useState } from 'react';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Wrapper,
  useMediaQuery,
} from 'boemly';
import Image from 'next/image';
import StrapiDefaultHeader from '../../models/strapi/StrapiDefaultHeader';
import StrapiImage from '../../models/strapi/StrapiImage';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import FullScreenImage from '../../components/FullScreenImage';
import { BREAKPOINT_MD_QUERY } from '../../constants/breakpoints';

interface FullWidthImageSlice extends StrapiDefaultHeader {
  image: StrapiImage;
}
export interface FullWidthImageProps {
  slice: FullWidthImageSlice;
}

export const FullWidthImage: React.FC<FullWidthImageProps> = ({
  slice,
}: FullWidthImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile] = useMediaQuery(BREAKPOINT_MD_QUERY);

  return (
    <DefaultSectionContainer title={slice.title}>
      <Wrapper>
        <DefaultSectionHeader
          isHero
          tagline={slice.tagline}
          title={slice.title}
          text={slice.text}
          taglineProps={{ textAlign: 'center', mt: ['32', null, null, '56'] }}
          titleProps={{ textAlign: 'center', maxW: '6xl', marginX: 'auto' }}
          textProps={{ textAlign: 'center', maxW: '3xl', marginX: 'auto' }}
        />

        <Box position="relative" mt="20" height={['3xs', null, 'xl']}>
          <Image
            src={strapiMediaUrl(slice.image.img, 'xLarge')}
            alt={slice.image.alt}
            fill
            style={{
              objectFit: slice.image.objectFit || 'cover',
              cursor: isMobile ? 'unset' : 'pointer',
              borderRadius: 'var(--boemly-radii-2xl)',
            }}
            onClick={() => !isMobile && setIsOpen(true)}
          />

          <FullScreenImage
            images={[slice.image]}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </Box>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
