import React, { useContext, useState } from 'react';
import {
  DefaultSectionContainer,
  Divider,
  Flex,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  Wrapper,
} from 'boemly';
import { Check, Link as LinkIcon } from '@phosphor-icons/react';
import { useCopyToClipboard } from 'react-use';
import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiGlossaryItem from '../../models/strapi/StrapiGlossaryItem';
import { IntlContext } from '../../components/ContextProvider';

export interface GlossaryProps {
  slice: {
    glossary_items: IStrapiData<StrapiGlossaryItem>[];
  };
}

export const Glossary: React.FC<GlossaryProps> = ({ slice }: GlossaryProps) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const { formatMessage } = useContext(IntlContext);
  const grouped: Record<string, StrapiGlossaryItem[]> = {};
  const [copiedItem, setCopiedItem] = useState<string>();

  slice.glossary_items
    .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
    .forEach((curr) => {
      const index = curr.attributes.title.at(0)?.toUpperCase() || 'A';
      if (!grouped[index]) {
        grouped[index] = [];
      }
      grouped[index].push(curr.attributes);
    }, {});

  const handleAnchorClick = async (slug: string) => {
    if (window?.location) {
      const currentUrl = window.location.href.split('#')[0];
      copyToClipboard(`${currentUrl}#${slug}`);
      setCopiedItem(slug);

      setTimeout(() => {
        setCopiedItem(undefined);
      }, 1200);
    }
  };

  return (
    <DefaultSectionContainer>
      <Wrapper>
        <SimpleGrid>
          {Object.entries(grouped).map(([letter, items], index) => (
            <GridItem maxW="xl" placeSelf="center" key={letter}>
              <Heading size="3xl" mb="8">
                {letter}
              </Heading>

              <SimpleGrid spacing="6">
                {items.map((item) => (
                  <GridItem key={item.slug}>
                    <Flex mb="2" gap="1.5" alignItems="center">
                      <Heading
                        wordBreak="break-word"
                        size="xl"
                        id={item.slug}
                        scrollMarginTop="calc(var(--header-height) + var(--boemly-sizes-10))"
                      >
                        {item.title}
                      </Heading>
                      <IconButton
                        variant="ghost"
                        size="xs"
                        icon={
                          copiedItem === item.slug ? (
                            <Check size="16" data-testid="check-icon" />
                          ) : (
                            <LinkIcon size="16" />
                          )
                        }
                        title={formatMessage({
                          id: 'sections.glossary.copyButtonLabel',
                        })}
                        aria-label={formatMessage({
                          id: 'sections.glossary.copyButtonLabel',
                        })}
                        onClick={async () => handleAnchorClick(item.slug)}
                      />
                    </Flex>
                    <Text color="black" wordBreak="break-word">
                      {item.text}
                    </Text>
                  </GridItem>
                ))}
              </SimpleGrid>

              {index !== Object.keys(grouped).length - 1 && (
                <Divider maxW="xl" placeSelf="center" mb="10" mt="10" />
              )}
            </GridItem>
          ))}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
