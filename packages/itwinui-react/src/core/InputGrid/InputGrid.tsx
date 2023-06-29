/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, useSafeContext } from '../utils/index.js';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { StatusMessage } from '../StatusMessage/index.js';
import { Label } from '../Label/Label.js';

type InputGridOwnProps = {
  /**
   * Context prop for sizing subcomponents
   */
  size?: 'small' | 'large';
  /**
   * Context prop for disabling subcomponents
   */
  disabled?: boolean;
  /**
   * Status of the input.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Set display style of label.
   * Supported values:
   * - 'default' - label appears above input.
   * - 'inline' - appears in the same line as input.
   * @default 'default'
   */
  displayStyle?: 'default' | 'inline';
  /**
   *
   */
  required?: boolean;
};

const InputGridContext = React.createContext<
  Omit<InputGridOwnProps, 'displayStyle'> | undefined
>(undefined);

//-------------------------------------------------------------------------------

const InputGridComponent = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    size,
    disabled,
    required,
    displayStyle,
    status,
    ...rest
  } = props;

  return (
    <InputGridContext.Provider
      value={{
        size,
        disabled,
        status,
        required,
      }}
    >
      <Box
        className={cx(
          'iui-fancy-input',
          {
            'iui-inline-label': displayStyle,
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    </InputGridContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', InputGridOwnProps>;

//-------------------------------------------------------------------------------

const InputGridLabel = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const { disabled, required } = useSafeContext(InputGridContext);

  return (
    <Label
      className={cx({ 'iui-disabled': disabled }, className)}
      required={required}
      {...rest}
      ref={ref}
    >
      {children}
    </Label>
  );
}) as PolymorphicForwardRefComponent<'div', React.ComponentProps<typeof Label>>;

//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------

const InputGridMessage = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const { status } = useSafeContext(InputGridContext);
  return (
    <StatusMessage
      className={cx('iui-input-message', className)}
      ref={ref}
      status={status}
      {...rest}
    >
      {children}
    </StatusMessage>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  React.ComponentProps<typeof StatusMessage>
>;

//-------------------------------------------------------------------------------

/**
 * Fancy labeled input component
 */
export const InputGrid = Object.assign(InputGridComponent, {
  /**
   *
   */
  Label: InputGridLabel,
  /**
   *
   */
  Message: InputGridMessage,
});

export default InputGrid;
