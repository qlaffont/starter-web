import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const useDark = (defaultValue?: boolean) => {
  const getPrefersScheme = (): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(COLOR_SCHEME_QUERY).matches;
    }

    return !!defaultValue;
  };

  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    'darkMode',

    getPrefersScheme(),
  );

  useEffect(() => {
    if (document) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-color-mode', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-color-mode', 'light');
      }
    }
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
  };
};
