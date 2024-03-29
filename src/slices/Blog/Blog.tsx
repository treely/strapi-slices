import React, { useContext } from 'react';
import {
  Box,
  DatePersonPair,
  DefaultSectionContainer,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import Link from 'next/link';
import StrapiBlogPost from '../../models/strapi/StrapiBlogPost';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import IStrapiData from '../../models/strapi/IStrapiData';
import { BlogItemContainer, ImageContainer } from './styles';
import { IntlContext } from '../../components/ContextProvider';

export interface BlogProps {
  slice: {
    blog_posts: IStrapiData<StrapiBlogPost>[];
  };
  blogPosts: IStrapiData<StrapiBlogPost>[];
}

export const Blog: React.FC<BlogProps> = ({ slice, blogPosts }: BlogProps) => {
  const { formatDate } = useContext(IntlContext);
  const sortedBlogPosts = slice.blog_posts.sort(
    (a, b) =>
      new Date(b.attributes.createdAt).getTime() -
      new Date(a.attributes.createdAt).getTime()
  );

  return (
    <DefaultSectionContainer>
      <Wrapper>
        <SimpleGrid columns={[1, null, null, 2]} spacingX={56} spacingY={24}>
          {sortedBlogPosts.map(({ attributes }) => {
            const blogPost: IStrapiData<StrapiBlogPost> | undefined =
              blogPosts.find((bp) => bp.attributes.slug === attributes.slug);
            if (!blogPost) {
              return null;
            }
            return (
              <BlogItemContainer
                key={blogPost.attributes.slug}
                as={Link}
                href={`/blog/${blogPost.attributes.slug}`}
              >
                <ImageContainer>
                  <Image
                    src={strapiMediaUrl(blogPost.attributes.img.img, 'large')}
                    alt={blogPost.attributes.img.alt}
                    fill
                    style={{
                      objectFit: blogPost.attributes.img.objectFit || 'cover',
                    }}
                  />
                </ImageContainer>
                <Box px="2" py="8">
                  {blogPost.attributes.category.data && (
                    <Text size="smMonoUppercase" color="primary.800" mb="2">
                      {blogPost.attributes.category.data.attributes.name}
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
                            name: blogPost.attributes.author.data.attributes
                              .name,
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
                                    blogPost.attributes.author.data.attributes
                                      .img.objectFit || 'cover',
                                }}
                              />
                            ),
                          }
                        : undefined
                    }
                  />
                </Box>
              </BlogItemContainer>
            );
          })}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
