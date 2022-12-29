/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils';
import '@itwin/itwinui-css/css/text.css';

export type HeadlineProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @deprecated Since v2, use `Text` with variant 'headline'.
 * @example
 * <Text variant='headline' as='h1'>I'm a headline!</Text>
 */
export const Headline = React.forwardRef(
  (props: HeadlineProps, ref: React.RefObject<HTMLHeadingElement>) => {
    const { className, isMuted = false, ...rest } = props;

    useTheme();

    return (
      <h1
        ref={ref}
        className={cx(
          'iui-text-headline',
          'iui-text-spacing',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Headline;
