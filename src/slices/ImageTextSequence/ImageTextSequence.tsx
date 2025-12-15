import React, { Fragment } from 'react';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Heading,
  SimpleGrid,
  Text,
  useMediaQuery,
  useToken,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import { CaretRightIcon } from '@phosphor-icons/react';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import { BREAKPOINT_LG_QUERY } from '../../constants/breakpoints';
import StrapiDefaultHeader from '../../models/strapi/StrapiDefaultHeader';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLink from '../../models/strapi/StrapiLink';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import { CDN_URI } from '../../constants/api';

interface ImageTextSequenceSlice extends StrapiDefaultHeader {
  imageTextRows: {
    id: number;
    title: string;
    text: string;
    button?: StrapiLink;
    image: StrapiImage;
  }[];
  background?: boolean;
}
export interface ImageTextSequenceProps {
  slice: ImageTextSequenceSlice;
}

export const ImageTextSequence: React.FC<ImageTextSequenceProps> = ({
  slice,
}: ImageTextSequenceProps) => {
  const [oneColumnGrid] = useMediaQuery([BREAKPOINT_LG_QUERY]);
  const [primary50] = useToken('colors', ['primary.50']);
  const [gray700] = useToken('colors', ['gray.700']);

  return (
    <DefaultSectionContainer backgroundColor={primary50} title={slice.title}>
      {slice.background ? (
        <>
          <Box
            position="absolute"
            top="0"
            right="24"
            display={['none', null, null, 'unset']}
          >
            <Image
              src={`${CDN_URI}/assets/v3/strapi-slices/desktop-map-border.svg`}
              alt="Map"
              width="786"
              height="897"
            />
          </Box>
          <Box
            position="absolute"
            top="64"
            right="-14"
            display={['unset', null, null, 'none']}
          >
            <Image
              src={`${CDN_URI}/assets/v3/strapi-slices/mobile-map-border.svg`}
              alt="Map"
              width="227"
              height="452"
            />
          </Box>
        </>
      ) : (
        <></>
      )}
      <Wrapper>
        <Box position="relative" zIndex="1">
          <DefaultSectionHeader
            tagline={slice.tagline}
            title={slice.title}
            text={slice.text}
            taglineProps={{ textAlign: ['left', null, null, null, 'center'] }}
            titleProps={{
              maxW: '6xl',
              marginX: ['0', null, null, null, 'auto'],
              textAlign: ['left', null, null, null, 'center'],
            }}
            textProps={{
              maxW: '2xl',
              marginX: ['0', null, null, null, 'auto'],
              textAlign: ['left', null, null, null, 'center'],
              color: 'black',
            }}
          />

          <SimpleGrid
            gap="16"
            mt={['28', null, null, null, '40']}
            columns={[1, null, null, null, 2]}
          >
            {slice.imageTextRows.map(
              ({ id, title, text, button, image }, index) => {
                const imageBox = (
                  <Box>
                    <Box
                      position="relative"
                      width="full"
                      minHeight={['2xs', null, null, 'sm']}
                    >
                      <Image
                        src={strapiMediaUrl(image.img, 'large')}
                        alt={image.alt}
                        fill
                        style={{
                          objectFit: image.objectFit || 'contain',
                          borderRadius: 'var(--boemly-radii-xl)',
                        }}
                      />
                    </Box>
                  </Box>
                );
                return (
                  <Fragment key={id}>
                    {(oneColumnGrid || index % 2 !== 0) && imageBox}
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Heading as="h2" size="xl" mb="4">
                        {title}
                      </Heading>
                      <Text size="mdRegularNormal">{text}</Text>
                      {button && (
                        <StrapiLinkButton
                          mt="5"
                          link={button}
                          size="sm"
                          variant="outline"
                          rightIcon={
                            <CaretRightIcon size="10" color={gray700} />
                          }
                          component="ImageTextSequence"
                        />
                      )}
                    </Box>
                    {!oneColumnGrid && index % 2 === 0 && imageBox}
                  </Fragment>
                );
              }
            )}
          </SimpleGrid>
        </Box>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
