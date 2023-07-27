/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, StatusIconMap, Icon } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import cx from 'classnames';

type StatusMessageProps = {
  /**
   * Custom icon to be displayed at the beginning.
   * It will default to the `status` icon, if it's set.
   */
  startIcon?: JSX.Element;
  /**
   * Message content.
   */
  children: React.ReactNode;
  /**
   * Status of the message.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   *
   */
  iconProps?: React.ComponentProps<typeof Icon>;
  /**
   *
   */
  contentProps?: React.ComponentPropsWithRef<'div'>;
};

/**
 * Component to display icon and text below the `Combobox` component.
 * @example
 * <StatusMessage>This is the text</StatusMessage>
 * <StatusMessage startIcon={<SvgStar />}>This is the text</StatusMessage>
 */
export const StatusMessage = React.forwardRef((props, ref) => {
  const {
    children,
    startIcon: userStartIcon,
    status,
    className,
    iconProps,
    contentProps,
    ...rest
  } = props;

  const icon = userStartIcon ?? (status && StatusIconMap[status]());

  return (
    <Box
      className={cx('iui-status-message', className)}
      data-iui-status={status}
      ref={ref}
      {...rest}
    >
      {!!icon ? (
        <Icon
          {...iconProps}
          className={cx('iui-status-message-icon', iconProps?.className)}
          aria-hidden
        >
          {icon}
        </Icon>
      ) : null}
      <Box
        {...contentProps}
        className={cx('iui-status-message-content', contentProps?.className)}
      >
        {children}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', StatusMessageProps>;

export default StatusMessage;
