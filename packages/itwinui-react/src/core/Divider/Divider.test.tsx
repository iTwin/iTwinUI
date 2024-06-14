/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { Divider } from './Divider.js';

it('should render Divider', () => {
  const { container } = render(<Divider />);
  const divider = container.querySelector('.iui-divider') as HTMLElement;
  expect(divider).toBeTruthy();
});

it('should render Divider with vertical orientation', () => {
  const { container } = render(<Divider orientation='vertical' />);
  const divider = container.querySelector('.iui-divider') as HTMLElement;
  expect(divider.getAttribute('aria-orientation')).toBe('vertical');
});
