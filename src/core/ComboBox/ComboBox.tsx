/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { Input, InputProps } from '../Input';
import { Menu, MenuExtraContent, MenuItem } from '../Menu';
import { SelectOption } from '../Select';
import { Text } from '../Typography';
import {
  InputContainer,
  useTheme,
  Popover,
  PopoverProps,
  CommonProps,
  getFocusableElements,
  getRandomValue,
  InputContainerProps,
  mergeRefs,
} from '../utils';
import SvgCaretDownSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretDownSmall';
import 'tippy.js/animations/shift-away.css';
import { StatusMessage } from '../StatusMessage';

export type ComboBoxProps<T> = {
  /**
   * Array of options that populate the dropdown list.
   */
  options: SelectOption<T>[];
  /**
   * Controlled value of ComboBox.
   */
  value?: T;
  /**
   * Message shown below the combobox.
   * Use `StatusMessage` component.
   */
  message?: React.ReactNode;
  /**
   * Callback fired when selected value changes.
   */
  onChange?: (value: T) => void;
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
  inputProps?: Omit<InputProps, 'setFocus'>;
  /**
   * Props to customize dropdown menu behavior.
   */
  dropdownMenuProps?: PopoverProps;
  /**
   * Message shown when no options are available.
   * @default 'No options found'
   */
  emptyStateMessage?: string;
  /**
   * A custom item renderer can be specified to control the rendering.
   * This function should ideally return a customized version of `MenuItem`,
   * otherwise you will need to make sure to provide styling for the `isFocused` state.
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
} & Pick<InputContainerProps, 'status'> &
  Omit<CommonProps, 'title'>;

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
    value,
    onChange,
    filterFunction,
    className,
    inputProps,
    dropdownMenuProps,
    message,
    status,
    emptyStateMessage = 'No options found',
    itemRenderer,
    ...rest
  } = props;

  // Generate a stateful random id if not specified
  const [id] = React.useState(
    () =>
      props.id ??
      (inputProps?.id && `${inputProps.id}-cb`) ??
      `iui-cb-${getRandomValue(10)}`,
  );

  useTheme();

  /** Generates a memoized id for an option, given the index from original list */
  const getOptionId = React.useCallback(
    (index: number) =>
      options[index].id ??
      `${id}-option${options.findIndex(
        ({ value }) => value === options[index].value,
      )}`,
    [options, id],
  );

  const userOnChange = React.useRef(onChange);

  const memoizedItems = React.useMemo(
    () =>
      options.map((option, index) => {
        const { label, value, ...rest } = option;
        const additionalProps = {
          value: value,
          role: 'option',
          onClick: () => {
            setSelectedValue(value);
            userOnChange.current?.(value);
            setIsOpen(false);
          },
        };
        if (itemRenderer) {
          return React.cloneElement(
            itemRenderer(option, {
              id: getOptionId(index),
              index,
              isSelected: false,
              isFocused: false,
            }),
            additionalProps,
          );
        }
        return (
          <MenuItem
            id={getOptionId(index)}
            key={getOptionId(index)}
            {...additionalProps}
            {...rest}
          >
            {label}
          </MenuItem>
        );
      }),
    [options, getOptionId, itemRenderer],
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);
  const toggleButtonRef = React.useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  // Set min-width of menu to be same as input
  const [minWidth, setMinWidth] = React.useState(0);
  React.useEffect(() => {
    if (inputRef.current) {
      setMinWidth(inputRef.current.offsetWidth);
    }
  }, [isOpen]);

  const [filteredOptions, setFilteredOptions] = React.useState(options);
  React.useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const [focusedIndex, setFocusedIndex] = React.useState(() =>
    options.findIndex((option) => value === option.value),
  );

  // Maintain internal selected value state synced with `value` prop
  const [selectedValue, setSelectedValue] = React.useState<T | undefined>(
    value,
  );
  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Controlled input value
  const [inputValue, setInputValue] = React.useState<string>('');
  const onInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      inputProps?.onChange?.(event);
    },
    [inputProps],
  );

  // update inputValue and focusedIndex every time selected value changes
  React.useEffect(() => {
    const selectedOption = options.find(({ value }) => value === selectedValue);
    setInputValue(selectedOption?.label ?? '');
    setFocusedIndex(selectedOption ? options.indexOf(selectedOption) : -1);
  }, [selectedValue, options]);

  // Filter options and update focus when input value changes
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    // if input is empty or same as selected value, show the whole list
    const selectedOption = options.find(({ value }) => value === selectedValue);
    if (!inputValue || selectedOption?.label === inputValue) {
      setFilteredOptions(options);
      return;
    }

    const _filteredOptions =
      filterFunction?.(options, inputValue) ??
      options.filter((option) =>
        option.label.toLowerCase().includes(inputValue?.trim().toLowerCase()),
      );
    setFilteredOptions(_filteredOptions);

    setFocusedIndex((previouslyFocusedIndex) => {
      if (_filteredOptions.includes(options[previouslyFocusedIndex])) {
        return previouslyFocusedIndex;
      } else if (
        _filteredOptions.find(({ value }) => value === selectedValue)
      ) {
        return options.findIndex(({ value }) => value === selectedValue);
      } else {
        return -1; // reset focus if previously focused or selected value is not in filtered list
      }
    });
  }, [inputValue, options, selectedValue, isOpen, filterFunction]);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const focusableOptions = getFocusableElements(menuRef.current);
      const focusedIndexInFilteredList = focusableOptions.findIndex(
        ({ id }) =>
          id === inputRef.current?.getAttribute('aria-activedescendant'),
      );
      switch (event.key) {
        case 'ArrowDown':
          if (isOpen) {
            const nextIndex = Math.min(
              focusedIndexInFilteredList + 1,
              focusableOptions.length - 1,
            );
            setFocusedIndex(
              options.findIndex(
                (_, index) =>
                  getOptionId(index) === focusableOptions[nextIndex].id,
              ),
            );
          } else {
            setIsOpen(true); // reopen menu if closed when typing
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'ArrowUp':
          if (isOpen) {
            const previousIndex = Math.max(focusedIndexInFilteredList - 1, 0);
            setFocusedIndex(
              options.findIndex(
                (_, index) =>
                  getOptionId(index) === focusableOptions[previousIndex].id,
              ),
            );
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'Enter':
          if (isOpen) {
            setSelectedValue(options[focusedIndex].value);
            userOnChange.current?.(options[focusedIndex].value);
          }
          setIsOpen((open) => !open);
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'Escape':
          setIsOpen(false);
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'Tab':
          setIsOpen(false);
          break;
        default:
          if (!isOpen) {
            setIsOpen(true); // reopen menu if closed when typing
          }
          break;
      }
    },
    [focusedIndex, isOpen, options, getOptionId],
  );

  const menuItems = React.useMemo(() => {
    if (filteredOptions.length === 0) {
      return [
        <MenuExtraContent key={0}>
          <Text isMuted>{emptyStateMessage}</Text>
        </MenuExtraContent>,
      ];
    }
    return filteredOptions.map((option) => {
      const index = options.findIndex(({ value }) => option.value === value);
      if (index < 0) {
        return <></>;
      }

      const id = getOptionId(index);
      const isSelected = selectedValue === option.value;
      const isFocused = focusedIndex === index;
      const focusScrollRef = (el: HTMLElement) =>
        isFocused && el?.scrollIntoView({ block: 'nearest' });

      if (isSelected || isFocused) {
        const item =
          itemRenderer?.(option, { index, id, isSelected, isFocused }) ??
          React.cloneElement(memoizedItems[index], { isSelected });

        return React.cloneElement(item, {
          className: cx({ 'iui-focused': isFocused }, item.props.className),
          ref: mergeRefs(focusScrollRef, item.props.ref),
          value: option.value,
          role: 'option',
          onClick: () => {
            setSelectedValue(option.value);
            userOnChange.current?.(option.value);
            setIsOpen(false);
          },
        });
      }

      return memoizedItems[index];
    });
  }, [
    filteredOptions,
    emptyStateMessage,
    options,
    getOptionId,
    selectedValue,
    focusedIndex,
    itemRenderer,
    memoizedItems,
  ]);

  return (
    <InputContainer
      className={className}
      status={status}
      statusMessage={
        typeof message === 'string' ? (
          <StatusMessage status={status}>{message}</StatusMessage>
        ) : (
          React.isValidElement(message) &&
          React.cloneElement(message, { status })
        )
      }
      {...rest}
      id={id}
    >
      <div className='iui-input-with-icon'>
        <Popover
          placement='bottom-start'
          visible={isOpen}
          onClickOutside={(_, { target }) => {
            if (!toggleButtonRef.current?.contains(target as Element)) {
              setIsOpen(false);
            }
          }}
          animation='shift-away'
          duration={200}
          {...dropdownMenuProps}
          content={
            <Menu
              id={`${id}-list`}
              className='iui-scroll'
              style={{
                minWidth,
                maxWidth: `min(${minWidth * 2}px, 90vw)`,
                maxHeight: 300,
              }}
              setFocus={false}
              role='listbox'
              ref={menuRef}
            >
              {menuItems}
            </Menu>
          }
          onHide={(instance) => {
            const selectedIndex = options.findIndex(
              ({ value }) => value === selectedValue,
            );
            setFocusedIndex(selectedIndex);
            if (selectedIndex > -1) {
              setInputValue(options[selectedIndex].label); // update input value to be same as selected value
            }
            dropdownMenuProps?.onHide?.(instance);
          }}
        >
          <Input
            ref={inputRef}
            onKeyDown={onKeyDown}
            onFocus={() => setIsOpen(true)}
            onChange={onInput}
            value={inputValue}
            aria-activedescendant={
              isOpen && focusedIndex > -1
                ? getOptionId(focusedIndex)
                : undefined
            }
            role='combobox'
            aria-controls={isOpen ? `${id}-list` : undefined}
            aria-autocomplete='list'
            spellCheck={false}
            autoCapitalize='none'
            autoCorrect='off'
            {...inputProps}
          />
        </Popover>
        <span
          ref={toggleButtonRef}
          className={cx('iui-end-icon', {
            'iui-actionable': !inputProps?.disabled,
            'iui-disabled': inputProps?.disabled,
            'iui-open': isOpen,
          })}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              inputRef.current?.focus();
            }
          }}
        >
          <SvgCaretDownSmall aria-hidden />
        </span>
      </div>
    </InputContainer>
  );
};

export default ComboBox;
