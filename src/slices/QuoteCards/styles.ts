import styled from '@emotion/styled';

interface QuoteCardsContainerProps {
  withHero: boolean;
}

export const QuoteCardsContainer = styled.div<QuoteCardsContainerProps>`
  position: relative;
  padding-top: var(--boemly-space-28);
  padding-bottom: ${({ withHero }) =>
    withHero ? 'var(--boemly-space-80)' : 'var(--boemly-space-28)'};
`;

export const QuoteCardHeroContainer = styled.div`
  margin-top: calc(var(--boemly-space-40) * -1);
  padding-bottom: var(--boemly-space-28);
`;
