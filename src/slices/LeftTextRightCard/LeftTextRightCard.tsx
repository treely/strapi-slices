import {
  DefaultSectionContainer,
  DefaultSectionHeader,
  Grid,
  GridItem,
  PortfolioCard,
  Spacer,
  BoemlyList,
  Wrapper,
} from 'boemly';
import { ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import strapiLinkUrl from '@/utils/strapiLinkUrl';
import strapiMediaUrl from '@/utils/strapiMediaUrl';
import StrapiPortfolioCard from '@/models/strapi/StrapiPortfolioCard';
import StrapiDefaultHeader from '@/models/strapi/StrapiDefaultHeader';
import StrapiLink from '@/models/strapi/StrapiLink';
import StrapiLinkButton from '@/components/StrapiLinkButton';

interface LeftTextRightCardSlice extends StrapiDefaultHeader {
  checkMarkLabels?: {
    id: number;
    text: string;
  }[];
  button?: StrapiLink;
  card?: StrapiPortfolioCard;
}
export interface LeftTextRightCardProps {
  slice: LeftTextRightCardSlice;
}

export const LeftTextRightCard: React.FC<LeftTextRightCardProps> = ({
  slice,
}: LeftTextRightCardProps) => {
  const { push } = useRouter();

  return (
    <DefaultSectionContainer title={slice.title}>
      <Wrapper>
        <Grid
          templateColumns={[
            'repeat(8, 1fr)',
            null,
            null,
            null,
            'repeat(12, 1fr)',
          ]}
          templateRows={['repeat(2, 1fr)', null, null, null, 'repeat(1, 1fr)']}
          rowGap="12"
        >
          <GridItem colSpan={8} rowSpan={1} pr={['0', null, null, null, '28']}>
            <DefaultSectionHeader
              tagline={slice.tagline}
              title={slice.title}
              text={slice.text}
            />

            {slice.checkMarkLabels && (
              <>
                <Spacer height="10" />
                <BoemlyList listItems={slice.checkMarkLabels} />
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
          <GridItem
            colSpan={[8, null, null, null, 4]}
            rowSpan={1}
            position="relative"
          >
            {slice.card && (
              <PortfolioCard
                title={slice.card.title}
                button={
                  slice.card.button && {
                    text: slice.card.button.text,
                    onClick: () => push(strapiLinkUrl(slice.card?.button)),
                  }
                }
                facts={slice.card.facts}
                image={
                  <Image
                    src={strapiMediaUrl(slice.card.image.img, 'medium')}
                    alt={slice.card.image.alt}
                    fill
                    style={{ objectFit: slice.card.image.objectFit || 'cover' }}
                  />
                }
                portfolioNumber={slice.card.portfolioNumber}
              />
            )}
          </GridItem>
        </Grid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
