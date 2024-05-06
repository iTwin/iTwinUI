/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgMore, SvgClose as SvgPlaceholder } from '../../utils/index.js';
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import * as UseOverflow from '../../utils/hooks/useOverflow.js';

import { ButtonGroup } from './ButtonGroup.js';
import { Button } from '../Buttons/Button.js';
import { IconButton } from '../Buttons/IconButton.js';

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
    const scrollWidthSpy = vi
      .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
      .mockReturnValueOnce(250)
      .mockReturnValue(200);
    const offsetWidthSpy = vi
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(200);

    const mockOnClick = vi.fn();

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
    expect(mockOnClick).toHaveBeenCalledWith(1);

    scrollWidthSpy.mockRestore();
    offsetWidthSpy.mockRestore();
  },
);

it.each(['start', 'end'] as const)(
  'should handle overflow when available space is smaller than one element (%s)',
  (overflowPlacement) => {
    const scrollWidthSpy = vi
      .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
      .mockReturnValue(200);
    const offsetWidthSpy = vi
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
    '.iui-button-group[data-iui-orientation="vertical"]',
  ) as HTMLElement;
  expect(group).toBeTruthy();
  expect(group.children).toHaveLength(2);
});

it.each`
  visibleCount | overflowStart | length | overflowPlacement
  ${9}         | ${1}          | ${10}  | ${'start'}
  ${8}         | ${2}          | ${10}  | ${'start'}
  ${4}         | ${6}          | ${10}  | ${'start'}
  ${3}         | ${7}          | ${10}  | ${'start'}
  ${1}         | ${9}          | ${10}  | ${'start'}
  ${9}         | ${8}          | ${10}  | ${'end'}
  ${8}         | ${7}          | ${10}  | ${'end'}
  ${4}         | ${3}          | ${10}  | ${'end'}
  ${3}         | ${2}          | ${10}  | ${'end'}
  ${1}         | ${0}          | ${10}  | ${'end'}
`(
  'should calculate correct values when overflowPlacement=$overflowPlacement and visibleCount=$visibleCount',
  ({ visibleCount, overflowStart, length, overflowPlacement }) => {
    const useOverflowMock = vi
      .spyOn(UseOverflow, 'useOverflow')
      .mockReturnValue([vi.fn(), visibleCount]);

    const buttons = [...Array(length)].map((_, index) => (
      <button key={index}>{index}</button>
    ));

    const { container } = render(
      <ButtonGroup
        overflowButton={(startIndex) => <span>{startIndex}</span>}
        overflowPlacement={overflowPlacement}
      >
        {buttons}
      </ButtonGroup>,
    );

    expect(container.querySelectorAll('button')).toHaveLength(visibleCount - 1);
    expect(container.querySelector('span')).toHaveTextContent(
      `${overflowStart}`,
    );

    useOverflowMock.mockRestore();
  },
);
