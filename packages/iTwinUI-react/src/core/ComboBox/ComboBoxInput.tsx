import React from 'react';
import { Input, InputProps } from '../Input';
import { useSafeContext, useMergedRefs } from '../utils';
import {
  ComboBoxStateContext,
  ComboBoxActionContext,
  ComboBoxRefsContext,
} from './helpers';

type ComboBoxInputProps = InputProps;

export const ComboBoxInput = React.forwardRef(
  (props: ComboBoxInputProps, forwardedRef: React.Ref<HTMLInputElement>) => {
    const { onKeyDown: onKeyDownProp, onFocus: onFocusProp, ...rest } = props;

    const { isOpen, id, focusedIndex } = useSafeContext(ComboBoxStateContext);
    const dispatch = useSafeContext(ComboBoxActionContext);
    const { inputRef, menuRef, optionsExtraInfoRef } = useSafeContext(
      ComboBoxRefsContext,
    );
    const refs = useMergedRefs(inputRef, forwardedRef);

    const focusedIndexRef = React.useRef(focusedIndex ?? -1);
    React.useEffect(() => {
      focusedIndexRef.current = focusedIndex ?? -1;
    }, [focusedIndex]);

    const getIdFromIndex = (index: number) => {
      return (
        menuRef.current?.querySelector(`[data-iui-index="${index}"]`)?.id ?? ''
      );
    };

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDownProp?.(event);
        const length = Object.keys(optionsExtraInfoRef.current).length ?? 0;

        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            if (!isOpen) {
              return dispatch(['open']);
            }

            if (length === 0) {
              return;
            }

            if (focusedIndexRef.current === -1) {
              return dispatch([
                'focus',
                Object.values(optionsExtraInfoRef.current)?.[0]
                  .__originalIndex ?? -1,
              ]);
            }

            let nextIndex = focusedIndexRef.current;
            do {
              const currentElement = menuRef.current?.querySelector(
                `[data-iui-index="${nextIndex}"]`,
              );
              const nextElement =
                currentElement?.nextElementSibling ??
                menuRef.current?.querySelector('[data-iui-index]');
              nextIndex = Number(nextElement?.getAttribute('data-iui-index'));

              if (nextElement?.ariaDisabled !== 'true') {
                return dispatch(['focus', nextIndex]);
              }
            } while (nextIndex !== focusedIndexRef.current);
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            if (!isOpen) {
              return dispatch(['open']);
            }

            if (length === 0) {
              return;
            }

            if (focusedIndexRef.current === -1) {
              return dispatch([
                'focus',
                Object.values(optionsExtraInfoRef.current)?.[length - 1]
                  .__originalIndex ?? -1,
              ]);
            }

            let prevIndex = focusedIndexRef.current;
            do {
              const currentElement = menuRef.current?.querySelector(
                `[data-iui-index="${prevIndex}"]`,
              );
              const prevElement =
                currentElement?.previousElementSibling ??
                menuRef.current?.querySelector('[data-iui-index]:last-of-type');
              prevIndex = Number(prevElement?.getAttribute('data-iui-index'));

              if (prevElement?.ariaDisabled !== 'true') {
                return dispatch(['focus', prevIndex]);
              }
            } while (prevIndex !== focusedIndexRef.current);
            break;
          }
          case 'Enter': {
            event.preventDefault();
            if (isOpen) {
              dispatch(['select', focusedIndexRef.current]);
            } else {
              dispatch(['open']);
            }
            break;
          }
          case 'Escape': {
            event.preventDefault();
            dispatch(['close']);
            break;
          }
          case 'Tab':
            dispatch(['close']);
            break;
        }
      },
      [dispatch, isOpen, menuRef, onKeyDownProp, optionsExtraInfoRef],
    );

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        dispatch(['open']);
        onFocusProp?.(event);
      },
      [dispatch, onFocusProp],
    );

    return (
      <Input
        ref={refs}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        aria-activedescendant={
          isOpen && focusedIndex != undefined && focusedIndex > -1
            ? getIdFromIndex(focusedIndex)
            : undefined
        }
        role='combobox'
        aria-controls={isOpen ? `${id}-list` : undefined}
        aria-autocomplete='list'
        spellCheck={false}
        autoCapitalize='none'
        autoCorrect='off'
        {...rest}
      />
    );
  },
);
ComboBoxInput.displayName = 'ComboBoxInput';
