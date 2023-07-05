/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { ThemeProvider } from '@itwin/itwinui-react';
import '@itwin/itwinui-react/styles.css';

export default function StoryWithDecorator(Story, context) {
  const theme = useDarkMode() ? 'dark' : 'light';
  const highContrast = context.globals.hc;

  const background =
    context.globals.backgrounds?.value ??
    'var(--iui-color-background-backdrop)';

  return (
    <ThemeProvider
      theme={theme}
      themeOptions={{ highContrast, applyBackground: false }}
      style={{ background }}
      className='story-wrapper'
    >
      <Story />
    </ThemeProvider>
  );
}
