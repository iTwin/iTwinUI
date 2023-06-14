/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { polymorphic, Box, Icon } from '../utils/index.js';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { StatusMessage } from '../StatusMessage/index.js';
import { Label } from '../Label/Label.js';
import { IconButton } from '../Buttons/IconButton/index.js';

//-------------------------------------------------------------------------------

const FancyInputComponent = React.forwardRef((props, ref) => {
  const { children, className, disabled, isLabelInline, status, ...rest } =
    props;
  return (
    <Box
      className={cx(
        'iui-input-container',
        'iui-with-message',
        {
          'iui-disabled': disabled,
          [`iui-${status}`]: !!status,
          'iui-inline-label': isLabelInline,
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
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
  return (
    <StatusMessage ref={ref} {...rest}>
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
