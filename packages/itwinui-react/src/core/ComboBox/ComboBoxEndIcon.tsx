/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { SvgCaretDownSmall } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { InputWithDecorations } from '../InputWithDecorations/InputWithDecorations.js';

type ComboBoxEndIconProps = {
  disabled?: boolean;
  isOpen?: boolean;
};

export const ComboBoxEndIcon = React.forwardRef((props, forwardedRef) => {
  const { className, children, disabled, isOpen, ...rest } = props;

  return (
    <InputWithDecorations.Icon
      as='span'
      ref={forwardedRef}
      className={cx(
        'iui-end-icon',
        {
          'iui-disabled': disabled,
          'iui-open': isOpen,
        },
        className,
      )}
      {...rest}
    >
      {children ?? <SvgCaretDownSmall aria-hidden />}
    </InputWithDecorations.Icon>
  );
}) as PolymorphicForwardRefComponent<'span', ComboBoxEndIconProps>;
if (process.env.NODE_ENV === 'development') {
  ComboBoxEndIcon.displayName = 'ComboBoxEndIcon';
}
