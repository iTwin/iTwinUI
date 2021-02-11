// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/text.css';
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils/hooks/useTheme';

export type TitleProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * The second biggest title on the page, renders a h2 element
 * @example
 * <Title>I'm a title!</Title>
 * <Title isMuted>I'm a muted title.</Title>
 */
export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  (props, ref) => {
    const { className, isMuted = false, ...rest } = props;

    useTheme();

    return (
      <h2
        ref={ref}
        className={cx(
          'iui-text-title',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Title;
