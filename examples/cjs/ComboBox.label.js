/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, Label } from '@itwin/itwinui-react';
export default () => {
  const [breakfast, setBreakfast] = React.useState('');
  const [lunch, setLunch] = React.useState('');
  const breakfastOptions = React.useMemo(
    () => [
      { label: 'Oatmeal parfait', value: 'parfait' },
      { label: 'Waffle', value: 'waffle' },
      { label: 'Omelette', value: 'omelette' },
      { label: 'Breakfast sandwich', value: 'sandwich' },
    ],
    [],
  );
  const lunchOptions = React.useMemo(
    () => [
      { label: 'BLT', value: 'blt' },
      { label: 'Salad', value: 'salad' },
      { label: 'Chicken sandwich', value: 'chicken' },
      { label: 'Tortilla soup', value: 'soup' },
      { label: 'Fettucini alfredo', value: 'pasta' },
    ],
    [],
  );
  return React.createElement(
    'div',
    { style: { textAlign: 'left' } },
    React.createElement(Label, { htmlFor: 'breakfast-input' }, 'Breakfast'),
    React.createElement(ComboBox, {
      options: breakfastOptions,
      value: breakfast,
      onChange: setBreakfast,
      inputProps: {
        id: 'breakfast-input',
        placeholder: 'Choose your meal',
      },
    }),
    React.createElement('br', null),
    React.createElement(Label, { htmlFor: 'lunch-input' }, 'Lunch'),
    React.createElement(ComboBox, {
      options: lunchOptions,
      value: lunch,
      onChange: setLunch,
      inputProps: {
        id: 'lunch-input',
        placeholder: 'Choose your meal',
      },
    }),
  );
};
