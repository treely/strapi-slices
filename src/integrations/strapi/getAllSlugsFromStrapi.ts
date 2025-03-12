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
  const slugPromises = locales.map((locale) =>
    strapiClient
      .get<IStrapiResponse<IStrapiData<T>[]>>(path, {
        params: {
          locale: locale,
          'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
          filters,
        },
      })
      .then((response) =>
        response.data.data.map((page) => ({
          slug: page.attributes.slug,
          locale: page.attributes.locale,
        }))
      )
      // when a collection type for a requested locale does not exist, Strapi returns a 404. In this case, we return an empty array instead of throwing an error
      .catch((error) => {
        if (error.response?.status === 404) {
          return [];
        }
        throw error;
      })
  );

  const slugResults = await Promise.all(slugPromises);

  let allSlugs = slugResults.flat();

  // Identify missing locales for each slug
  const missingLocales = locales.flatMap((locale) => {
    return allSlugs
      .filter((slug) => slug.locale === STRAPI_FALLBACK_LOCALE)
      .filter(
        (fallbackSlug) =>
          !allSlugs.some(
            (slug) => slug.slug === fallbackSlug.slug && slug.locale === locale
          )
      )
      .map((fallbackSlug) => ({ ...fallbackSlug, locale })); // Clone only for missing locales
  });

  return [...allSlugs, ...missingLocales]; // Merge original and missing slugs
};

export default getAllSlugsFromStrapi;
