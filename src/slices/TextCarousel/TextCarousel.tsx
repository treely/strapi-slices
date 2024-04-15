import React, { useContext, useRef, useState } from 'react';
import {
  Box,
  Center,
  DefaultSectionContainer,
  DefaultSectionHeader,
  IconButton,
  TextCardWithIcon,
  useToken,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiDefaultHeader from '../../models/strapi/StrapiDefaultHeader';
import StrapiLink from '../../models/strapi/StrapiLink';
import StrapiTextCardWithIcon from '../../models/strapi/StrapiTextCardWithIcons';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import {
  CardContainer,
  CarouselContainer,
  CarouselInnerContainer,
} from './styles';
import { useMeasure, useWindowSize } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { IntlContext } from '../../components/ContextProvider';

interface TextCarouselSlice extends StrapiDefaultHeader {
  slides: StrapiTextCardWithIcon[];
  button?: StrapiLink;
}
export interface TextCarouselProps {
  slice: TextCarouselSlice;
}

export const TextCarousel: React.FC<TextCarouselProps> = ({
  slice,
}: TextCarouselProps) => {
  const [primary50] = useToken('colors', ['primary.50']);
  const [slideRef, { width: slideWidth }] = useMeasure<HTMLDivElement>();
  const { formatMessage } = useContext(IntlContext);

  const containerRef = useRef(null);

  const { width: windowWidth } = useWindowSize();

  const [sliderIndex, setSliderIndex] = useState(0);

  const allowScroll = windowWidth / 2 / slideWidth < slice.slides.length;
  const canMoveRight = sliderIndex < slice.slides.length - 1;
  const canMoveLeft = sliderIndex !== 0;
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
      </Wrapper>

      <CarouselContainer ref={containerRef}>
        <Box position="relative" width="full">
          <CarouselInnerContainer
            numberofitems={slice.slides.length}
            animate={{
              x: slideWidth * -sliderIndex,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            {slice.slides.map(({ id, title, text, icon }) => (
              <CardContainer
                key={id}
                ref={slideRef}
                numberofitems={slice.slides.length}
              >
                <TextCardWithIcon
                  title={title}
                  text={text}
                  icon={
                    <Image
                      src={strapiMediaUrl(icon.img, 'small')}
                      alt={icon.alt}
                      fill
                      style={{ objectFit: icon.objectFit || 'contain' }}
                    />
                  }
                  displayAs="column"
                />
              </CardContainer>
            ))}
          </CarouselInnerContainer>
          <Box
            display={['none', null, null, !!allowScroll ? 'flex' : 'none']}
            pointerEvents="none"
            position="absolute"
            top="40%"
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
                    aria-label={formatMessage({
                      id: 'sections.textCarousel.moveLeft',
                    })}
                    icon={<ArrowLeft size={16} />}
                    pointerEvents="auto"
                    boxShadow="sm"
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
                    aria-label={formatMessage({
                      id: 'sections.textCarousel.moveRight',
                    })}
                    icon={<ArrowRight size={16} />}
                    pointerEvents="auto"
                    boxShadow="md"
                  />
                )}
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </CarouselContainer>

      <>
        {slice.button && (
          <Wrapper>
            <Center>
              <StrapiLinkButton
                link={slice.button}
                size="xl"
                mt={['8', null, '14']}
              />
            </Center>
          </Wrapper>
        )}
      </>
    </DefaultSectionContainer>
  );
};
