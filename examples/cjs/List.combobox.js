'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  var inputId = React.useId();
  return (
    <>
      <itwinui_react_1.VisuallyHidden as='label' htmlFor={inputId}>
        Select a fruit
      </itwinui_react_1.VisuallyHidden>

      <itwinui_react_1.ComboBox
        options={fruits}
        inputProps={{ id: inputId, placeholder: 'Select a fruit' }}
        itemRenderer={function (option, _a) {
          var id = _a.id,
            isFocused = _a.isFocused,
            isSelected = _a.isSelected;
          var label = option.label,
            disabled = option.disabled;
          return (
            <itwinui_react_1.ListItem
              role='option'
              actionable
              id={id}
              focused={isFocused}
              active={isSelected}
              aria-selected={isSelected}
              disabled={disabled}
              aria-disabled={disabled}
            >
              <itwinui_react_1.ListItem.Content>
                {label}
              </itwinui_react_1.ListItem.Content>

              {isSelected && (
                <itwinui_react_1.ListItem.Icon aria-hidden>
                  <itwinui_icons_react_1.SvgCheckmark />
                </itwinui_react_1.ListItem.Icon>
              )}
            </itwinui_react_1.ListItem>
          );
        }}
      />
    </>
  );
};
var fruits = [
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
