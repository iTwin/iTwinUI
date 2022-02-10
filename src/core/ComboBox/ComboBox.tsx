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
} from '../utils';
import SvgCaretDownSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretDownSmall';
import 'tippy.js/animations/shift-away.css';

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
    emptyStateMessage = 'No options found',
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

  const memoizedItems = React.useMemo(
    () =>
      options.map(({ label, value, ...rest }, index) => (
        <MenuItem
          id={getOptionId(index)}
          key={getOptionId(index)}
          value={value}
          role='option'
          onClick={(value: T) => {
            setSelectedValue(value);
            onChange?.(value);
            setIsOpen(false);
          }}
          {...rest}
        >
          {label}
        </MenuItem>
      )),
    [options, getOptionId, onChange],
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
            onChange?.(options[focusedIndex].value);
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
    [focusedIndex, isOpen, options, getOptionId, onChange],
  );

  const menuItems = React.useMemo(() => {
    if (filteredOptions.length === 0) {
      return (
        <MenuExtraContent>
          <Text isMuted>{emptyStateMessage}</Text>
        </MenuExtraContent>
      );
    }
    return filteredOptions.map((option) => {
      const index = options.findIndex(({ value }) => option.value === value);
      if (index < 0) {
        return;
      }

      if (selectedValue === option.value || focusedIndex === index) {
        return React.cloneElement(memoizedItems[index], {
          isSelected: selectedValue === option.value,
          className: cx({ 'iui-focused': focusedIndex === index }),
          ref: (el: HTMLElement) =>
            focusedIndex === index && el?.scrollIntoView(false),
        });
      }

      return memoizedItems[index];
    });
  }, [
    filteredOptions,
    emptyStateMessage,
    options,
    focusedIndex,
    selectedValue,
    memoizedItems,
  ]);

  return (
    <InputContainer className={className} isIconInline={true} {...rest} id={id}>
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
