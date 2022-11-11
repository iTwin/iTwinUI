/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';
import cx from 'classnames';
import '@itwin/itwinui-css/css/non-ideal-state.css';

export type NonIdealStateProps = {
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
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * A stylized display to communicate common http errors and other non-ideal states.
 * Works well with svgs from @itwin/itwinui-illustrations-react.
 *
 * @example
 * <NonIdealState svg={<Svg404 />} heading='Not found' />
 */
export const NonIdealState = (props: NonIdealStateProps): JSX.Element => {
  const { className, svg, heading, description, actions, ...rest } = props;

  useTheme();

  return (
    <div className={cx('iui-non-ideal-state', className)} {...rest}>
      <div className='iui-non-ideal-state-illustration'>{svg}</div>
      {heading && <div className='iui-non-ideal-state-title'>{heading}</div>}
      {description && (
        <div className='iui-non-ideal-state-description'>{description}</div>
      )}
      {actions && <div className='iui-non-ideal-state-actions'>{actions}</div>}
    </div>
  );
};

export default NonIdealState;
