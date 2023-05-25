/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Menu, MenuItem } from '../Menu/index.js';
import type { MenuItemProps } from '../Menu/MenuItem.js';
import {
  SvgCaretDownSmall,
  Popover,
  useId,
  AutoclearingHiddenLiveRegion,
  Box,
} from '../utils/index.js';
import type {
  PopoverProps,
  PopoverInstance,
  CommonProps,
} from '../utils/index.js';
import '@itwin/itwinui-css/css/select.css';
import SelectTag from './SelectTag.js';
import SelectTagContainer from './SelectTagContainer.js';

const isMultipleEnabled = <T,>(
  variable: (T | undefined) | (T[] | undefined),
  multiple: boolean,
): variable is T[] | undefined => {
  return multiple;
};

// Type guard for multiple did not work
const isSingleOnChange = <T,>(
  onChange:
    | (((value: T) => void) | undefined)
    | (((value: T, event: SelectValueChangeEvent) => void) | undefined),
  multiple: boolean,
): onChange is ((value: T) => void) | undefined => {
  return !multiple;
};

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
   * Sublabel of the item shown below the label.
   */
  sublabel?: React.ReactNode;
  /**
   * Modify height of the item.
   * Use 'large' when any of the select options have `sublabel`.
   *
   * Defaults to 'large' if `sublabel` provided, otherwise 'default'.
   */
  size?: 'default' | 'large';
  /**
   * Value of the item.
   */
  value: T;
  /**
   * SVG icon component shown on the right.
   */
  icon?: JSX.Element;
  /**
   * Item is disabled.
   */
  disabled?: boolean;
  /**
   * Any other props.
   */
  [key: string]: unknown;
} & CommonProps;

export type SelectValueChangeEvent = 'added' | 'removed';

export type SelectMultipleTypeProps<T> =
  | {
      /**
       * Enable multiple selection.
       * @default false
       */
      multiple?: false;
      /**
       * Custom renderer for the selected item in select.
       * If `multiple` is enabled, it will give array of options to render.
       */
      selectedItemRenderer?: (option: SelectOption<T>) => JSX.Element;
      /**
       * Selected option value.
       * If `multiple` is enabled, it is an array of values.
       */
      value?: T;
      /**
       * Callback function handling change event on select.
       */
      onChange?: (value: T) => void;
    }
  | {
      multiple: true;
      selectedItemRenderer?: (options: SelectOption<T>[]) => JSX.Element;
      value?: T[];
      onChange?: (value: T, event: SelectValueChangeEvent) => void;
    };

