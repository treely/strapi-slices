import React, { useEffect, useState } from 'react';
import {
  DefaultSectionContainer,
  Flex,
  Heading,
  Spacer,
  Box,
  useMediaQuery,
  useToken,
} from 'boemly';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useWindowSize } from '@reactuses/core';

import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiImage from '../../models/strapi/StrapiImage';
import AutoScroll from 'embla-carousel-auto-scroll';
import { BREAKPOINT_MD_QUERY } from '../../constants/breakpoints';
import { getClosestRatio } from '../../utils/getClosestRatio';
import { CarouselInnerContainer, LogoGrid } from './styles';

export interface CarouselMarqueeBannerProps {
  slice: {
    title?: string;
    logos: StrapiImage[];
  };
}

// Separate component containing the actual logic
const CarouselMarqueeBannerContent: React.FC<CarouselMarqueeBannerProps> = ({
  slice,
}) => {
  const [primary50] = useToken('colors', ['primary.50']);
  const { width: windowWidth } = useWindowSize();
  const hasEnoughLogosForLoop = slice.logos.length >= 5;
  const LOOP_ARRAY_LENGTH = windowWidth > 2000 ? 5 : 4;

  // Duplicate Logos to create a full loop
  const logosToRender = hasEnoughLogosForLoop
    ? Array.from({ length: LOOP_ARRAY_LENGTH }, () => slice.logos).flat()
    : slice.logos;

  const [isMobile] = useMediaQuery([BREAKPOINT_MD_QUERY]);

  // Carousel setup
  const [emblaRef] = useEmblaCarousel(
    {
      loop: hasEnoughLogosForLoop,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
    },
    hasEnoughLogosForLoop
      ? [
          AutoScroll({
            playOnInit: true,
            speed: isMobile ? 0.5 : 1,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            stopOnFocusIn: false,
          }),
        ]
      : []
  );

  const renderLogos = (): React.ReactNode => {
    if (!hasEnoughLogosForLoop) {
      return (
        <LogoGrid>
          {slice.logos.map((logo, index) => (
            <Box
              key={`${logo.id}-${index}`}
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
                  height={isMobile ? '16' : '36'}
                  width={`calc(var(--boemly-sizes-10)
                      * ${getClosestRatio(
                        logo.img.data.attributes.width,
                        logo.img.data.attributes.height
                      )})`}
                >
                  <Image
                    src={strapiMediaUrl(logo.img, 'large')}
                    alt={logo.alt}
                    fill
                    style={{
                      objectFit: logo.objectFit || 'contain',
                      filter: 'grayscale(100%)',
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
      <Box width="full" overflow="hidden" ref={emblaRef} cursor="pointer">
        <CarouselInnerContainer logoCount={slice.logos.length}>
          {logosToRender.map((logo, index) => (
            <Box
              key={`${logo.id}-${index}`}
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
                  height={isMobile ? '16' : '36'}
                  width={`calc(var(--boemly-sizes-10) * ${getClosestRatio(
                    logo.img.data.attributes.width,
                    logo.img.data.attributes.height
                  )})`}
                >
                  <Image
                    src={strapiMediaUrl(logo.img, 'large')}
                    alt={logo.alt}
                    fill
                    style={{
                      objectFit: logo.objectFit || 'contain',
                      filter: 'grayscale(100%)',
                    }}
                  />
                </Box>
              </Flex>
            </Box>
          ))}
        </CarouselInnerContainer>
      </Box>
    );
  };

  return (
    <DefaultSectionContainer backgroundColor={primary50}>
      <>
        {slice.title ? (
          <>
            <Flex alignItems="center" flexDirection="column">
              <Heading size="md" fontWeight="500">
                {slice.title}
              </Heading>
            </Flex>
            <Spacer height="12" minHeight="12" />
          </>
        ) : null}

        {renderLogos()}
      </>
    </DefaultSectionContainer>
  );
};

// Lazy-rendering the child component after client-side hydration
export const CarouselMarqueeBanner: React.FC<CarouselMarqueeBannerProps> = ({
  slice,
}: CarouselMarqueeBannerProps) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true); // Hydrate the component after the client-side is ready
  }, []);

  if (!showChild) {
    return <div />;
  }

  return <CarouselMarqueeBannerContent slice={slice} />;
};

export default CarouselMarqueeBanner;
