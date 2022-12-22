/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { CommonProps, useTheme, StatusIconMap, SvgCloseSmall } from '../utils';
import '@itwin/itwinui-css/css/alert.css';

export type AlertProps = {
  /**
   * Type of the alert.
   * @default 'informational'
   */
  type?: 'positive' | 'warning' | 'negative' | 'informational';
  /**
   * Text for the link you want to provide.
   */
  clickableText?: React.ReactNode;
  /**
   * Props for the clickable text. Used for providing `href` and other attributes.
   */
  clickableTextProps?: React.ComponentPropsWithRef<'a'>;
  /**
   * Action handler for close.
   */
  onClose?: () => void;
  /**
   * Stick the alert to the top.
   * @default false
   */
  isSticky?: boolean;
  /**
   * Alert message text.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * A small box to quickly grab user attention and communicate a brief message
 * @example
 * <Alert>This is a basic alert.</Alert>
 * <Alert type='positive'>This is a positive alert.</Alert>
 * <Alert type='warning'>This is a warning alert.</Alert>
 * <Alert type='negative'>This is a negative alert.</Alert>
 * <Alert
 *  type='positive'
 *  clickableText="I am a clickable text"
 *  clickableTextProps={{ href: 'https://www.example.com' }}
 * >
 *   This is a positive alert with a clickable text
 * </Alert>
 */
export const Alert = (props: AlertProps) => {
  const {
    children,
    className,
    type = 'informational',
    clickableText,
    clickableTextProps,
    onClose,
    style,
    isSticky = false,
    ...rest
  } = props;

  useTheme();

  const StatusIcon = StatusIconMap[type];

  return (
    <div
      className={cx('iui-alert', className)}
      data-iui-status={type}
      data-iui-variant={isSticky ? 'sticky' : undefined}
      style={style}
      {...rest}
    >
      <StatusIcon className='iui-alert-icon' />
      <span className='iui-alert-message'>
        {children}
        {clickableText && (
          <a
            {...clickableTextProps}
            className={cx('iui-alert-link', clickableTextProps?.className)}
          >
            {clickableText}
          </a>
        )}
      </span>

      {onClose && (
        <button
          onClick={onClose}
          aria-label='Close'
          type='button'
          className='iui-alert-button'
        >
          <span className='iui-alert-button-icon' aria-hidden>
            <SvgCloseSmall />
          </span>
        </button>
      )}
    </div>
  );
};

export default Alert;
