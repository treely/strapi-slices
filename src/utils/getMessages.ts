import { STRAPI_FALLBACK_LOCALE } from '../constants/strapi';
import rootMessagesDe from '../rootMessages.de';
import rootMessagesEn from '../rootMessages.en';

const messages = {
  en: rootMessagesEn,
  de: rootMessagesDe,
};

const getMessages = (locale: string) => {
  const messagesLocale = Object.keys(messages).includes(`${locale}`)
    ? (locale as keyof typeof messages)
    : STRAPI_FALLBACK_LOCALE;

  return messages[messagesLocale];
};

export default getMessages;
