/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useTheme, VisuallyHidden, Popover } from '../../utils/index.js';
import type { ButtonProps } from '../Button/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

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

    return (
      <IconButtonTooltip label={label}>
        <Element
          ref={ref}
          className={cx('iui-button', className)}
          data-iui-variant={styleType !== 'default' ? styleType : undefined}
          data-iui-size={size}
          data-iui-active={isActive}
          aria-pressed={isActive}
          type={type}
          {...rest}
        >
          <span className='iui-button-icon' aria-hidden>
            {children}
          </span>
          {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
        </Element>
      </IconButtonTooltip>
    );
  },
);

const IconButtonTooltip = (props: {
  label?: React.ReactNode;
  children: React.ReactElement;
}) => {
  const { label, children } = props;

  return label ? (
    <Popover
      interactive={false}
      offset={[0, 4]}
      aria={{ content: null }}
      content={
        <div aria-hidden='true' className='iui-tooltip'>
          {label}
        </div>
      }
    >
      {children}
    </Popover>
  ) : (
    children
  );
};

export default IconButton;
