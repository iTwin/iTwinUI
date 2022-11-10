/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/surface.css';

/**
 * Helper function that returns one of the preset surface elevation values.
 */
const getSurfaceElevationValue = (elevation: SurfaceProps['elevation']) => {
  switch (elevation) {
    case 0:
      return 'none';
    case 1:
      return 'var(--iui-shadow-1)';
    case 2:
      return 'var(--iui-shadow-2)';
    case 3:
      return 'var(--iui-shadow-3)';
    case 4:
      return 'var(--iui-shadow-4)';
    case 5:
      return 'var(--iui-shadow-5)';
    default:
      return '';
  }
};

export type SurfaceProps = {
  /**
   * Sets the elevation of the surface
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * Content in the surface.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * The Surface container allows content to appear elevated through the use of a drop shadow
 * @example
 * <Surface>Surface Content</Surface>
 * <Surface elevation={2}>Surface Content</Surface>
 */
export const Surface = React.forwardRef(
  (props: SurfaceProps, ref: React.RefObject<HTMLDivElement>) => {
    const { elevation, className, style, children, ...rest } = props;
    useTheme();

    const _style = {
      '--iui-surface-elevation': getSurfaceElevationValue(elevation),
      ...style,
    };
    return (
      <div
        className={cx('iui-surface', className)}
        style={_style}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export default Surface;
