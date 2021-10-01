/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils';
import '@itwin/itwinui-css/css/text.css';

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
 * Body text, renders a paragraph element
 * @example
 * <Body>I'm some body text!</Body>
 * <Body isMuted>I'm some muted body text.</Body>
 */
export const Body = React.forwardRef<HTMLParagraphElement, BodyProps>(
  (props, ref) => {
    const { className, isMuted = false, isSkeleton = false, ...rest } = props;

    useTheme();

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
