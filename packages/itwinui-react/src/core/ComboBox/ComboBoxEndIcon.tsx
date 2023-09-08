/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { SvgCaretDownSmall, Icon } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

type ComboBoxEndIconProps = {
  disabled?: boolean;
  isOpen?: boolean;
};

export const ComboBoxEndIcon = React.forwardRef((props, forwardedRef) => {
  const { className, children, disabled, isOpen, ...rest } = props;

  return (
    <Icon
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
    </Icon>
  );
}) as PolymorphicForwardRefComponent<'span', ComboBoxEndIconProps>;
ComboBoxEndIcon.displayName = 'ComboBoxEndIcon';
