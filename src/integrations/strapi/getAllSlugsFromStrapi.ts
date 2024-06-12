import strapiClient from './strapiClient';
import {
  STRAPI_DEFAULT_PAGE_SIZE,
  STRAPI_FALLBACK_LOCALE,
} from '../../constants/strapi';
import IStrapiResponse from '../../models/strapi/IStrapiResponse';
import IStrapiData from '../../models/strapi/IStrapiData';
import LocalizedEntity from '../../models/LocalizedEntity';

interface Options {
  filters?: Record<string, any>;
}

type Slug = { slug: string; locale: string };

const getAllSlugsFromStrapi = async <T extends LocalizedEntity<'slug'>>(
  path: string,
  locales: string[],
  { filters = {} }: Options = { filters: {} }
): Promise<Slug[]> => {
  const params: Record<string, any> = {
    locale: 'all',
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
    filters,
  };

  const { data } = await strapiClient.get<IStrapiResponse<IStrapiData<T>[]>>(
    path,
    { params }
  );

  const slugs: Slug[] = data.data.map((page) => ({
    slug: page.attributes.slug,
    locale: page.attributes.locale,
  }));

  const fallBackSlugs: Slug[] = locales.flatMap((locale) =>
    slugs
      .filter((slug) => slug.locale === STRAPI_FALLBACK_LOCALE)
      .map((slug) => ({ ...slug, locale }))
  );

  const nonFallbackSlugs = slugs.filter(
    (p) => p.locale !== STRAPI_FALLBACK_LOCALE
  );

  return [...fallBackSlugs, ...nonFallbackSlugs];
};

export default getAllSlugsFromStrapi;
