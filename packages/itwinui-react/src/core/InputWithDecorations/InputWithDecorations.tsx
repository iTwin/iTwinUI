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
  const { id: idProp, size, setFocus = false, ...rest } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputRef, ref);
  const { size: contextSize, isDisabled } = useSafeContext(
    InputWithDecorationsContext,
  );

  React.useEffect(() => {
    if (inputRef.current && setFocus) {
      inputRef.current.focus();
    }
  }, [setFocus]);

  return (
    <Box
      as='input'
      ref={refs}
      data-iui-size={size ?? contextSize}
      disabled={isDisabled}
      id={idProp}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'input', InputProps>;

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
  const { size: contextSize, isDisabled } = useSafeContext(
    InputWithDecorationsContext,
  );

  return (
    <IconButton
      ref={ref}
      size={size ?? contextSize}
      styleType='borderless'
      disabled={isDisabled}
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
 *
 */
export const InputWithDecorations = Object.assign(
  InputWithDecorationsComponent,
  {
    /**
     *
     */
    Input: InputWithDecorationsInput,
    /**
     *
     */
    Icon: InputWithDecorationsIcon,
    /**
     *
     */
    Button: InputWithDecorationsButton,
  },
);
