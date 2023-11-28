import StrapiImage from '../../models/strapi/StrapiImage';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import { Box } from 'boemly';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';

interface ZoomableImageProps {
  image: StrapiImage;
  zoom?: number;
}

const ZoomableImage = ({ image, zoom = 200 }: ZoomableImageProps) => {
  // define and set default values to the states of the component
  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState('50% 50%');

  const imageSrc = strapiMediaUrl(image.img, 'xLarge');

  const zoomInPosition = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // This will handle the calculations of the area where the image needs to zoom in depending on the user interaction
    const zoomer = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - zoomer.x) / zoomer.width) * 100;
    const y = ((e.clientY - zoomer.y) / zoomer.height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const toggleZoomImage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      // Zoom in and set the background position correctly
      setIsZoomed(true);
      zoomInPosition(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    toggleZoomImage(e);
  };

  const handleMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isZoomed) {
      zoomInPosition(e);
    }
  };

  return (
    <>
      <Head>
        <link rel="prefetch" as="image" href={imageSrc} />
      </Head>
      <Box
        position="relative"
        display="inline-block"
        width="full"
        height="full"
        overflow="hidden"
        flexShrink="0"
        scrollSnapAlign="center"
        scrollSnapStop="always"
        draggable="false"
        cursor={isZoomed ? 'zoom-out' : 'zoom-in'}
        backgroundImage={isZoomed ? `url( ${imageSrc} )` : 'none'}
        backgroundSize={`${zoom}%`}
        backgroundPosition={backgroundPos}
        onClick={(e) => handleClick(e)}
        onMouseMove={(e) => handleMove(e)}
      >
        <Image
          src={imageSrc}
          alt={image.alt}
          fill
          style={{
            visibility: isZoomed ? 'hidden' : 'visible',
            objectFit: 'contain',
          }}
        />
      </Box>
    </>
  );
};

export default ZoomableImage;
