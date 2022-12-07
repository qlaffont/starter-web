import React from 'react';
import { locales as rosettyLocales, RosettyProvider } from 'rosetty-react';

import frDict from './fr';

const locales = {
  fr: {
    dict: frDict,
    locale: rosettyLocales.fr,
  },
};

const defaultLanguage = 'fr';

export const I18nProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <RosettyProvider languages={locales} defaultLanguage={defaultLanguage}>
      {children}
    </RosettyProvider>
  );
};
