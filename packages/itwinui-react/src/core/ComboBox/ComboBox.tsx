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
  // useControlledState,
} from '../../utils/index.js';
import { usePopover } from '../Popover/Popover.js';
import type { InputContainerProps, CommonProps } from '../../utils/index.js';
import {
  ComboBoxActionContext,
  comboBoxReducer,
  ComboBoxRefsContext,
  ComboBoxStateContext,
} from './helpers.js';
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

    // TODO: Use defaultValue in the correct place. This line is just to prevent the unused variable eslint error
    defaultValue;

    // Refs get set in subcomponents
    const inputRef = React.useRef<HTMLInputElement>(null);
    const menuRef = React.useRef<HTMLElement>(null);
    const onChangeProp = useLatestRef(onChange);
    const optionsRef = useLatestRef(options);

    // Record to store all extra information (e.g. original indexes), where the key is the id of the option
    const optionsExtraInfoRef = React.useRef<
      Record<string, { __originalIndex: number }>
    >({});

    // Clear the extra info when the options change so that it can be reinitialized below
    React.useEffect(() => {
      optionsExtraInfoRef.current = {};
    }, [options]);

    // Initialize the extra info only if it is not already initialized
    if (
      options.length > 0 &&
      Object.keys(optionsExtraInfoRef.current).length === 0
    ) {
      options.forEach((option, index) => {
        optionsExtraInfoRef.current[getOptionId(option, id)] = {
          __originalIndex: index,
        };
      });
    }

    // Get indices of selected elements in options array when we have selected values.
    const getSelectedIndexes = React.useCallback(() => {
      if (isMultipleEnabled(valueProp, multiple)) {
        if (valueProp == null) {
          return valueProp;
        }

        const indexArray: number[] = [];
        valueProp?.forEach((value) => {
          const indexToAdd = options.findIndex(
            (option) => option.value === value,
          );
          if (indexToAdd > -1) {
            indexArray.push(indexToAdd);
          }
        });
        return indexArray;
      } else {
        const returnValue =
          valueProp === null
            ? null
            : valueProp === undefined
              ? undefined
              : options.findIndex((option) => option.value === valueProp);

        // console.log(
        //   'getSelectedIndexes',
        //   returnValue,
        //   valueProp,
        //   valueProp === null,
        //   valueProp === undefined,
        // );

        return returnValue;
      }
    }, [multiple, options, valueProp]);

    // Reducer where all the component-wide state is stored
    const [{ isOpen, selected, focusedIndex }, dispatch] = React.useReducer(
      comboBoxReducer,
      {
        isOpen: false,
        selected: getSelectedIndexes(),
        focusedIndex: -1,
      },
    );

    // console.log('selected', selected, valueProp);

    // const [value, setValue] = useControlledState(defaultValue, valueProp);

    // // Passing value={undefined} resets the value (needed to prevent a breaking change)
    // const previousValue = React.useRef(valueProp);
    // React.useLayoutEffect(() => {
    //   if (valueProp !== previousValue.current && valueProp === undefined) {
    //     previousValue.current = valueProp;
    //     dispatch({ type: 'select', value: undefined, valueProp: undefined });
    //     // setValue(undefined);
    //   }
    // }, [valueProp]);

    // const [isOpen, setIsOpen] = React.useState(false);
    // const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    const onShowRef = useLatestRef(onShowProp);
    const onHideRef = useLatestRef(onHideProp);

    const show = React.useCallback(() => {
      dispatch({ type: 'open' });
      // setIsOpen(true);
      onShowRef.current?.();
    }, [onShowRef]);

    const hide = React.useCallback(() => {
      dispatch({ type: 'close' });
      // setIsOpen(false);
      onHideRef.current?.();
    }, [onHideRef]);

    useLayoutEffect(() => {
      // When the dropdown opens
      if (isOpen) {
        inputRef.current?.focus(); // Focus the input
        // Reset the filtered list (does not reset when multiple enabled)
        if (!multiple) {
          setFilteredOptions(optionsRef.current);
          dispatch({ type: 'focus', value: undefined });
          // setFocusedIndex((selectedIndices as number | undefined) ?? -1);
        }
      }
      // When the dropdown closes
      else {
        // Reset the focused index
        dispatch({ type: 'focus', value: undefined });
        // setFocusedIndex(-1);
        // Reset/update the input value if not multiple
        if (!isMultipleEnabled(selected, multiple)) {
          setInputValue(
            selected != null && selected >= 0
              ? optionsRef.current[selected]?.label
              : '',
          );
        }
      }
    }, [isOpen, multiple, optionsRef, selected]);

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
      if (!isMultipleEnabled(selected, multiple)) {
        // setFocusedIndex(selected as number);
        dispatch({ type: 'focus', value: selected as number });
      }
      // If multiple=true, reset the focus to the input.
      else {
        // setFocusedIndex(-1);
        dispatch({ type: 'focus', value: -1 });
      }

      // Reset/update the input value if multiple=false and if the dropdown is closed (i.e. don't override user input when dropdown is open)
      if (!isMultipleEnabled(selected, multiple) && !isOpen) {
        setInputValue(
          selected != null && selected >= 0
            ? optionsRef.current[selected]?.label
            : '',
        );
      }
    }, [isOpen, multiple, options, optionsRef, selected]);

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
          dispatch({ type: 'focus', value: -1 });
          // setFocusedIndex(-1);
        }
        inputProps?.onChange?.(event);
      },
      [filterFunction, focusedIndex, inputProps, optionsRef, show],
    );

    // When the value prop changes, update the selected index/indices
    React.useEffect(() => {
      const selectedIndexes = getSelectedIndexes();

      // console.log(
      //   'value prop changed to ',
      //   valueProp,
      //   selectedIndexes,
      //   multiple,
      // );

      if (isMultipleEnabled(selectedIndexes, multiple)) {
        // if (valueProp) {
        //   // // If user provided array of selected values
        //   // const indexes = valueProp.map((value) => {
        //   //   return options.findIndex((option) => option.value === value);
        //   // });
        //   // dispatch({
        //   //   type: 'multiselect',
        //   //   value: indexes.filter((index) => index !== -1), // Add available options
        //   // });
        //   dispatch({
        //     type: 'multiselect',
        //     value: selectedIndexes,
        //     valueProp: selectedIndexes,
        //   });
        // } else {
        //   // if user provided one value or undefined
        //   dispatch({
        //     type: 'multiselect',
        //     value: [], // Add empty list
        //     valueProp: selectedIndexes,
        //   });
        // }

        console.log('value prop changed', selectedIndexes, valueProp);

        dispatch({
          type: 'multiselect',
          value: selectedIndexes,
          valueProp: selectedIndexes,
        });
      } else {
        dispatch({
          type: 'select',
          value: selectedIndexes,
          valueProp: selectedIndexes,
        });
      }
    }, [valueProp, options, multiple, getSelectedIndexes]);

    const isMenuItemSelected = React.useCallback(
      (index: number) => {
        if (isMultipleEnabled(selected, multiple)) {
          return selected != null && selected.includes(index as number);
        } else {
          return selected === index;
        }
      },
      [multiple, selected],
    );

    /**
     * Generates new array when item is added or removed. Only applicable when multiple is enabled.
     */
    const selectedChangeHandler = React.useCallback(
      (__originalIndex: number, action: ActionType) => {
        if (action === 'added') {
          return [...(selected as number[]), __originalIndex];
        } else {
          return (selected as number[]).filter(
            (index) => index !== __originalIndex,
          );
        }
      },
      [selected],
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

        const selectedIndices = getSelectedIndexes();

        if (
          isMultipleEnabled(selected, multiple) &&
          isMultipleEnabled(selectedIndices, multiple)
        ) {
          const actionType = isMenuItemSelected(__originalIndex)
            ? 'removed'
            : 'added';
          const newArray = selectedChangeHandler(__originalIndex, actionType);
          dispatch({
            type: 'multiselect',
            value: newArray,
            valueProp: selectedIndices,
          });
          // setValue(newArray);
          onChangeHandler(__originalIndex, actionType, newArray);

          // update live region
          setLiveRegionSelection(
            newArray
              .map((item) => optionsRef.current[item]?.label)
              .filter(Boolean)
              .join(', '),
          );
        } else if (!isMultipleEnabled(selectedIndices, multiple)) {
          console.log('onClick', __originalIndex, getSelectedIndexes());

          dispatch({
            type: 'select',
            value: __originalIndex,
            valueProp: selectedIndices,
          });
          // setValue(optionsRef.current[__originalIndex]?.value);
          hide();
          onChangeHandler(__originalIndex);
        }
      },
      [
        getSelectedIndexes,
        // setValue,
        selectedChangeHandler,
        isMenuItemSelected,
        multiple,
        onChangeHandler,
        // value,
        selected,
        optionsRef,
        hide,
      ],
    );

    const getMenuItem = React.useCallback(
      (option: SelectOption<T>, filteredIndex?: number) => {
        const optionId = getOptionId(option, id);
        const { __originalIndex } = optionsExtraInfoRef.current[optionId];
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
              isSelected: Array.isArray(selected)
                ? selected.includes(__originalIndex)
                : selected === __originalIndex,
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
        selected,
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
        <ComboBoxActionContext.Provider value={dispatch}>
          <ComboBoxStateContext.Provider
            value={{
              id,
              isOpen,
              focusedIndex,
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
                    isMultipleEnabled(selected, multiple)
                      ? selected?.map((index) => {
                          const item = optionsRef.current[index];
                          return (
                            <SelectTag key={item.label} label={item.label} />
                          );
                        })
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
        </ComboBoxActionContext.Provider>
      </ComboBoxRefsContext.Provider>
    );
  },
) as <T>(
  props: ComboBoxProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => JSX.Element;
