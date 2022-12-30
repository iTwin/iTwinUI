/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert, ThemeProvider } from '@itwin/itwinui-react';

export default function AlertDemo() {
  return (
    <ThemeProvider theme='dark'>
      <Alert
        onClose={() => console.log('CLOSED')}
        clickableText='Learn more'
        style={{ minWidth: 280 }}
      >
        This is an alert
      </Alert>
    </ThemeProvider>
  );
}
