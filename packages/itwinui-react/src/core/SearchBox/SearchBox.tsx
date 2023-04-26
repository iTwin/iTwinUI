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
} from '../utils';
import { IconButton } from '../Buttons/IconButton';
import type { IconButtonProps } from '../Buttons/IconButton';
import '@itwin/itwinui-css/css/input.css';

const SearchBoxContext = React.createContext<
  | {
      size?: 'small' | 'large';
      /**
       * Id to pass to input
       */
      disabled?: boolean;
      inputId: string;
      setInputId: (inputId: string) => void;
      inputRef: React.RefObject<HTMLInputElement>;
      openButtonRef: React.RefObject<HTMLButtonElement>;
      onClose?: () => void;
      onOpen?: () => void;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type SearchBoxOwnProps = {
  /**
   * Whether the searchbox is animated to expand.
   * @default false
   */
  expandable?: boolean;
  /**
   * Whether or not to show the search input.
   * @default false
   */
  isExpanded?: boolean;
  /**
   *
   */
  disabled?: boolean;
  /**
   *
   * @param isExpanding
   * @returns
   */
  onToggle?: (isExpanding: boolean) => void;
  /**
   *
   */
  collapsedState?: React.ReactNode;
  /**
   *
   */
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
  /**
   * Modify size of the searchbox.
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
              {collapsedState ?? <SearchBoxOpenButton />}
            </div>
            <div className='iui-searchbox-expanded'>
              {children ?? (
                <>
                  <SearchBoxInput {...inputProps} />
                  <SearchBoxCloseButton />
                </>
              )}
            </div>
          </>
        )}
      </InputFlexContainer>
    </SearchBoxContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', SearchBoxOwnProps>;

export type SearchBoxProps = PolymorphicComponentProps<
  'div',
  SearchBoxOwnProps
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
      aria-label='Close'
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
      aria-label='Expand'
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
 * Used for searches :)
 * @example
 *  </SearchBox>
 */
export const SearchBox = Object.assign(SearchBoxComponent, {
  Icon: SearchBoxIcon,
  Input: SearchBoxInput,
  Button: SearchBoxButton,
  CloseButton: SearchBoxCloseButton,
  OpenButton: SearchBoxOpenButton,
});

export default SearchBox;
