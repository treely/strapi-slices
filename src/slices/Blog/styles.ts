import styled from '@emotion/styled';
import { BREAKPOINT_MD } from '@/constants/breakpoints';

export const BlogItemContainer = styled.a`
  cursor: pointer;
  & div img {
    transition: transform var(--default-ease) var(--medium-transition-duration);
  }

  &:hover {
    & > div:first-of-type img {
      transform: scale(1.03);
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: var(--boemly-sizes-xs);
  position: relative;
  border-radius: var(--boemly-radii-2xl);

  // Fixes the flickering of borders during animation in Safari
  -webkit-mask-image: -webkit-radial-gradient(white, black);

  & span,
  div {
    border-radius: var(--boemly-radii-2xl);
  }

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    height: var(--boemly-sizes-3xs);
  }
`;
