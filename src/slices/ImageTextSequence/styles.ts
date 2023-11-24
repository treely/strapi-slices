import styled from '@emotion/styled';
import { BREAKPOINT_LG } from '@/constants/breakpoints';

export const DesktopMapContainer = styled.div`
  position: absolute;
  top: 0;
  right: var(--boemly-space-24);

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    display: none;
  }
`;

export const MobileMapContainer = styled.div`
  position: absolute;
  top: var(--boemly-space-64);
  right: calc(var(--boemly-space-14) * -1);
  display: none;

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    display: unset;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: var(--boemly-sizes-sm);

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    min-height: var(--boemly-sizes-2xs);
  }
`;
