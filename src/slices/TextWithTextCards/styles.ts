import styled from '@emotion/styled';
import { BREAKPOINT_LG } from '@/constants/breakpoints';

export const ShapeContainer = styled.div`
  position: absolute;
  right: calc(var(--boemly-space-136) * -1);
  top: calc((var(--boemly-space-28)) * -1);

  width: var(--boemly-sizes-4xl);
  height: var(--boemly-sizes-4xl);

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    width: var(--boemly-sizes-sm);
    height: var(--boemly-sizes-sm);

    right: calc(var(--boemly-space-28) * -1);
    top: var(--boemly-space-96);
  }

  border-bottom-right-radius: var(--boemly-radii-full);

  & span,
  div {
    border-bottom-right-radius: var(--boemly-radii-full);
  }
`;
