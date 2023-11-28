import React from 'react';
import {
  DefaultSectionContainer,
  DefaultSectionHeader,
  Grid,
  GridItem,
  ProjectCard,
  Spacer,
  BoemlyList,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiLink from '../../models/strapi/StrapiLink';
import StrapiProjectCard from '../../models/strapi/StrapiProjectCard';
import StrapiLinkButton from '../../components/StrapiLinkButton';

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
}

export const TextWithCard: React.FC<TextWithCardProps> = ({
  slice,
}: TextWithCardProps) => {
  const card = (
    <GridItem
      colSpan={[4, null, null, null, 2]}
      rowSpan={1}
      position="relative"
      data-testid={`card-position-${slice.cardPosition}`}
    >
      {slice.card && (
        <ProjectCard
          facts={slice.card.facts}
          footerSubTitle={slice.card.footerSubTitle}
          footerTitle={slice.card.footerTitle}
          title={slice.card.title}
          image={
            <Image
              src={strapiMediaUrl(slice.card.image.img, 'medium')}
              alt={slice.card.image.alt}
              fill
              style={{ objectFit: slice.card.image.objectFit || 'cover' }}
            />
          }
        />
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
