import React from 'react';
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
import { useWindowSize } from 'react-use';

import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiImage from '../../models/strapi/StrapiImage';
import AutoScroll from 'embla-carousel-auto-scroll';
import { BREAKPOINT_MD_QUERY } from '../../constants/breakpoints';
import { getClosestRatio } from '../../utils/getClosestRatio';
import { CarouselInnerContainer, LogoGrid } from './styles';

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
  const [primary50] = useToken('colors', ['primary.50']);
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
              width={isMobile ? '16' : '36'}
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
                  maxHeight="xl"
                  height={`calc(${
                    isMobile
                      ? 'var(--boemly-sizes-16)'
                      : 'var(--boemly-sizes-36)'
                  } / ${getClosestRatio(
                    logo.img.img.data.attributes.width,
                    logo.img.img.data.attributes.height
                  )})`}
                  width={isMobile ? '16' : '36'}
                  borderRadius="xl"
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
      <Box width="full" overflow="hidden" ref={emblaRef} cursor="pointer">
        <CarouselInnerContainer logoCount={slice.logos.length}>
          {logosToRender.map((logo, index) => (
            <Box
              key={`${logo.id}-${index}`}
              width={isMobile ? '16' : '36'}
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
                  maxHeight="xl"
                  height={`calc(${
                    isMobile
                      ? 'var(--boemly-sizes-16)'
                      : 'var(--boemly-sizes-36)'
                  } / ${getClosestRatio(
                    logo.img.img.data.attributes.width,
                    logo.img.img.data.attributes.height
                  )})`}
                  width={isMobile ? '16' : '36'}
                  borderRadius="xl"
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

export default CarouselMarqueeBanner;
