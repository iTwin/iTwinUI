// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/text.css';
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils/hooks/useTheme';

export type SubheadingProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * The third biggest title on the page, renders a h3 element
 * @example
 * <Subheading>I'm a subheading!</Subheading>
 * <Subheading isMuted>I'm a muted subheading.</Subheading>
 */
export const Subheading = React.forwardRef<HTMLHeadingElement, SubheadingProps>(
  (props, ref) => {
    const { className, isMuted = false, ...rest } = props;

    useTheme();

    return (
      <h3
        ref={ref}
        className={cx(
          'iui-text-subheading',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Subheading;
