/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';

import cx from 'classnames';
import '@itwin/itwinui-css/css/fieldset.css';

export type FieldsetProps = {
  /**
   * The caption or title for the fieldset.
   */
  legend?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'fieldset'>;

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
export const Fieldset = (props: FieldsetProps) => {
  const { children, className, disabled, legend, ...rest } = props;

  useTheme();

  return (
    <fieldset
      className={cx('iui-fieldset', className)}
      disabled={disabled}
      {...rest}
    >
      {legend && <legend>{legend}</legend>}

      {disabled
        ? React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { disabled: true })
              : child,
          )
        : children}
    </fieldset>
  );
};

export default Fieldset;
