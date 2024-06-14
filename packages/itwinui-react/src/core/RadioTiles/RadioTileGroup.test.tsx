/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { RadioTileGroup } from './RadioTileGroup.js';
import { RadioTile } from './RadioTile.js';

it('should render without label', () => {
  const { container } = render(
    <RadioTileGroup>
      <RadioTile />
      <RadioTile />
    </RadioTileGroup>,
  );
  expect(
    container.querySelector(
      '.iui-input-grid > .iui-input-group > .iui-radio-tile-container',
    ),
  ).toBeTruthy();
  expect(
    container.querySelector('.iui-input-container > .iui-input-label'),
  ).toBeNull();
});

it('should render with label', () => {
  const { container } = render(
    <RadioTileGroup label='My tiles'>
      <RadioTile />
      <RadioTile />
    </RadioTileGroup>,
  );
  expect(
    container.querySelector(
      '.iui-input-grid > .iui-input-group > .iui-radio-tile-container',
    ),
  ).toBeTruthy();
  const label = container.querySelector(
    '.iui-input-grid > .iui-input-label',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('My tiles');
});
