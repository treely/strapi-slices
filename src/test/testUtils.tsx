import { ReactNode } from 'react';
import { BoemlyThemeProvider } from 'boemly';
import { IntlProvider } from 'react-intl';
import { render as rtlRender } from '@testing-library/react';
import rootMessagesEn from '@/rootMessages.en';
import userEvent from '@testing-library/user-event';

interface WrapperProps {
  children?: ReactNode;
}

const render = (ui: any, { locale = 'en', ...renderOptions } = {}) => {
  const Wrapper: React.FC<WrapperProps> = ({ children }: WrapperProps) => (
    <BoemlyThemeProvider>
      <IntlProvider messages={rootMessagesEn} locale={locale}>
        {children}
      </IntlProvider>
    </BoemlyThemeProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';

export { render, userEvent };
