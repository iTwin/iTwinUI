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

    const {
      options,
      value: valueProp,
      onChange,
      filterFunction,
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

    // Record to store all extra information (e.g. original indexes), where the key is the id of the option
    const [optionsExtraInfoRef, setOptionsExtraInfoRef] = React.useState<
      ReturnType<typeof getOptionsExtraInfoRef>
    >(getOptionsExtraInfoRef(options, id));

    React.useEffect(() => {
      setOptionsExtraInfoRef(getOptionsExtraInfoRef(options, id));
    }, [options, id]);

    // // Clear the extra info when the options change so that it can be reinitialized below
    // React.useEffect(() => {
    //   optionsExtraInfoRef.current = {};
    // }, [options]);

    // Initialize the extra info only if it is not already initialized
    // React.useEffect(() => {
    //   optionsExtraInfoRef.current = getOptionsExtraInfoRef(options, id);
    // }, [id, options]);

    /**
     * - When multiple is enabled, it is an array of indices.
     * - When multiple is disabled, it is a single index; -1 if no item is selected.
     */
    const getSelectedIndexes = React.useCallback(
      (value: typeof valueProp) => {
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
      getSelectedIndexes(defaultValue),
      valueProp !== undefined ? getSelectedIndexes(valueProp) : undefined,
    );

    const previousValue = React.useRef(valueProp);
    React.useLayoutEffect(() => {
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

    // console.log(
    //   'selectedIndexes: ',
    //   selectedIndexes,
    //   // Object.keys(optionsExtraInfoRef.current).map((key) => key.substring(30)),
    // );

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
        // Reset the filtered list (does not reset when multiple enabled)
        if (!multiple) {
          setFilteredOptions(optionsRef.current);
          setFocusedIndex((selectedIndexes as number | undefined) ?? -1);
          // dispatch({ type: 'focus', value: undefined });
        }
      }
      // When the dropdown closes
      else {
        // Reset the focused index
        // dispatch({ type: 'focus', value: undefined });
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

    // Update filtered options to the latest value options according to input value
    const [filteredOptions, setFilteredOptions] = React.useState(options);

    /**
     * Should be called internally whenever the options change.
     */
    const onOptionsChange = React.useCallback(() => {
      // Remove the filter so that all of the new options are shown.
      setFilteredOptions(options);

      // If multiple=false, refocus the selected option.
      // If no option is selected (i.e. selected === -1), reset the focus to the input.
      if (!isMultipleEnabled(selectedIndexes, multiple)) {
        setFocusedIndex(selectedIndexes);
        // dispatch({ type: 'focus', value: selected as number });
      }
      // If multiple=true, reset the focus to the input.
      else {
        setFocusedIndex(-1);
        // dispatch({ type: 'focus', value: -1 });
      }

      // Reset/update the input value if multiple=false and if the dropdown is closed (i.e. don't override user input when dropdown is open)
      if (!isMultipleEnabled(selectedIndexes, multiple) && !isOpen) {
        setInputValue(
          selectedIndexes >= 0
            ? optionsRef.current[selectedIndexes]?.label
            : '',
        );
      }
    }, [isOpen, multiple, options, optionsRef, selectedIndexes]);

    // To reconfigure internal state whenever the options change
    const previousOptions = React.useRef(options);
    React.useEffect(() => {
      if (options !== previousOptions.current) {
        previousOptions.current = options;
        onOptionsChange();
      }
    }, [onOptionsChange, options]);

    // Filter options based on input value
    const [inputValue, setInputValue] = React.useState<string>(
      inputProps?.value?.toString() ?? '',
    );

    const [liveRegionSelection, setLiveRegionSelection] = React.useState('');

    const handleOnInput = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setInputValue(value);
        show(); // reopen when typing
        setFilteredOptions(
          filterFunction?.(optionsRef.current, value) ??
            optionsRef.current.filter((option) =>
              option.label.toLowerCase().includes(value.toLowerCase()),
            ),
        );
        if (focusedIndex != -1) {
          // dispatch({ type: 'focus', value: -1 });
          setFocusedIndex(-1);
        }
        inputProps?.onChange?.(event);
      },
      [filterFunction, focusedIndex, inputProps, optionsRef, show],
    );

    // const onValuePropChange = React.useCallback(() => {
    //   const selectedIndexesFromValueProp = getSelectedIndexes(valueProp);

    //   if (isMultipleEnabled(selectedIndexesFromValueProp, multiple)) {
    //     dispatch({
    //       type: 'multiselect',
    //       value: selectedIndexesFromValueProp,
    //       valueProp: selectedIndexesFromValueProp,
    //     });
    //   } else {
    //     dispatch({
    //       type: 'select',
    //       value: selectedIndexesFromValueProp,
    //       valueProp: selectedIndexesFromValueProp,
    //     });
    //   }
    // }, [getSelectedIndexes, multiple, valueProp]);

    // // When the value prop changes, update the selected index/indices
    // const previousValueProp = React.useRef(valueProp);
    // React.useEffect(() => {
    //   if (valueProp !== previousValueProp.current) {
    //     previousValueProp.current = valueProp;
    //     onValuePropChange();
    //   }
    // }, [getSelectedIndexes, multiple, onValuePropChange, valueProp]);

    const isMenuItemSelected = React.useCallback(
      (index: number) => {
        if (isMultipleEnabled(selectedIndexes, multiple)) {
          return selectedIndexes.includes(index as number);
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
        newArray?: number[],
      ) => {
        if (isSingleOnChange(onChangeProp.current, multiple)) {
          onChangeProp.current?.(optionsRef.current[__originalIndex]?.value);
        } else {
          actionType &&
            newArray &&
            onChangeProp.current?.(
              newArray?.map((item) => optionsRef.current[item]?.value),
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

        const selectedIndexesFromValueProp = getSelectedIndexes(valueProp);

        if (
          isMultipleEnabled(selectedIndexes, multiple) &&
          isMultipleEnabled(selectedIndexesFromValueProp, multiple)
        ) {
          const actionType = isMenuItemSelected(__originalIndex)
            ? 'removed'
            : 'added';
          const newArray = selectedChangeHandler(__originalIndex, actionType);

          if (newArray == null) {
            return;
          }
          setSelectedIndexes(newArray);
          // dispatch({
          //   type: 'multiselect',
          //   value: newArray,
          //   valueProp: selectedIndexesFromValueProp,
          // });
          onChangeHandler(__originalIndex, actionType, newArray);

          // update live region
          setLiveRegionSelection(
            newArray
              .map((item) => optionsRef.current[item]?.label)
              .filter(Boolean)
              .join(', '),
          );
        } else if (!isMultipleEnabled(selectedIndexesFromValueProp, multiple)) {
          // dispatch({
          //   type: 'select',
          //   value: __originalIndex,
          //   valueProp: selectedIndexesFromValueProp,
          // });
          setSelectedIndexes(__originalIndex);
          hide();
          onChangeHandler(__originalIndex);
        }
      },
      [
        getSelectedIndexes,
        selectedChangeHandler,
        isMenuItemSelected,
        multiple,
        onChangeHandler,
        selectedIndexes,
        optionsRef,
        hide,
        valueProp,
        setSelectedIndexes,
      ],
    );

    const getMenuItem = React.useCallback(
      (option: SelectOption<T>, filteredIndex?: number) => {
        const optionId = getOptionId(option, id);
        try {
          const { __originalIndex } = optionsExtraInfoRef[optionId];
          __originalIndex;
        } catch (error) {
          console.warn('ERROR', optionId);
        }

        const { __originalIndex } = optionsExtraInfoRef[optionId];
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
              isSelected: isMultipleEnabled(selectedIndexes, multiple)
                ? selectedIndexes.includes(__originalIndex)
                : selectedIndexes === __originalIndex,
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
        selectedIndexes,
        multiple,
        optionsExtraInfoRef,
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
        value={{ inputRef, menuRef, optionsExtraInfoRef }}
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
                          const item: SelectOption<T> | undefined =
                            optionsRef.current[index];

                          if (item == null) {
                            return undefined;
                          }

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

// ----------------------------------------------------------------------------

// // Use for optionsExtraInfoRef
// const useCache = <T,>(
//   options: SelectOption<T>[],
// ): Record<string, { __originalIndex: number }> => {
//   const cache = React.useRef<Record<string, { __originalIndex: number }>>({});

//   React.useEffect(() => {
//     options.forEach((option, index) => {
//       const optionId = getOptionId(option, id);
//       cache.current[optionId] = { __originalIndex: index };
//     });
//   }, [options]);

//   return cache.current;
// }

const getOptionsExtraInfoRef = <T,>(
  options: ComboBoxProps<T>['options'],
  id: NonNullable<ComboBoxProps<T>['id']>,
) => {
  const newOptionsExtraInfoRef: Record<string, { __originalIndex: number }> =
    {};

  // if (options.length > 0 && Object.keys(newOptionsExtraInfoRef).length === 0) {
  options.forEach((option, index) => {
    newOptionsExtraInfoRef[getOptionId(option, id)] = {
      __originalIndex: index,
    };
  });
  // } else {
  //   return null;
  // }

  return newOptionsExtraInfoRef;
};
