/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Menu } from '../Menu/Menu.js';
import { MenuItem } from '../Menu/MenuItem.js';
import type { MenuItemProps } from '../Menu/MenuItem.js';
import {
  SvgCaretDownSmall,
  useId,
  AutoclearingHiddenLiveRegion,
  Box,
  Portal,
  useMergedRefs,
  SvgCheckmark,
  useLatestRef,
  InputWithIcon,
} from '../utils/index.js';
import type { CommonProps } from '../utils/index.js';
import { SelectTag } from './SelectTag.js';
import { SelectTagContainer } from './SelectTagContainer.js';
import { Icon } from '../Icon/Icon.js';
import { usePopover } from '../Popover/Popover.js';

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
   * @deprecated Use startIcon
   * SVG icon component shown on the left.
   */
  icon?: JSX.Element;
  /**
   * SVG icon component shown on the left.
   */
  startIcon?: JSX.Element;
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
       *
       * Pass `null` to reset the value.
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
   * Status of select.
   */
  status?: 'positive' | 'warning' | 'negative';
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
   * Props to customize Popover behavior.
   */
  popoverProps?: Pick<
    Parameters<typeof usePopover>[0],
    | 'visible'
    | 'onVisibleChange'
    | 'placement'
    | 'matchWidth'
    | 'closeOnOutsideClick'
  >;
  /**
   * Props to pass to the select button (trigger) element.
   */
  triggerProps?: React.ComponentPropsWithRef<'div'>;
} & SelectMultipleTypeProps<T> &
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
export const Select = React.forwardRef(
  <T,>(
    props: SelectProps<T>,
    forwardedRef: React.ForwardedRef<HTMLElement>,
  ) => {
    const uid = useId();

    const {
      options,
      value: valueProp,
      onChange: onChangeProp,
      placeholder,
      disabled = false,
      size,
      itemRenderer,
      selectedItemRenderer,
      menuClassName,
      menuStyle,
      multiple = false,
      triggerProps,
      status,
      popoverProps,
      ...rest
    } = props;

    const [isOpen, setIsOpen] = React.useState(false);
    const [liveRegionSelection, setLiveRegionSelection] = React.useState('');

    const [uncontrolledValue, setUncontrolledValue] = React.useState<T | T[]>();
    const value = valueProp !== undefined ? valueProp : uncontrolledValue;

    const onChangeRef = useLatestRef(onChangeProp);
    const selectRef = React.useRef<HTMLDivElement>(null);

    const show = React.useCallback(() => {
      if (disabled) {
        return;
      }
      setIsOpen(true);
      popoverProps?.onVisibleChange?.(true);
    }, [disabled, popoverProps]);

    const hide = React.useCallback(() => {
      setIsOpen(false);
      selectRef.current?.focus({ preventScroll: true }); // move focus back to select button
      popoverProps?.onVisibleChange?.(false);
    }, [popoverProps]);

    const menuItems = React.useMemo(() => {
      return options.map((option, index) => {
        const isSelected = isMultipleEnabled(value, multiple)
          ? value?.includes(option.value) ?? false
          : value === option.value;
        const menuItem: JSX.Element = itemRenderer ? (
          itemRenderer(option, { close: () => setIsOpen(false), isSelected })
        ) : (
          <MenuItem>{option.label}</MenuItem>
        );

        const { label, icon, startIcon: startIconProp, ...restOption } = option;

        const startIcon = startIconProp ?? icon;

        return React.cloneElement<MenuItemProps>(menuItem, {
          key: `${label}-${index}`,
          isSelected,
          startIcon: startIcon,
          endIcon: isSelected ? <SvgCheckmark aria-hidden /> : null,
          onClick: () => {
            if (option.disabled) {
              return;
            }

            // update internal value state and also call external onChange
            if (isSingleOnChange(onChangeRef.current, multiple)) {
              setUncontrolledValue(option.value);
              onChangeRef.current?.(option.value);
              hide();
            } else {
              setUncontrolledValue((prev: T[]) =>
                isSelected
                  ? prev?.filter((i) => option.value !== i)
                  : [...(prev ?? []), option.value],
              );
              onChangeRef.current?.(
                option.value,
                isSelected ? 'removed' : 'added',
              );
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
    }, [hide, itemRenderer, multiple, onChangeRef, options, value]);

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

    const popover = usePopover({
      visible: isOpen,
      matchWidth: true,
      closeOnOutsideClick: true,
      ...popoverProps,
      onVisibleChange: (open) => (open ? show() : hide()),
    });

    return (
      <>
        <InputWithIcon
          {...rest}
          ref={useMergedRefs(popover.refs.setPositionReference, forwardedRef)}
        >
          <Box
            {...popover.getReferenceProps()}
            tabIndex={0}
            role='combobox'
            data-iui-size={size}
            data-iui-status={status}
            aria-disabled={disabled}
            aria-autocomplete='none'
            aria-expanded={isOpen}
            aria-haspopup='listbox'
            aria-controls={`${uid}-menu`}
            {...triggerProps}
            ref={useMergedRefs(
              selectRef,
              triggerProps?.ref,
              popover.refs.setReference,
            )}
            className={cx(
              'iui-select-button',
              {
                'iui-placeholder':
                  (!selectedItems || selectedItems.length === 0) &&
                  !!placeholder,
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
                  selectedItemRenderer as (
                    option: SelectOption<T>,
                  ) => JSX.Element
                }
              />
            )}
          </Box>
          <Icon
            as='span'
            aria-hidden
            className={cx('iui-end-icon', {
              'iui-disabled': disabled,
              'iui-open': isOpen,
            })}
          >
            <SvgCaretDownSmall />
          </Icon>

          {multiple ? (
            <AutoclearingHiddenLiveRegion text={liveRegionSelection} />
          ) : null}
        </InputWithIcon>

        {popover.open && (
          <Portal>
            <Menu
              role='listbox'
              className={menuClassName}
              id={`${uid}-menu`}
              key={`${uid}-menu`}
              {...popover.getFloatingProps({
                style: menuStyle,
                onKeyDown: ({ key }) => {
                  if (key === 'Tab') {
                    hide();
                  }
                },
              })}
              ref={popover.refs.setFloating}
            >
              {menuItems}
            </Menu>
          </Portal>
        )}
      </>
    );
  },
) as <T>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => JSX.Element;

type SingleSelectButtonProps<T> = {
  selectedItem?: SelectOption<T>;
  selectedItemRenderer?: (option: SelectOption<T>) => JSX.Element;
};

const SingleSelectButton = <T,>({
  selectedItem,
  selectedItemRenderer,
}: SingleSelectButtonProps<T>) => {
  const startIcon = selectedItem?.startIcon ?? selectedItem?.icon;
  return (
    <>
      {selectedItem &&
        selectedItemRenderer &&
        selectedItemRenderer(selectedItem)}
      {selectedItem && !selectedItemRenderer && (
        <>
          {startIcon && (
            <Box as='span' className='iui-icon' aria-hidden>
              {startIcon}
            </Box>
          )}
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
