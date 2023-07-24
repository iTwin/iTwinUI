/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  Box,
  Icon,
  InputFlexContainer,
  useMergedRefs,
  useSafeContext,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { IconButton } from '../Buttons/index.js';
import type { InputProps } from '../Input/Input.js';

const InputWithDecorationsContext = React.createContext<
  React.ComponentProps<typeof InputFlexContainer> | undefined
>(undefined);

const InputWithDecorationsComponent = React.forwardRef((props, ref) => {
  const { children, size, disabled, ...rest } = props;
  return (
    <InputWithDecorationsContext.Provider value={{ size, disabled }}>
      <InputFlexContainer disabled={disabled} size={size} ref={ref} {...rest}>
        {children}
      </InputFlexContainer>
    </InputWithDecorationsContext.Provider>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  React.ComponentProps<typeof InputFlexContainer>
>;

//-------------------------------------------------------------------------------

const InputWithDecorationsInput = React.forwardRef((props, ref) => {
  const { id: idProp, size, ...rest } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputRef, ref);
  const { size: contextSize, disabled } = useSafeContext(
    InputWithDecorationsContext,
  );

  return (
    <Box
      as='input'
      ref={refs}
      data-iui-size={size ?? contextSize}
      disabled={disabled}
      id={idProp}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'input', Omit<InputProps, 'setFocus'>>;

//-------------------------------------------------------------------------------

const InputWithDecorationsIcon = React.forwardRef((props, ref) => {
  const { children, className, isActionable, ...rest } = props;
  return (
    <Icon
      className={cx(
        'iui-input-decorator-icon',
        { 'iui-actionable': isActionable },
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<
  'span',
  React.ComponentProps<typeof Icon> & { isActionable?: boolean }
>;

//-------------------------------------------------------------------------------

const InputWithDecorationsButton = React.forwardRef((props, ref) => {
  const { children, size, ...rest } = props;
  const { size: contextSize, disabled } = useSafeContext(
    InputWithDecorationsContext,
  );

  return (
    <IconButton
      ref={ref}
      size={size ?? contextSize}
      styleType='borderless'
      disabled={disabled}
      {...rest}
    >
      {children}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<
  'span',
  React.ComponentProps<typeof IconButton>
>;

/**
 * Input component with various additional decorations.
 * You can add icons, buttons and other various subcomponents to it.
 *
 * If you are not using default InputWithDecorations.Icon and InputWithDecorations.Button, use borderless versions of other components.
 *
 * @usage
 * <InputWithDecorations>
 *    <InputWithDecorations.Input />
 *    <InputWithDecorations.Icon>
 *      <SvgAdd />
 *    </InputWithDecorations.Icon>
 * </InputWithDecorations>
 */
export const InputWithDecorations = Object.assign(
  InputWithDecorationsComponent,
  {
    /**
     * Subcomponent to include input in your InputWithDecorations
     */
    Input: InputWithDecorationsInput,
    /**
     * Subcomponent to include icon in your InputWithDecorations
     */
    Icon: InputWithDecorationsIcon,
    /**
     * Subcomponent to include button in your InputWithDecorations
     */
    Button: InputWithDecorationsButton,
  },
);
