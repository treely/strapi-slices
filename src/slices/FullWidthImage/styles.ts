import styled from '@emotion/styled';
import { BREAKPOINT_MD } from '@/constants/breakpoints';

export const ImageContainer = styled.div`
  position: relative;

  margin-top: var(--boemly-space-20);
  height: var(--boemly-sizes-xl);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    height: var(--boemly-sizes-3xs);
  }

  & img {
    border-radius: var(--boemly-radii-2xl);
  }
`;
