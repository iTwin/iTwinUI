/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/utils.css';

type LabelOwnProps<T extends React.ElementType = 'label'> = {
  /**
   * What element should the label be rendered as?
   * @default 'label'
   */
  as?: T;
  /**
   * Set the display style of the label.
   *   - 'block' - default, no extra spacing (label and input will be on separate lines)
   *   - 'inline' - label gets a right margin so it can be placed inline
   * @default 'block'
   */
  displayStyle?: 'block' | 'inline';
  /**
   * Set to true if the label's associated input is required.
   * This adds an asterisk next to the label text.
   */
  required?: boolean;
};

export type LabelProps<T extends React.ElementType = 'label'> =
  LabelOwnProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof LabelOwnProps<T>>;

/**
 * A standalone label to be used with input components (using `htmlFor`).
 * Can be rendered as any element, e.g. span, using the `as` prop.
 * @example
 * <Label htmlFor='name-input'>Name</Label>
 * <Input id='name-input' />
 */
export const Label = <T extends React.ElementType = 'label'>(
  props: LabelProps<T>,
) => {
  const {
    as: Element = 'label',
    displayStyle = 'block',
    required,
    className,
    children,
    ...rest
  } = props;

  useTheme();

  return (
    <Element
      className={cx(
        'iui-input-label',
        {
          'iui-inline': displayStyle === 'inline',
          'iui-required': required,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Element>
  );
};

export default Label;
