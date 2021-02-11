// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/alert.css';
import { SvgClose, SvgInfo } from '@bentley/icons-generic-react';
import {
  SvgError,
  SvgSuccess,
  SvgWarning,
} from '@bentley/icons-generic-react/lib/icons/status';
import cx from 'classnames';
import React from 'react';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';

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
   * Action handler for the clickable text.
   */
  onClick?: () => void;
  /**
   * Action handler for close.
   */
  onClose?: () => void;
  /**
   * Stick the alert to the top.
   * @default false
   */
  isSticky?: boolean;
} & CommonProps;

/**
 * A small box to quickly grab user attention and communicate a brief message
 * @example
 * <Alert>This is a basic alert.</Alert>
 * <Alert type='positive'>This is a positive alert.</Alert>
 * <Alert type='warning'>This is a warning alert.</Alert>
 * <Alert type='negative'>This is a negative alert.</Alert>
 * <Alert type='positive' clickableText="I am a clickable text" onClick={()=>alert("Pressed")}>This is a positive alert with a clickable text</Alert>
 */
export const Alert: React.FC<AlertProps> = (props) => {
  const {
    children,
    className,
    type = 'informational',
    clickableText,
    onClick,
    onClose,
    style,
    isSticky = false,
  } = props;

  useTheme();

  const iconMap = {
    negative: <SvgError className='iui-alerts-status-icon' />,
    informational: <SvgInfo className='iui-alerts-status-icon' />,
    positive: <SvgSuccess className='iui-alerts-status-icon' />,
    warning: <SvgWarning className='iui-alerts-status-icon' />,
  };

  return (
    <div
      className={cx(
        `iui-alerts-${type}`,
        { 'iui-sticky': isSticky },
        className,
      )}
      style={style}
    >
      {iconMap[type]}
      {children}
      {clickableText && (
        <a className='iui-alerts-link' onClick={onClick}>
          {clickableText}
        </a>
      )}
      {onClose && (
        <SvgClose className='iui-alerts-close-icon' onClick={onClose} />
      )}
    </div>
  );
};

export default Alert;
