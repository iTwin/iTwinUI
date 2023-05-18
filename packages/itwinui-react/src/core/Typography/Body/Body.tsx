/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useGlobals } from '../../utils/index.js';
import '@itwin/itwinui-css/css/text.css';

/**
 * @deprecated Since v2, use `Text` with variant 'body'.
 */
export type BodyProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
  /**
   * Use it if you are still loading the content.
   * @default false
   */
  isSkeleton?: boolean;
} & React.HTMLAttributes<HTMLParagraphElement>;

/**
 * @deprecated Since v2, use `Text` with variant 'body'.
 * @example
 * <Text variant='body' as='p'>I'm some body text!</Text>
 */
export const Body = React.forwardRef(
  (props: BodyProps, ref: React.RefObject<HTMLParagraphElement>) => {
    const { className, isMuted = false, isSkeleton = false, ...rest } = props;

    useGlobals();

    return (
      <p
        ref={ref}
        className={cx(
          'iui-text-block',
          'iui-text-spacing',
          {
            'iui-text-muted': isMuted,
            'iui-skeleton': isSkeleton,
          },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Body;
