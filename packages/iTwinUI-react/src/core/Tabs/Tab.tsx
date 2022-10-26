/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/tabs.css';

export type TabProps = {
  /**
   * The main label shown in the tab.
   */
  label?: React.ReactNode;
  /**
   * Secondary label shown below the main label.
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
} & React.HTMLAttributes<HTMLButtonElement>;

/**
 * Individual tab component to be used in the `labels` prop of `Tabs`.
 * @example
 * const tabs = [
 *   <Tab label='Label 1' sublabel='Description 1' />,
 *   <Tab label='Label 2' startIcon={<SvgPlaceholder />} />,
 * ];
 */
export const Tab = (props: TabProps) => {
  const { label, sublabel, startIcon, children, className, ...rest } = props;

  useTheme();

  return (
    <button
      className={cx('iui-tab', className)}
      role='tab'
      tabIndex={-1}
      {...rest}
    >
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

export default TabProps;
