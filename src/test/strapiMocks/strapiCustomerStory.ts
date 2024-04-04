import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiCustomerStory from '../../models/strapi/StrapiCustomerStory';
import {
  storybookStrapiAvatarMock,
  storybookStrapiTreeIconMock,
} from '../storybookMocks/storybookStrapiMedia';

export const strapiCustomerStoryMock: IStrapiData<StrapiCustomerStory> = {
  id: 1,
  attributes: {
    variant: 'customerCard',
    slug: 'customer-1',
    createdAt: '2023-10-31T12:10:43.324Z',
    updatedAt: '2023-10-31T13:10:25.010Z',
    locale: 'en',
    metadata: null,
    title: 'This is the title',
    customerName: 'Jodok Bals Bau',
    customerCardCustomerIndustry: 'Bau',
    quoteCardCustomerTitle: 'Geschäftsführer, mal2 – malen & mehr',
    quoteCardQuote:
      '"Der Kauf von Bäumen in Uganda in der Ferne spricht mich nicht an. Aber als ich über das Leben der Bäume las und meine Frau mir von Tree.ly erzählte, fand ich meine lokale Lösung."',
    cardImage: {
      id: 1,
      alt: 'Icon alt text',
      img: { data: storybookStrapiTreeIconMock },
    },
    img: {
      id: 1,
      alt: 'Icon alt text',
      img: { data: storybookStrapiTreeIconMock },
    },
    slices: [
      {
        __component: 'sections.rich-text',
        id: 6,
        content: '# This is my rich text!',
      },
    ],
    localizations: [
      {
        id: 2,
        locale: 'de',
      },
    ],
  },
};

export const strapiCustomerStoryMock1: IStrapiData<StrapiCustomerStory> = {
  id: 2,
  attributes: {
    ...strapiCustomerStoryMock.attributes,
    variant: 'quoteCard',
    cardImage: {
      id: 2,
      alt: 'Avatar image alt text',
      img: { data: storybookStrapiAvatarMock },
      objectFit: 'contain',
    },
  },
};
