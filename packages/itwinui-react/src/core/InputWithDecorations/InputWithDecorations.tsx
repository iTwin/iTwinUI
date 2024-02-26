/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, InputFlexContainer, useSafeContext } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import type { InputProps } from '../Input/Input.js';

const InputWithDecorationsContext = React.createContext<
  React.ComponentProps<typeof InputFlexContainer> | undefined
>(undefined);

const InputWithDecorationsComponent = React.forwardRef((props, ref) => {
  const { children, size, isDisabled, ...rest } = props;
  return (
    <InputWithDecorationsContext.Provider value={{ size, isDisabled }}>
      <InputFlexContainer
        isDisabled={isDisabled}
        size={size}
        ref={ref}
        {...rest}
      >
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
  const { id: idProp, size, disabled: localDisabled, ...rest } = props;
  const { size: contextSize, isDisabled } = useSafeContext(
    InputWithDecorationsContext,
  );

  return (
    <Box
      as='input'
      ref={ref}
      data-iui-size={size ?? contextSize}
      disabled={localDisabled ?? isDisabled}
      id={idProp}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'input', InputProps>;

//-------------------------------------------------------------------------------

const InputWithDecorationsButton = React.forwardRef((props, ref) => {
  const { children, size, disabled: localDisabled, ...rest } = props;
  const { size: contextSize, isDisabled } = useSafeContext(
    InputWithDecorationsContext,
  );

  return (
    <IconButton
      ref={ref}
      size={size ?? contextSize}
      styleType='borderless'
      disabled={localDisabled ?? isDisabled}
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
 * If you are not using default `Icon` and {@link InputWithDecorations.Button}, use borderless versions of other components.
 *
 * @example
 * <InputWithDecorations>
 *    <InputWithDecorations.Input />
 *    <Icon>
 *      <SvgAdd />
 *    </Icon>
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
     * Subcomponent to include button in your InputWithDecorations
     */
    Button: InputWithDecorationsButton,
  },
);
