// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import cx from 'classnames';
import React from 'react';

import Button, { ButtonProps } from '../Button/Button';
import { useTheme } from '../../utils/hooks/useTheme';
import '@bentley/itwinui/css/buttons.css';

export type IconButtonProps = {
  /**
   * Button gets active style.
   * @default false
   */
  isActive?: boolean;
  /**
   * Style of the button.
   * Use 'borderless' to hide outline.
   * @default 'default'
   */
  styleType?: 'cta' | 'high-visibility' | 'default' | 'borderless';
} & Omit<ButtonProps, 'styleType'>;

/**
 * Icon button
 * @example
 * <IconButton><SvgAdd /></IconButton>
 * <IconButton styleType='borderless'><SvgAdd /></IconButton>
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      isActive,
      children,
      styleType = 'default',
      size,
      className,
      ...rest
    } = props;

    useTheme();

    return styleType === 'borderless' ? (
      <button
        ref={ref}
        className={cx(
          'iui-button iui-invisible',
          { [`iui-${size}`]: size },
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    ) : (
      <Button
        ref={ref}
        className={cx(
          'iui-buttons-no-label',
          { 'iui-buttons-active': isActive },
          className,
        )}
        styleType={styleType}
        size={size}
        {...rest}
      >
        {React.cloneElement(children as JSX.Element, {
          className: cx(
            'iui-buttons-icon',
            (children as JSX.Element).props.className,
          ),
        })}
      </Button>
    );
  },
);

export default IconButton;
