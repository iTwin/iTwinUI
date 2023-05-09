/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useItwinui } from '../../utils/index.js';
import '@itwin/itwinui-css/css/text.css';

export type SubheadingProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @deprecated Since v2, use `Text` with variant 'subheading'.
 * @example
 * <Text variant='subheading' as='h3'>I'm a subheading!</Text>
 */
export const Subheading = React.forwardRef(
  (props: SubheadingProps, ref: React.RefObject<HTMLHeadingElement>) => {
    const { className, isMuted = false, ...rest } = props;

    useItwinui();

    return (
      <h3
        ref={ref}
        className={cx(
          'iui-text-subheading',
          'iui-text-spacing',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Subheading;
