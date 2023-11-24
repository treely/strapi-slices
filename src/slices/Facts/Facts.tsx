import {
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Heading,
  Spacer,
  Text,
} from 'boemly';
import StrapiLinkButton from '@/components/StrapiLinkButton';
import StrapiLink from '@/models/strapi/StrapiLink';

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

const VARIANTS = {
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
    factKeyColor: 'gray.700',
    factValueColor: 'gray.700',
  },
};

export const Facts: React.FC<FactsProps> = ({ slice }: FactsProps) => (
  <DefaultSectionContainer
    backgroundColor={VARIANTS[slice.variant].backgroundColor}
    flexDir="column"
    textAlign="center"
    justifyContent="space-between"
    paddingX={['6', null, '8']}
    title={slice.title}
  >
    <>
      {slice.title && (
        <>
          <DefaultSectionHeader
            tagline={slice.tagline}
            text={slice.subTitle}
            title={slice.title}
            taglineProps={{
              color: VARIANTS[slice.variant].tagLineColor,
              textAlign: 'center',
            }}
            titleProps={{
              color: VARIANTS[slice.variant].titleColor,
              textAlign: 'center',
              maxW: '6xl',
              marginX: 'auto',
            }}
            textProps={{
              color: VARIANTS[slice.variant].subTitleColor,
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
        mx={[null, null, null, '22', '28']}
        flexDir={['column', null, null, 'row']}
        gap={[null, null, null, '12']}
      >
        {slice.facts.map((fact) => (
          <Flex
            key={fact.key}
            flexDir="column"
            width={[
              'var(--boemly-sizes-full)',
              null,
              null,
              'calc((var(--boemly-sizes-full) - var(--boemly-space-24))/ 3 )',
            ]}
            mt={['8', '8', '8', slice.facts.length > 3 ? '16' : '0']}
          >
            <Heading
              fontSize="6xl"
              fontFamily="GintoNord"
              lineHeight="10"
              fontWeight="700"
              color={VARIANTS[slice.variant].factValueColor}
              mb="2"
              as="p"
            >
              {fact.value}
            </Heading>

            <Text
              size="mdLowNormal"
              color={VARIANTS[slice.variant].factKeyColor}
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
          />
        </>
      )}
    </>
  </DefaultSectionContainer>
);
