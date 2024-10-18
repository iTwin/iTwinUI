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

it('should apply all custom props', () => {
  const { container } = render(
    <RadioTileGroup
      label='My tiles'
      className='root-props'
      labelProps={{
        className: 'label-props',
      }}
      innerProps={{
        className: 'inner-props',
      }}
      tileContainerProps={{
        className: 'tile-container-props',
      }}
      messageProps={{
        contentProps: {
          className: 'message-content-props',
        },
      }}
      message={'Message'}
    >
      <RadioTile />
      <RadioTile />
    </RadioTileGroup>,
  );

  expect(container.querySelector('.iui-input-grid.root-props')).toBeTruthy();
  expect(
    container.querySelector('.iui-input-grid > .iui-input-label.label-props'),
  ).toBeTruthy();
  expect(
    container.querySelector('.iui-input-grid > .iui-input-group.inner-props'),
  ).toBeTruthy();
  expect(
    container.querySelector(
      '.iui-input-grid > .iui-input-group > .iui-radio-tile-container.tile-container-props',
    ),
  ).toBeTruthy();
  expect(
    container.querySelector(
      '.iui-input-grid > .iui-status-message > .message-content-props',
    ),
  ).toHaveTextContent('Message');
});
