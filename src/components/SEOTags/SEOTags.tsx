import React from 'react';
import Head from 'next/head';
import {
  DEFAULT_SHARE_ALT,
  DEFAULT_SHARE_IMAGE,
} from '../../constants/metadata';
import {
  Article,
  BlogPosting,
  Brand,
  BreadcrumbList,
  Event,
  FAQPage,
  HowTo,
  LocalBusiness,
  Offer,
  Organization,
  Person,
  Product,
  QAPage,
  Service,
  SoftwareApplication,
  WebPage,
  WithContext,
} from 'schema-dts';

type SupportedSchemaType =
  | Article
  | BlogPosting
  | Brand
  | BreadcrumbList
  | Event
  | FAQPage
  | HowTo
  | LocalBusiness
  | Offer
  | Organization
  | Person
  | Product
  | QAPage
  | Product
  | Service
  | SoftwareApplication
  | WebPage;

// Helper function to convert SchemaValue to string
const getTextValue = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && 'text' in value) {
    return (value as { text: string }).text;
  }
  return '';
};

// Helper function to safely access properties from a schema
const getSchemaProperty = (
  schema: SupportedSchemaType,
  property: string
): string => {
  return (
    getTextValue((schema as unknown as Record<string, unknown>)[property]) || ''
  );
};

// Helper function to get a unique identifier from a schema
const getSchemaIdentifier = (schema: SupportedSchemaType): string => {
  const type = (schema as { '@type': string })['@type'];

  switch (type) {
    case 'Organization':
      return getSchemaProperty(schema, 'name') || 'default';
    case 'Article':
    case 'BlogPosting':
      return getSchemaProperty(schema, 'headline') || 'untitled-article';
    case 'Product':
      return getSchemaProperty(schema, 'name') || 'untitled-product';
    case 'Person':
      return getSchemaProperty(schema, 'name') || 'unnamed-person';
    case 'Event':
      return getSchemaProperty(schema, 'name') || 'untitled-event';
    case 'LocalBusiness':
      return getSchemaProperty(schema, 'name') || 'unnamed-business';
    case 'Service':
      return getSchemaProperty(schema, 'name') || 'unnamed-service';
    case 'Brand':
      return getSchemaProperty(schema, 'name') || 'unnamed-brand';
    case 'FAQPage':
      return 'faq-page';
    case 'HowTo':
      return getSchemaProperty(schema, 'name') || 'untitled-howto';
    case 'BreadcrumbList':
      return 'breadcrumbs';
    case 'Offer':
      const offer = schema as Offer;
      return `offer-${offer.price ?? 'unknown-price'}`;
    case 'WebPage':
      return getSchemaProperty(schema, 'name') || 'untitled-page';
    case 'QAPage':
      return getSchemaProperty(schema, 'name') || 'untitled-qa';
    case 'SoftwareApplication':
      return getSchemaProperty(schema, 'name') || 'untitled-software';
    default:
      return 'unknown-schema';
  }
};

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
  /**
   * Structured data for SEO purposes, following the schema.org standard.
   * This can be a single schema object or an array of schema objects.
   * Each object must include an `@context` property set to "https://schema.org"
   * and an `@type` property indicating the type of schema (e.g., Article, Product).
   */
  schemaMarkup?:
    | WithContext<SupportedSchemaType>
    | WithContext<SupportedSchemaType>[];
}

const validateSchema = (
  schema: WithContext<SupportedSchemaType> | WithContext<SupportedSchemaType>[]
): boolean => {
  if (Array.isArray(schema)) {
    return schema.every(
      (item) => item['@context'] === 'https://schema.org' && '@type' in item
    );
  }
  return schema['@context'] === 'https://schema.org' && '@type' in schema;
};

export const SEOTags: React.FC<SEOTagsProps> = ({
  title,
  description,
  shareImage,
  metaTitleSuffix = 'Tree.ly',
  favicon = 'https://cdn.tree.ly/favicon.ico',
  domain = 'tree.ly',
  schemaMarkup,
}: SEOTagsProps) => {
  const shareImageUrl = shareImage?.url ?? DEFAULT_SHARE_IMAGE;
  const shareImageAlt = shareImage?.alt ?? DEFAULT_SHARE_ALT;

  let schemas = schemaMarkup;
  let isValidSchema = schemaMarkup ? validateSchema(schemaMarkup) : false;

  if (schemaMarkup && !isValidSchema) {
    console.warn(
      'Invalid schema markup provided to SEOTags component. Schema markup will not be rendered.',
      schemaMarkup
    );
    schemas = undefined;
    isValidSchema = false;
  }

  const schemaArray = schemas
    ? Array.isArray(schemas)
      ? schemas
      : [schemas]
    : [];

  const getSchemaKey = (
    schema: WithContext<SupportedSchemaType>,
    index: number
  ): string => {
    const type = (schema as { '@type': string })['@type'];
    const identifier = getSchemaIdentifier(schema as SupportedSchemaType);
    return `${type}-${identifier}-${index}`;
  };

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

      {isValidSchema &&
        schemaArray.map((schema, index) => (
          <script
            key={getSchemaKey(schema, index)}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
    </Head>
  );
};
