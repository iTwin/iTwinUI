/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/tabs.css';
import { CommonProps } from '../utils/props';

export type HorizontalTabProps = {
  /**
   * The main label shown in the tab.
   */
  label?: React.ReactNode;
  /**
   * Secondary label shown below the main label.
   * Only shown if `size` of `HorizontalTabs` is set to large.
   */
  sublabel?: React.ReactNode;
  /**
   * Svg icon shown before the labels.
   */
  startIcon?: JSX.Element;
  /**
   * Control whether the tab is disabled.
   */
  disabled?: boolean;
  /**
   * Custom content appended to the tab.
   */
  children?: React.ReactNode;
  /**
   * Click event handler.
   */
  onClick?: () => void;
} & CommonProps;

/**
 * Individual tab component to be used in the `labels` prop of `HorizontalTabs`.
 * @example
 * const tabs = [
 *   <HorizontalTab label='Label 1' sublabel='Description 1' />,
 *   <HorizontalTab label='Label 2' startIcon={<SvgPlaceholder />} />,
 * ];
 */
export const HorizontalTab = (props: HorizontalTabProps) => {
  const { label, sublabel, startIcon, children, className, ...rest } = props;

  useTheme();

  return (
    <button className={cx('iui-tab', className)} role='tab' {...rest}>
      {startIcon &&
        React.cloneElement(startIcon, {
          className: 'iui-tab-icon',
          'aria-hidden': true,
        })}
      {label && (
        <span className='iui-tab-label'>
          <div>{label}</div>
          {sublabel && <div className='iui-tab-description'>{sublabel}</div>}
        </span>
      )}
      {children}
    </button>
  );
};

export default HorizontalTabProps;
