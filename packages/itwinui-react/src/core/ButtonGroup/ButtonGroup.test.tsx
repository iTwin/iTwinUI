/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { ButtonGroup } from './ButtonGroup.js';
import { Button } from '../Buttons/Button.js';

it('should render with two buttons', () => {
  const { container } = render(
    <ButtonGroup>
      <Button>First</Button>
      <Button>Second</Button>
    </ButtonGroup>,
  );
  expect(container.querySelector('.iui-button-group')).toBeTruthy();
  expect(container.querySelectorAll('button').length).toBe(2);
});

it('should render with four buttons', () => {
  const { container } = render(
    <ButtonGroup>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
      <Button>Fourth</Button>
    </ButtonGroup>,
  );
  expect(container.querySelector('.iui-button-group')).toBeTruthy();
  expect(container.querySelectorAll('button').length).toBe(4);
});

it('should work in vertical orientation', () => {
  const { container } = render(
    <ButtonGroup orientation='vertical'>
      <Button>First</Button>
      <Button>Second</Button>
    </ButtonGroup>,
  );
  const group = container.querySelector(
    '.iui-button-group[data-iui-orientation="vertical"]',
  ) as HTMLElement;
  expect(group).toBeTruthy();
  expect(group.children).toHaveLength(2);
});
