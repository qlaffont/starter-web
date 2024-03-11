import { useEffect } from 'react';
import { Rosetty, useRosetty } from 'rosetty-react';
import { useIsClient } from 'usehooks-ts';

import frDict from '../i18n/fr';

export const useI18n = () => {
  return useRosetty<typeof frDict>(); //Enable autocompletion base on you translation file
};

export const getDefaultLanguage = () => {
  if (typeof navigator !== 'undefined') {
    return navigator?.language?.toLowerCase()?.startsWith('fr') ? 'fr' : 'en';
  }

  return 'en';
};

export const useI18nSEO = () => {
  const { actualLang, changeLang } = useI18n();
  const isBrowser = useIsClient();

  useEffect(() => {
    if (document) {
      if (actualLang) {
        document.documentElement.lang = actualLang;
      } else {
        document.documentElement.lang = 'en';
      }
    }
  }, [actualLang]);

  useEffect(() => {
    if (isBrowser) {
      changeLang(getDefaultLanguage());
    }
  }, [isBrowser]);
};

export type RosettyReturn = Rosetty<typeof frDict>;
