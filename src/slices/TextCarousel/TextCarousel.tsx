import React, { useContext, useMemo, useRef, useState } from 'react';
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
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import { useRouter } from 'next/router';

interface TextCarouselSlice extends StrapiDefaultHeader {
  slides: StrapiTextCardWithIcon[];
  button?: StrapiLink;
}
export interface TextCarouselProps {
  slice: TextCarouselSlice;
}

const ITEM_GAP = 24;
const MAX_OFFSET_RIGHT = 55;

export const TextCarousel: React.FC<TextCarouselProps> = ({
  slice,
}: TextCarouselProps) => {
  const containerRef = useRef(null);
  const [primary50] = useToken('colors', ['primary.50']);
  const [itemRef, { width: itemWidth }] = useMeasure<HTMLDivElement>();
  const { formatMessage } = useContext(IntlContext);
  const { width: windowWidth } = useWindowSize();
  const { push } = useRouter();

  const [sliderIndex, setSliderIndex] = useState(0);

  const numberOfItems = useMemo(
    () => slice.slides.length,
    [slice.slides.length]
  );

  const sliderItemsWidth = useMemo(
    () => numberOfItems * (itemWidth + ITEM_GAP) - ITEM_GAP,
    [itemWidth, numberOfItems]
  );

  const offsetLeft = useMemo(
    () => sliderIndex * (itemWidth + ITEM_GAP) * -1,
    [sliderIndex, itemWidth]
  );

  const allowScroll = useMemo(
    () => sliderItemsWidth + ITEM_GAP * 2 > windowWidth,

    [sliderItemsWidth, windowWidth]
  );

  const canMoveRight = useMemo(() => {
    const offsetRight = windowWidth - (sliderItemsWidth + offsetLeft);

    return offsetRight < MAX_OFFSET_RIGHT;
  }, [itemWidth, sliderIndex, sliderItemsWidth, windowWidth]);

  const canMoveLeft = useMemo(() => sliderIndex !== 0, [sliderIndex]);

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
            numberOfItems={slice.slides.length}
            animate={{
              x: offsetLeft,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            {slice.slides.map(({ id, title, text, icon, image, button }) => (
              <CardContainer key={id} ref={itemRef}>
                <TextCardWithIcon
                  title={title}
                  text={text}
                  height="full"
                  icon={
                    <Image
                      src={strapiMediaUrl(icon.img, 'small')}
                      alt={icon.alt}
                      fill
                      style={{ objectFit: icon.objectFit || 'contain' }}
                    />
                  }
                  image={
                    image && (
                      <Image
                        src={strapiMediaUrl(image?.img, 'medium')}
                        alt={image?.alt}
                        fill
                        style={{
                          objectFit: image?.objectFit || 'cover',
                          borderRadius: 'var(--boemly-radii-xl)',
                        }}
                      />
                    )
                  }
                  button={
                    button && {
                      text: button.text,
                      onClick: () => push(strapiLinkUrl(button)),
                    }
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
                    boxShadow="md"
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
