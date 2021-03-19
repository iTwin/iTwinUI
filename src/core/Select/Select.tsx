// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import cx from 'classnames';
import { Position } from '../../utils';
import { DropdownMenu } from '../DropdownMenu';
import MenuItem from '../Menu/MenuItem';

import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/inputs.css';

export type ItemRendererProps = {
  /**
   * Close handler that closes the dropdown.
   */
  close: () => void;
  /**
   * Indicates whether an item is selected.
   */
  isSelected: boolean;
};

export type SelectOption<T> = {
  /**
   * Label of the item used in dropdown list and when selected.
   */
  label: string;
  /**
   * Value of the item.
   */
  value: T;
  /**
   * SVG icon component shown on the right.
   */
  icon?: JSX.Element;
};

export type SelectProps<T> = {
  /**
   * Array of options that populates the select menu.
   */
  options: SelectOption<T>[];
  /**
   * Selected option value.
   */
  value?: T;
  /**
   * Callback function handling change event on select.
   */
  onChange?: (value: T) => void;
  /**
   * Placeholder when no item is selected.
   */
  placeholder?: React.ReactNode;
  /**
   * Disables select.
   * @default false
   */
  disabled?: boolean;
  /**
   * Set focus on select.
   * @default false
   */
  setFocus?: boolean;
  /**
   * Custom renderer for an item in the dropdown list. `MenuItem` item props are going to be populated if not provided.
   */
  itemRenderer?: (
    option: SelectOption<T>,
    itemProps: ItemRendererProps,
  ) => JSX.Element;
  /**
   * Custom renderer for the selected item in select.
   */
  selectedItemRenderer?: (option: SelectOption<T>) => JSX.Element;
  /**
   * Custom class for menu.
   */
  menuClassName?: string;
  /**
   * Custom style for menu.
   */
  menuStyle?: React.CSSProperties;
} & CommonProps;

/**
 * Select component to select value from options.
 * Generic type is used for value. It prevents you from mistakenly using other types in `options`, `value` and `onChange`.
 * @example
 * <caption>Basic select.</caption>
 * <Select<number> options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }, { value: 3, label: 'Option 3' }]} />
 * @example
 * <caption>Disabled select with placeholder.</caption>
 * <Select
 *   disabled={true}
 *   placeholder='Placeholder text'
 *   options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }, { value: 3, label: 'Option 3' }]}
 * />
 * @example
 * <caption>Select with selected value and change handler.</caption>
 * <Select<number>
 *   value={selectedValue}
 *   onChange={(value) => setSelectedValue(value)}
 *   options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }, { value: 3, label: 'Option 3' }]}
 * />
 * @example
 * <caption>Select using custom renderers for menu items and selected value.</caption>
 * <Select<string>
 *   options={[
 *     { value: 'yellow', label: 'Yellow' },
 *     { value: 'green', label: 'Green' },
 *     { value: 'red', label: 'Red' },
 *   ]}
 *   value={selectedValue}
 *   placeholder='Placeholder text'
 *   itemRenderer={(option, itemProps) => (
 *     <MenuItem
 *       style={{ color: option.value }}
 *       isSelected={itemProps.isSelected}
 *       onClick={() => {
 *         setSelectedValue(option.value);
 *         itemProps.close();
 *       }}
 *       role='option'
 *       ref={(el) => itemProps.isSelected && el?.scrollIntoView()}
 *     >
 *       {option.label}
 *     </MenuItem>
 *   )}
 *   selectedItemRenderer={(option) => (
 *     <span style={{ backgroundColor: option.value }}>{option.label}</span>
 *   )}
 * />
 */
export const Select = <T,>(props: SelectProps<T>): JSX.Element => {
  const {
    options,
    value,
    onChange,
    placeholder,
    disabled = false,
    setFocus = false,
    itemRenderer,
    selectedItemRenderer,
    className,
    style,
    menuClassName,
    menuStyle,
    ...rest
  } = props;

  useTheme();

  const [isOpen, setIsOpen] = React.useState(false);
  const [minWidth, setMinWidth] = React.useState(0);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (inputRef.current && setFocus) {
      inputRef.current.focus();
    }
  }, [setFocus]);

  React.useEffect(() => {
    if (selectRef.current) {
      setMinWidth(selectRef.current.offsetWidth);
    }
  }, [isOpen]);

  const onKeyDown = (event: React.KeyboardEvent, toggle: () => void) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar':
        toggle();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const menu = React.useCallback(
    (close: () => void) => {
      return options.map((option, index) => {
        const isSelected = value === option.value;
        const menuItem: JSX.Element = itemRenderer ? (
          itemRenderer(option, { close, isSelected })
        ) : (
          <MenuItem>{option.label}</MenuItem>
        );

        return React.cloneElement(menuItem, {
          key: `${option.label}-${index}`,
          isSelected,
          onClick: () => {
            onChange?.(option.value);
            close();
          },
          ref: (el: HTMLElement) => isSelected && el?.scrollIntoView(),
          icon: option.icon,
          role: 'option',
          ...menuItem.props,
        });
      });
    },
    [itemRenderer, onChange, options, value],
  );

  const selectedItem = React.useMemo(() => {
    if (value == null) {
      return undefined;
    }
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <DropdownMenu
      menuItems={menu}
      position={Position.BOTTOM}
      className={menuClassName}
      style={{ minWidth, maxHeight: `300px`, overflowY: 'auto', ...menuStyle }}
      role='listbox'
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      {(toggle) => (
        <label
          className={cx('iui-select', className)}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          style={style}
          {...rest}
        >
          <input
            type='checkbox'
            checked={isOpen}
            disabled={disabled}
            ref={inputRef}
            onChange={toggle}
            onKeyDown={(e) => onKeyDown(e, toggle)}
          />
          <div
            ref={selectRef}
            className={cx('iui-select-button', {
              'iui-placeholder': !selectedItem && placeholder,
            })}
          >
            {!selectedItem && (
              <span className='iui-content'>{placeholder}</span>
            )}
            {selectedItem &&
              selectedItemRenderer &&
              selectedItemRenderer(selectedItem)}
            {selectedItem && !selectedItemRenderer && (
              <>
                {selectedItem?.icon &&
                  React.cloneElement(selectedItem.icon, {
                    className: cx(
                      selectedItem?.icon.props.className,
                      'iui-menu-icon',
                    ),
                  })}
                <span className='iui-content'>{selectedItem.label}</span>
              </>
            )}
          </div>
        </label>
      )}
    </DropdownMenu>
  );
};

export default Select;
