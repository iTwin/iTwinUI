// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { ThemeType, useTheme } from '../utils/hooks/useTheme';

export type ThemeProviderProps = {
  /**
   * Theme to be applied. If not set, light theme will be used.
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
  useTheme(theme);
  return <>{children}</>;
};

export default ThemeProvider;
