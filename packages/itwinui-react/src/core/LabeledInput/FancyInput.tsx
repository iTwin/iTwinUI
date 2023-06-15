/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  Icon,
  useSafeContext,
  useMergedRefs,
  useId,
} from '../utils/index.js';
import cx from 'classnames';
import {
  InputFlexContainer,
  type PolymorphicForwardRefComponent,
} from '../utils/index.js';
import { StatusMessage } from '../StatusMessage/index.js';
import { Label } from '../Label/Label.js';
import { IconButton } from '../Buttons/IconButton/index.js';

type FancyInputProps = {
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
   * Id to pass to input
   */
  inputId?: string;
  /**
   * Callback to set inputID
   */
  setInputId?: (inputId: string) => void;
  /**
   * Ref for input subcomponent
   */
  inputRef?: React.RefObject<HTMLInputElement>;
  /**
   * Set display style of label.
   * Supported values:
   * - 'default' - label appears above input.
   * - 'inline' - appears in the same line as input.
   * @default 'default'
   */
  displayStyle?: 'default' | 'inline';
};

const FancyInputContext = React.createContext<
  Omit<FancyInputProps, 'displayStyle'> | undefined
>(undefined);

//-------------------------------------------------------------------------------

const FancyInputComponent = React.forwardRef((props, ref) => {
  const { children, className, size, disabled, displayStyle, status, ...rest } =
    props;

  const uid = useId();
  const [inputId, setInputId] = React.useState(uid);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FancyInputContext.Provider
      value={{ size, disabled, status, inputId, setInputId, inputRef }}
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
    </FancyInputContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', FancyInputProps>;

//-------------------------------------------------------------------------------

const FancyInputLabel = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const { inputId, disabled } = useSafeContext(FancyInputContext);

  return (
    <Label
      className={cx({ 'iui-disabled': disabled }, className)}
      {...rest}
      htmlFor={inputId}
      ref={ref}
    >
      {children}
    </Label>
  );
}) as PolymorphicForwardRefComponent<'div', React.ComponentProps<typeof Label>>;

//-------------------------------------------------------------------------------

const FancyInputWrapper = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  const { size, status, disabled } = useSafeContext(FancyInputContext);
  return (
    <InputFlexContainer
      size={size}
      status={status}
      isDisabled={disabled}
      {...rest}
      ref={ref}
    >
      {children}
    </InputFlexContainer>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  React.ComponentProps<typeof InputFlexContainer>
>;

//-------------------------------------------------------------------------------

const FancyInputInput = React.forwardRef((props, ref) => {
  const { id: idProp, ...rest } = props;

  const { inputId, setInputId, disabled, inputRef } =
    useSafeContext(FancyInputContext);

  React.useEffect(() => {
    if (idProp && idProp !== inputId) {
      setInputId(idProp);
    }
  }, [idProp, inputId, setInputId]);

  return (
    <Box
      as='input'
      id={idProp ?? inputId}
      ref={useMergedRefs(ref, inputRef)}
      disabled={disabled}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'input'>;

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
  const { disabled, size } = useSafeContext(FancyInputContext);

  return (
    <IconButton
      size={size}
      ref={ref}
      disabled={disabled}
      {...rest}
      styleType='borderless'
    >
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
