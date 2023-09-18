/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuExtraContent } from '../Menu/index.js';
import type { SelectOption } from '../Select/index.js';
import SelectTag from '../Select/SelectTag.js';
import { Text } from '../Typography/index.js';
import type { Input } from '../Input/Input.js';
import {
  getRandomValue,
  mergeRefs,
  useLatestRef,
  useIsomorphicLayoutEffect,
  AutoclearingHiddenLiveRegion,
  usePopover,
} from '../utils/index.js';
import type { InputContainerProps, CommonProps } from '../utils/index.js';
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
  variable: (T | undefined) | (T[] | undefined),
  multiple: boolean,
): variable is T[] | undefined => {
  return multiple && (Array.isArray(variable) || variable === undefined);
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
       */
      value?: T;
      /**
       * Callback fired when selected value changes.
       */
      onChange?: (value: T) => void;
    }
  | {
      multiple: true;
      value?: T[];
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
export const ComboBox = <T,>(props: ComboBoxProps<T>) => {
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
    ...rest
  } = props;

  // Generate a stateful random id if not specified
  const [id] = React.useState(
    () =>
      props.id ??
      (inputProps?.id && `${inputProps.id}-cb`) ??
      `iui-cb-${getRandomValue(10)}`,
  );

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
      return options.findIndex((option) => option.value === valueProp);
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

  const onShowRef = useLatestRef(onShowProp);
  const onHideRef = useLatestRef(onHideProp);

  const show = React.useCallback(() => {
    dispatch({ type: 'open' });
    onShowRef.current?.();
  }, [onShowRef]);

  const hide = React.useCallback(() => {
    dispatch({ type: 'close' });
    onHideRef.current?.();
  }, [onHideRef]);

  useIsomorphicLayoutEffect(() => {
    // When the dropdown opens
    if (isOpen) {
      inputRef.current?.focus(); // Focus the input
      // Reset the filtered list (does not reset when multiple enabled)
      if (!multiple) {
        setFilteredOptions(optionsRef.current);
        dispatch({ type: 'focus', value: undefined });
      }
    }
    // When the dropdown closes
    else {
      // Reset the focused index
      dispatch({ type: 'focus', value: undefined });
      // Reset the input value if not multiple
      if (!isMultipleEnabled(selected, multiple)) {
        setInputValue(
          selected != undefined && selected >= 0
            ? optionsRef.current[selected]?.label
            : '',
        );
      }
    }
  }, [isOpen, multiple, optionsRef, selected]);

  // Update filtered options to the latest value options according to input value
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  React.useEffect(() => {
    if (inputValue) {
      setFilteredOptions(
        filterFunction?.(options, inputValue) ??
          options.filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase()),
          ),
      );
    } else {
      setFilteredOptions(options);
    }
    dispatch({ type: 'focus', value: undefined });
    // Only need to call on options update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

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
      }
      inputProps?.onChange?.(event);
    },
    [filterFunction, focusedIndex, inputProps, optionsRef, show],
  );

  // When the value prop changes, update the selected index/indices
  React.useEffect(() => {
    if (isMultipleEnabled(valueProp, multiple)) {
      if (valueProp) {
        // If user provided array of selected values
        const indexes = valueProp.map((value) => {
          return options.findIndex((option) => option.value === value);
        });
        dispatch({
          type: 'multiselect',
          value: indexes.filter((index) => index !== -1), // Add available options
        });
      } else {
        // if user provided one value or undefined
        dispatch({
          type: 'multiselect',
          value: [], // Add empty list
        });
      }
    } else {
      dispatch({
        type: 'select',
        value: options.findIndex((option) => option.value === valueProp),
      });
    }
  }, [valueProp, options, multiple]);

  const isMenuItemSelected = React.useCallback(
    (index: number) => {
      if (isMultipleEnabled(selected, multiple)) {
        return !!selected.includes(index as number);
      } else {
        return selected === index;
      }
    },
    [multiple, selected],
  );

  // Generates new array when item is added or removed
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

  // Calls user defined onChange
  const onChangeHandler = React.useCallback(
    (__originalIndex: number, actionType?: ActionType, newArray?: number[]) => {
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

      if (isMultipleEnabled(selected, multiple)) {
        const actionType = isMenuItemSelected(__originalIndex)
          ? 'removed'
          : 'added';
        const newArray = selectedChangeHandler(__originalIndex, actionType);
        dispatch({ type: 'multiselect', value: newArray });
        onChangeHandler(__originalIndex, actionType, newArray);

        // update live region
        setLiveRegionSelection(
          newArray
            .map((item) => optionsRef.current[item]?.label)
            .filter(Boolean)
            .join(', '),
        );
      } else {
        dispatch({ type: 'select', value: __originalIndex });
        hide();
        onChangeHandler(__originalIndex);
      }
    },
    [
      selectedChangeHandler,
      isMenuItemSelected,
      multiple,
      onChangeHandler,
      selected,
      optionsRef,
      hide,
    ],
  );

  const getMenuItem = React.useCallback(
    (option: SelectOption<T>, filteredIndex?: number) => {
      const optionId = getOptionId(option, id);
      const { __originalIndex } = optionsExtraInfoRef.current[optionId];
      const { icon, startIcon: startIconProp, ...restOptions } = option;

      const startIcon = startIconProp ?? icon;

      const customItem = itemRenderer
        ? itemRenderer(option, {
            isFocused: focusedIndex === __originalIndex,
            isSelected: selected === __originalIndex,
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
          {option.label}
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
    trigger: { focus: true },
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
          <ComboBoxInputContainer disabled={inputProps?.disabled} {...rest}>
            <>
              <ComboBoxInput
                value={inputValue}
                disabled={inputProps?.disabled}
                {...inputProps}
                onChange={handleOnInput}
                selectTags={
                  isMultipleEnabled(selected, multiple)
                    ? selected.map((index) => {
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
};

export default ComboBox;
