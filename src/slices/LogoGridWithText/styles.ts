import styled from '@emotion/styled';
import { BREAKPOINT_LG } from '@/constants/breakpoints';

export const LogoFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--boemly-space-28);

  @media screen and (max-width: ${BREAKPOINT_LG}) {
    gap: var(--boemly-space-12);
  }
`;
