/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import '@itwin/itwinui-css/css/tabs.css';

type TabProps = {
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
};

/**
 * Individual tab component to be used in the `labels` prop of `Tabs`.
 * @example
 * const tabs = [
 *   <Tab label='Label 1' sublabel='Description 1' />,
 *   <Tab label='Label 2' startIcon={<SvgPlaceholder />} />,
 * ];
 */
export const Tab = React.forwardRef((props, forwardedRef) => {
  const { label, sublabel, startIcon, children, className, ...rest } = props;

  return (
    <Box
      as='button'
      className={cx('iui-tab', className)}
      role='tab'
      tabIndex={-1}
      ref={forwardedRef}
      {...rest}
    >
      {startIcon &&
        React.cloneElement(startIcon, {
          className: 'iui-tab-icon',
          'aria-hidden': true,
        })}
      {label && (
        <Box as='span' className='iui-tab-label'>
          <div>{label}</div>
          {sublabel && <Box className='iui-tab-description'>{sublabel}</Box>}
        </Box>
      )}
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', TabProps>;

export default TabProps;
