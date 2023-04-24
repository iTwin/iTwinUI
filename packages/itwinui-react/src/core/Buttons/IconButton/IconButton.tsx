/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useMergedRefs, useTheme, VisuallyHidden, Popover } from '../../utils';
import type { ButtonProps } from '../Button';
import type { PolymorphicForwardRefComponent } from '../../utils';
import '@itwin/itwinui-css/css/button.css';
import '@itwin/itwinui-css/css/tooltip.css';

export type IconButtonProps = {
  /**
   * Button gets active style.
   * @default false
   */
  isActive?: boolean;
  /**
   * Name of the button, shown in a tooltip and exposed to assistive technologies.
   */
  label?: React.ReactNode;
} & Omit<ButtonProps, 'startIcon' | 'endIcon'>;

type IconButtonComponent = PolymorphicForwardRefComponent<
  'button',
  IconButtonProps
>;

/**
 * Icon button
 * @example
 * <IconButton label='Add'><SvgAdd /></IconButton>
 * @example
 * <IconButton label='Add' styleType='borderless'><SvgAdd /></IconButton>
 */
export const IconButton: IconButtonComponent = React.forwardRef(
  (props, ref) => {
    const {
      isActive,
      children,
      styleType = 'default',
      size,
      type = 'button',
      className,
      as: Element = 'button',
      label,
      ...rest
    } = props;

    useTheme();

    const buttonRef = React.useRef<HTMLElement>(null);
    const refs = useMergedRefs(ref, buttonRef);

    return (
      <Element
        ref={refs}
        className={cx('iui-button', className)}
        data-iui-variant={styleType !== 'default' ? styleType : undefined}
        data-iui-size={size}
        data-iui-active={isActive}
        type={type}
        {...rest}
      >
        <span className='iui-button-icon' aria-hidden>
          {children}
        </span>

        {label ? (
          <>
            <VisuallyHidden>{label}</VisuallyHidden>
            <Popover
              reference={buttonRef}
              interactive={false}
              offset={[0, 4]}
              aria={{ content: null }}
              content={
                <div aria-hidden className={cx('iui-tooltip', className)}>
                  {label}
                </div>
              }
            />
          </>
        ) : null}
      </Element>
    );
  },
);

export default IconButton;
