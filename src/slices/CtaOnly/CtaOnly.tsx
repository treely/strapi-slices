import React from 'react';
import { Box, Wrapper } from 'boemly';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiLink from '../../models/strapi/StrapiLink';

export interface CtaOnlyProps {
  slice: {
    button: StrapiLink;
  };
}

export const CtaOnly: React.FC<CtaOnlyProps> = ({ slice }: CtaOnlyProps) => (
  <Wrapper>
    <Box position="absolute" top="-28" transform="translateY(50%)">
      <StrapiLinkButton size="md" link={slice.button} />
    </Box>
  </Wrapper>
);
