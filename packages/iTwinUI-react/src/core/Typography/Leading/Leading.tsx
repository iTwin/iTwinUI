/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils';
import '@itwin/itwinui-css/css/text.css';

export type LeadingProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @deprecated Since v2, use `Text` with variant 'leading'.
 * @example
 * <Text variant='leading' as='h3'>I'm a leading!</Text>
 */
export const Leading = React.forwardRef(
  (props: LeadingProps, ref: React.RefObject<HTMLHeadingElement>) => {
    const { className, isMuted = false, ...rest } = props;

    useTheme();

    return (
      <h3
        ref={ref}
        className={cx(
          'iui-text-leading',
          'iui-text-spacing',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Leading;
