import StrapiPortfolioCard from '@/models/strapi/StrapiPortfolioCard';
import { strapiMediaMock } from './strapiMedia';

export const strapiPortfolioCardMock: StrapiPortfolioCard = {
  id: 1,
  portfolioNumber: 'Portfolio #1',
  title: 'My forest',
  facts: [
    {
      id: 1,
      key: 'key1',
      value: 'value1',
    },
    {
      id: 2,
      key: 'key2',
      value: 'value2',
    },
    {
      id: 3,
      key: 'key3',
      value: 'value3',
    },
    {
      id: 4,
      key: 'key4',
      value: 'value4',
    },
  ],
  button: {
    id: 3,
    url: '/login',
    text: 'Buy certificates',
  },
  image: {
    id: 1,
    alt: 'Alt text',
    img: { data: strapiMediaMock },
  },
};
