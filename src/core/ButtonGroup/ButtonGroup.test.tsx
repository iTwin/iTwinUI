/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '../Buttons';
import { ButtonGroup } from './ButtonGroup';

it('renders with two buttons', () => {
  const { container } = render(
    <ButtonGroup>
      <Button>First</Button>
      <Button>Second</Button>
    </ButtonGroup>,
  );
  expect(container.querySelector('.iui-button-group')).toBeTruthy();
  expect(container.querySelectorAll('button').length).toBe(2);
});

it('renders with four buttons', () => {
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
