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
  mergeEventHandlers,
} from '../utils/index.js';
import type {
  CommonProps,
  PolymorphicForwardRefComponent,
} from '../utils/index.js';
import { SelectTag } from './SelectTag.js';
import { SelectTagContainer } from './SelectTagContainer.js';
import { Icon } from '../Icon/Icon.js';
import { usePopover } from '../Popover/Popover.js';

// ----------------------------------------------------------------------------

const SelectButton = React.forwardRef((props, forwardedRef) => {
  const { size, status, ...rest } = props;

  return (
    <Box
      tabIndex={0}
      data-iui-size={size}
      data-iui-status={status}
      {...rest}
      ref={forwardedRef}
      className={cx('iui-select-button', props.className)}
    />
  );
}) as PolymorphicForwardRefComponent<
  'div',
  {
    size?: 'small' | 'large';
    status?: 'positive' | 'warning' | 'negative';
  }
>;

// ----------------------------------------------------------------------------

const SelectEndIcon = React.forwardRef((props, forwardedRef) => {
  const { disabled, isOpen, ...rest } = props;
  return (
    <Icon
      as='span'
      aria-hidden
      {...rest}
      ref={forwardedRef}
      className={cx(
        'iui-end-icon',
        { 'iui-disabled': disabled, 'iui-open': isOpen },
        props.className,
      )}
    >
      <SvgCaretDownSmall />
    </Icon>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  { disabled?: boolean; isOpen?: boolean }
>;

// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------

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
      value?: T | null;
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

type SelectCommonProps = {
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
};

export type CustomSelectProps<T> = SelectCommonProps & {
  /**
   * Placeholder when no item is selected.
   */
  placeholder?: React.ReactNode;
  /**
   * Array of options that populates the select menu.
   */
  options: SelectOption<T>[];
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

// ----------------------------------------------------------------------------

const CustomSelect = React.forwardRef(
  <T,>(
    props: CustomSelectProps<T>,
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
          <SelectButton
            {...popover.getReferenceProps()}
            role='combobox'
            size={size}
            security={status}
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
          </SelectButton>
          <SelectEndIcon disabled={disabled} isOpen={isOpen} />

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
  props: CustomSelectProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => JSX.Element;

// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------

const NativeSelect = React.forwardRef((props, forwardedRef) => {
  const {
    triggerProps,
    options,
    disabled,
    placeholder,
    defaultValue: defaultValueProp = placeholder !== undefined ? '' : undefined,
    value: valueProp,
    onChange: onChangeProp,
    size,
    status,
    ...rest
  } = props;

  return (
    <InputWithIcon {...rest} ref={forwardedRef}>
      <SelectButton
        as='select'
        size={size}
        status={status}
        disabled={disabled}
        defaultValue={defaultValueProp}
        value={valueProp === null ? '' : valueProp}
        {...triggerProps}
        onKeyDown={mergeEventHandlers(triggerProps?.onKeyDown, (event) => {
          // Firefox does not open the menu on Enter, so we need to do it manually.
          if (event.key === 'Enter') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            event.currentTarget.showPicker?.();
          }
        })}
        onChange={mergeEventHandlers(triggerProps?.onChange, (event) => {
          onChangeProp?.(event.currentTarget.value, event);
        })}
      >
        {placeholder !== undefined ? (
          <option value='' disabled>
            {placeholder}
          </option>
        ) : null}

        {options.map((option) => (
          <option key={option.value} {...option}>
            {option.label}
          </option>
        ))}
      </SelectButton>

      <SelectEndIcon disabled={disabled} />
    </InputWithIcon>
  );
}) as PolymorphicForwardRefComponent<'div', NativeSelectProps>;

// This is a smaller, stricter subset of CustomSelectProps, because native
// <select> only supports string values, and does not support icons or sublabels.
type NativeSelectProps = SelectCommonProps & {
  /**
   * Selected option value.
   *
   * Must be a string, because it is passed as an attribute to the native <select>.
   */
  value?: string | null;
  /**
   * Callback invoked when the selected value changes.
   */
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  /**
   * Array of options that populates the select menu.
   *
   * The `value` property of each option must be a string.
   */
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  /**
   * Default value that is selected on initial render. This is useful when you don't want to
   * maintain your own state but still want to control the initial value.
   *
   * If not passed, the first option (or placeholder) will be automatically selected.
   */
  defaultValue?: string;
  /**
   * Placeholder for when no item is selected.
   *
   * Will be rendered as a disabled option at the top of the list, and automatically
   * selected when no `value` or `defaultValue` is provided.
   */
  placeholder?: string;
  /**
   * Props to pass to the select element.
   */
  triggerProps?: Omit<React.ComponentPropsWithRef<'select'>, 'size'>;
  required?: boolean;
  multiple?: never;
};

// ----------------------------------------------------------------------------

/**
 * Select component to select value from options.
 * Generic type is used for value. It prevents you from mistakenly using other types in `options`, `value` and `onChange`.
 * @example
 * <caption>Basic select.</caption>
 * <Select
 *  options={[
 *    { value: '1', label: 'Option 1' },
 *    { value: '2', label: 'Option 2' },
 *    { value: '3', label: 'Option 3' },
 *  ]}
 * />
 * @example
 * <caption>Disabled select with placeholder.</caption>
 * <Select
 *   disabled={true}
 *   placeholder='Placeholder text'
 *   options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }, { value: 3, label: 'Option 3' }]}
 * />
 * @example
 * <caption>Select with selected value and change handler.</caption>
 * <Select
 *   value={selectedValue}
 *   onChange={(value) => setSelectedValue(value)}
 *   options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }, { value: 3, label: 'Option 3' }]}
 * />
 * @example
 * <caption>Select using custom renderers for menu items and selected value.</caption>
 * <Select
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
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { native, ...rest } = props;

    const Component = native ? NativeSelect : CustomSelect;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component {...rest} ref={forwardedRef} />;
  },
) as <T>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => JSX.Element;

export type SelectProps<T> = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'onChange' | 'placeholder' | 'value' | 'defaultValue'
> &
  (
    | ({
        /**
         * If true, the native `<select>` element will be rendered.
         *
         * Extra props, such as `name` can be passed to the `<select>` using `triggerProps`.
         *
         * @default false
         */
        native: true;
      } & NativeSelectProps)
    | ({ native?: false | never } & CustomSelectProps<T>)
  );
