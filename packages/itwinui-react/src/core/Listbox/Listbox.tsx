/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  CommonProps,
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
  useTheme,
} from '../utils';
import '@itwin/itwinui-css/css/listbox.css';

// ----------------------------------------------------------------------------
// Listbox.Area component

type ListboxAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type ListboxAreaProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, ListboxAreaOwnProps>;

const ListboxArea = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element className={cx('iui-listbox-area', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', ListboxAreaOwnProps>;

// ----------------------------------------------------------------------------
// Listbox.Label component

type ListboxLabelOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type ListboxLabelProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, ListboxLabelOwnProps>;

const ListboxLabel = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element className={cx('iui-listbox-label', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', ListboxLabelOwnProps>;

// ----------------------------------------------------------------------------
// Listbox.Toolbar component

type ListboxToolbarOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type ListboxToolbarProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, ListboxToolbarOwnProps>;

const ListboxToolbar = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element
      className={cx('iui-listbox-toolbar', className)}
      role={'toolbar'}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', ListboxToolbarOwnProps>;

export type ListboxProps = {
  /**
   * Content in the listbox.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * The Listbox container allows content to appear elevated through the use of a drop shadow
 * @example
 * <Listbox>Listbox Content</Listbox>
 * <Listbox elevation={2}>Listbox Content</Listbox>
 * <Listbox>
 *   <Listbox.Header>Listbox Header Content</Listbox.Header>
 *   <Listbox.Body isPadded={true}>Listbox Body Content</Listbox.Body>
 * </Listbox>
 */
export const Listbox = Object.assign(
  React.forwardRef(
    (props: ListboxProps, ref: React.RefObject<HTMLDivElement>) => {
      const { className, children, ...rest } = props;
      useTheme();

      return (
        <div
          className={cx('iui-listbox-wrapper', className)}
          ref={ref}
          {...rest}
        >
          {children}
        </div>
      );
    },
  ),
  {
    /**
     * 	Listbox area subcomponent
     */
    Area: ListboxArea,
    /**
     * 	Listbox label subcomponent
     */
    Label: ListboxLabel,
    /**
     * 	Listbox toolbar subcomponent
     */
    Toolbar: ListboxToolbar,
  },
);

export default Listbox;
