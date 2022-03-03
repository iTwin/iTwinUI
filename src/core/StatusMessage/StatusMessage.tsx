/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { StatusIconMap, useTheme } from '../utils';
import cx from 'classnames';

export type StatusMessageProps = {
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
};

/**
 * Component to display icon and text below the `Combobox` component.
 * @example
 * <StatusMessage>This is the text</StatusMessage>
 * <StatusMessage startIcon={<SvgStar />}>This is the text</StatusMessage>
 */
export const StatusMessage = ({
  startIcon: userStartIcon,
  children,
  status,
}: StatusMessageProps) => {
  useTheme();

  const StartIcon = () => {
    const icon = userStartIcon ?? (status && StatusIconMap[status]());

    if (!icon) {
      return null;
    }

    return React.cloneElement(icon, {
      className: cx('iui-input-icon', icon.props?.className),
      'aria-hidden': true,
    });
  };

  return (
    <>
      <StartIcon />
      <div className='iui-message'>{children}</div>
    </>
  );
};

export default StatusMessage;
