import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DropdownButton } from './DropdownButton.js';
import { SplitButton } from './SplitButton.js';
import { MenuItem } from '../Menu/MenuItem.js';

it.each([
  ['DropdownButton', DropdownButton],
  ['SplitButton', SplitButton],
] as const)('closes an open %s menu on disable', async (_name, Button) => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  const menuItems = <MenuItem onClick={onSelect}>Bravo</MenuItem>;
  const button = (disabled: boolean) => (
    <Button disabled={disabled} menuItems={menuItems}>
      Choice
    </Button>
  );
  const { rerender } = render(button(false));
  const toggle = () =>
    screen.getAllByRole('button', { name: 'Choice' }).at(-1)!;

  await user.click(toggle());
  expect(screen.getByRole('menuitem', { name: 'Bravo' })).toBeTruthy();

  rerender(button(true));
  expect(screen.queryByRole('menuitem', { name: 'Bravo' })).toBeNull();
  expect(onSelect).not.toHaveBeenCalled();

  rerender(button(false));
  expect(screen.queryByRole('menuitem', { name: 'Bravo' })).toBeNull();
  await user.click(toggle());
  await user.click(screen.getByRole('menuitem', { name: 'Bravo' }));
  expect(onSelect).toHaveBeenCalledTimes(1);
});
