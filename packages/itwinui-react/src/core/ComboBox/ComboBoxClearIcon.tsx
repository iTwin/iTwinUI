/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { SvgCloseSmall } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import IconButton from '../Buttons/IconButton.js';

type ComboBoxClearIconProps = {
  disabled?: boolean;
  isOpen?: boolean;
};

export const ComboBoxClearIcon = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;

  return (
    <IconButton
      as='span'
      ref={forwardedRef}
      className={cx(
        'iui-end-icon',
        // {
        //   'iui-disabled': disabled,
        //   'iui-open': isOpen,
        // },
        className,
      )}
      {...rest}
      size='small'
      styleType='borderless'
      onClick={() => {
        console.log('clicked');
      }}
    >
      {children ?? <SvgCloseSmall aria-hidden />}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'span', ComboBoxClearIconProps>;
ComboBoxClearIcon.displayName = 'ComboBoxClearIcon';
