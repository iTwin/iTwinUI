/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Select } from '@itwin/itwinui-react';

export default () => {
  const options = [
    {
      value: 1,
      label: 'Item #1',
      sublabel: 'Sublabel #1',
    },
    {
      value: 2,
      label: 'Item #2',
      sublabel: 'Sublabel #2',
    },
    {
      value: 3,
      label: 'Item #3',
      sublabel: 'Sublabel #3',
    },
  ];

  return (
    <Select options={options} placeholder={'Placeholder text'} size={'large'} />
  );
};
