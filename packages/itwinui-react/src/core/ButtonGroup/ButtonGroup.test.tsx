/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgMore, SvgClose as SvgPlaceholder } from '../utils';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { ButtonGroup } from './ButtonGroup';
import { Button, IconButton } from '../Buttons';

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

it.each(['start', 'end'] as const)(
  'should handle overflow when overflowButton is specified (%s)',
  (overflowPlacement) => {
    const scrollWidthSpy = jest
      .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
      .mockReturnValueOnce(250)
      .mockReturnValue(200);
    const offsetWidthSpy = jest
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(200);

    const mockOnClick = jest.fn();

    const OverflowGroup = () => {
      const buttons = [...Array(3)].map((_, index) => (
        <IconButton key={index}>
          <SvgPlaceholder />
        </IconButton>
      ));
      return (
        <ButtonGroup
          overflowButton={(overflowStart) => (
            <IconButton onClick={() => mockOnClick(overflowStart)}>
              <SvgMore />
            </IconButton>
          )}
          overflowPlacement={overflowPlacement}
        >
          {buttons}
        </ButtonGroup>
      );
    };
    const { container } = render(<OverflowGroup />);

    expect(container.querySelector('.iui-button-group')).toBeTruthy();

    const buttons = container.querySelectorAll('.iui-button');
    expect(buttons).toHaveLength(2);
    fireEvent.click(overflowPlacement === 'end' ? buttons[1] : buttons[0]);
    expect(mockOnClick).toHaveBeenCalledWith(2);

    scrollWidthSpy.mockRestore();
    offsetWidthSpy.mockRestore();
  },
);

it.each(['start', 'end'] as const)(
  'should handle overflow when available space is smaller than one element (%s)',
  (overflowPlacement) => {
    const scrollWidthSpy = jest
      .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
      .mockReturnValue(200);
    const offsetWidthSpy = jest
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(50);

    const OverflowGroup = () => {
      const buttons = [...Array(3)].map((_, index) => (
        <IconButton key={index}>
          <SvgPlaceholder />
        </IconButton>
      ));
      return (
        <ButtonGroup
          overflowButton={() => (
            <IconButton>
              <SvgMore />
            </IconButton>
          )}
          overflowPlacement={overflowPlacement}
        >
          {buttons}
        </ButtonGroup>
      );
    };
    const { container } = render(<OverflowGroup />);
    const {
      container: { firstChild: moreIconButton },
    } = render(
      <IconButton>
        <SvgMore />
      </IconButton>,
    );

    expect(container.querySelector('.iui-button-group')).toBeTruthy();

    const buttons = container.querySelectorAll('.iui-button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toEqual(moreIconButton);

    scrollWidthSpy.mockRestore();
    offsetWidthSpy.mockRestore();
  },
);

it('should work in vertical orientation', () => {
  const { container } = render(
    <ButtonGroup orientation='vertical'>
      <Button>First</Button>
      <Button>Second</Button>
    </ButtonGroup>,
  );
  const group = container.querySelector(
    '.iui-button-group-vertical',
  ) as HTMLElement;
  expect(group).toBeTruthy();
  expect(group).not.toHaveClass('iui-button-group');
  expect(group.children).toHaveLength(2);
});
