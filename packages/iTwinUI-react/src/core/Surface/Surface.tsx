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
    case 1:
      return '0 1px 5px rgba(0, 0, 0, 0.25)';
    case 2:
      return '0 1px 10px rgba(0, 0, 0, 0.25)';
    case 3:
      return '0 3px 14px rgba(0, 0, 0, 0.25)';
    case 4:
      return '0 6px 30px rgba(0, 0, 0, 0.25)';
    case 5:
      return '0 9px 46px rgba(0, 0, 0, 0.25)';
    default:
      return 'none';
  }
};

export type SurfaceProps = {
  /**
   * Sets the elevation of the surface
   * @default 0
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
    const { elevation = 0, className, style, children, ...rest } = props;
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
