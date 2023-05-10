/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ThemeProvider } from '@itwin/itwinui-react';

export default function StoryWithDecorator(Story, context) {
  const highContrast = context.globals.hc;

  return (
    <ThemeProvider themeOptions={{ highContrast, applyBackground: false }}>
      <Story />
    </ThemeProvider>
  );
}
