import React from 'react';
import {
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Heading,
  Spacer,
  Text,
  Wrapper,
} from 'boemly';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiLink from '../../models/strapi/StrapiLink';

export interface FactsProps {
  slice: {
    tagline?: string;
    title?: string;
    subTitle?: string;
    button?: StrapiLink;
    variant: 'gray' | 'green' | 'white';
    facts: { key: string; value: string }[];
  };
}

export const FACTS_COLOR_VARIANTS = {
  gray: {
    backgroundColor: 'primary.50',
    tagLineColor: 'primary.500',
    titleColor: 'black',
    subTitleColor: 'black',
    factKeyColor: 'gray.700',
    factValueColor: 'gray.700',
  },
  green: {
    backgroundColor: 'primary.800',
    tagLineColor: 'white',
    titleColor: 'white',
    subTitleColor: 'white',
    factKeyColor: 'whiteAlpha.900',
    factValueColor: 'white',
  },
  white: {
    backgroundColor: 'white',
    tagLineColor: 'primary.500',
    titleColor: 'black',
    subTitleColor: 'black',
    factKeyColor: 'black',
    factValueColor: 'black',
  },
};

export const Facts: React.FC<FactsProps> = ({ slice }: FactsProps) => (
  <DefaultSectionContainer
    backgroundColor={FACTS_COLOR_VARIANTS[slice.variant].backgroundColor}
    flexDir="column"
    textAlign="center"
    justifyContent="space-between"
    title={slice.title}
    paddingY="12"
  >
    <Wrapper>
      {slice.title && (
        <>
          <DefaultSectionHeader
            tagline={slice.tagline}
            text={slice.subTitle}
            title={slice.title}
            taglineProps={{
              color: FACTS_COLOR_VARIANTS[slice.variant].tagLineColor,
              textAlign: 'center',
            }}
            titleProps={{
              color: FACTS_COLOR_VARIANTS[slice.variant].titleColor,
              textAlign: 'center',
              maxW: '6xl',
              marginX: 'auto',
            }}
            textProps={{
              color: FACTS_COLOR_VARIANTS[slice.variant].subTitleColor,
              textAlign: 'center',
              maxW: '3xl',
              marginX: 'auto',
            }}
          />
          <Spacer height={['0', null, '12']} />
        </>
      )}
      <Flex
        justifyContent={slice.facts.length < 3 ? 'center' : 'flex-start'}
        alignItems="center"
        flexWrap="wrap"
        flexDir={['column', null, null, 'row']}
      >
        {slice.facts.map((fact) => (
          <Flex
            key={fact.key}
            flexDir="column"
            width={['100%', null, null, 'calc(100% / 3)']}
            mt={['8', '8', '8', slice.facts.length > 3 ? '16' : '0']}
          >
            <Heading
              fontSize="6xl"
              fontFamily="display"
              lineHeight="10"
              fontWeight="700"
              color={FACTS_COLOR_VARIANTS[slice.variant].factValueColor}
              mb="2"
              as="p"
            >
              {fact.value}
            </Heading>

            <Text
              size="mdLowNormal"
              color={FACTS_COLOR_VARIANTS[slice.variant].factKeyColor}
            >
              {fact.key}
            </Text>
          </Flex>
        ))}
      </Flex>

      {slice.button && (
        <>
          <Spacer height={['0', null, '20']} />
          <StrapiLinkButton
            link={slice.button}
            size="md"
            variant={slice.variant === 'green' ? 'outline' : 'solid'}
            component="Facts"
          />
        </>
      )}
    </Wrapper>
  </DefaultSectionContainer>
);
