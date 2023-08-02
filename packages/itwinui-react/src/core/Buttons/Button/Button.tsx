/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';

import { Box, ButtonBase } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

export type ButtonProps = {
  /**
   * Modify size of the button.
   */
  size?: 'small' | 'large';
  /**
   * Style of the button.
   * Use 'borderless' to hide outline.
   * @default 'default'
   */
  styleType?: 'cta' | 'high-visibility' | 'default' | 'borderless';
  /**
   * Icon shown before the main button content.
   */
  startIcon?: JSX.Element;
  /**
   * Icon shown after the main button content.
   */
  endIcon?: JSX.Element;
} & Pick<React.ComponentProps<typeof ButtonBase>, 'htmlDisabled'>;

/**
 * Generic button component
 * @example
 * <Button>This is a default button</Button>
 * <Button disabled={true}>This is a disabled button</Button>
 * <Button size='large' styleType='high-visibility'>This is a large high visibility button</Button>
 * <Button size='small' styleType='cta'>This is a small call to action button</Button>
 * <Button startIcon={<SvgAdd />}>New</Button>
 */
export const Button = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    size,
    styleType = 'default',
    startIcon,
    endIcon,
    ...rest
  } = props;

  return (
    <ButtonBase
      ref={ref}
      className={cx('iui-button', className)}
      data-iui-variant={styleType !== 'default' ? styleType : undefined}
      data-iui-size={size}
      {...rest}
    >
      {startIcon && (
        <Box as='span' className='iui-button-icon' aria-hidden>
          {startIcon}
        </Box>
      )}

      {children && <span>{children}</span>}

      {endIcon && (
        <Box as='span' className='iui-button-icon' aria-hidden>
          {endIcon}
        </Box>
      )}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button', ButtonProps>;

export default Button;
