// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/text.css';
import cx from 'classnames';
import React from 'react';

export type LeadingProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * The third biggest title on the page, renders a h3 element
 * @example
 * <Leading>I'm a Leading!</Leading>
 * <Leading isMuted>I'm a muted Leading.</Leading>
 */
export const Leading = React.forwardRef<HTMLHeadingElement, LeadingProps>(
  (props, ref) => {
    const { className, isMuted = false, ...rest } = props;

    return (
      <h3
        ref={ref}
        className={cx(
          'iui-text-leading',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Leading;
