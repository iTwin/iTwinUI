/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { StatusMessage } from '../StatusMessage';
import { InputContainer, InputContainerProps, useSafeContext } from '../utils';
import { ComboBoxStateContext } from './helpers';

type ComboBoxInputContainerProps = React.ComponentPropsWithoutRef<'div'> &
  Pick<InputContainerProps, 'status' | 'message' | 'disabled'>;

export const ComboBoxInputContainer = (props: ComboBoxInputContainerProps) => {
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
          React.cloneElement(message, { status })
        )
      }
      {...rest}
      id={id}
    >
      <div className='iui-input-with-icon'>{children}</div>
    </InputContainer>
  );
};
ComboBoxInputContainer.displayName = 'ComboBoxInputContainer';
