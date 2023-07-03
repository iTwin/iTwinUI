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
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { IconButton } from '../Buttons/index.js';
import type { InputProps } from '../Input/Input.js';

const InputWithDecorationsComponent = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <InputFlexContainer {...rest} ref={ref}>
      {children}
    </InputFlexContainer>
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

  React.useEffect(() => {
    if (inputRef.current && setFocus) {
      inputRef.current.focus();
    }
  }, [setFocus]);

  return (
    <Box as='input' ref={refs} data-iui-size={size} id={idProp} {...rest} />
  );
}) as PolymorphicForwardRefComponent<'input', InputProps>;

//-------------------------------------------------------------------------------

const InputWithDecorationsIcon = React.forwardRef((props, ref) => {
  const { children, className, isActionable, ...rest } = props;
  return (
    <Icon
      {...rest}
      className={cx(
        'iui-input-decorator-icon',
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

const InputWithDecorationsButton = React.forwardRef((props, ref) => {
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
