import React from 'react';
import { FONT_CUSTOMIZATIONS } from '../../constants/fontCustomizations';
import { BoemlyThemeProvider } from 'boemly';
import { IntlProvider } from 'react-intl';
import getMessages from '../../utils/getMessages';

interface MinimalProvidersProps {
  locale: string;
  children: JSX.Element | JSX.Element[];
}

const MinimalProviders = ({ children, locale }: MinimalProvidersProps) => (
  <IntlProvider messages={getMessages(locale)} locale={locale}>
    <BoemlyThemeProvider fonts={FONT_CUSTOMIZATIONS}>
      {children}
    </BoemlyThemeProvider>
  </IntlProvider>
);

export default MinimalProviders;
