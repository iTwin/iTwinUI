/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Popover, PopoverProps, useSafeContext } from '../utils';
import {
  ComboBoxStateContext,
  ComboBoxActionContext,
  ComboBoxRefsContext,
} from './helpers';
import type { Instance, Props } from 'tippy.js';

type ComboBoxDropdownProps = PopoverProps & { children: JSX.Element };

export const ComboBoxDropdown = React.forwardRef(
  (props: ComboBoxDropdownProps, forwardedRef: React.Ref<Element>) => {
    const { children, ...rest } = props;
    const { isOpen } = useSafeContext(ComboBoxStateContext);
    const dispatch = useSafeContext(ComboBoxActionContext);
    const { inputRef, toggleButtonRef } = useSafeContext(ComboBoxRefsContext);

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
        onClickOutside={React.useCallback(
          (_: Instance<Props>, { target }: Event) => {
            if (!toggleButtonRef.current?.contains(target as Element)) {
              dispatch({ type: 'close' });
            }
          },
          [dispatch, toggleButtonRef],
        )}
        animation='shift-away'
        duration={200}
        reference={inputRef}
        ref={forwardedRef}
        content={children}
        {...rest}
      />
    );
  },
);
ComboBoxDropdown.displayName = 'ComboBoxDropdown';
