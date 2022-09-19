/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, useOverflow, useMergedRefs } from '../utils';
import '@itwin/itwinui-css/css/button.css';

export type ButtonGroupProps = {
  /**
   * Buttons in the ButtonGroup.
   */
  children: React.ReactNode;
  /**
   * If specified, this prop will be used to show a custom button when overflow happens,
   * i.e. when there is not enough space to fit all the buttons.
   *
   * Expects a function that takes the index of the first button that is overflowing (i.e. hidden)
   * and returns the `ReactNode` to render.
   *
   * The placement of this button can be controlled using the `overflowPlacement` prop.
   */
  overflowButton?: (firstOverflowingIndex: number) => React.ReactNode;
  /**
   * If `overflowButton` is specified, should it placed at the start or the end?
   * @default 'end'
   */
  overflowPlacement?: 'start' | 'end';
  /**
   * Should the buttons be placed in a horizontal or vertical layout?
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
} & React.ComponentPropsWithRef<'div'>;

/**
 * Group buttons together for common actions.
 * Handles responsive overflow when the `overflowButton` prop is specified.
 *
 * @example
 * <ButtonGroup>
 *   <IconButton>
 *     <SvgAdd />
 *   </IconButton>
 *   <IconButton>
 *     <SvgEdit />
 *   </IconButton>
 * </ButtonGroup>
 *
 * @example
 * const buttons = [...Array(10)].map((_, index) => <IconButton><SvgPlaceholder /></IconButton>);
 * <ButtonGroup
 *   overflowButton={(overflowStart) => <DropdownMenu menuItems={(close) =>
 *     [...Array(buttons.length - overflowStart + 1)].map((_, index) => (
 *       <MenuItem icon={<SvgPlaceholder />} onClick={close}>Button #{overflowStart + index}</MenuItem>
 *     ))
 *   }>
 *     <IconButton><SvgMore /></IconButton>
 *   </DropdownMenu>}
 * >
 *   {buttons}
 * </ButtonGroup>
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    const {
      children,
      className,
      overflowButton,
      overflowPlacement = 'end',
      orientation = 'horizontal',
      ...rest
    } = props;

    const items = React.useMemo(
      () => React.Children.map(children, (child) => <div>{child}</div>) ?? [],
      [children],
    );

    useTheme();

    const [overflowRef, visibleCount] = useOverflow(
      items,
      !overflowButton,
      orientation,
    );
    const refs = useMergedRefs(overflowRef, ref);

    return (
      <div
        className={cx(
          {
            'iui-button-group': orientation === 'horizontal',
            'iui-button-group-vertical': orientation === 'vertical',
            'iui-button-group-overflow-x':
              !!overflowButton && orientation === 'horizontal',
          },
          className,
        )}
        aria-orientation={orientation}
        ref={refs}
        {...rest}
      >
        <>
          {visibleCount < items.length &&
            overflowButton &&
            overflowPlacement === 'start' && (
              <div>{overflowButton(visibleCount)}</div>
            )}

          {visibleCount < items.length
            ? items.slice(0, Math.max(0, visibleCount - 1))
            : items}

          {visibleCount < items.length &&
            overflowButton &&
            overflowPlacement === 'end' && (
              <div>{overflowButton(visibleCount)}</div>
            )}
        </>
      </div>
    );
  },
);

export default ButtonGroup;
