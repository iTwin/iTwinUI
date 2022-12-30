/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Code } from './Code';

it('should render in its most basic state', () => {
  const { container } = render(<Code>child</Code>);
  const code = container.querySelector('code.iui-code') as HTMLElement;
  expect(code).toBeTruthy();
  expect(code.textContent).toBe('child');
});

it('should add custom className', () => {
  const { container } = render(<Code className='test-classname'>test</Code>);
  expect(container.querySelector('code.iui-code.test-classname')).toBeTruthy();
});
