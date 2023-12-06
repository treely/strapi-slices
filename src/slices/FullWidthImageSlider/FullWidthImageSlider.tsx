import React, { useRef, useState } from 'react';
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
  ButtonsContainer,
  ItemContainer,
  SliderContainer,
  SliderInnerContainer,
  ImageContainer,
} from './styles';
import { getClosestRatio } from './utils';

export interface FullWidthImageSliderProps {
  slice: {
    images: {
      id: number;
      caption: string;
      img: StrapiImage;
    }[];
  };
}
export const FullWidthImageSlider: React.FC<FullWidthImageSliderProps> = ({
  slice,
}: FullWidthImageSliderProps) => {
  const containerRef = useRef(null);
  const [imageRef, { width: imageWidth }] = useMeasure<HTMLDivElement>();
  const { width: windowWidth } = useWindowSize();
  const [isMobile] = useMediaQuery(BREAKPOINT_MD_QUERY);

  const [sliderIndex, setSliderIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const allowScroll = windowWidth / 2 / imageWidth < slice.images.length;
  const canMoveRight = sliderIndex < slice.images.length - 1;
  const canMoveLeft = sliderIndex !== 0;

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

      <ButtonsContainer show={(allowScroll && !isOpen).toString()}>
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
      </ButtonsContainer>

      <FullScreenImage
        images={slice.images.map((image) => image.img)}
        openIndex={sliderIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </DefaultSectionContainer>
  );
};
