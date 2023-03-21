/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  CommonProps,
  getWindow,
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
  useSafeContext,
  useTheme,
} from '../utils';
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

// ----------------------------------------------------------------------------
// Surface.Header component

type SurfaceHeaderOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type SurfaceHeaderProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, SurfaceHeaderOwnProps>;

const SurfaceHeader = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;
  const { setLayout } = useSafeContext(SurfaceContext);

  setLayout(true);

  return (
    <Element
      className={cx('iui-surface-header', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', SurfaceHeaderOwnProps>;

// ----------------------------------------------------------------------------
// Surface.Body component

type SurfaceBodyOwnProps = {
  /**
   * Gives padding to the surface body
   */
  isPadded?: boolean;
};

export type SurfaceBodyProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, SurfaceBodyOwnProps>;

const SurfaceBody = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, isPadded, ...rest } = props;
  const { setLayout } = useSafeContext(SurfaceContext);

  setLayout(true);

  return (
    <Element
      className={cx('iui-surface-body', className)}
      ref={ref}
      data-iui-padded={isPadded ? 'true' : undefined}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', SurfaceBodyOwnProps>;

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
 * <Surface hasLayout={true}>Surface Content</Surface>
 * <Surface hasLayout={true}>
 *   <Surface.Header>Surface Header Content</Surface.Header>
 *   <Surface.Body isPadded={true}>Surface Body Content</Surface.Body>
 * </Surface>
 */
export const Surface = Object.assign(
  React.forwardRef(
    (props: SurfaceProps, ref: React.RefObject<HTMLDivElement>) => {
      const { elevation, className, style, children, ...rest } = props;
      useTheme();
      const supportsHas = getWindow()?.CSS?.supports?.('selector(:has(+ *))');

      const [layout, setLayout] = React.useState(false);

      const _style = {
        '--iui-surface-elevation': getSurfaceElevationValue(elevation),
        ...style,
      };
      return (
        <div
          className={cx('iui-surface', className)}
          style={_style}
          ref={ref}
          data-iui-layout={layout && !supportsHas ? 'true' : undefined}
          {...rest}
        >
          <SurfaceContext.Provider value={{ setLayout }}>
            {children}
          </SurfaceContext.Provider>
        </div>
      );
    },
  ),
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

export const SurfaceContext = React.createContext<
  | {
      /**
       * Callback fired when layout has changed
       */
      setLayout: (layout: boolean) => void;
    }
  | undefined
>(undefined);

export default Surface;
