/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { Overlay } from './Overlay.js';

it('should render in its most basic state', () => {
  const { container } = render(<Overlay />);

  const overlay = container.querySelector(
    '.iui-overlay-wrapper',
  ) as HTMLElement;
  expect(overlay).toBeTruthy();
});
