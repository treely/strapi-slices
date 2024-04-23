import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { BREAKPOINT_MD } from '../../constants/breakpoints';
import { Box } from 'boemly';

export const SliderContainer = styled(Box)`
  --mobile-image-width: calc(100vw - var(--boemly-space-24));
  --desktop-image-width: var(--boemly-sizes-md);

  width: var(--boemly-size-full);

  overflow-x: hidden;

  padding-left: max(
    var(--boemly-space-8),
    calc(50vw - var(--boemly-sizes-7xl) / 2 + var(--boemly-space-6))
  );

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    overflow-x: scroll;
    padding-left: max(
      var(--boemly-space-8),
      calc(50vw - var(--boemly-sizes-7xl) / 2 + var(--boemly-space-8))
    );
  }
`;

interface SliderInnerContainerProps {
  imageCount: number;
}
export const SliderInnerContainer = styled(
  motion.div
)<SliderInnerContainerProps>`
  display: flex;
  gap: var(--boemly-space-6);

  width: fit-content;
`;

export const ItemContainer = styled(Box)`
  width: var(--desktop-image-width);

  :last-of-type {
    margin-right: var(--boemly-space-8);
  }

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    width: var(--mobile-image-width);
  }
`;

interface ImageContainerProps {
  aspectRatio: number;
}
export const ImageContainer = styled(Box)<ImageContainerProps>`
  position: relative;

  max-height: var(--boemly-sizes-xl);
  height: calc(
    var(--desktop-image-width) /
      ${({ aspectRatio }: ImageContainerProps) => aspectRatio}
  );
  width: var(--desktop-image-width);

  border-radius: var(--boemly-radii-xl);

  & img {
    border-radius: var(--boemly-radii-xl);
  }

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    height: calc(
      var(--mobile-image-width) /
        ${({ aspectRatio }: ImageContainerProps) => aspectRatio}
    );
    width: var(--mobile-image-width);
  }
`;
