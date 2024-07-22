/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { FieldsetBase } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

import cx from 'classnames';

type FieldsetProps = {
  /**
   * The caption or title for the fieldset.
   */
  legend?: React.ReactNode;
};

/**
 * Fieldset component to group several inputs, controls and labels within a form.
 * @example
 * <Fieldset legend='Settings'>
 *   <Input />
 *   <InputGroup>
 *     <ToggleSwitch />
 *     <ToggleSwitch />
 *   </InputGroup>
 * </Fieldset>
 */
export const Fieldset = React.forwardRef((props, ref) => {
  const { children, className, disabled, legend, ...rest } = props;

  return (
    <FieldsetBase
      className={cx('iui-fieldset', className)}
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {legend && <legend>{legend}</legend>}

      {disabled
        ? React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as JSX.Element, { disabled: true })
              : child,
          )
        : children}
    </FieldsetBase>
  );
}) as PolymorphicForwardRefComponent<'fieldset', FieldsetProps>;
if (process.env.NODE_ENV === 'development') {
  Fieldset.displayName = 'Fieldset';
}
