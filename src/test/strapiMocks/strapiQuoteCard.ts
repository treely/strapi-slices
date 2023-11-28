import StrapiQuoteCard from '../../models/strapi/StrapiQuoteCard';
import { strapiAvatarWithNameMock } from './strapiAvatarWithName';

export const strapiQuoteCardMock: StrapiQuoteCard = {
  id: 1,
  text: 'Text',
  avatar: strapiAvatarWithNameMock,
};
