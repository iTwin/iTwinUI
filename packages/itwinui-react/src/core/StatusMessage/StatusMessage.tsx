/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, StatusIconMap } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import cx from 'classnames';
import { Icon } from '../Icon/Icon.js';

type StatusMessageProps = {
  /**
   * Custom icon to be displayed at the beginning.
   *
   * - It will default to the `status` icon, if `status` is set. Else, it defaults to no icon.
   * - If `startIcon` is set to `null`, no icon will be displayed, even if `status` is set.
   */
  startIcon?: React.JSX.Element | null;
  /**
   * Message content.
   */
  children: React.ReactNode;
  /**
   * Status of the message.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Passes props to icon
   */
  iconProps?: React.ComponentProps<typeof Icon>;
  /**
   * Passes props to content
   */
  contentProps?: React.ComponentPropsWithRef<'div'>;
};

/**
 * Component to display icon and text below the form field.
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

  // If user passes null, we don't want to show the icon
  const shouldShowIcon = userStartIcon !== null && !!icon;

  return (
    <Box
      className={cx('iui-status-message', className)}
      data-iui-status={status}
      ref={ref}
      {...rest}
    >
      {shouldShowIcon ? (
        <Icon aria-hidden {...iconProps}>
          {icon}
        </Icon>
      ) : null}
      <Box {...contentProps}>{children}</Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', StatusMessageProps>;
if (process.env.NODE_ENV === 'development') {
  StatusMessage.displayName = 'StatusMessage';
}
