/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  InputFlexContainer,
  useTheme,
  SvgSearch,
  SvgCloseSmall,
  useSafeContext,
  useId,
  Icon,
  useMergedRefs,
} from '../utils';
import type {
  IconProps,
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
  InputFlexContainerProps,
} from '../utils';
import { IconButton } from '../Buttons/IconButton';
import type { IconButtonProps } from '../Buttons/IconButton';
import '@itwin/itwinui-css/css/input.css';

const SearchBoxContext = React.createContext<
  | {
      /**
       * Context prop for sizing subcomponents
       */
      size?: 'small' | 'large';
      /**
       * Context prop for disabling subcomponents
       */
      disabled?: boolean;
      /**
       * Id to pass to input
       */
      inputId: string;
      setInputId: (inputId: string) => void;
      /**
       * Ref for input subcomponent
       */
      inputRef: React.RefObject<HTMLInputElement>;
      /**
       * Ref for open button subcomponent
       */
      openButtonRef: React.RefObject<HTMLButtonElement>;
      /**
       * Callback for closing expandable searchbox
       */
      onClose?: () => void;
      /**
       * Callback for expanding searchbox
       */
      onOpen?: () => void;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type SearchBoxOwnProps = {
  /**
   * Whether the searchbox is expandable.
   * @default false
   */
  expandable?: boolean;
  /**
   * Searchbox state toggle.
   */
  isExpanded?: boolean;
  /**
   * Function that is called on toggling (expand, collapse) searchbox.
   */
  onToggle?: (isExpanding: boolean) => void;
  /**
   * Collapsed searchbox state.
   * @default SearchBox.OpenButton
   */
  collapsedState?: React.ReactNode;
  /**
   * Input props when using default searchbox.
   */
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
  /**
   * Open button props when using default searchbox.
   */
  openButtonProps?: React.ComponentPropsWithoutRef<'button'>;
  /**
   * Close button props when using default searchbox.
   */
  closeButtonProps?: React.ComponentPropsWithoutRef<'button'>;
  /**
   * Modify size of the searchbox and it's subcomponents.
   */
  size?: 'small' | 'large';
};

const SearchBoxComponent = React.forwardRef((props, ref) => {
  useTheme();

  const {
    size,
    expandable = false,
    disabled = false,
    onToggle,
    collapsedState,
    isExpanded,
    children,
    inputProps,
    openButtonProps,
    closeButtonProps,
    className,
    ...rest
  } = props;

  const [inputId, setInputId] = React.useState(useId());
  const inputRef = React.useRef<HTMLInputElement>(null);
  const openButtonRef = React.useRef<HTMLButtonElement>(null);

  const [localExpanded, setLocalExpanded] = React.useState(isExpanded);

  const onClose = () => {
    setLocalExpanded(false);
    onToggle?.(false);
    openButtonRef.current && openButtonRef.current.focus();
  };

  const onOpen = () => {
    setLocalExpanded(true);
    onToggle?.(true);
    inputRef.current && inputRef.current.focus();
  };

  return (
    <SearchBoxContext.Provider
      value={{
        size,
        disabled,
        onOpen,
        onClose,
        inputRef,
        inputId,
        setInputId,
        openButtonRef,
      }}
    >
      <InputFlexContainer
        ref={ref}
        className={cx({ 'iui-expandable-searchbox': expandable }, className)}
        data-iui-size={size}
        disabled={disabled}
        role='searchbox'
        data-iui-expanded={localExpanded}
        {...rest}
      >
        {!expandable &&
          (children ?? (
            <>
              <SearchBoxInput {...inputProps} />
              <SearchBoxIcon />
            </>
          ))}
        {expandable && (
          <>
            <div className='iui-searchbox-collapsed'>
              {collapsedState ?? <SearchBoxOpenButton {...openButtonProps} />}
            </div>
            <div className='iui-searchbox-expanded'>
              {children ?? (
                <>
                  <SearchBoxInput {...inputProps} />
                  <SearchBoxCloseButton {...closeButtonProps} />
                </>
              )}
            </div>
          </>
        )}
      </InputFlexContainer>
    </SearchBoxContext.Provider>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  SearchBoxOwnProps & InputFlexContainerProps
>;

export type SearchBoxProps = PolymorphicComponentProps<
  'div',
  SearchBoxOwnProps & InputFlexContainerProps
>;

// ----------------------------------------------------------------------------
export type SearchBoxIconProps = PolymorphicComponentProps<'span', IconProps>;

const SearchBoxIcon = React.forwardRef((props, ref) => {
  const { size, className, children, ...rest } = props;
  const { size: sizeContext } = useSafeContext(SearchBoxContext);

  return (
    <Icon
      aria-hidden
      className={cx('iui-svg-icon', 'iui-search-icon', className)}
      size={size ?? sizeContext}
      ref={ref}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<'span', IconProps>;

// ----------------------------------------------------------------------------

export type SearchBoxInputProps = {
  label?: string;
} & React.ComponentProps<'input'>;

const SearchBoxInput = React.forwardRef(
  (props: SearchBoxInputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      className,
      label = 'Search input',
      id: idProp,
      disabled: disabledProp,
      ...rest
    } = props;

    const { inputId, setInputId, disabled, inputRef } =
      useSafeContext(SearchBoxContext);

    if (idProp && idProp !== inputId) {
      setInputId(idProp);
    }

    return (
      <input
        id={idProp ?? inputId}
        aria-label={label}
        ref={useMergedRefs(ref, inputRef)}
        type='text'
        className={cx('iui-search-input', className)}
        disabled={disabledProp ?? disabled}
        {...rest}
      />
    );
  },
);

// ----------------------------------------------------------------------------

/**
 * SearchBox.Button component to add to your SearchBox.
 */
export type SearchBoxButtonProps = PolymorphicComponentProps<
  'button',
  IconButtonProps
>;

const SearchBoxButton = React.forwardRef((props, ref) => {
  const { children, size, disabled: disabledProp, ...rest } = props;
  const { size: sizeContext, disabled } = useSafeContext(SearchBoxContext);

  return (
    <IconButton
      styleType='borderless'
      size={size ?? sizeContext}
      ref={ref}
      disabled={disabledProp ?? disabled}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

// ----------------------------------------------------------------------------

/**
 * SearchBox.Button component to add to your SearchBox.
 */
export type SearchBoxCloseButtonProps = PolymorphicComponentProps<
  'button',
  IconButtonProps
>;

const SearchBoxCloseButton = React.forwardRef((props, ref) => {
  const {
    children,
    onClick: onClickProp,
    size,
    disabled: disabledProp,
    ...rest
  } = props;

  const {
    onClose,
    size: sizeContext,
    disabled,
  } = useSafeContext(SearchBoxContext);

  return (
    <SearchBoxButton
      ref={ref}
      aria-label='Close searchbox'
      size={size ?? sizeContext}
      disabled={disabledProp ?? disabled}
      onClick={(e) => {
        onClickProp?.(e);
        onClose?.();
      }}
      {...rest}
    >
      {children ?? <SvgCloseSmall />}
    </SearchBoxButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;
// ----------------------------------------------------------------------------

/**
 * SearchBox.Button component to add to your SearchBox.
 */
export type SearchBoxOpenButtonProps = PolymorphicComponentProps<
  'button',
  IconButtonProps
>;

const SearchBoxOpenButton = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    onClick: onClickProp,
    size,
    disabled: disabledProp,
    ...rest
  } = props;

  const {
    onOpen,
    size: sizeContext,
    disabled,
    openButtonRef,
  } = useSafeContext(SearchBoxContext);

  return (
    <SearchBoxButton
      ref={useMergedRefs(ref, openButtonRef)}
      className={cx('iui-searchbox-open-button', className)}
      aria-label='Expand searchbox'
      size={size ?? sizeContext}
      disabled={disabledProp ?? disabled}
      onClick={(e) => {
        onClickProp?.(e);
        onOpen?.();
      }}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </SearchBoxButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

// ----------------------------------------------------------------------------

/**
 * Searchbox component.
 * @example
 *  <Searchbox inputProps={{ placeholder: 'Basic search' }}/>
 *
 * @example
 * <SearchBox expandable inputProps={{ placeholder: 'Expandable search' }}/>
 */
export const SearchBox = Object.assign(SearchBoxComponent, {
  /**
   * Icon to be placed within Searchbox.
   * @default Looking glass icon
   */
  Icon: SearchBoxIcon,
  /**
   * Input to be placed within Searchbox
   */
  Input: SearchBoxInput,
  /**
   * Button to be placed within Searchbox. Default has looking glass icon.
   */
  Button: SearchBoxButton,
  /**
   * Close button for expandable Searchbox. Clicking on this button will collapse Searchbox.
   */
  CloseButton: SearchBoxCloseButton,
  /**
   * Open button for expandable Searchbox. Clicking on this will expand Searchbox.
   */
  OpenButton: SearchBoxOpenButton,
});

export default SearchBox;
