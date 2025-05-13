/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ThemeProvider } from '@itwin/itwinui-react';
import { useStore } from '@nanostores/react';
import { demoTheme } from '../stores/theme.store';

export default function DemoThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={useStore(demoTheme)} themeOptions={{ applyBackground: false }}>
      {children}
    </ThemeProvider>
  );
}
