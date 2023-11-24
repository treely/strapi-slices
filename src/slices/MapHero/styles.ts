import styled from '@emotion/styled';
import { BREAKPOINT_LG } from '@/constants/breakpoints';

export const MapHeroContainer = styled.div`
  position: relative;
  width: 100vw;
  height: var(--default-hero-height);
  min-height: var(--boemly-sizes-3xl);
  background-color: var(--boemly-colors-primary-50);
  overflow: hidden;
  z-index: var(--boemly-zIndices-base);

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    height: auto;
  }
`;

export const MapHeroTextContainer = styled.div`
  position: absolute;
  width: 100vw;
  top: 56%;
  left: 0;
  transform: translateY(-50%);
  z-index: var(--boemly-zIndices-aboveBase);

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    position: relative;
    transform: unset;

    padding-top: var(--boemly-space-32);
  }
`;

export const ShapeContainer = styled.div`
  position: absolute;
  bottom: calc(var(--boemly-space-8) * -1);
  left: 0;

  width: var(--boemly-sizes-sm);
  height: var(--boemly-sizes-sm);

  border-top-right-radius: var(--boemly-radii-full);

  & span,
  div {
    border-top-right-radius: var(--boemly-radii-full);
  }

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    display: none;
  }
`;

export const MapContainer = styled.div`
  position: absolute;

  width: 50%;
  height: 100%;

  right: 0;
  top: 0;

  & img {
    object-fit: cover !important;
  }

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    width: 100%;
    height: var(--boemly-sizes-4xl);
    position: relative;
    margin-top: calc(var(--boemly-space-72) * -1);
    background-color: var(--boemly-colors-white);

    & img {
      object-fit: contain !important;
    }
  }
`;

export const MapGradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  background: linear-gradient(
    90deg,
    var(--boemly-colors-primary-50) 0%,
    var(--boemly-colors-primary-50) 10%,
    rgba(243, 246, 245, 0.6) 28%,
    rgba(243, 246, 245, 0) 40%,
    rgba(243, 246, 245, 0) 100%
  );

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    background: linear-gradient(
      180deg,
      var(--boemly-colors-primary-50) 0%,
      var(--boemly-colors-primary-50) 36%,
      rgba(243, 246, 245, 0.12) 46%,
      rgba(243, 246, 245, 0) 100%
    );
  }
`;
