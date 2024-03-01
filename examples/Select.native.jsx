/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledSelect } from '@itwin/itwinui-react';

export default () => {
  return (
    <LabeledSelect
      native
      label='Fruit'
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'kiwi', label: 'Kiwi' },
        { value: 'orange', label: 'Orange' },
      ]}
      placeholder='Pick a fruit'
      required
    />
  );
};
