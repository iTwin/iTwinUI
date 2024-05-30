/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input } from '../Input/Input.js';
import {
  useSafeContext,
  useMergedRefs,
  useContainerWidth,
  mergeEventHandlers,
  useLatestRef,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { ComboBoxMultipleContainer } from './ComboBoxMultipleContainer.js';
import {
  ComboBoxStateContext,
  ComboBoxActionContext,
  ComboBoxRefsContext,
} from './helpers.js';

type ComboBoxInputProps = { selectTags?: JSX.Element[] } & React.ComponentProps<
  typeof Input
>;

export const ComboBoxInput = React.forwardRef((props, forwardedRef) => {
  const { selectTags, size, style, ...rest } = props;

  const {
    isOpen,
    id,
    focusedIndex,
    // setFocusedIndex,
    enableVirtualization,
    multiple,
    onClickHandler,
    popover,
    show,
    hide,
  } = useSafeContext(ComboBoxStateContext);
  const dispatch = useSafeContext(ComboBoxActionContext);
  const { inputRef, menuRef, optionsExtraInfoRef } =
    useSafeContext(ComboBoxRefsContext);
  const refs = useMergedRefs(inputRef, popover.refs.setReference, forwardedRef);

  const focusedIndexRef = useLatestRef(focusedIndex ?? -1);

  const getIdFromIndex = (index: number) => {
    return (
      menuRef.current?.querySelector(`[data-iui-index="${index}"]`)?.id ?? ''
    );
  };

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const length = Object.keys(optionsExtraInfoRef.current).length ?? 0;

      if (event.altKey) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          if (!isOpen) {
            return show();
          }

          if (length === 0) {
            return;
          }

          if (focusedIndexRef.current === -1) {
            const currentElement =
              menuRef.current?.querySelector('[data-iui-index]');
            return dispatch({
              type: 'focus',
              value: Number(
                currentElement?.getAttribute('data-iui-index') ?? 0,
              ),
            });
            // return setFocusedIndex(
            //   Number(currentElement?.getAttribute('data-iui-index') ?? 0),
            // );
          }

          // If virtualization is enabled, dont let round scrolling
          if (
            enableVirtualization &&
            !menuRef.current?.querySelector(
              `[data-iui-index="${focusedIndexRef.current}"]`,
            )?.nextElementSibling
          ) {
            return;
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

            if (nextElement) {
              return dispatch({ type: 'focus', value: nextIndex });
              // return setFocusedIndex(nextIndex);
            }
          } while (nextIndex !== focusedIndexRef.current);
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          if (!isOpen) {
            return show();
          }

          if (length === 0) {
            return;
          }

          // If virtualization is enabled, don't let round scrolling
          if (
            enableVirtualization &&
            !menuRef.current?.querySelector(
              `[data-iui-index="${focusedIndexRef.current}"]`,
            )?.previousElementSibling
          ) {
            return;
          }

          if (focusedIndexRef.current === -1) {
            return dispatch({
              type: 'focus',
              value:
                Object.values(optionsExtraInfoRef.current)?.[length - 1]
                  .__originalIndex ?? -1,
            });
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

            if (prevElement) {
              return dispatch({ type: 'focus', value: prevIndex });
            }
          } while (prevIndex !== focusedIndexRef.current);
          break;
        }
        case 'Enter': {
          event.preventDefault();
          if (isOpen) {
            if (focusedIndexRef.current > -1) {
              onClickHandler?.(focusedIndexRef.current);
            }
          } else {
            show();
          }
          break;
        }
        case 'Escape': {
          event.preventDefault();
          hide();
          break;
        }
        case 'Tab':
          hide();
          break;
      }
    },
    [
      dispatch,
      enableVirtualization,
      focusedIndexRef,
      isOpen,
      menuRef,
      onClickHandler,
      optionsExtraInfoRef,
      show,
      hide,
    ],
  );

  /**
   * This temporarily stores the state of `isOpen` before click event starts and resets it later.
   * It is necessary because `isOpen` may have changed during the process of the click,
   * e.g. because of focus, which could cause the menu to close immediately after opening.
   */
  const wasOpenBeforeClick = React.useRef(false);

  const handlePointerDown = React.useCallback(() => {
    wasOpenBeforeClick.current = isOpen;
  }, [isOpen]);

  const handleClick = React.useCallback(() => {
    if (!wasOpenBeforeClick.current) {
      show();
    } else {
      hide();
    }
    wasOpenBeforeClick.current = false;
  }, [hide, show]);

  const [tagContainerWidthRef, tagContainerWidth] = useContainerWidth();

  return (
    <>
      <Input
        ref={refs}
        aria-expanded={isOpen}
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
        style={{
          ...(multiple && { paddingInlineStart: tagContainerWidth + 18 }),
          ...style,
        }}
        aria-describedby={multiple ? `${id}-selected-live` : undefined}
        size={size}
        {...popover.getReferenceProps({
          ...rest,
          onPointerDown: mergeEventHandlers(
            props.onPointerDown,
            handlePointerDown,
          ),
          onClick: mergeEventHandlers(props.onClick, handleClick),
          onKeyDown: mergeEventHandlers(props.onKeyDown, handleKeyDown),
        })}
      />

      {multiple && selectTags ? (
        <ComboBoxMultipleContainer
          ref={tagContainerWidthRef}
          selectedItems={selectTags}
          id={`${id}-selected-live`}
        />
      ) : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'input', ComboBoxInputProps>;
ComboBoxInput.displayName = 'ComboBoxInput';
