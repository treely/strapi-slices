import React from 'react';
import { DefaultSectionContainer, Wrapper } from 'boemly';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiLink from '../../models/strapi/StrapiLink';

export interface CtaOnlyProps {
  slice: {
    button: StrapiLink;
  };
}

export const CtaOnly: React.FC<CtaOnlyProps> = ({ slice }: CtaOnlyProps) => (
  <DefaultSectionContainer>
    <Wrapper>
      <StrapiLinkButton size="md" link={slice.button} component="CtaOnly" />
    </Wrapper>
  </DefaultSectionContainer>
);
