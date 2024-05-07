import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BoemlyModal, Flex, IconButton } from 'boemly';
import { useKey, useLockBodyScroll } from 'react-use';
import StrapiImage from '../../models/strapi/StrapiImage';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import ZoomableImage from './ZoomableImage';

export interface FullScreenImageProps {
  images: StrapiImage[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex?: number;
  setCurrentIndex?: (callback: (c: number) => number) => void;
}

export const FullScreenImage = ({
  images,
  isOpen,
  onClose,
  currentIndex = 0,
  setCurrentIndex,
}: FullScreenImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);

  const canMoveRight = useMemo(
    () => currentIndex < images.length - 1,
    [currentIndex, images.length]
  );
  const canMoveLeft = useMemo(() => currentIndex !== 0, [currentIndex]);

  const onRight = useCallback(
    () => canMoveRight && setCurrentIndex && setCurrentIndex((c) => c + 1),
    [canMoveRight]
  );
  const onLeft = useCallback(
    () => canMoveLeft && setCurrentIndex && setCurrentIndex((c) => c - 1),
    [canMoveLeft]
  );

  useKey('ArrowRight', onRight, {}, [onRight]);
  useKey('ArrowLeft', onLeft, {}, [onLeft]);

  useEffect(() => {
    if (!!isOpen) {
      setTimeout(() => {
        containerRef?.current?.scrollTo({
          left: currentIndex * containerRef.current.clientWidth,
          behavior: 'instant',
        });
      }, 10);
    }
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: currentIndex * containerRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, containerRef]);

  return (
    <BoemlyModal
      onClose={onClose}
      isOpen={isOpen}
      title=""
      trigger=""
      size="full"
      content={
        <Flex
          position="absolute"
          insetY="16"
          insetX="0"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            ref={containerRef}
            flexGrow="1"
            flexBasis="100%"
            flexShrink="1"
            gap="4"
            marginX="24"
            scrollSnapType="x mandatory"
            overflow="hidden"
            position="relative"
            height="full"
            width="full"
          >
            {images.map((image) => (
              <ZoomableImage key={image.id} image={image} />
            ))}
          </Flex>

          <Flex
            position="absolute"
            inset="6"
            justifyContent="space-between"
            alignItems="center"
            pointerEvents="none"
          >
            <IconButton
              visibility={canMoveLeft ? 'visible' : 'hidden'}
              onClick={onLeft}
              icon={<CaretLeft size={16} />}
              aria-label="Previous picture"
              variant="outline"
              pointerEvents="all"
              mr="6"
            />

            <IconButton
              visibility={canMoveRight ? 'visible' : 'hidden'}
              onClick={onRight}
              icon={<CaretRight size={16} />}
              aria-label="Next picture"
              variant="outline"
              pointerEvents="all"
              ml="4"
            />
          </Flex>
        </Flex>
      }
    />
  );
};
