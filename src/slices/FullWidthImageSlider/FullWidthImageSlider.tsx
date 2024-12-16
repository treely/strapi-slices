import React, { useMemo, useRef, useState } from 'react';
import {
  Box,
  IconButton,
  DefaultSectionContainer,
  Flex,
  Text,
  useMediaQuery,
} from 'boemly';
import Image from 'next/image';
import { useMeasure, useWindowSize } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import StrapiImage from '../../models/strapi/StrapiImage';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import FullScreenImage from '../../components/FullScreenImage';
import { BREAKPOINT_MD_QUERY } from '../../constants/breakpoints';
import {
  ItemContainer,
  SliderContainer,
  SliderInnerContainer,
  ImageContainer,
} from './styles';
import { getClosestRatio } from '../../utils/getClosestRatio';

export interface FullWidthImageSliderProps {
  slice: {
    images: {
      id: number;
      caption: string;
      img: StrapiImage;
    }[];
  };
}

const ITEM_GAP = 24;
const MAX_OFFSET_RIGHT = 162;

export const FullWidthImageSlider: React.FC<FullWidthImageSliderProps> = ({
  slice,
}: FullWidthImageSliderProps) => {
  const containerRef = useRef(null);
  const [imageRef, { width: imageWidth }] = useMeasure<HTMLDivElement>();
  const { width: windowWidth } = useWindowSize();
  const [isMobile] = useMediaQuery(BREAKPOINT_MD_QUERY);

  const [sliderIndex, setSliderIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const numberOfItems = useMemo(
    () => slice.images.length,
    [slice.images.length]
  );

  const sliderItemsWidth = useMemo(
    () => numberOfItems * (imageWidth + ITEM_GAP) - ITEM_GAP,
    [imageWidth, numberOfItems]
  );

  const offsetLeft = useMemo(
    () => sliderIndex * (imageWidth + ITEM_GAP) * -1,
    [sliderIndex, imageWidth]
  );

  const allowScroll = useMemo(
    () => sliderItemsWidth + ITEM_GAP * 3 > windowWidth,

    [sliderItemsWidth, windowWidth]
  );

  const canMoveRight = useMemo(() => {
    const offsetRight = windowWidth - (sliderItemsWidth + offsetLeft);

    return offsetRight < MAX_OFFSET_RIGHT;
  }, [imageWidth, sliderIndex, sliderItemsWidth, windowWidth]);

  const canMoveLeft = useMemo(() => sliderIndex !== 0, [sliderIndex]);

  return (
    <DefaultSectionContainer>
      <SliderContainer ref={containerRef}>
        <SliderInnerContainer
          animate={{
            x: imageWidth * -sliderIndex,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          imageCount={slice.images.length}
        >
          {slice.images.map((image, index) => (
            <ItemContainer key={image.id} ref={imageRef}>
              <Flex
                height="full"
                width="full"
                justifyContent="end"
                flexDirection="column"
                gap="2"
              >
                <ImageContainer
                  aspectRatio={getClosestRatio(
                    image.img.img.data.attributes.width,
                    image.img.img.data.attributes.height
                  )}
                >
                  <Image
                    src={strapiMediaUrl(image.img.img, 'large')}
                    alt={image.img.alt}
                    fill
                    style={{
                      objectFit: image.img.objectFit || 'cover',
                      cursor: isMobile ? 'unset' : 'pointer',
                    }}
                    onClick={() => {
                      setSliderIndex(index);
                      if (!isMobile) setIsOpen(true);
                    }}
                  />
                </ImageContainer>
                <Text height="6">{image.caption}</Text>
              </Flex>
            </ItemContainer>
          ))}
        </SliderInnerContainer>
      </SliderContainer>

      <Box
        display={['none', null, null, !!allowScroll ? 'flex' : 'none']}
        pointerEvents="none"
        position="absolute"
        top="calc(50% - var(--boemly-sizes-12))"
        left="0"
        width="full"
        py="0"
        px="32"
        justifyContent="space-between"
      >
        <Box>
          <AnimatePresence>
            {canMoveLeft && (
              <IconButton
                key="leftButton"
                as={motion.button}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                size="lg"
                variant="outline"
                onClick={() => setSliderIndex(sliderIndex - 1)}
                aria-label="Move left"
                icon={<ArrowLeft size={16} />}
                pointerEvents="auto"
              />
            )}
          </AnimatePresence>
        </Box>
        <Box>
          <AnimatePresence>
            {canMoveRight && (
              <IconButton
                key="rightButton"
                as={motion.button}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                size="lg"
                variant="outline"
                onClick={() => setSliderIndex(sliderIndex + 1)}
                aria-label="Move right"
                icon={<ArrowRight size={16} />}
                pointerEvents="auto"
              />
            )}
          </AnimatePresence>
        </Box>
      </Box>

      <FullScreenImage
        images={slice.images.map((image) => image.img)}
        currentIndex={sliderIndex}
        setCurrentIndex={setSliderIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </DefaultSectionContainer>
  );
};
