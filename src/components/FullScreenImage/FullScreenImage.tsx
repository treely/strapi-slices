import { BoemlyModal, Flex, IconButton } from 'boemly';
import { useKey, useLockBodyScroll } from 'react-use';
import StrapiImage from '@/models/strapi/StrapiImage';
import { useEffect, useRef, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import ZoomableImage from './ZoomableImage';

export interface FullScreenImageProps {
  images: StrapiImage[];
  isOpen: boolean;
  onClose: () => void;
  openIndex?: number;
}

export const FullScreenImage = ({
  images,
  isOpen,
  onClose,
  openIndex,
}: FullScreenImageProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);

  const canMoveRight = imageIndex < images.length - 1;
  const canMoveLeft = imageIndex !== 0;

  const onRight = () => setImageIndex((p) => (canMoveRight ? p + 1 : p));
  const onLeft = () => setImageIndex((p) => (canMoveLeft ? p - 1 : p));

  useKey('ArrowRight', onRight, {}, [onRight]);
  useKey('ArrowLeft', onLeft, {}, [onLeft]);

  useEffect(() => {
    if (openIndex !== undefined) {
      setImageIndex(openIndex);
    }
  }, [openIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: imageIndex * containerRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  }, [imageIndex, containerRef]);

  const onCloseLocal = () => {
    setImageIndex(0);
    onClose();
  };

  return (
    <BoemlyModal
      onClose={onCloseLocal}
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
