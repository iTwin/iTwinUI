import React from 'react';
import '@bentley/itwinui/css/global.css';

export type ThemeType = 'light' | 'dark';

export type ThemeProviderProps = {
  /**
   * Theme to be applied. If not defined, OS theme will be used.
   */
  theme?: ThemeType;
};

/**
 * Component providing global styles that are required for all components and allows changing theme.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('iui-theme-dark');
      document.documentElement.classList.remove('iui-theme-light');
    } else if (theme === 'light') {
      document.documentElement.classList.add('iui-theme-light');
      document.documentElement.classList.remove('iui-theme-dark');
    } else {
      document.documentElement.classList.remove('iui-theme-light');
      document.documentElement.classList.remove('iui-theme-dark');
    }
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
