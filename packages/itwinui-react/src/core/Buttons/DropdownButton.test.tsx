/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render, waitFor } from '@testing-library/react';

import { DropdownButton } from './DropdownButton.js';
import { MenuItem } from '../Menu/MenuItem.js';
import { SvgCaretDownSmall, SvgCaretUpSmall } from '../../utils/index.js';
import { userEvent } from '@testing-library/user-event';

function renderComponent(
  props?: Partial<React.ComponentProps<typeof DropdownButton>>,
) {
  return render(
    <DropdownButton
      menuItems={(close) => [
        <MenuItem key={0} onClick={close}>
          Test0
        </MenuItem>,
        <MenuItem key={1} onClick={close}>
          Test1
        </MenuItem>,
        <MenuItem key={2} onClick={close}>
          Test2
        </MenuItem>,
      ]}
      {...props}
    >
      test-label
    </DropdownButton>,
  );
}

it('should render in its most basic state', () => {
  const { container } = renderComponent();
  expect(
    container.querySelector('.iui-button.iui-button-dropdown'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-button-icon')).toBeTruthy();
});

it('should update when menu opens or closes', async () => {
  const { container } = renderComponent();

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button).not.toHaveAttribute('data-iui-has-popover', 'open');

  const {
    container: { firstChild: downArrow },
  } = render(<SvgCaretDownSmall aria-hidden />);

  let buttonIcon = container.querySelector('.iui-button-icon');
  let svg = buttonIcon?.querySelector('svg');

  expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
  expect(svg).toEqual(downArrow);

  // Open menu
  await userEvent.click(button);
  expect(button).toHaveAttribute('data-iui-has-popover', 'open');

  const {
    container: { firstChild: upArrow },
  } = render(<SvgCaretUpSmall aria-hidden />);

  buttonIcon = container.querySelector('.iui-button-icon');
  svg = buttonIcon?.querySelector('svg');

  expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
  expect(svg).toEqual(upArrow);

  // Close menu
  await userEvent.click(button);
  expect(button).not.toHaveAttribute('data-iui-has-popover', 'open');

  buttonIcon = container.querySelector('.iui-button-icon');
  svg = buttonIcon?.querySelector('svg');

  expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
  expect(svg).toEqual(downArrow);
});

it('should render borderless button correctly', () => {
  const { container } = renderComponent({ styleType: 'borderless' });
  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button).toHaveAttribute('data-iui-variant', 'borderless');
});
