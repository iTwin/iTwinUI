/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  InputFlexContainer,
  InputFlexContainerButton,
  InputFlexContainerIcon,
  useSafeContext,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import type { InputProps } from '../Input/Input.js';

const InputWithDecorationsContext = React.createContext<
  React.ComponentProps<typeof InputFlexContainer> | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  InputWithDecorationsContext.displayName = 'InputWithDecorationsContext';
}

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
if (process.env.NODE_ENV === 'development') {
  InputWithDecorationsComponent.displayName = 'InputWithDecorations';
}

// ----------------------------------------------------------------------------

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
if (process.env.NODE_ENV === 'development') {
  InputWithDecorationsInput.displayName = 'InputWithDecorations.Input';
}

// ----------------------------------------------------------------------------

const InputWithDecorationsButton = React.forwardRef((props, ref) => {
  const { children, size, disabled: localDisabled, ...rest } = props;
  const { size: contextSize, isDisabled } = useSafeContext(
    InputWithDecorationsContext,
  );

  return (
    <InputFlexContainerButton
      ref={ref}
      size={size ?? contextSize}
      disabled={localDisabled ?? isDisabled}
      {...rest}
    >
      {children}
    </InputFlexContainerButton>
  );
}) as PolymorphicForwardRefComponent<
  'button',
  React.ComponentProps<typeof InputFlexContainerButton>
>;
if (process.env.NODE_ENV === 'development') {
  InputWithDecorationsButton.displayName = 'InputWithDecorations.Button';
}

// ----------------------------------------------------------------------------

const InputWithDecorationsIcon = InputFlexContainerIcon;
if (process.env.NODE_ENV === 'development') {
  InputWithDecorationsIcon.displayName = 'InputWithDecorations.Icon';
}

// ----------------------------------------------------------------------------

/**
 * Input component with various additional decorations.
 * You can add icons, buttons and other various subcomponents to it.
 *
 * If you are not using default `InputWithDecorations.Icon` and `InputWithDecorations.Button`, use borderless versions of other components.
 *
 * @example
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
     * Subcomponent to include button in your InputWithDecorations
     *
     * Although similar to `IconButton`, this subcomponent additionally collapses the padding between the button and the input/textarea
     * in `InputWithDecorations`.
     */
    Button: InputWithDecorationsButton,
    /**
     * Subcomponent to include button in your InputWithDecorations.
     *
     * Although similar to `Icon`, this subcomponent additionally collapses the padding between the icon and the input/textarea
     * in `InputWithDecorations`.
     */
    Icon: InputWithDecorationsIcon,
  },
);
