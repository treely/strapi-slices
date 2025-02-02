import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { BREAKPOINT_MD } from '../../constants/breakpoints';
import { Box } from 'boemly';

export const CarouselContainer = styled(Box)`
  margin-top: var(--boemly-space-6);
  padding: var(--boemly-space-8) 0;

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    margin-top: var(--boemly-space-4);
    width: var(--boemly-sizes-full);
  }

  width: var(--boemly-sizes-full);

  overflow-x: hidden;

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    overflow-x: scroll;
  }
`;

interface CarouselInnerContainerProps {
  numberOfItems: number;
}
export const CarouselInnerContainer = styled(
  motion.div
)<CarouselInnerContainerProps>`
  display: flex;
  gap: var(--boemly-space-6);
  justify-content: center;

  width: calc(
    (var(--boemly-sizes-sm) + var(--boemly-space-6)) *
      ${({ numberOfItems }: CarouselInnerContainerProps) => numberOfItems} +
      var(--boemly-space-6)
  );
  min-width: var(--boemly-sizes-full);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    gap: var(--boemly-space-1);
    justify-content: flex-start;
    width: calc(
      (var(--boemly-sizes-2xs) + var(--boemly-space-4)) *
        ${({ numberOfItems }: CarouselInnerContainerProps) => numberOfItems} +
        var(--boemly-space-6)
    );
  }
`;

export const CardContainer = styled(Box)`
  width: var(--boemly-sizes-sm);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    min-width: var(--boemly-sizes-sm);

    margin-right: var(--boemly-space-4);

    &:first-of-type {
      margin-left: var(--boemly-space-6);
    }
  }
`;
