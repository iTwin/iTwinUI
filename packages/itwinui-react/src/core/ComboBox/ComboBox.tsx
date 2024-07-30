/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuExtraContent } from '../Menu/MenuExtraContent.js';
import type { SelectOption } from '../Select/Select.js';
import { SelectTag } from '../Select/SelectTag.js';
import { Text } from '../Typography/Text.js';
import type { Input } from '../Input/Input.js';
import {
  mergeRefs,
  useLatestRef,
  useLayoutEffect,
  AutoclearingHiddenLiveRegion,
  useId,
  useControlledState,
} from '../../utils/index.js';
import { usePopover } from '../Popover/Popover.js';
import type { InputContainerProps, CommonProps } from '../../utils/index.js';
import { ComboBoxRefsContext, ComboBoxStateContext } from './helpers.js';
import { ComboBoxEndIcon } from './ComboBoxEndIcon.js';
import { ComboBoxInput } from './ComboBoxInput.js';
import { ComboBoxInputContainer } from './ComboBoxInputContainer.js';
import { ComboBoxMenu } from './ComboBoxMenu.js';
import { ComboBoxMenuItem } from './ComboBoxMenuItem.js';

// Type guard for enabling multiple
const isMultipleEnabled = <T,>(
  variable: (T | null | undefined) | (T[] | null | undefined),
  multiple: boolean,
): variable is T[] | null | undefined => {
  return (
    multiple &&
    (Array.isArray(variable) || variable === null || variable === undefined)
  );
};

// Type guard for user onChange
const isSingleOnChange = <T,>(
  onChange:
    | ((value: T) => void)
    | ((value: T[], event?: MultipleOnChangeProps<T>) => void)
    | undefined,
  multiple: boolean,
): onChange is ((value: T) => void) | undefined => {
  return !multiple;
};

type ActionType = 'added' | 'removed';
type MultipleOnChangeProps<T> = {
  value: T;
  type: ActionType;
};

export type ComboboxMultipleTypeProps<T> =
  | {
      /**
       * Enable multiple selection.
       * @default false
       */
      multiple?: false;
      /**
       * Controlled value of ComboBox.
       * If `multiple` is enabled, it is an array of values.
       *
       * Pass `null` or `undefined` to reset the value. Apart from resetting the value:
       * * `value={null}` will switch to/remain in the *controlled* state.
       * * `value={undefined}` will switch to/remain in the *uncontrolled* state.
       */
      value?: T | null | undefined;
      /**
       * Default value of `value` that is set on initial render. This is useful when you don't want to
       * maintain your own state but still want to control the initial `value`.
       */
      defaultValue?: T | null;
      /**
       * Callback fired when selected value changes.
       */
      onChange?: (value: T) => void;
    }
  | {
      multiple: true;
      value?: T[] | null | undefined;
      defaultValue?: T[] | null;
      onChange?: (value: T[], event: MultipleOnChangeProps<T>) => void;
    };

export type ComboBoxProps<T> = {
  /**
   * Array of options that populate the dropdown list.
   */
  options: SelectOption<T>[];
  /**
   * Message shown below the combobox.
   * Use `StatusMessage` component.
   */
  message?: React.ReactNode;
  /**
   * Function to customize the default filtering logic.
   */
  filterFunction?: (
    options: SelectOption<T>[],
    inputValue: string,
  ) => SelectOption<T>[];
  /**
   * Native input element props.
   */
  inputProps?: React.ComponentProps<typeof Input>;
  /**
   * Props to customize dropdown menu behavior.
   */
  dropdownMenuProps?: React.ComponentProps<'div'>;
  /**
   * End icon props.
   */
  endIconProps?: React.ComponentProps<typeof ComboBoxEndIcon>;
  /**
   * Message shown when no options are available.
   * If `JSX.Element` is provided, it will be rendered as is and won't be wrapped with `MenuExtraContent`.
   * @default 'No options found'
   */
  emptyStateMessage?: React.ReactNode;
  /**
   * A custom item renderer can be specified to control the rendering.
   *
   * For keyboard navigation to work, the returned element should use the `id` provided by this function.
   * The `isFocused` state is calculated using this `id` and can be used for specifying the focus styling.
   * If a `MenuItem` is returned, then focus styling is automatically handled.
   */
  itemRenderer?: (
    option: SelectOption<T>,
    states: {
      isSelected: boolean;
      isFocused: boolean;
      id: string;
      index: number;
    },
  ) => JSX.Element;
  /**
   * If enabled, virtualization is used for the scrollable dropdown list.
   * Use it if you expect a very long list of items.
   * @default false
   * @beta
   */
  enableVirtualization?: boolean;
  /**
   * Callback fired when dropdown menu is opened.
   */
  onShow?: () => void;
  /**
   * Callback fired when dropdown menu is closed.
   */
  onHide?: () => void;
} & ComboboxMultipleTypeProps<T> &
  Pick<InputContainerProps, 'status'> &
  CommonProps;

