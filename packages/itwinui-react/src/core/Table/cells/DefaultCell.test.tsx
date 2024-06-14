/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { DefaultCell } from './DefaultCell.js';

it('should merge className/style with cellElementProps', () => {
  const { container } = render(
    <DefaultCell
      cellElementProps={{
        key: 'key',
        className: 'original-class',
        style: { width: 100 },
      }}
      className='test-class'
      style={{ color: 'red' }}
      cellProps={{ column: { id: 'id' } } as any}
    >
      {null}
    </DefaultCell>,
  );

  const cellElement = container.querySelector('.original-class') as HTMLElement;
  expect(cellElement).toHaveClass('test-class');
  expect(cellElement.style.width).toBe('100px');
  expect(cellElement.style.color).toBe('red');
});
