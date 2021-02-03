import cx from 'classnames';
import React from 'react';

import '@bentley/itwinui/css/buttons.css';
import Button, { ButtonProps } from '../Button/Button';

export type IconButtonProps = {
  /**
   * Button gets active style.
   * @default false
   */
  isActive?: boolean;
} & ButtonProps;

/**
 * Icon button
 * @example
 * <IconButton><SvgAdd /></IconButton>
 */
export const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<IconButtonProps>
>((props, ref) => {
  const { isActive, children, className, ...rest } = props;

  return (
    <Button
      ref={ref}
      className={cx(
        'iui-buttons-no-label',
        {
          'iui-buttons-active': isActive,
        },
        className,
      )}
      {...rest}
    >
      <svg className='iui-buttons-icon'>{children}</svg>
    </Button>
  );
});

export default IconButton;
