import strapiClient from './strapiClient';

const getAvailableLocalesFromStrapi = async (): Promise<string[]> => {
  const { data } = await strapiClient.get('/i18n/locales');
  return data.map((locale: { code: string }) => locale.code);
};

export default getAvailableLocalesFromStrapi;
