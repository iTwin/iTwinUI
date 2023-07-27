/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { StatusMessage } from '../StatusMessage/index.js';
import { InputContainer, useSafeContext, Box } from '../utils/index.js';
import type {
  InputContainerProps,
  PolymorphicForwardRefComponent,
} from '../utils/index.js';
import { ComboBoxStateContext } from './helpers.js';

type ComboBoxInputContainerProps = Pick<
  InputContainerProps,
  'status' | 'message' | 'disabled'
>;

export const ComboBoxInputContainer = React.forwardRef(
  (props, forwardedRef) => {
    const { className, status, message, children, ...rest } = props;

    const { id } = useSafeContext(ComboBoxStateContext);

    return (
      <InputContainer
        className={className}
        status={status}
        statusMessage={
          typeof message === 'string' ? (
            <StatusMessage status={status}>{message}</StatusMessage>
          ) : (
            React.isValidElement(message) &&
            React.cloneElement(message as JSX.Element, { status })
          )
        }
        ref={forwardedRef}
        {...rest}
        id={id}
      >
        <Box className='iui-input-with-icon'>{children}</Box>
      </InputContainer>
    );
  },
) as PolymorphicForwardRefComponent<'div', ComboBoxInputContainerProps>;
ComboBoxInputContainer.displayName = 'ComboBoxInputContainer';
