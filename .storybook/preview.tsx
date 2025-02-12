import React from 'react';
import type { Preview } from '@storybook/react';
import { BoemlyThemeProvider } from 'boemly';
import { IntlProvider } from 'react-intl';
import rootMessagesEn from '../src/rootMessages.en';
import { FONT_CUSTOMIZATIONS } from '../src/constants/fontCustomizations';
import { Global } from '@emotion/react';
import { GLOBAL_STYLE } from '../src/constants/globalStyle';
import { FONT_STYLE } from '../src/constants/fontStyle';
import { ContextProvider } from '../src/components/ContextProvider/ContextProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <ContextProvider locale="en">
          <Global styles={{ GLOBAL_STYLE, FONT_STYLE }} />
          <IntlProvider messages={rootMessagesEn} locale="en">
            <BoemlyThemeProvider fonts={FONT_CUSTOMIZATIONS}>
              <Story />
            </BoemlyThemeProvider>
          </IntlProvider>
        </ContextProvider>
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
