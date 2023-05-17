/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useGlobals } from '../../utils/index.js';
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

    useGlobals();

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
