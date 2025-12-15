import React, { useContext, useMemo } from 'react';
import {
  Text,
  Heading,
  Spacer,
  DatePersonPair,
  DefaultSectionHeader,
  DefaultSectionContainer,
  Wrapper,
  SimpleGrid,
  Box,
  Flex,
  useMediaQuery,
  useToken,
} from 'boemly';
import Image from 'next/image';
import Link from 'next/link';
import { CaretRightIcon } from '@phosphor-icons/react';
import StrapiBlogPost from '../../models/strapi/StrapiBlogPost';
import IStrapiData from '../../models/strapi/IStrapiData';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiCategory from '../../models/strapi/StrapiCategory';
import IStrapi from '../../models/strapi/IStrapi';
import { BREAKPOINT_LG_QUERY } from '../../constants/breakpoints';
import StrapiLink from '../../models/strapi/StrapiLink';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import { BlogItemContainer, ImageContainer } from '../Blog/styles';
import { IntlContext } from '../../components/ContextProvider';

export interface BlogCardsProps {
  slice: {
    tagline: string;
    title: string;
    subTitle: string;
    button?: StrapiLink;
    variant: 'white' | 'gray';
    blogPostCategory: IStrapi<IStrapiData<StrapiCategory> | null>;
  };
  blogPosts: IStrapiData<StrapiBlogPost>[];
}

const VARIANTS = {
  white: {
    backgroundColor: 'white',
  },
  gray: {
    backgroundColor: 'primary.50',
  },
};

const sortByCreatedAt = (
  a: IStrapiData<StrapiBlogPost>,
  b: IStrapiData<StrapiBlogPost>
): number =>
  new Date(b.attributes.createdAt).getTime() -
  new Date(a.attributes.createdAt).getTime();

export const BlogCards: React.FC<BlogCardsProps> = ({
  slice,
  blogPosts,
}: BlogCardsProps) => {
  const { formatDate } = useContext(IntlContext);
  const [mobile] = useMediaQuery([BREAKPOINT_LG_QUERY]);
  const [gray700] = useToken('colors', ['gray.700']);

  const sortedBlogPosts = useMemo(
    () => blogPosts.sort(sortByCreatedAt),
    [blogPosts]
  );

  const blogPostsToDisplay = useMemo(
    () =>
      slice.blogPostCategory?.data?.attributes.name
        ? sortedBlogPosts
            .filter(
              (blogPost) =>
                blogPost.attributes.category.data?.attributes.name ===
                slice.blogPostCategory?.data?.attributes.name
            )
            .slice(0, 3)
        : sortedBlogPosts.slice(0, 3),
    [sortedBlogPosts, slice]
  );

  return (
    <DefaultSectionContainer
      backgroundColor={VARIANTS[slice.variant].backgroundColor}
      title={slice.title}
    >
      <Wrapper>
        {mobile || !slice.button ? (
          <DefaultSectionHeader
            tagline={slice.tagline}
            title={slice.title}
            text={slice.subTitle}
            titleProps={{ maxW: '2xl' }}
            textProps={{ maxW: '2xl' }}
          />
        ) : (
          <Flex justifyContent="space-between" alignItems="center" gap="60">
            <Box>
              <DefaultSectionHeader
                tagline={slice.tagline}
                title={slice.title}
                text={slice.subTitle}
              />
            </Box>
            <Box minWidth="40">
              <StrapiLinkButton
                link={slice.button}
                size="lg"
                variant="outline"
                rightIcon={<CaretRightIcon color={gray700} />}
                component="BlogCards"
              />
            </Box>
          </Flex>
        )}
        <Spacer height="14" />
        <SimpleGrid
          columns={[1, null, null, 3]}
          columnGap={4}
          rowGap={24}
          flexShrink="0"
        >
          {blogPostsToDisplay.map((blogPost) => (
            <BlogItemContainer
              as={Link}
              href={`/blog/${blogPost.attributes.slug}`}
              data-testid="blog-item"
              key={blogPost.id}
            >
              <ImageContainer>
                <Image
                  src={strapiMediaUrl(blogPost.attributes.img.img, 'medium')}
                  alt={blogPost.attributes.img.alt}
                  fill
                  style={{
                    objectFit: blogPost.attributes.img.objectFit || 'cover',
                  }}
                />
              </ImageContainer>
              <Box px="2" py="8">
                {blogPost.attributes.category && (
                  <Text size="smMonoUppercase" color="primary.800" mb="2">
                    {blogPost.attributes.category.data?.attributes.name}
                  </Text>
                )}
                <Heading size="lg">{blogPost.attributes.title}</Heading>
                {blogPost.attributes.teaser && (
                  <Text size="mdRegularNormal" mt="2">
                    {blogPost.attributes.teaser}
                  </Text>
                )}

                <Spacer height="4" />

                <DatePersonPair
                  date={formatDate(blogPost.attributes.createdAt)}
                  person={
                    blogPost.attributes.author.data
                      ? {
                          name: blogPost.attributes.author.data.attributes.name,
                          image: (
                            <Image
                              src={strapiMediaUrl(
                                blogPost.attributes.author.data.attributes.img
                                  .img,
                                'thumbnail'
                              )}
                              alt={
                                blogPost.attributes.author.data.attributes.img
                                  .alt
                              }
                              fill
                              style={{
                                objectFit:
                                  blogPost.attributes.author.data.attributes.img
                                    .objectFit || 'cover',
                              }}
                            />
                          ),
                        }
                      : undefined
                  }
                />
              </Box>
            </BlogItemContainer>
          ))}
        </SimpleGrid>
        <>
          {mobile && slice.button && (
            <>
              <Box minWidth="40" mt="6">
                <StrapiLinkButton
                  link={slice.button}
                  size="lg"
                  variant="outline"
                  rightIcon={<CaretRightIcon color={gray700} />}
                  component="BlogCards"
                />
              </Box>
            </>
          )}
        </>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
