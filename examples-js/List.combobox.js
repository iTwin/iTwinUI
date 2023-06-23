/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, ListItem, VisuallyHidden } from '@itwin/itwinui-react';
import { SvgCheckmark } from '@itwin/itwinui-icons-react';
export default () => {
  const inputId = React.useId();
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      VisuallyHidden,
      { as: 'label', htmlFor: inputId },
      'Select a fruit',
    ),
    React.createElement(ComboBox, {
      options: fruits,
      inputProps: { id: inputId, placeholder: 'Select a fruit' },
      itemRenderer: (option, { id, isFocused, isSelected }) => {
        const { label, disabled } = option;
        return React.createElement(
          ListItem,
          {
            role: 'option',
            actionable: true,
            id: id,
            focused: isFocused,
            active: isSelected,
            'aria-selected': isSelected,
            disabled: disabled,
            'aria-disabled': disabled,
          },
          React.createElement(ListItem.Content, null, label),
          isSelected &&
            React.createElement(
              ListItem.Icon,
              { 'aria-hidden': true },
              React.createElement(SvgCheckmark, null),
            ),
        );
      },
    }),
  );
};
const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Grapefruit', value: 'grapefruit', disabled: true },
  { label: 'Lychee', value: 'lychee' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Orange', value: 'orange', disabled: true },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' },
];
