/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { MiddleTextTruncation } from './MiddleTextTruncation.js';
import * as UseOverflow from '../hooks/useOverflow.js';

it('should render all items when no overflow', () => {
  vi.spyOn(UseOverflow, 'useOverflow').mockReturnValue([vi.fn(), 20]);
  const { container } = render(
    <div>
      <MiddleTextTruncation text='This is some very long text to truncate and expect ellipsis' />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe('This is some …lipsis');
});
