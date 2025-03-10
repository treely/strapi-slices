import strapiClient from './strapiClient';
import {
  STRAPI_DEFAULT_PAGE_SIZE,
  STRAPI_FALLBACK_LOCALE,
} from '../../constants/strapi';
import IStrapiResponse from '../../models/strapi/IStrapiResponse';
import IStrapiData from '../../models/strapi/IStrapiData';
import LocalizedEntity from '../../models/LocalizedEntity';
import getAvailableLocalesFromStrapi from './getAvailableLocalesFromStrapi';

interface Options {
  filters?: Record<string, any>;
}

type Slug = { slug: string; locale: string };

const getAllSlugsFromStrapi = async <T extends LocalizedEntity<'slug'>>(
  path: string,
  locales: string[],
  { filters = {} }: Options = { filters: {} }
): Promise<Slug[]> => {
  const allLocales = await getAvailableLocalesFromStrapi();

  const slugPromises = allLocales.map((locale) => {
    const params: Record<string, any> = {
      locale,
      'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
      filters,
    };

    return strapiClient.get<IStrapiResponse<IStrapiData<T>[]>>(path, {
      params,
    });
  });

  const slugResults = await Promise.all(slugPromises);

  let allSlugs = slugResults
    .map((result) =>
      result.data.data.map((page) => ({
        slug: page.attributes.slug,
        locale: page.attributes.locale,
      }))
    )
    .flat();

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
