/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import { useOverflow } from '../utils/hooks/useOverflow';
import '@itwin/itwinui-css/css/button.css';

export type ButtonGroupProps = {
  /**
   * Buttons in the ButtonGroup.
   */
  children: React.ReactNode;
  /**
   * If specified, this prop will be used to show a custom button as the last button
   * when overflow happens, i.e. when there is not enough space to fit all the buttons.
   *
   * Expects a function that takes the index of the first button that is overflowing (i.e. hidden)
   * and returns the `ReactNode` to render.
   */
  overflowButton?: (firstOverflowingIndex: number) => React.ReactNode;
} & Omit<CommonProps, 'title'>;

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
export const ButtonGroup = (props: ButtonGroupProps) => {
  const { children, className, style, overflowButton, ...rest } = props;

  const items = React.useMemo(() => React.Children.toArray(children), [
    children,
  ]);

  useTheme();

  const [overflowRef, visibleCount] = useOverflow(items, !overflowButton);

  return (
    <div
      className={cx('iui-button-group', className)}
      style={{ ...(!!overflowButton && { width: '100%' }), ...style }}
      ref={overflowRef}
      {...rest}
    >
      {!!overflowButton && visibleCount < items.length ? (
        <>
          {items.slice(0, visibleCount - 1)}
          {overflowButton(visibleCount)}
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default ButtonGroup;
