/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, useMediaQuery } from '../utils';
import type {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
  ThemeOptions,
  ThemeType,
  UseThemeProps,
} from '../utils';
import '@itwin/itwinui-css/css/global.css';
import '@itwin/itwinui-variables/index.css';

export type ThemeProviderProps<
  T extends React.ElementType = 'div'
> = PolymorphicComponentProps<T, UseThemeProps>;

/**
 * This component provides global styles and applies theme to the entire tree
 * that it is wrapping around. The `theme` prop is optional and defaults to the
 * light theme.
 *
 * If you want to theme the entire app, you should use this component at the root.
 * The `as` prop can be used to render a `<body>` element instead of a `<div>`.
 *
 * You can also use this component to apply a different theme to only a part of the tree.
 *
 * @example
 * <ThemeProvider theme='os'>
 *  <App />
 * </ThemeProvider>
 *
 * @example
 * <ThemeProvider as='body'>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = React.forwardRef((props, ref) => {
  const {
    theme,
    children,
    themeOptions,
    as: Element = 'div',
    className,
    ...rest
  } = props;

  const hasChildren = React.Children.count(children) > 0;
  const parentContext = React.useContext(ThemeContext);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: more)');

  const shouldApplyDark = theme === 'dark' || (theme === 'os' && prefersDark);
  const shouldApplyHC = themeOptions?.highContrast ?? prefersHighContrast;

  // only provide context if wrapped around children
  return hasChildren ? (
    <ThemeContext.Provider value={{ theme, themeOptions }}>
      <Element
        className={cx('iui-root', className)}
        data-iui-theme={shouldApplyDark ? 'dark' : 'light'}
        data-iui-contrast={shouldApplyHC ? 'high' : 'default'}
        ref={ref}
        {...rest}
      >
        {children}
      </Element>
    </ThemeContext.Provider>
  ) : (
    // otherwise just apply theme on the root using this wrapper component
    <ThemeLogicWrapper
      theme={theme ?? parentContext?.theme}
      themeOptions={themeOptions ?? parentContext?.themeOptions}
    />
  );
}) as PolymorphicForwardRefComponent<'div', UseThemeProps>;

export default ThemeProvider;

export const ThemeContext = React.createContext<
  | {
      theme?: ThemeType;
      themeOptions?: ThemeOptions;
    }
  | undefined
>(undefined);

const ThemeLogicWrapper = ({ theme, themeOptions }: UseThemeProps) => {
  useTheme(theme, themeOptions);
  return <></>;
};
