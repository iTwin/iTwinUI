/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, CommonProps, Popover, PopoverProps } from '../utils';
import '@itwin/itwinui-css/css/tooltip.css';

export type TooltipProps = {
  /**
   * Content of the tooltip.
   */
  content: React.ReactNode;
  /**
   * Element to have tooltip on. Has to be a valid JSX element and needs to forward its ref.
   * If not specified, the `reference` prop should be used instead.
   */
  children?: JSX.Element;
} & Omit<PopoverProps, 'className'> &
  Omit<CommonProps, 'title'>;

/**
 * Basic tooltip component to display informative content when an element is hovered or focused.
 * Uses the {@link Popover} component, which is a wrapper around [tippy.js](https://atomiks.github.io/tippyjs).
 * @example
 * <Tooltip content='tooltip text' placement='top'><div>Hover here</div></Tooltip>
 * @example
 * const buttonRef = React.useRef();
 * ...
 * <Button ref={buttonRef} />
 * <Tooltip content='tooltip text' reference={buttonRef} />
 */
export const Tooltip = (props: TooltipProps) => {
  const { content, children, className, style, visible, ref, id, ...rest } =
    props;

  useTheme();

  return (
    <Popover
      visible={visible}
      interactive={false}
      content={
        <div
          className={cx('iui-tooltip', className)}
          style={style}
          role='tooltip'
          id={id}
        >
          {content}
        </div>
      }
      offset={[0, 4]}
      ref={ref}
      {...rest}
    >
      {children && React.cloneElement(children, { title: undefined })}
    </Popover>
  );
};

export default Tooltip;
