import React, { useContext } from 'react';
import {
  Box,
  ContactArea,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Grid,
  GridItem,
  TextCardWithIcon,
  useMediaQuery,
  useToken,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BREAKPOINT_LG_QUERY } from '../../constants/breakpoints';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import StrapiDefaultHeader from '../../models/strapi/StrapiDefaultHeader';
import StrapiContactArea from '../../models/strapi/StrapiContactArea';
import StrapiTextCardWithIcon from '../../models/strapi/StrapiTextCardWithIcons';
import StrapiImage from '../../models/strapi/StrapiImage';
import { AnalyticsContext } from '../../components/ContextProvider/ContextProvider';

interface TextWithTextCardsSlice extends StrapiDefaultHeader {
  cards: StrapiTextCardWithIcon[];
  contact?: StrapiContactArea;
  shape?: StrapiImage;
}
export interface TextWithTextCardsProps {
  slice: TextWithTextCardsSlice;
}

export const TextWithTextCards: React.FC<TextWithTextCardsProps> = ({
  slice,
}: TextWithTextCardsProps) => {
  const { push } = useRouter();
  const analyticsFunction = useContext(AnalyticsContext);
  const [white] = useToken('colors', ['white']);
  const [belowBreakpoint] = useMediaQuery([BREAKPOINT_LG_QUERY]);

  const handleContactButtonClick = () => {
    if (slice.contact?.button) {
      analyticsFunction?.({
        type: 'track',
        props: {
          action: 'click',
          component: 'TextWithTextCards',
          buttonText: slice.contact.button.text,
          buttonUrl: strapiLinkUrl(slice.contact.button),
          section: 'contact',
        },
      });
      push(strapiLinkUrl(slice.contact.button));
    }
  };

  return (
    <DefaultSectionContainer backgroundColor={white} title={slice.title}>
      <>
        {slice.shape && (
          <Box
            position="absolute"
            right={['-28', null, null, '-136']}
            top={['96', null, null, '-28']}
            width={['sm', null, null, '4xl']}
            height={['sm', null, null, '4xl']}
            borderBottomRightRadius="full"
          >
            <Image
              src={strapiMediaUrl(slice.shape.img, 'medium')}
              alt={slice.shape.alt}
              fill
              style={{
                objectFit: slice.shape.objectFit || 'cover',
                borderBottomRightRadius: 'var(--boemly-radii-full)',
              }}
            />
          </Box>
        )}
      </>
      <Wrapper>
        <>
          <Grid
            templateColumns={[
              'repeat(8, 1fr)',
              null,
              null,
              null,
              'repeat(16, 1fr)',
            ]}
            templateRows={[
              'repeat(2, auto)',
              null,
              null,
              null,
              'repeat(1, auto)',
            ]}
            rowGap="12"
          >
            <GridItem
              colSpan={[8, null, null, null, 9]}
              rowSpan={1}
              pr={['0', null, null, null, '32']}
            >
              <DefaultSectionHeader
                tagline={slice.tagline}
                title={slice.title}
                text={slice.text}
                textProps={{ pr: ['0', null, null, null, '10'] }}
              />

              {slice.contact && !belowBreakpoint && (
                <ContactArea
                  title={slice.contact.title}
                  text={slice.contact.text}
                  avatar={{
                    name: slice.contact.avatar.name,
                    description: slice.contact.avatar.description,
                    imageSrc: strapiMediaUrl(
                      slice.contact.avatar.image.img,
                      'small'
                    ),
                    imageAlt: slice.contact.avatar.image.alt,
                    imageObjectFit:
                      slice.contact.avatar.image.objectFit || 'cover',
                  }}
                  link={{
                    text: slice.contact.button.text,
                    onClick: handleContactButtonClick,
                  }}
                />
              )}
            </GridItem>
            <GridItem
              colSpan={[8, null, null, null, 7]}
              rowSpan={1}
              position="relative"
            >
              {slice.cards.map((card) => (
                <TextCardWithIcon
                  key={card.id}
                  title={card.title}
                  text={card.text}
                  icon={
                    <Image
                      src={strapiMediaUrl(card.icon.img, 'small')}
                      alt={card.icon.alt}
                      fill
                      style={{ objectFit: card.icon.objectFit || 'contain' }}
                    />
                  }
                />
              ))}
            </GridItem>
          </Grid>
          {slice.contact && belowBreakpoint && (
            <ContactArea
              title={slice.contact.title}
              text={slice.contact.text}
              avatar={{
                name: slice.contact.avatar.name,
                description: slice.contact.avatar.description,
                imageSrc: strapiMediaUrl(
                  slice.contact.avatar.image.img,
                  'small'
                ),
                imageAlt: slice.contact.avatar.image.alt,
                imageObjectFit: slice.contact.avatar.image.objectFit || 'cover',
              }}
              link={{
                text: slice.contact.button.text,
                onClick: handleContactButtonClick,
              }}
            />
          )}
        </>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
