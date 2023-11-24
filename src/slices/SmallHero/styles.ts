import styled from '@emotion/styled';
import { BREAKPOINT_MD, BREAKPOINT_XL } from '@/constants/breakpoints';

export const HeadingContainer = styled.div`
  position: absolute;
  left: 0;
  top: 60%;
  width: 100vw;
  text-align: center;
  transform: translateY(-50%);
`;

export const ShapeContainer = styled.div`
  position: absolute;

  height: var(--boemly-sizes-sm);
  width: var(--boemly-sizes-sm);

  right: var(--boemly-space-24);
  bottom: 0;

  border-top-right-radius: 100%;
  & span,
  div {
    border-top-right-radius: 100%;
  }

  @media screen and (max-width: ${BREAKPOINT_XL}) {
    height: var(--boemly-sizes-2xs);
    width: var(--boemly-sizes-2xs);
  }

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    right: calc(var(--boemly-space-16) * -1);

    height: var(--boemly-sizes-3xs);
    width: var(--boemly-sizes-3xs);
  }
`;
