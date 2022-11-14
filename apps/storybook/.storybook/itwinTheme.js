/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { create } from '@storybook/theming/create';
import itwinImage from './public/itwin.svg';
import itwinImageDark from './public/itwin-dark.svg';

export const lightTheme = create({
  base: 'light',
  brandTitle: 'iTwinUI',
  brandImage: itwinImage,

  colorPrimary: '#0071B8', // --iui-color-background-accent
  colorSecondary: '#0071B8', // --iui-color-background-accent

  // UI
  appBg: '#FFFFFF', // --iui-color-background
  appContentBg: '#FFFFFF', // --iui-color-background
  appBorderColor: '#b3bcc1', // --iui-color-border
  appBorderRadius: 9,

  // Typography
  fontBase:
    '"Noto Sans", "Open Sans", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, system-ui, sans-serif',
  fontCode:
    '"Noto Sans Mono", ui-monospace, "SF Mono", SFMono-Regular, "DejaVu Sans Mono", Menlo, Consolas, monospace',

  // Text colors
  textColor: '#242424', //--iui-color-text

  // Toolbar default and active colors
  barTextColor: '#242424', //--iui-color-text
  barSelectedColor: '#0071B8', // --iui-color-background-accent
  barBg: '#FFFFFF', // --iui-color-background

  // Form colors
  inputBg: '#FFFFFF', // --iui-color-background
  inputBorder: '#b3bcc1', // --iui-color-border
  inputTextColor: '#242424', //--iui-color-text
  inputBorderRadius: 3,
});

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'iTwinUI',
  brandImage: itwinImageDark,

  colorPrimary: '#0071B8', // --iui-color-background-accent
  colorSecondary: '#94befa', // --iui-color-text-accent

  // UI
  appBg: '#333c41', // --iui-color-background
  appContentBg: '#333c41', // --iui-color-background
  appBorderColor: '#49555d', // --iui-color-border
  appBorderRadius: 9,

  // Typography
  fontBase:
    '"Noto Sans", "Open Sans", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, system-ui, sans-serif',
  fontCode:
    '"Noto Sans Mono", ui-monospace, "SF Mono", SFMono-Regular, "DejaVu Sans Mono", Menlo, Consolas, monospace',

  // Text colors
  textColor: '#dbdbdb', //--iui-color-text

  // Toolbar default and active colors
  barTextColor: '#dbdbdb', //--iui-color-text
  barSelectedColor: '#94befa', // --iui-color-text-accent
  barBg: '#333c41', // --iui-color-background

  // Form colors
  inputBg: '#333c41', // --iui-color-background
  inputBorder: '#49555d', // --iui-color-border
  inputTextColor: '#dbdbdb', //--iui-color-text
  inputBorderRadius: 3,
});
