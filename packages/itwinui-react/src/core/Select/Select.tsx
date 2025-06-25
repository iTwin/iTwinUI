/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
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
  isReact17or18,
} from '../../utils/index.js';
import type {
  CommonProps,
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
import { SelectTag } from './SelectTag.js';
import { SelectTagContainer } from './SelectTagContainer.js';
import { Icon } from '../Icon/Icon.js';
import { usePopover } from '../Popover/Popover.js';
import { List } from '../List/List.js';
import { Composite, CompositeItem } from '@floating-ui/react';

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
 * <caption>Native select.</caption>
 * <Select
 *  native
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
export const Select = React.forwardRef((props, forwardedRef) => {
  const { native, ...rest } = props;

  const Component = native ? NativeSelect : CustomSelect;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Component {...rest} ref={forwardedRef} />;
}) as <T>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.JSX.Element;
if (process.env.NODE_ENV === 'development') {
  (Select as any).displayName = 'Select';
}

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
    | ({ native?: false } & CustomSelectProps<T> & {
          /**
           * styleType is only supported for `<Select native>`.
           */
          styleType?: never;
        })
  );

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
    styleType,
    required,
    ...rest
  } = props;

  return (
    <InputWithIcon {...rest} ref={forwardedRef}>
      <SelectButton
        as='select'
        size={size}
        status={status}
        styleType={styleType}
        disabled={disabled}
        defaultValue={valueProp === undefined ? defaultValueProp : undefined}
        value={valueProp === null ? '' : valueProp}
        required={required}
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
        {styleType !== 'borderless' && placeholder !== undefined ? (
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

// ----------------------------------------------------------------------------

// This is a smaller, stricter subset of CustomSelectProps, because native
// <select> only supports string values, and does not support icons or sublabels.
type NativeSelectProps = SelectCommonProps & {
  /**
   * Selected option value.
   *
   * Must be a string, because it is passed as an attribute to the native <select>.
   *
   * Alternatively, pass `null` to reset the value.
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
   * Props to pass to the select element.
   */
  triggerProps?: Omit<React.ComponentPropsWithRef<'select'>, 'size'>;
  required?: boolean;
  multiple?: never;
} & NativeSelectStyleTypeProps;

type NativeSelectStyleTypeProps =
  | {
      /**
       * Style of the select.
       * Use 'borderless' to hide outline.
       * @default 'default'
       */
      styleType?: 'default';
      /**
       * Placeholder for when no item is selected.
       *
       * Will be rendered as a disabled option at the top of the list, and automatically
       * selected when no `value` or `defaultValue` is provided.
       *
       * Not allowed when `styleType` is `borderless`.
       */
      placeholder?: string;
    }
  | {
      styleType: 'borderless';
      placeholder?: never;
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

// ----------------------------------------------------------------------------

const CustomSelect = React.forwardRef((props, forwardedRef) => {
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
    popoverProps: { portal = true, ...popoverProps } = {},
    // @ts-expect-error -- this prop is disallowed by types but should still be handled at runtime
    styleType,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [liveRegionSelection, setLiveRegionSelection] = React.useState('');

  const [uncontrolledValue, setUncontrolledValue] = React.useState<unknown>();
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

  const handleOptionSelection = React.useCallback(
    (option: SelectOption<any>, { isSelected = false } = {}) => {
      // update internal value state and also call external onChange
      if (isSingleOnChange(onChangeRef.current, multiple)) {
        setUncontrolledValue(option.value);
        onChangeRef.current?.(option.value);
        hide();
      } else {
        setUncontrolledValue((prev: unknown[]) =>
          isSelected
            ? prev?.filter((i) => option.value !== i)
            : [...(prev ?? []), option.value],
        );
        onChangeRef.current?.(option.value, isSelected ? 'removed' : 'added');
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
    [hide, multiple, onChangeRef, options, value],
  );

  const menuItems = React.useMemo(() => {
    return options.map((option, index) => {
      const isSelected = isMultipleEnabled(value, multiple)
        ? value?.includes(option.value) ?? false
        : value === option.value;
      const menuItem: React.JSX.Element = itemRenderer ? (
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

          handleOptionSelection(option, { isSelected });
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
  }, [handleOptionSelection, itemRenderer, multiple, options, value]);

  const selectedItems = React.useMemo(() => {
    if (value == null) {
      return undefined;
    }
    return isMultipleEnabled(value, multiple)
      ? options.filter((option) => value.some((val) => val === option.value))
      : options.find((option) => option.value === value);
  }, [multiple, options, value]);

  const defaultFocusedIndex = React.useMemo(() => {
    let index = 0;
    if (Array.isArray(value) && value.length > 0) {
      index = options.findIndex((option) => option.value === value[0]);
    } else if (value) {
      index = options.findIndex((option) => option.value === value);
    }
    return index >= 0 ? index : 0;
  }, [options, value]);

  const tagRenderer = React.useCallback(
    (option: SelectOption<unknown>) => {
      return (
        <SelectTag
          key={option.label}
          label={option.label}
          onRemove={() => {
            handleOptionSelection(option, { isSelected: true });
            selectRef.current?.focus();
          }}
        />
      );
    },
    [handleOptionSelection],
  );

  const popover = usePopover({
    visible: isOpen,
    matchWidth: true,
    closeOnOutsideClick: true,
    middleware: { size: { maxHeight: 'var(--iui-menu-max-height)' } },
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
          tabIndex={0}
          role='combobox'
          size={size}
          status={status}
          aria-disabled={disabled ? 'true' : undefined}
          data-iui-disabled={disabled ? 'true' : undefined}
          aria-autocomplete='none'
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls={`${uid}-menu`}
          styleType={styleType}
          {...triggerProps}
          ref={useMergedRefs(
            selectRef,
            triggerProps?.ref,
            popover.refs.setReference,
          )}
          className={cx(
            {
              'iui-placeholder':
                (!selectedItems || selectedItems.length === 0) && !!placeholder,
            },
            triggerProps?.className,
          )}
          data-iui-multi={multiple}
        >
          {(!selectedItems || selectedItems.length === 0) && (
            <Box as='span' className='iui-content'>
              {placeholder}
            </Box>
          )}
          {!isMultipleEnabled(selectedItems, multiple) ? (
            <SingleSelectButton
              selectedItem={selectedItems}
              selectedItemRenderer={
                selectedItemRenderer as (
                  option: SelectOption<unknown>,
                ) => React.JSX.Element
              }
            />
          ) : (
            <AutoclearingHiddenLiveRegion text={liveRegionSelection} />
          )}
        </SelectButton>
        <SelectEndIcon disabled={disabled} isOpen={isOpen} />
        {isMultipleEnabled(selectedItems, multiple) ? (
          <MultipleSelectButton
            selectedItems={selectedItems}
            selectedItemsRenderer={
              selectedItemRenderer as (
                options: SelectOption<unknown>[],
              ) => React.JSX.Element
            }
            tagRenderer={tagRenderer}
            size={size === 'small' ? 'small' : undefined}
          />
        ) : null}
      </InputWithIcon>

      {popover.open && (
        <Portal portal={portal}>
          <SelectListbox
            defaultFocusedIndex={defaultFocusedIndex}
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
          </SelectListbox>
        </Portal>
      )}
    </>
  );
}) as <T>(
  props: CustomSelectProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.JSX.Element;

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
  ) => React.JSX.Element;
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
  > & {
    /**
     * Middleware options.
     *
     * By default, `hide` is enabled. If the floating options get hidden even when they shouldn't (e.g. some custom
     * styles interfering with the trigger's hide detection) consider disabling the `hide` middleware.
     *
     * @see https://floating-ui.com/docs/middleware
     */
    middleware?: {
      hide?: boolean;
    };
  } & Pick<PortalProps, 'portal'>;
  /**
   * Props to pass to the select button (trigger) element.
   */
  triggerProps?: React.ComponentPropsWithRef<'div'>;
} & SelectMultipleTypeProps<T> &
  Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'size' | 'disabled' | 'placeholder' | 'onChange'
  >;

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
      selectedItemRenderer?: (option: SelectOption<T>) => React.JSX.Element;
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
      selectedItemRenderer?: (options: SelectOption<T>[]) => React.JSX.Element;
      value?: T[];
      onChange?: (value: T, event: SelectValueChangeEvent) => void;
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
  icon?: React.JSX.Element;
  /**
   * SVG icon component shown on the left.
   */
  startIcon?: React.JSX.Element;
  /**
   * Item is disabled.
   */
  disabled?: boolean;
  /**
   * Any other props.
   */
  [key: string]: unknown;
} & CommonProps;

// ----------------------------------------------------------------------------
// Type guards

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

// ----------------------------------------------------------------------------

const SelectButton = React.forwardRef((props, forwardedRef) => {
  const { size, status, styleType = 'default', ...rest } = props;

  return (
    <Box
      data-iui-size={size}
      data-iui-status={status}
      data-iui-variant={styleType !== 'default' ? styleType : undefined}
      {...rest}
      ref={forwardedRef}
      className={cx('iui-select-button', 'iui-field', props.className)}
    />
  );
}) as PolymorphicForwardRefComponent<
  'div',
  {
    size?: 'small' | 'large';
    status?: 'positive' | 'warning' | 'negative';
    styleType?: 'default' | 'borderless';
  }
>;

// ----------------------------------------------------------------------------

const SelectEndIcon = React.forwardRef((props, forwardedRef) => {
  const { disabled, isOpen, ...rest } = props;
  return (
    <Icon
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
  'span',
  { disabled?: boolean; isOpen?: boolean }
>;

// ----------------------------------------------------------------------------

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

type SingleSelectButtonProps<T> = {
  selectedItem?: SelectOption<T>;
  selectedItemRenderer?: (option: SelectOption<T>) => React.JSX.Element;
};

// ----------------------------------------------------------------------------

const MultipleSelectButton = <T,>({
  selectedItems,
  selectedItemsRenderer,
  tagRenderer,
  size,
}: MultipleSelectButtonProps<T>) => {
  const selectedItemsElements = React.useMemo(() => {
    if (!selectedItems) {
      return [];
    }

    return selectedItems.map((item) => tagRenderer(item));
  }, [selectedItems, tagRenderer]);

  return (
    <>
      {selectedItems && (
        <Box as='span' className='iui-content'>
          {selectedItemsRenderer ? (
            selectedItemsRenderer(selectedItems)
          ) : (
            <SelectTagContainer
              tags={selectedItemsElements}
              data-iui-size={size}
            />
          )}
        </Box>
      )}
    </>
  );
};

type MultipleSelectButtonProps<T> = {
  selectedItems?: SelectOption<T>[];
  selectedItemsRenderer?: (options: SelectOption<T>[]) => React.JSX.Element;
  tagRenderer: (item: SelectOption<T>) => React.JSX.Element;
  size?: 'small';
};

// ----------------------------------------------------------------------------

const SelectListbox = React.forwardRef((props, forwardedRef) => {
  const {
    defaultFocusedIndex = 0,
    autoFocus = true,
    children: childrenProp,
    className,
    ...rest
  } = props;

  const [focusedIndex, setFocusedIndex] = React.useState(defaultFocusedIndex);

  const autoFocusRef = React.useCallback((element: HTMLElement | null) => {
    queueMicrotask(() => {
      const firstFocusable = element?.querySelector(
        '[tabindex="0"]',
      ) as HTMLElement | null;
      firstFocusable?.focus();
    });
  }, []);

  const children = React.useMemo(() => {
    return React.Children.map(childrenProp, (child, index) => {
      if (React.isValidElement<Record<string, any>>(child)) {
        // Supporting React 19 and earlier versions
        const ref = isReact17or18 ? (child as any).ref : child.props.ref;

        return <CompositeItem key={index} ref={ref} render={child} />;
      }
      return child;
    });
  }, [childrenProp]);

  return (
    <Composite
      render={<List as='div' className={cx('iui-menu', className)} />}
      orientation='vertical'
      role='listbox'
      activeIndex={focusedIndex}
      onNavigate={setFocusedIndex}
      ref={useMergedRefs(forwardedRef, autoFocus ? autoFocusRef : undefined)}
      {...rest}
    >
      {children}
    </Composite>
  );
}) as PolymorphicForwardRefComponent<'div', { defaultFocusedIndex?: number }>;