/** Returns either `option.id` or derives a stable id using `idPrefix` and `option.label` (without whitespace) */
const getOptionId = (option: SelectOption<unknown>, idPrefix: string) => {
  return option.id ?? `${idPrefix}-option-${option.label.replace(/\s/g, '-')}`;
};

/**
 * ComboBox component that allows typing a value to filter the options in dropdown list.
 * Values can be selected either using mouse clicks or using the Enter key.
 * @example
 * <ComboBox
 *   options={[
 *     { label: 'Item 1', value: 1 },
 *     { label: 'Item 2', value: 2 },
 *     { label: 'Item 3', value: 3 },
 *   ]}
 *   onChange={() => {}}
 * />
 */
export const ComboBox = React.forwardRef(
  <T,>(
    props: ComboBoxProps<T>,
    forwardedRef: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const idPrefix = useId();

    const defaultFilterFunction = React.useCallback(
      (options: SelectOption<T>[], inputValue: string) => {
        return options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()),
        );
      },
      [],
    );

    const {
      options,
      value: valueProp,
      onChange,
      filterFunction = defaultFilterFunction,
      inputProps,
      endIconProps,
      dropdownMenuProps,
      emptyStateMessage = 'No options found',
      itemRenderer,
      enableVirtualization = false,
      multiple = false,
      onShow: onShowProp,
      onHide: onHideProp,
      id = inputProps?.id ? `iui-${inputProps.id}-cb` : idPrefix,
      defaultValue,
      ...rest
    } = props;

    // Refs get set in subcomponents
    const inputRef = React.useRef<HTMLInputElement>(null);
    const menuRef = React.useRef<HTMLElement>(null);
    const onChangeProp = useLatestRef(onChange);
    const optionsRef = useLatestRef(options);
    const filterFunctionRef = useLatestRef(filterFunction);

    const optionsExtraInfo = React.useMemo(() => {
      const newOptionsExtraInfo: Record<string, { __originalIndex: number }> =
        {};

      options.forEach((option, index) => {
        newOptionsExtraInfo[getOptionId(option, id)] = {
          __originalIndex: index,
        };
      });

      return newOptionsExtraInfo;
    }, [id, options]);

    /**
     * - When multiple is enabled, it is an array of indices.
     * - When multiple is disabled, it is a single index; -1 if no item is selected.
     */
    const getSelectedIndexes = React.useCallback(
      (value: typeof valueProp) => {
        // If value is undefined, use uncontrolled state
        if (value === undefined) {
          return undefined;
        }

        if (isMultipleEnabled(value, multiple)) {
          const indexArray: number[] = [];
          value?.forEach((value) => {
            const indexToAdd = options.findIndex(
              (option) => option.value === value,
            );
            if (indexToAdd > -1) {
              indexArray.push(indexToAdd);
            }
          });
          return indexArray;
        } else {
          return options.findIndex((option) => option.value === value);
        }
      },
      [multiple, options],
    );

    const [selectedIndexes, setSelectedIndexes] = useControlledState(
      getSelectedIndexes(defaultValue) ?? (multiple ? [] : -1),
      getSelectedIndexes(valueProp),
    );

    const previousValue = React.useRef(valueProp);
    useLayoutEffect(() => {
      if (valueProp !== previousValue.current) {
        previousValue.current = valueProp;

        // Passing value={undefined} resets the value (needed to prevent a breaking change)
        if (valueProp === undefined) {
          if (isMultipleEnabled(selectedIndexes, multiple)) {
            setSelectedIndexes([]);
          } else {
            setSelectedIndexes(-1);
          }
        }
      }
    }, [multiple, selectedIndexes, setSelectedIndexes, valueProp]);

    const [isOpen, setIsOpen] = React.useState(false);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    const onShowRef = useLatestRef(onShowProp);
    const onHideRef = useLatestRef(onHideProp);

    const show = React.useCallback(() => {
      setIsOpen(true);
      onShowRef.current?.();
    }, [onShowRef]);

    const hide = React.useCallback(() => {
      setIsOpen(false);
      onHideRef.current?.();
    }, [onHideRef]);

    useLayoutEffect(() => {
      // When the dropdown opens
      if (isOpen) {
        inputRef.current?.focus(); // Focus the input
        if (!isMultipleEnabled(selectedIndexes, multiple)) {
          setFocusedIndex(selectedIndexes ?? -1);
        }
      }
      // When the dropdown closes
      else {
        // Reset the focused index
        setFocusedIndex(-1);
        // Reset/update the input value if not multiple
        if (!isMultipleEnabled(selectedIndexes, multiple)) {
          setInputValue(
            selectedIndexes >= 0
              ? optionsRef.current[selectedIndexes]?.label ?? ''
              : '',
          );
        }
      }
    }, [isOpen, multiple, optionsRef, selectedIndexes]);

    // To reconfigure internal state whenever the options change
    const previousOptions = React.useRef(options);
    React.useEffect(() => {
      if (options !== previousOptions.current) {
        previousOptions.current = options;
        onOptionsChange();
      }

      /**
       * Should be called internally whenever the options change.
       */
      function onOptionsChange() {
        // If multiple=false, refocus the selected option.
        // If no option is selected (i.e. selected === -1), reset the focus to the input.
        if (!isMultipleEnabled(selectedIndexes, multiple)) {
          setFocusedIndex(selectedIndexes);
        }
        // If multiple=true, reset the focus to the input.
        else {
          setFocusedIndex(-1);
        }

        // Reset/update the input value if multiple=false and if the dropdown is closed (i.e. don't override user input when dropdown is open)
        if (!isMultipleEnabled(selectedIndexes, multiple) && !isOpen) {
          setInputValue(
            selectedIndexes >= 0 ? options[selectedIndexes]?.label : '',
          );
        }
      }
    }, [options, isOpen, multiple, selectedIndexes]);

    // Filter options based on input value
    const [inputValue, setInputValue] = React.useState<string>(
      inputProps?.value?.toString() ?? '',
    );
    const [isInputDirty, setIsInputDirty] = React.useState(false);

    const filteredOptions = React.useMemo(() => {
      // We filter the list only when the user is typing (i.e. input is "dirty")
      if (!isInputDirty) {
        return options;
      }

      return filterFunctionRef.current?.(options, inputValue);
    }, [filterFunctionRef, inputValue, options, isInputDirty]);

    const [liveRegionSelection, setLiveRegionSelection] = React.useState('');

    const handleOnInput = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setInputValue(value);
        show(); // reopen when typing
        setIsInputDirty(true);

        if (focusedIndex != -1) {
          setFocusedIndex(-1);
        }
        inputProps?.onChange?.(event);
      },
      [focusedIndex, inputProps, show],
    );

    const isMenuItemSelected = React.useCallback(
      (index: number) => {
        if (isMultipleEnabled(selectedIndexes, multiple)) {
          return selectedIndexes.includes(index);
        } else {
          return selectedIndexes === index;
        }
      },
      [multiple, selectedIndexes],
    );

    /**
     * Generates new array when item is added or removed. Only applicable when multiple is enabled.
     */
    const selectedChangeHandler = React.useCallback(
      (__originalIndex: number, action: ActionType) => {
        if (!isMultipleEnabled(selectedIndexes, multiple)) {
          return;
        }

        if (action === 'added') {
          return [...selectedIndexes, __originalIndex];
        } else {
          return selectedIndexes?.filter((index) => index !== __originalIndex);
        }
      },
      [selectedIndexes, multiple],
    );

    /**
     * Calls user defined onChange
     */
    const onChangeHandler = React.useCallback(
      (
        __originalIndex: number,
        actionType?: ActionType,
        newSelectedIndexes?: number[],
      ) => {
        if (isSingleOnChange(onChangeProp.current, multiple)) {
          onChangeProp.current?.(optionsRef.current[__originalIndex]?.value);
        } else {
          actionType &&
            newSelectedIndexes &&
            onChangeProp.current?.(
              newSelectedIndexes?.map(
                (index) => optionsRef.current[index]?.value,
              ),
              {
                value: optionsRef.current[__originalIndex]?.value,
                type: actionType,
              },
            );
        }
      },
      [multiple, onChangeProp, optionsRef],
    );

    const onClickHandler = React.useCallback(
      (__originalIndex: number) => {
        inputRef.current?.focus({ preventScroll: true }); // return focus to input

        if (optionsRef.current[__originalIndex]?.disabled) {
          return;
        }

        setIsInputDirty(false);
        if (multiple) {
          const actionType = isMenuItemSelected(__originalIndex)
            ? 'removed'
            : 'added';
          const newSelectedIndexes = selectedChangeHandler(
            __originalIndex,
            actionType,
          );

          if (newSelectedIndexes == null) {
            return;
          }
          setSelectedIndexes(newSelectedIndexes);
          onChangeHandler(__originalIndex, actionType, newSelectedIndexes);

          // update live region
          setLiveRegionSelection(
            newSelectedIndexes
              .map((item) => optionsRef.current[item]?.label)
              .filter(Boolean)
              .join(', '),
          );
        } else {
          setSelectedIndexes(__originalIndex);
          hide();
          onChangeHandler(__originalIndex);
        }
      },
      [
        selectedChangeHandler,
        isMenuItemSelected,
        multiple,
        onChangeHandler,
        optionsRef,
        hide,
        setSelectedIndexes,
      ],
    );

    const getMenuItem = React.useCallback(
      (option: SelectOption<T>, filteredIndex?: number) => {
        const optionId = getOptionId(option, id);
        const { __originalIndex } = optionsExtraInfo[optionId];
        const {
          icon,
          startIcon: startIconProp,
          label,
          ...restOptions
        } = option;

        const startIcon = startIconProp ?? icon;

        const customItem = itemRenderer
          ? itemRenderer(option, {
              isFocused: focusedIndex === __originalIndex,
              isSelected: isMenuItemSelected(__originalIndex),
              index: __originalIndex,
              id: optionId,
            })
          : null;

        return customItem ? (
          React.cloneElement(customItem, {
            onClick: (e: unknown) => {
              onClickHandler(__originalIndex);
              customItem.props.onClick?.(e);
            },
            // ComboBox.MenuItem handles scrollIntoView, data-iui-index and focused through context
            // but we still need to pass them here for backwards compatibility with MenuItem
            focused: focusedIndex === __originalIndex,
            'data-iui-index': __originalIndex,
            'data-iui-filtered-index': filteredIndex,
            ref: mergeRefs(customItem.props.ref, (el: HTMLElement | null) => {
              if (!enableVirtualization && focusedIndex === __originalIndex) {
                el?.scrollIntoView({ block: 'nearest' });
              }
            }),
          })
        ) : (
          <ComboBoxMenuItem
            key={optionId}
            id={optionId}
            startIcon={startIcon}
            {...restOptions}
            isSelected={isMenuItemSelected(__originalIndex)}
            onClick={() => {
              onClickHandler(__originalIndex);
            }}
            index={__originalIndex}
            data-iui-filtered-index={filteredIndex}
          >
            {label}
          </ComboBoxMenuItem>
        );
      },
      [
        enableVirtualization,
        focusedIndex,
        id,
        isMenuItemSelected,
        itemRenderer,
        onClickHandler,
        optionsExtraInfo,
      ],
    );

    const emptyContent = React.useMemo(
      () => (
        <>
          {React.isValidElement(emptyStateMessage) ? (
            emptyStateMessage
          ) : (
            <MenuExtraContent>
              <Text isMuted>{emptyStateMessage}</Text>
            </MenuExtraContent>
          )}
        </>
      ),
      [emptyStateMessage],
    );

    const popover = usePopover({
      visible: isOpen,
      onVisibleChange: (open) => (open ? show() : hide()),
      matchWidth: true,
      closeOnOutsideClick: true,
      interactions: { click: false, focus: true },
    });

    return (
      <ComboBoxRefsContext.Provider
        value={{ inputRef, menuRef, optionsExtraInfo }}
      >
        <ComboBoxStateContext.Provider
          value={{
            id,
            isOpen,
            focusedIndex,
            setFocusedIndex,
            onClickHandler,
            enableVirtualization,
            filteredOptions,
            getMenuItem,
            multiple,
            popover,
            show,
            hide,
          }}
        >
          <ComboBoxInputContainer
            ref={forwardedRef}
            disabled={inputProps?.disabled}
            {...rest}
          >
            <>
              <ComboBoxInput
                value={inputValue}
                disabled={inputProps?.disabled}
                {...inputProps}
                onChange={handleOnInput}
                selectTags={
                  isMultipleEnabled(selectedIndexes, multiple)
                    ? (selectedIndexes
                        ?.map((index) => {
                          const item = options[index];

                          return (
                            <SelectTag key={item.label} label={item.label} />
                          );
                        })
                        .filter(Boolean) as JSX.Element[])
                    : undefined
                }
              />
            </>
            <ComboBoxEndIcon
              {...endIconProps}
              disabled={inputProps?.disabled}
              isOpen={isOpen}
            />

            {multiple ? (
              <AutoclearingHiddenLiveRegion text={liveRegionSelection} />
            ) : null}
          </ComboBoxInputContainer>
          <ComboBoxMenu as='div' {...dropdownMenuProps}>
            {filteredOptions.length > 0 && !enableVirtualization
              ? filteredOptions.map(getMenuItem)
              : emptyContent}
          </ComboBoxMenu>
        </ComboBoxStateContext.Provider>
      </ComboBoxRefsContext.Provider>
    );
  },
) as <T>(
  props: ComboBoxProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => JSX.Element;
if (process.env.NODE_ENV === 'development') {
  (ComboBox as any).displayName = 'ComboBox';
}
