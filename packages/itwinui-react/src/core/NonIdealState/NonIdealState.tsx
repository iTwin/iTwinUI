/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import cx from 'classnames';

type NonIdealStateProps = {
  /**
   * An svg component, preferably from @itwin/itwinui-illustrations-react.
   *
   * @example
   * import { Svg404 } from '@itwin/itwinui-illustrations-react';
   * <NonIdealState svg={<Svg404 />} heading='Not found' />
   */
  svg: React.ReactNode;

  /**
   * Primary heading for the error page
   */
  heading?: React.ReactNode;

  /**
   * Secondary text to explain the error
   * Can include html in order to provide a hyperlink
   * E.g. `Please visit <a href="https://www.bentley.com/help">our support page</a> for help.`
   */
  description?: React.ReactNode;

  /**
   * Actions to provide the user with a way to recover from the error.
   * Typically should be a primary and secondary button.
   *
   * @example
   * <ErrorPage
   *  actions={
   *   <>
   *    <Button styleType={'high-visibility'}>Retry</Button>
   *    <Button>Contact us</Button>
   *   </>
   *  }
   * />
   */
  actions?: React.ReactNode;
  /**
   *  Allows props to be passed for non-ideal-state-illustration
   */
  illustrationProps?: React.ComponentProps<'div'>;
  /**
   *  Allows props to be passed for non-ideal-state-title
   */
  titleProps?: React.ComponentProps<'div'>;
  /**
   *  Allows props to be passed for non-ideal-state-description
   */
  descriptionProps?: React.ComponentProps<'div'>;
  /**
   *  Allows props to be passed for non-ideal-state-action
   */
  actionsProps?: React.ComponentProps<'div'>;
};

/**
 * A stylized display to communicate common http errors and other non-ideal states.
 * Works well with svgs from @itwin/itwinui-illustrations-react.
 *
 * @example
 * <NonIdealState svg={<Svg404 />} heading='Not found' />
 */
export const NonIdealState = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    svg,
    heading,
    description,
    actions,
    illustrationProps,
    titleProps,
    descriptionProps,
    actionsProps,
    ...rest
  } = props;

  return (
    <Box
      className={cx('iui-non-ideal-state', className)}
      ref={forwardedRef}
      {...rest}
    >
      <Box
        as='div'
        {...illustrationProps}
        className={cx(
          'iui-non-ideal-state-illustration',
          illustrationProps?.className,
        )}
      >
        {svg}
      </Box>
      {heading && (
        <Box
          as='div'
          {...titleProps}
          className={cx('iui-non-ideal-state-title', titleProps?.className)}
        >
          {heading}
        </Box>
      )}
      {description && (
        <Box
          as='div'
          {...descriptionProps}
          className={cx(
            'iui-non-ideal-state-description',
            descriptionProps?.className,
          )}
        >
          {description}
        </Box>
      )}
      {actions && (
        <Box
          as='div'
          {...actionsProps}
          className={cx('iui-non-ideal-state-actions', actionsProps?.className)}
        >
          {actions}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', NonIdealStateProps>;
if (process.env.NODE_ENV === 'development') {
  NonIdealState.displayName = 'NonIdealState';
}
