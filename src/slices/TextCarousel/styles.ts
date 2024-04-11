import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { BREAKPOINT_MD } from '../../constants/breakpoints';
import { Box } from 'boemly';

export const CarouselContainer = styled(Box)`
  margin-top: var(--boemly-space-6);
  padding: var(--boemly-space-8) 0;

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    margin-top: var(--boemly-space-4);
    width: var(--boemly-size-full);
  }

  width: var(--boemly-size-full);

  overflow-x: hidden;

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    overflow-x: scroll;
  }
`;

interface CarouselInnerContainerProps {
  numberofitems: number;
}
export const CarouselInnerContainer = styled(
  motion.div
)<CarouselInnerContainerProps>`
  display: flex;
  justify-content: center;
  width: calc(
    (var(--boemly-sizes-sm) + var(--boemly-space-16)) *
      ${({ numberofitems }: CarouselInnerContainerProps) => numberofitems} +
      var(--boemly-space-16)
  );
  min-width: var(--boemly-sizes-full);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    justify-content: flex-start;
    width: calc(
      (var(--boemly-sizes-2xs) + var(--boemly-space-4)) *
        ${({ numberofitems }: CarouselInnerContainerProps) => numberofitems} +
        var(--boemly-space-6)
    );
  }
`;

interface CardContainerProps {
  numberofitems: number;
}
export const CardContainer = styled(Box)<CardContainerProps>`
  width: ${({ numberofitems }: CardContainerProps) =>
    numberofitems === 3 ? 'var(--boemly-sizes-xl)' : 'var(--boemly-sizes-sm)'};

  margin-right: var(--boemly-space-6);

  &:first-of-type {
    margin-left: var(--boemly-space-6);
  }

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    width: var(--boemly-sizes-2xs);

    margin-right: var(--boemly-space-4);

    &:first-of-type {
      margin-left: var(--boemly-space-6);
    }
  }
`;
