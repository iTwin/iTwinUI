/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils';
import '@itwin/itwinui-css/css/text.css';

export type SmallProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLParagraphElement>;

/**
 * @deprecated Since v2, use `Text` with variant 'small'.
 * @example
 * <Text variant='small' as='small'>I'm some small text!</Text>
 */
export const Small = React.forwardRef(
  (props: SmallProps, ref: React.RefObject<HTMLParagraphElement>) => {
    const { className, isMuted = false, ...rest } = props;

    useTheme();

    return (
      <small
        ref={ref}
        className={cx(
          'iui-text-small',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Small;
