import React from 'react';
import Head from 'next/head';
import {
  DEFAULT_SHARE_ALT,
  DEFAULT_SHARE_IMAGE,
} from '../../constants/metadata';

interface SEOTagsProps {
  title: string;
  description: string;
  shareImage?: {
    url: string;
    alt: string;
  };
  metaTitleSuffix?: string;
  favicon?: string;
  domain?: string;
}

export const SEOTags: React.FC<SEOTagsProps> = ({
  title,
  description,
  shareImage,
  metaTitleSuffix = 'Tree.ly',
  favicon = 'https://cdn.tree.ly/favicon.ico',
  domain = 'tree.ly',
}: SEOTagsProps) => {
  const shareImageUrl = shareImage?.url ?? DEFAULT_SHARE_IMAGE;
  const shareImageAlt = shareImage?.alt ?? DEFAULT_SHARE_ALT;

  return (
    <Head>
      <title>{`${title} - ${metaTitleSuffix}`}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} />

      <meta property="og:url" content={`https://${domain}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={shareImageUrl} />
      <meta property="og:image:alt" content={shareImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={domain} />
      <meta property="twitter:url" content={`https://${domain}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImageUrl} />
      <meta name="twitter:image:alt" content={shareImageAlt} />
    </Head>
  );
};
