import '@bentley/itwinui/css/text.css';
import cx from 'classnames';
import React from 'react';

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

    return (
      <h1
        ref={ref}
        className={cx(
          'iui-text-headline',
          { 'iui-text-muted': isMuted },
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Headline;
