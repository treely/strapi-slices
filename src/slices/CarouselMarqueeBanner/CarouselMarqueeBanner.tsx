import React from 'react';
import {
  DefaultSectionContainer,
  Flex,
  Heading,
  Spacer,
  Box,
  useMediaQuery,
} from 'boemly';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiImage from '../../models/strapi/StrapiImage';
import AutoScroll from 'embla-carousel-auto-scroll';
import {
  BREAKPOINT_MD_QUERY,
  BREAKPOINT_MD,
} from '../../constants/breakpoints';
import { getClosestRatio } from '../../utils/getClosestRatio';

const LogoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--boemly-space-6);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--boemly-space-6);
  }
`;

export interface CarouselMarqueeBannerProps {
  slice: {
    title?: string;
    logos: {
      id: number;
      img: StrapiImage;
    }[];
  };
}

export const CarouselMarqueeBanner: React.FC<CarouselMarqueeBannerProps> = ({
  slice,
}: CarouselMarqueeBannerProps) => {
  const { width: windowWidth } = useWindowSize();
  const shouldDuplicateLogos = slice.logos.length < 5;
  const LOOP_ARRAY_LENGTH = windowWidth > 2000 ? 5 : 4;

  // Duplicate Logos to create a full loop
  const logosToRender = shouldDuplicateLogos
    ? slice.logos
    : Array.from({ length: LOOP_ARRAY_LENGTH }, () => slice.logos).flat();

  const [isMobile] = useMediaQuery(BREAKPOINT_MD_QUERY);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: shouldDuplicateLogos ? false : true,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
    },
    shouldDuplicateLogos
      ? []
      : [
          AutoScroll({
            playOnInit: true,
            speed: isMobile ? 0.5 : 1,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            stopOnFocusIn: false,
          }),
        ]
  );

  const renderLogos = () => {
    if (slice.logos.length < 5) {
      return (
        <LogoGrid>
          {slice.logos.map((logo, index) => (
            <Box
              key={`${logo.id}-${index}`}
              width={
                isMobile ? 'var(--boemly-sizes-16)' : 'var(--boemly-sizes-36)'
              }
              flexShrink={0}
              transform="translate3d(0, 0, 0)"
            >
              <Flex
                height="full"
                width="full"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  position="relative"
                  maxHeight="var(--boemly-sizes-xl)"
                  height={`calc(${
                    isMobile
                      ? 'var(--boemly-sizes-16)'
                      : 'var(--boemly-sizes-36)'
                  } / ${getClosestRatio(
                    logo.img.img.data.attributes.width,
                    logo.img.img.data.attributes.height
                  )})`}
                  width={
                    isMobile
                      ? 'var(--boemly-sizes-16)'
                      : 'var(--boemly-sizes-36)'
                  }
                  borderRadius="var(--boemly-radii-xl)"
                >
                  <Image
                    src={strapiMediaUrl(logo.img.img, 'large')}
                    alt={logo.img.alt}
                    fill
                    style={{
                      objectFit: logo.img.objectFit || 'contain',
                      borderRadius: 'var(--boemly-radii-xl)',
                    }}
                  />
                </Box>
              </Flex>
            </Box>
          ))}
        </LogoGrid>
      );
    }

    return (
      <Box width="100%" overflow="hidden" ref={emblaRef} cursor="pointer">
        <motion.div
          style={{
            display: 'flex',
            justifyContent: slice.logos.length < 5 ? 'center' : 'flex-start',
            gap: 'var(--boemly-space-6)',
          }}
        >
          {logosToRender.map((logo, index) => (
            <Box
              key={`${logo.id}-${index}`}
              width={
                isMobile ? 'var(--boemly-sizes-16)' : 'var(--boemly-sizes-36)'
              }
              flexShrink={0}
              transform="translate3d(0, 0, 0)"
            >
              <Flex
                height="full"
                width="full"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  position="relative"
                  maxHeight="var(--boemly-sizes-xl)"
                  height={`calc(${
                    isMobile
                      ? 'var(--boemly-sizes-16)'
                      : 'var(--boemly-sizes-36)'
                  } / ${getClosestRatio(
                    logo.img.img.data.attributes.width,
                    logo.img.img.data.attributes.height
                  )})`}
                  width={
                    isMobile
                      ? 'var(--boemly-sizes-16)'
                      : 'var(--boemly-sizes-36)'
                  }
                  borderRadius="var(--boemly-radii-xl)"
                >
                  <Image
                    src={strapiMediaUrl(logo.img.img, 'large')}
                    alt={logo.img.alt}
                    fill
                    style={{
                      objectFit: logo.img.objectFit || 'contain',
                      borderRadius: 'var(--boemly-radii-xl)',
                    }}
                  />
                </Box>
              </Flex>
            </Box>
          ))}
        </motion.div>
      </Box>
    );
  };

  return (
    <DefaultSectionContainer>
      <Box
        maxWidth="100vw"
        margin="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="15.625rem"
        backgroundColor="var(--boemly-colors-gray-50)"
        padding="42px 0 56px"
      >
        {slice.title ? (
          <>
            <Flex alignItems="center" flexDirection="column">
              <Heading size="md" fontWeight="500">
                {slice.title}
              </Heading>
            </Flex>
            <Spacer height="12" />
          </>
        ) : null}

        {renderLogos()}
      </Box>
    </DefaultSectionContainer>
  );
};

export default CarouselMarqueeBanner;
