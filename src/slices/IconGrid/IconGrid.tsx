import React from 'react';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import StrapiImage from '../../models/strapi/StrapiImage';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiLink from '../../models/strapi/StrapiLink';
import StrapiLinkButton from '../../components/StrapiLinkButton';

export interface IconGridProps {
  slice: {
    tagline?: string;
    title?: string;
    subTitle?: string;
    iconsWithTextAndButton: {
      id: number;
      title: string;
      text: string;
      icon: StrapiImage;
      button?: StrapiLink;
    }[];
  };
}

export const IconGrid = ({ slice }: IconGridProps): React.JSX.Element => {
  const columns = () => {
    if (slice.iconsWithTextAndButton.length === 2) {
      return [1, null, null, 2, 2];
    }
    if (slice.iconsWithTextAndButton.length === 1) {
      return 1;
    }
    return [1, null, null, 2, 3];
  };

  return (
    <DefaultSectionContainer>
      <Wrapper>
        {slice.title ? (
          <>
            <Flex alignItems="center" flexDirection="column">
              <DefaultSectionHeader
                tagline={slice.tagline}
                title={slice.title}
                text={slice.subTitle}
                taglineProps={{ maxW: '2xl', textAlign: 'center' }}
                titleProps={{ maxW: '3xl', textAlign: 'center' }}
                textProps={{ maxW: '3xl', textAlign: 'center' }}
              />
            </Flex>
            <Spacer height="20" />
          </>
        ) : (
          <></>
        )}

        <SimpleGrid
          columns={columns()}
          gap={slice.iconsWithTextAndButton.length === 2 ? '14' : '16'}
          rowGap={['16', null, null, '20']}
        >
          {slice.iconsWithTextAndButton.map((iconWithTextAndButton) => (
            <Box key={iconWithTextAndButton.id}>
              <Box
                margin="0 auto"
                backgroundColor="primary.50"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                width="6.5rem"
                height="6.5rem"
              >
                <Box position="absolute" width="12" height="12">
                  <Image
                    src={strapiMediaUrl(
                      iconWithTextAndButton.icon.img,
                      'xSmall'
                    )}
                    alt={iconWithTextAndButton.icon.alt}
                    fill
                    style={{
                      objectFit:
                        iconWithTextAndButton.icon.objectFit || 'contain',
                    }}
                  />
                </Box>
              </Box>
              <Heading size="xl" textAlign="center" mb="4" mt="8">
                {iconWithTextAndButton.title}
              </Heading>
              <Text size="mdRegularNormal" textAlign="center">
                {iconWithTextAndButton.text}
              </Text>
              {iconWithTextAndButton.button && (
                <Box textAlign="center">
                  <StrapiLinkButton
                    key={iconWithTextAndButton.button.id}
                    mt="8"
                    size="md"
                    variant="outline"
                    link={iconWithTextAndButton.button}
                    component="IconGrid"
                  />
                </Box>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
