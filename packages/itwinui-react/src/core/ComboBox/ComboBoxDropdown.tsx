/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { PopoverCopy, useSafeContext } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import {
  ComboBoxStateContext,
  ComboBoxActionContext,
  ComboBoxRefsContext,
} from './helpers.js';

type ComboBoxDropdownProps = React.ComponentProps<typeof PopoverCopy> & {
  children: JSX.Element;
};

export const ComboBoxDropdown = React.forwardRef((props, forwardedRef) => {
  const { children, ...rest } = props;
  const { isOpen } = useSafeContext(ComboBoxStateContext);
  const dispatch = useSafeContext(ComboBoxActionContext);
  const { inputRef } = useSafeContext(ComboBoxRefsContext);

  // sync internal isOpen state with user's visible prop
  React.useEffect(() => {
    if (props.visible != undefined) {
      dispatch({ type: props.visible ? 'open' : 'close' });
    }
  }, [dispatch, props.visible]);

  return (
    <PopoverCopy
      placement='bottom-start'
      visible={isOpen}
      onClickOutsideClose
      reference={inputRef}
      ref={forwardedRef}
      content={children}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ComboBoxDropdownProps>;
ComboBoxDropdown.displayName = 'ComboBoxDropdown';
