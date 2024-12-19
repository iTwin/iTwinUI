/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, Label, InputGrid } from '@itwin/itwinui-react';

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

  return (
    <div>
      <InputGrid>
        <Label htmlFor='breakfast-input'>Breakfast</Label>
        <ComboBox
          options={breakfastOptions}
          value={breakfast}
          onChange={setBreakfast}
          inputProps={{
            id: 'breakfast-input', // passing id to inputProps so it can be used in Label htmlFor
            placeholder: 'Choose your meal',
          }}
        />
      </InputGrid>
      <InputGrid>
        <Label htmlFor='lunch-input'>Lunch</Label>
        <ComboBox
          options={lunchOptions}
          value={lunch}
          onChange={setLunch}
          inputProps={{
            id: 'lunch-input', // passing id to inputProps so it can be used in Label htmlFor
            placeholder: 'Choose your meal',
          }}
        />
      </InputGrid>
    </div>
  );
};
