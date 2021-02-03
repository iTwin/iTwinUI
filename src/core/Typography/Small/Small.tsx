import '@bentley/itwinui/css/text.css';
import cx from 'classnames';
import React from 'react';

export type SmallProps = {
  /**
   * Set text to muted.
   * @default false
   */
  isMuted?: boolean;
} & React.HTMLAttributes<HTMLParagraphElement>;

/**
 * Small text, renders a paragraph element
 * @example
 * <Small>I'm some small text!</Small>
 * <Small isMuted>I'm some muted small text.</Small>
 */
export const Small = React.forwardRef<HTMLParagraphElement, SmallProps>(
  (props, ref) => {
    const { className, isMuted = false, ...rest } = props;

    return (
      <p
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
