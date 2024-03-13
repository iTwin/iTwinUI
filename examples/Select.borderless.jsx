/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Select } from '@itwin/itwinui-react';

export default () => {
  return (
    <Select
      native
      styleType='borderless'
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'kiwi', label: 'Kiwi' },
        { value: 'orange', label: 'Orange' },
      ]}
      triggerProps={{ 'aria-label': 'Fruit' }}
    />
  );
};
