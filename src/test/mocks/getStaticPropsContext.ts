import { GetStaticPropsContext } from 'next';

const getStaticPropsContextMock: GetStaticPropsContext = {
  locales: ['en', 'de'],
  locale: 'en',
  defaultLocale: 'en',
};

export default getStaticPropsContextMock;
