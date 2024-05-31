/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { SelectOption } from '../Select/Select.js';
import type { usePopover } from '../Popover/Popover.js';

type ComboBoxState = {
  isOpen: boolean;
  selected: number | number[];
  focusedIndex: number;
};

type ComboBoxAction =
  | {
      type: 'multiselect';
      value: number[] | null | undefined;
      valueProp: number[] | null | undefined;
    }
  | { type: 'open' }
  | { type: 'close' }
  | {
      type: 'select';
      value: number | null | undefined;
      valueProp: number | null | undefined;
    }
  | { type: 'focus'; value: number | undefined };

export const comboBoxReducer = (
  state: ComboBoxState,
  action: ComboBoxAction,
): ComboBoxState => {
  switch (action.type) {
    case 'open': {
      return { ...state, isOpen: true };
    }
    case 'close': {
      return { ...state, isOpen: false };
    }
    case 'select': {
      if (Array.isArray(state.selected)) {
        return { ...state };
      }

      return {
        ...state,
        selected:
          (action.valueProp !== undefined ? action.valueProp : action.value) ??
          -1,
        focusedIndex: action.value ?? state.focusedIndex,
      };
    }
    case 'multiselect': {
      if (!Array.isArray(state.selected)) {
        return { ...state };
      }

      return {
        ...state,
        selected:
          (action.valueProp !== undefined ? action.valueProp : action.value) ??
          [],
      };
    }
    case 'focus': {
      if (Array.isArray(state.selected)) {
        return {
          ...state,
          focusedIndex: action.value ?? -1,
        };
      }
      return {
        ...state,
        focusedIndex: action.value ?? state.selected ?? -1,
      };
    }
    default: {
      return state;
    }
  }
};

export const ComboBoxRefsContext = React.createContext<
  | {
      inputRef: React.RefObject<HTMLInputElement>;
      menuRef: React.RefObject<HTMLElement>;
      optionsExtraInfoRef: React.MutableRefObject<
        Record<string, { __originalIndex: number }>
      >;
    }
  | undefined
>(undefined);
ComboBoxRefsContext.displayName = 'ComboBoxRefsContext';

type ComboBoxStateContextProps<T = unknown> = {
  isOpen: boolean;
  id: string;
  enableVirtualization: boolean;
  filteredOptions: SelectOption<T>[];
  onClickHandler?: (prop: number) => void;
  getMenuItem: (option: SelectOption<T>, filteredIndex?: number) => JSX.Element;
  focusedIndex?: number;
  multiple?: boolean;
  popover: ReturnType<typeof usePopover>;
  show: () => void;
  hide: () => void;
};

export const ComboBoxStateContext = React.createContext<
  ComboBoxStateContextProps | undefined
>(undefined);
ComboBoxStateContext.displayName = 'ComboBoxStateContext';

export const ComboBoxActionContext = React.createContext<
  ((x: ComboBoxAction) => void) | undefined
>(undefined);
ComboBoxActionContext.displayName = 'ComboBoxActionContext';
