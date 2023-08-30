/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Popover, useSafeContext } from '../utils/index.js';
import type {
  PopoverProps,
  PolymorphicForwardRefComponent,
} from '../utils/index.js';
import {
  ComboBoxStateContext,
  ComboBoxActionContext,
  ComboBoxRefsContext,
} from './helpers.js';

type ComboBoxDropdownProps = PopoverProps & { children: JSX.Element };

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
    <Popover
      placement='bottom-start'
      visible={isOpen}
      onClickOutside={React.useCallback(() => {
        dispatch({ type: 'close' });
      }, [dispatch])}
      animation='shift-away'
      duration={200}
      reference={inputRef}
      ref={forwardedRef}
      content={children}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ComboBoxDropdownProps>;
ComboBoxDropdown.displayName = 'ComboBoxDropdown';
