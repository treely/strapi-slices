import React from 'react';
import { FONT_CUSTOMIZATIONS } from '../../constants/fontCustomizations';
import rootMessagesDe from '../../rootMessages.de';
import rootMessagesEn from '../../rootMessages.en';
import { BoemlyThemeProvider } from 'boemly';
import { IntlProvider } from 'react-intl';

const messages = {
  en: rootMessagesEn,
  de: rootMessagesDe,
};

interface MinimalProvidersProps {
  locale: string;
  children: JSX.Element | JSX.Element[];
}

const MinimalProviders = ({ children, locale }: MinimalProvidersProps) => (
  <IntlProvider messages={messages[locale as 'en' | 'de']} locale={locale}>
    <BoemlyThemeProvider fonts={FONT_CUSTOMIZATIONS}>
      {children}
    </BoemlyThemeProvider>
  </IntlProvider>
);

export default MinimalProviders;
