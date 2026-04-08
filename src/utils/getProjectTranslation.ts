import { FPMProjectNameTranslation } from '../models/fpm/FPMProject';

const getProjectTranslation = (
  nameTranslations: FPMProjectNameTranslation[] | undefined,
  locale: string,
  fallback: string
): string => {
  if (!nameTranslations || nameTranslations.length === 0) return fallback;
  const match = nameTranslations.find((t) => t.language === locale);
  return match?.value || fallback;
};

export default getProjectTranslation;
