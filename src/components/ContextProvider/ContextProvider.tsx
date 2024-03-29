import React, { createContext } from 'react';
import { createIntl, createIntlCache } from 'react-intl';
import rootMessagesDe from '../../rootMessages.de';
import rootMessagesEn from '../../rootMessages.en';
import Locale from '../../models/Locale';
import { Global } from '@emotion/react';
import { GLOBAL_STYLE } from '../../constants/globalStyle';

const cache = createIntlCache();

const intlFactory = (locale: string) =>
  createIntl(
    {
      locale,
      messages: { de: rootMessagesDe, en: rootMessagesEn }[locale],
    },
    cache
  );

export const IntlContext = createContext(intlFactory('en'));

export interface ContextProviderProps {
  children: React.ReactNode;
  locale: Locale;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
  locale,
}: ContextProviderProps): JSX.Element => {
  return (
    <>
      <Global styles={{ GLOBAL_STYLE }} />
      <IntlContext.Provider value={intlFactory(locale)}>
        {children}
      </IntlContext.Provider>
    </>
  );
};
