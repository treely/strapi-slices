import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { BREAKPOINT_MD } from '../../constants/breakpoints';

interface CarouselInnerContainerProps {
  logoCount: number;
}

export const CarouselInnerContainer = styled(
  motion.div
)<CarouselInnerContainerProps>`
  display: flex;
  justify-content: ${(props) =>
    props.logoCount < 5 ? 'center' : 'flex-start'};
  gap: var(--boemly-space-6);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    width: calc(
      ${(props) => props.logoCount} *
        (var(--boemly-sizes-16) + var(--boemly-space-6))
    );
    justify-content: ${(props) =>
      props.logoCount < 5 ? 'center' : 'flex-start'};
  }
`;