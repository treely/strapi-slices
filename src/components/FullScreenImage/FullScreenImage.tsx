import { useCallback, useEffect, useMemo, useRef } from 'react';
import { BoemlyModal, Flex, IconButton } from 'boemly';
import { useScrollLock } from '@reactuses/core';
import StrapiImage from '../../models/strapi/StrapiImage';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
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

  const [, setLocked] = useScrollLock(
    typeof document !== 'undefined' ? document.body : null
  );
  useEffect(() => {
    setLocked(isOpen);
    return () => {
      setLocked(false);
    };
  }, [isOpen, setLocked]);

  const canMoveRight = useMemo(
    () => currentIndex < images.length - 1,
    [currentIndex, images.length]
  );
  const canMoveLeft = useMemo(() => currentIndex !== 0, [currentIndex]);

  const onRight = useCallback(
    () => canMoveRight && setCurrentIndex && setCurrentIndex((c) => c + 1),
    [canMoveRight, setCurrentIndex]
  );
  const onLeft = useCallback(
    () => canMoveLeft && setCurrentIndex && setCurrentIndex((c) => c - 1),
    [canMoveLeft, setCurrentIndex]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onRight();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onLeft();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onRight, onLeft]);

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
      onOpenChange={(isModalOpen) => {
        if (!isModalOpen) {
          onClose();
        }
      }}
      open={isOpen}
      title=""
      trigger={<span style={{ display: 'none' }} />}
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
              aria-label="Previous picture"
              variant="outline"
              pointerEvents="all"
              mr="6"
            >
              <CaretLeftIcon size={16} />
            </IconButton>
            <IconButton
              visibility={canMoveRight ? 'visible' : 'hidden'}
              onClick={onRight}
              aria-label="Next picture"
              variant="outline"
              pointerEvents="all"
              ml="4"
            >
              <CaretRightIcon size={16} />
            </IconButton>
          </Flex>
        </Flex>
      }
    />
  );
};
