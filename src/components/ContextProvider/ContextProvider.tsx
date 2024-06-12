import React, { createContext } from 'react';
import { createIntl, createIntlCache } from 'react-intl';
import { Global } from '@emotion/react';
import { GLOBAL_STYLE } from '../../constants/globalStyle';
import getMessages from '../../utils/getMessages';

const cache = createIntlCache();

const intlFactory = (locale: string) =>
  createIntl(
    {
      locale,
      messages: getMessages(locale),
    },
    cache
  );

export const IntlContext = createContext(intlFactory('en'));

export interface ContextProviderProps {
  children: React.ReactNode;
  locale: string;
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