export type SelectProps<T> = {
  /**
   * Array of options that populates the select menu.
   */
  options: SelectOption<T>[];
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
   * Modify size of select.
   */
  size?: 'small' | 'large';
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
   * Custom class for menu.
   */
  menuClassName?: string;
  /**
   * Custom style for menu.
   */
  menuStyle?: React.CSSProperties;
  /**
   * Props to customize {@link Popover} behavior.
   * @see [tippy.js props](https://atomiks.github.io/tippyjs/v6/all-props/)
   */
  popoverProps?: Omit<PopoverProps, 'onShow' | 'onHide' | 'disabled'>;
  /**
   * Props to pass to the select button (trigger) element.
   */
  triggerProps?: React.ComponentPropsWithoutRef<'div'>;
} & SelectMultipleTypeProps<T> &
  Pick<PopoverProps, 'onShow' | 'onHide'> &
  Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'size' | 'disabled' | 'placeholder' | 'onChange'
  >;

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
  const uid = useId();

  const {
    options,
    value,
    onChange,
    placeholder,
    disabled = false,
    size,
    setFocus = false,
    itemRenderer,
    selectedItemRenderer,
    className,
    style,
    menuClassName,
    menuStyle,
    onShow,
    onHide,
    popoverProps,
    multiple = false,
    triggerProps,
    ...rest
  } = props;

  const [isOpenState, setIsOpen] = React.useState(false);
  const isOpen = popoverProps?.visible ?? isOpenState;

  const [minWidth, setMinWidth] = React.useState(0);
  const [liveRegionSelection, setLiveRegionSelection] = React.useState('');

  const selectRef = React.useRef<HTMLDivElement>(null);
  const toggleButtonRef = React.useRef<HTMLSpanElement>(null);

  const onShowHandler = React.useCallback(
    (instance: PopoverInstance) => {
      setIsOpen(true);
      onShow?.(instance);
    },
    [onShow],
  );

  const onHideHandler = React.useCallback(
    (instance: PopoverInstance) => {
      setIsOpen(false);
      selectRef.current?.focus({ preventScroll: true }); // move focus back to select button
      onHide?.(instance);
    },
    [onHide],
  );

  React.useEffect(() => {
    if (selectRef.current && !disabled && setFocus) {
      selectRef.current.focus();
    }
  }, [setFocus, disabled]);

  React.useEffect(() => {
    if (selectRef.current) {
      setMinWidth(selectRef.current.offsetWidth);
    }
  }, [isOpen]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.altKey) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        setIsOpen((o) => !o);
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  const menuItems = React.useMemo(() => {
    return options.map((option, index) => {
      const isSelected = isMultipleEnabled(value, multiple)
        ? value?.includes(option.value) ?? false
        : value === option.value;

      const { label, icon, ...restOption } = option;

      const menuItem: JSX.Element = itemRenderer ? (
        itemRenderer(option, { close: () => setIsOpen(false), isSelected })
      ) : (
        <MenuItem startIcon={icon}>{label}</MenuItem>
      );

      return React.cloneElement<MenuItemProps>(menuItem, {
        key: `${label}-${index}`,
        isSelected,
        onClick: () => {
          if (option.disabled) {
            return;
          }
          if (isSingleOnChange(onChange, multiple)) {
            onChange?.(option.value);
            setIsOpen(false);
          } else {
            onChange?.(option.value, isSelected ? 'removed' : 'added');
          }

          // update live region
          if (isMultipleEnabled(value, multiple)) {
            const prevSelectedValue = value || [];
            const newSelectedValue = isSelected
              ? prevSelectedValue.filter((i) => option.value !== i)
              : [...prevSelectedValue, option.value];
            setLiveRegionSelection(
              options
                .filter((i) => newSelectedValue.includes(i.value))
                .map((item) => item.label)
                .filter(Boolean)
                .join(', '),
            );
          }
        },
        ref: (el: HTMLElement) => {
          if (isSelected && !multiple) {
            el?.scrollIntoView({ block: 'nearest' });
          }
        },
        role: 'option',
        ...restOption,
        ...menuItem.props,
      });
    });
  }, [itemRenderer, multiple, onChange, options, value]);

  const selectedItems = React.useMemo(() => {
    if (value == null) {
      return undefined;
    }
    return isMultipleEnabled(value, multiple)
      ? options.filter((option) => value.some((val) => val === option.value))
      : options.find((option) => option.value === value);
  }, [multiple, options, value]);

  const tagRenderer = React.useCallback((item: SelectOption<T>) => {
    return <SelectTag key={item.label} label={item.label} />;
  }, []);

  return (
    <Box
      className={cx('iui-input-with-icon', className)}
      style={style}
      {...rest}
    >
      <Popover
        content={
          <Menu
            role='listbox'
            className={cx('iui-scroll', menuClassName)}
            style={{
              minWidth,
              maxWidth: `min(${minWidth * 2}px, 90vw)`,
              ...menuStyle,
            }}
            id={`${uid}-menu`}
            key={`${uid}-menu`}
          >
            {menuItems}
          </Menu>
        }
        placement='bottom-start'
        aria={{ content: null }}
        onShow={onShowHandler}
        onHide={onHideHandler}
        {...popoverProps}
        visible={isOpen}
        onClickOutside={(_, { target }) => {
          if (!toggleButtonRef.current?.contains(target as Element)) {
            setIsOpen(false);
          }
        }}
      >
        <Box
          tabIndex={0}
          role='combobox'
          ref={selectRef}
          data-iui-size={size}
          onClick={() => !disabled && setIsOpen((o) => !o)}
          onKeyDown={(e) => !disabled && onKeyDown(e)}
          aria-disabled={disabled}
          aria-autocomplete='none'
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls={`${uid}-menu`}
          {...triggerProps}
          className={cx(
            'iui-select-button',
            {
              'iui-placeholder':
                (!selectedItems || selectedItems.length === 0) && !!placeholder,
              'iui-disabled': disabled,
            },
            triggerProps?.className,
          )}
        >
          {(!selectedItems || selectedItems.length === 0) && (
            <Box as='span' className='iui-content'>
              {placeholder}
            </Box>
          )}
          {isMultipleEnabled(selectedItems, multiple) ? (
            <MultipleSelectButton
              selectedItems={selectedItems}
              selectedItemsRenderer={
                selectedItemRenderer as (
                  options: SelectOption<T>[],
                ) => JSX.Element
              }
              tagRenderer={tagRenderer}
            />
          ) : (
            <SingleSelectButton
              selectedItem={selectedItems}
              selectedItemRenderer={
                selectedItemRenderer as (option: SelectOption<T>) => JSX.Element
              }
            />
          )}
        </Box>
      </Popover>
      <Box
        as='span'
        aria-hidden
        ref={toggleButtonRef}
        className={cx('iui-end-icon', {
          'iui-actionable': !disabled,
          'iui-disabled': disabled,
          'iui-open': isOpen,
        })}
        onClick={() => !disabled && setIsOpen((o) => !o)}
      >
        <SvgCaretDownSmall />
      </Box>

      {multiple ? (
        <AutoclearingHiddenLiveRegion text={liveRegionSelection} />
      ) : null}
    </Box>
  );
};

