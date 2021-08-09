/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/text.css';

export type HeadlineProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * The biggest title on the page, renders a h1 element
 * @example
 * <Headline>I'm a headline!</Headline>
 * <Headline isMuted>I'm a muted headline.</Headline>
 */
export const Headline = React.forwardRef<HTMLHeadingElement, HeadlineProps>(
  (props, ref) => {
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
