import React from 'react';
import {
  DefaultSectionContainer,
  DefaultSectionHeader,
  Grid,
  GridItem,
  Spacer,
  BoemlyList,
  Wrapper,
} from 'boemly';
import { ArrowRight } from '@phosphor-icons/react';
import StrapiLink from '../../models/strapi/StrapiLink';
import StrapiProjectCard from '../../models/strapi/StrapiProjectCard';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import PortfolioProject from '../../models/PortfolioProject';
import PortfolioProjectCard from '../../components/portfolio/PortfolioProjectCard';

interface TextWithCardSlice {
  tagline?: string;
  title: string;
  text?: string;
  listItems?: {
    id: number;
    text: string;
  }[];
  button?: StrapiLink;
  card?: StrapiProjectCard;
  cardPosition: 'left' | 'right';
}
export interface TextWithCardProps {
  slice: TextWithCardSlice;
  projects: PortfolioProject[];
}

export const TextWithCard: React.FC<TextWithCardProps> = ({
  slice,
  projects,
}: TextWithCardProps) => {
  const fpmData = projects.find(
    (project) => project.slug === slice.card?.project?.data.attributes.slug
  );

  const card = (
    <GridItem
      colSpan={[4, null, null, null, 2]}
      rowSpan={1}
      position="relative"
      data-testid={`card-position-${slice.cardPosition}`}
    >
      {slice.card && fpmData && (
        <PortfolioProjectCard project={{ ...slice.card, ...fpmData }} />
      )}
    </GridItem>
  );

  return (
    <DefaultSectionContainer title={slice.title}>
      <Wrapper>
        <Grid
          templateColumns={[
            'repeat(4, auto)',
            null,
            null,
            null,
            'repeat(6, auto)',
          ]}
          templateRows={[
            'repeat(2, auto)',
            null,
            null,
            null,
            'repeat(1, auto)',
          ]}
          rowGap="12"
          columnGap={['0', null, null, null, '28']}
        >
          {slice.cardPosition === 'left' && card}
          <GridItem colSpan={4} rowSpan={1} position="relative">
            <DefaultSectionHeader
              tagline={slice.tagline}
              title={slice.title}
              text={slice.text}
            />

            {slice.listItems && (
              <>
                <Spacer height="10" />
                <BoemlyList listItems={slice.listItems} />
                <Spacer height="10" />
              </>
            )}

            {slice.button && (
              <StrapiLinkButton
                link={slice.button}
                size="md"
                colorScheme="white"
                variant="outline"
                rightIcon={<ArrowRight />}
              />
            )}
          </GridItem>
          {slice.cardPosition === 'right' && card}
        </Grid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
