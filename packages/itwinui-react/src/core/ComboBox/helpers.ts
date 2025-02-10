/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { SelectOption } from '../Select/Select.js';
import type { usePopover } from '../Popover/Popover.js';

export const ComboBoxRefsContext = React.createContext<
  | {
      inputRef: React.RefObject<HTMLInputElement | null>;
      menuRef: React.RefObject<HTMLElement | null>;
      optionsExtraInfo: Record<string, { __originalIndex: number }>;
    }
  | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  ComboBoxRefsContext.displayName = 'ComboBoxRefsContext';
}

type ComboBoxStateContextProps<T = unknown> = {
  isOpen: boolean;
  id: string;
  enableVirtualization: boolean;
  filteredOptions: SelectOption<T>[];
  onClickHandler?: (prop: number) => void;
  getMenuItem: (
    option: SelectOption<T>,
    filteredIndex?: number,
  ) => React.JSX.Element;
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
  multiple?: boolean;
  popover: ReturnType<typeof usePopover>;
  show: () => void;
  hide: () => void;
};

export const ComboBoxStateContext = React.createContext<
  ComboBoxStateContextProps | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  ComboBoxStateContext.displayName = 'ComboBoxStateContext';
}
