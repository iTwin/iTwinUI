/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { polymorphic, Box, Icon, useSafeContext } from '../utils/index.js';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { StatusMessage } from '../StatusMessage/index.js';
import { Label } from '../Label/Label.js';
import { IconButton } from '../Buttons/IconButton/index.js';

const FancyInputContext = React.createContext<
  | {
      // /**
      //  * Context prop for sizing subcomponents
      //  */
      // size?: 'small' | 'large';
      /**
       * Context prop for disabling subcomponents
       */
      disabled?: boolean;
      /**
       * Status of the input.
       */
      status?: 'positive' | 'warning' | 'negative';
      /**
       * Id to pass to input
       */
      inputId?: string;
      /**
       * Callback to set inputID
       */
      setInputId?: (inputId: string) => void;
    }
  | undefined
>(undefined);

//-------------------------------------------------------------------------------

const FancyInputComponent = React.forwardRef((props, ref) => {
  const { children, className, disabled, isLabelInline, status, ...rest } =
    props;
  return (
    <FancyInputContext.Provider value={{ disabled, status }}>
      <Box
        className={cx(
          'iui-fancy-input',
          {
            'iui-inline-label': isLabelInline,
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    </FancyInputContext.Provider>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  {
    disabled?: boolean;
    status?: 'positive' | 'warning' | 'negative';
    isLabelInline?: boolean;
  }
>;

//-------------------------------------------------------------------------------

const FancyInputLabel = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Label {...rest} ref={ref}>
      {children}
    </Label>
  );
}) as PolymorphicForwardRefComponent<'div', React.ComponentProps<typeof Label>>;

//-------------------------------------------------------------------------------

const FancyInputWrapper = polymorphic('iui-input-flex-container');

//-------------------------------------------------------------------------------

const FancyInputInput = polymorphic.input('');

//-------------------------------------------------------------------------------

const FancyInputIcon = React.forwardRef((props, ref) => {
  const { children, className, isActionable, ...rest } = props;
  return (
    <Icon
      {...rest}
      className={cx(
        'iui-input-icon',
        { 'iui-actionable': isActionable },
        className,
      )}
      ref={ref}
    >
      {children}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<
  'span',
  React.ComponentProps<typeof Icon> & { isActionable?: boolean }
>;

//-------------------------------------------------------------------------------

const FancyInputButton = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <IconButton ref={ref} {...rest} styleType='borderless'>
      {children}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<
  'span',
  React.ComponentProps<typeof IconButton>
>;

//-------------------------------------------------------------------------------

const FancyInputMessage = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  const { status } = useSafeContext(FancyInputContext);
  return (
    <StatusMessage
      className='iui-input-message'
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
export const FancyInput = Object.assign(FancyInputComponent, {
  Label: FancyInputLabel,
  Wrapper: FancyInputWrapper,
  Input: FancyInputInput,
  Icon: FancyInputIcon,
  Button: FancyInputButton,
  Message: FancyInputMessage,
});

export default FancyInput;
