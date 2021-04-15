/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/tooltip.css';
import { Popover, PopoverProps } from '../utils/Popover';

export type TooltipProps = {
  /**
   * Content of the tooltip.
   */
  content: React.ReactNode;
  /**
   * Element to have tooltip on. Has to be valid JSX element.
   */
  children: JSX.Element;
} & Omit<PopoverProps, 'className'> &
  Omit<CommonProps, 'title'>;

/**
 * Basic tooltip component
 * @example
 * <Tooltip content='tooltip text' placement='top'><div>Hover here</div></Tooltip>
 */
export const Tooltip = (props: TooltipProps) => {
  const { content, children, className, style, visible, ref, ...rest } = props;

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
        >
          {content}
        </div>
      }
      offset={[0, 4]}
      ref={ref}
      {...rest}
    >
      {React.cloneElement(children, { title: undefined })}
    </Popover>
  );
};

export default Tooltip;
