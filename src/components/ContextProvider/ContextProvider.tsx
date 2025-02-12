import React, { createContext } from 'react';
import { createIntl, createIntlCache } from 'react-intl';
import { Global } from '@emotion/react';
import { GLOBAL_STYLE } from '../../constants/globalStyle';
import getMessages from '../../utils/getMessages';
import strapiClient from '../../integrations/strapi/strapiClient';
import { SWRConfig } from 'swr/_internal';

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
  const fetcher = async (resource: any, init: any) => {
    const response = await strapiClient.get(`${resource}`, {
      ...init,
      headers: {},
    });
    // Check if the response was an error:
    if (response.status < 200 || response.status >= 300) {
      let errorData = { message: '' };
      try {
        errorData = await response.data;
      } catch (error) {
        errorData = {
          message: `An unknown error occurred while fetching data.`,
        };
      }
      throw new Error(errorData.message); // Throwing the error will lead to onError being called
    }

    return { body: await response.data, headers: response.headers };
  };
  return (
    <>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Global styles={{ GLOBAL_STYLE }} />
        <IntlContext.Provider value={intlFactory(locale)}>
          {children}
        </IntlContext.Provider>
      </SWRConfig>
    </>
  );
};
