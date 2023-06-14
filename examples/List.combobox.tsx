/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, ListItem, VisuallyHidden } from '@itwin/itwinui-react';
import { SvgCheckmark } from '@itwin/itwinui-icons-react';

export default () => {
  const inputId = React.useId();

  return (
    <>
      <VisuallyHidden as='label' htmlFor={inputId}>
        Select a fruit
      </VisuallyHidden>

      <ComboBox
        options={fruits}
        inputProps={{ id: inputId, placeholder: 'Select a fruit' }}
        itemRenderer={(option, { id, isFocused, isSelected }) => {
          const { label, disabled } = option;

          return (
            <ListItem
              role='option'
              actionable
              id={id}
              focused={isFocused}
              active={isSelected}
              aria-selected={isSelected}
              disabled={disabled}
              aria-disabled={disabled}
            >
              <ListItem.Content>{label}</ListItem.Content>

              {isSelected && (
                <ListItem.Icon aria-hidden>
                  <SvgCheckmark />
                </ListItem.Icon>
              )}
            </ListItem>
          );
        }}
      />
    </>
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