type SingleSelectButtonProps<T> = {
  selectedItem?: SelectOption<T>;
  selectedItemRenderer?: (option: SelectOption<T>) => JSX.Element;
};

const SingleSelectButton = <T,>({
  selectedItem,
  selectedItemRenderer,
}: SingleSelectButtonProps<T>) => {
  return (
    <>
      {selectedItem &&
        selectedItemRenderer &&
        selectedItemRenderer(selectedItem)}
      {selectedItem && !selectedItemRenderer && (
        <>
          {selectedItem.icon &&
            React.cloneElement(selectedItem.icon, {
              className: cx(selectedItem.icon.props.className, 'iui-icon'),
            })}
          <Box as='span' className='iui-content'>
            {selectedItem.label}
          </Box>
        </>
      )}
    </>
  );
};

type MultipleSelectButtonProps<T> = {
  selectedItems?: SelectOption<T>[];
  selectedItemsRenderer?: (options: SelectOption<T>[]) => JSX.Element;
  tagRenderer: (item: SelectOption<T>) => JSX.Element;
};

const MultipleSelectButton = <T,>({
  selectedItems,
  selectedItemsRenderer,
  tagRenderer,
}: MultipleSelectButtonProps<T>) => {
  const selectedItemsElements = React.useMemo(() => {
    if (!selectedItems) {
      return [];
    }

    return selectedItems.map((item) => tagRenderer(item));
  }, [selectedItems, tagRenderer]);

  return (
    <>
      {selectedItems &&
        selectedItemsRenderer &&
        selectedItemsRenderer(selectedItems)}
      {selectedItems && !selectedItemsRenderer && (
        <Box as='span' className='iui-content'>
          <SelectTagContainer tags={selectedItemsElements} />
        </Box>
      )}
    </>
  );
};

export default Select;
