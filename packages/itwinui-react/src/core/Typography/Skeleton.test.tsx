/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { Skeleton } from './Skeleton.js';

it('should work', () => {
  const { container } = render(<Skeleton />);
  const skeleton = container.querySelector('div') as HTMLElement;
  expect(skeleton).toHaveClass('iui-skeleton');
});
