// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { Position } from '../../utils/Positioner';
import cx from 'classnames';
import { CommonProps } from '../utils/props';
import { Popover } from '../../utils';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/tooltips.css';

export type TooltipProps = {
  /**
   * Content of the tooltip.
   */
  content: React.ReactNode;
  /**
   * Placement of tooltip
   * @default Position.BOTTOM
   */
  placement?: Position;
  /**
   * ID of portal container.
   */
  parentId?: string;
  /**
   * Element to have tooltip on. Has to be valid JSX element.
   */
  children: JSX.Element;
  /**
   * Control visibility if needed.
   */
  isVisible?: boolean;
} & Omit<CommonProps, 'title'>;

/**
 * Basic tooltip component
 * @example
 * <Tooltip content='tooltip text'><div>Hover here</div></Tooltip>
 */
export const Tooltip = (props: TooltipProps) => {
  const {
    content,
    parentId,
    placement = Position.BOTTOM,
    children,
    className,
    style,
    isVisible,
    ...rest
  } = props;

  useTheme();

  const [visible, setVisible] = React.useState(isVisible);

  React.useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  return (
    <Popover
      showOnHover
      hoverTargetOnly
      content={
        <div
          className={cx('iui-tooltip', className)}
          style={style}
          role='tooltip'
          {...rest}
        >
          {content}
        </div>
      }
      parentId={parentId}
      position={placement}
      isShown={visible}
      style={{ zIndex: 1000 }}
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
