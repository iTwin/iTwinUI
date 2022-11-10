/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils';
import '@itwin/itwinui-css/css/text.css';

export type TitleProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @deprecated Since v2, use `Text` with variant 'title'.
 * @example
 * <Text variant='title' as='h2'>I'm a title!</Text>
 */
export const Title = React.forwardRef(
  (props: TitleProps, ref: React.RefObject<HTMLHeadingElement>) => {
    const { className, isMuted = false, ...rest } = props;

    useTheme();

    return (
      <h2
        ref={ref}
        className={cx(
          'iui-text-title',
          'iui-text-spacing',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Title;
