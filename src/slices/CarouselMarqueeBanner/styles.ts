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
  gap: var(--boemly-space-24);
  padding-right: var(--boemly-space-24);
  padding-left: var(--boemly-space-24);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    width: calc(
      ${(props) => props.logoCount} *
        (var(--boemly-sizes-16) + var(--boemly-space-6))
    );
    justify-content: ${(props) =>
      props.logoCount < 5 ? 'center' : 'flex-start'};
  }
`;

export const LogoGrid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--boemly-space-24);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--boemly-space-6);
  }
`;
