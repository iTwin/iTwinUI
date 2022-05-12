import React from 'react';

type ComboBoxAction = 'open' | 'close' | 'select' | 'focus';

export const comboBoxReducer = (
  state: { isOpen: boolean; selectedIndex: number; focusedIndex: number },
  [type, value]: [ComboBoxAction] | [ComboBoxAction, number | undefined],
) => {
  switch (type) {
    case 'open': {
      return { ...state, isOpen: true };
    }
    case 'close': {
      return { ...state, isOpen: false };
    }
    case 'select': {
      return {
        ...state,
        isOpen: false,
        selectedIndex: value ?? state.selectedIndex,
        focusedIndex: value ?? state.focusedIndex,
      };
    }
    case 'focus': {
      return { ...state, focusedIndex: value ?? state.selectedIndex ?? -1 };
    }
    default: {
      return state;
    }
  }
};

export const ComboBoxRefsContext = React.createContext<
  | {
      inputRef: React.RefObject<HTMLInputElement>;
      menuRef: React.RefObject<HTMLUListElement>;
      toggleButtonRef: React.RefObject<HTMLSpanElement>;
      optionsExtraInfoRef: React.MutableRefObject<
        Record<string, { __originalIndex: number }>
      >;
    }
  | undefined
>(undefined);
ComboBoxRefsContext.displayName = 'ComboBoxRefsContext';

export const ComboBoxStateContext = React.createContext<
  | {
      isOpen: boolean;
      id: string;
      minWidth: number;
      focusedIndex?: number;
    }
  | undefined
>(undefined);
ComboBoxStateContext.displayName = 'ComboBoxStateContext';

export const ComboBoxActionContext = React.createContext<
  ((x: [ComboBoxAction] | [ComboBoxAction, number]) => void) | undefined
>(undefined);
ComboBoxActionContext.displayName = 'ComboBoxActionContext';
