/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useSafeContext, supportsHas, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

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
      return undefined;
  }
};

/** Returns correct border value based on prop */
const getBorderValue = (border: boolean | string | undefined) => {
  if (typeof border === 'string') {
    return border;
  }

  if (border === false) {
    return 'none';
  }

  return undefined;
};

// ----------------------------------------------------------------------------
// Surface.Header component

const SurfaceHeader = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const { setHasLayout } = useSafeContext(SurfaceContext);

  React.useEffect(() => {
    if (!supportsHas()) {
      setHasLayout(true);
    }
  }, [setHasLayout]);

  return (
    <Box className={cx('iui-surface-header', className)} ref={ref} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;

// ----------------------------------------------------------------------------
// Surface.Body component

type SurfaceBodyOwnProps = {
  /**
   * Gives padding to the surface body
   * @default false
   */
  isPadded?: boolean;
};

const SurfaceBody = React.forwardRef((props, ref) => {
  const { children, className, isPadded = false, ...rest } = props;
  const { setHasLayout } = useSafeContext(SurfaceContext);

  React.useEffect(() => {
    if (!supportsHas()) {
      setHasLayout(true);
    }
  }, [setHasLayout]);
  return (
    <Box
      className={cx('iui-surface-body', className)}
      ref={ref}
      data-iui-padded={isPadded ? 'true' : undefined}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', SurfaceBodyOwnProps>;

type SurfaceProps = {
  /**
   * Sets the elevation of the surface
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * Sets the border of the surface.
   *
   * Can be a boolean to toggle the default border, or a string value to specify a custom border.
   *
   * @default true
   */
  border?: boolean | string;
  /**
   * Content in the surface.
   */
  children: React.ReactNode;
};

/**
 * The Surface container allows content to appear elevated through the use of a drop shadow
 * @example
 * <Surface>Surface Content</Surface>
 * <Surface elevation={2}>Surface Content</Surface>
 * <Surface>
 *   <Surface.Header>Surface Header Content</Surface.Header>
 *   <Surface.Body isPadded={true}>Surface Body Content</Surface.Body>
 * </Surface>
 */
export const Surface = Object.assign(
  React.forwardRef((props, ref) => {
    const {
      elevation,
      border = true,
      className,
      style,
      children,
      ...rest
    } = props;

    const [hasLayout, setHasLayout] = React.useState(false);

    const _style = {
      '--iui-surface-elevation': getSurfaceElevationValue(elevation),
      '--iui-surface-border': getBorderValue(border),
      ...style,
    };
    return (
      <Box
        className={cx('iui-surface', className)}
        style={_style}
        ref={ref}
        data-iui-layout={hasLayout ? 'true' : undefined}
        {...rest}
      >
        <SurfaceContext.Provider value={{ setHasLayout }}>
          {children}
        </SurfaceContext.Provider>
      </Box>
    );
  }) as PolymorphicForwardRefComponent<'div', SurfaceProps>,
  {
    /**
     * 	Surface header subcomponent
     */
    Header: SurfaceHeader,
    /**
     * 	Surface body subcomponent. Additional padding can be added to the body through the 'isPadded' prop
     */
    Body: SurfaceBody,
  },
);

const SurfaceContext = React.createContext<
  | {
      /**
       * Callback to be fired when :has selector is not supported.
       * Used for setting data-iui-layout attribute
       */
      setHasLayout: (layout: boolean) => void;
    }
  | undefined
>(undefined);
