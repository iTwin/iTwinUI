/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledSelect } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <LabeledSelect
        label='Select label'
        message='Help message'
        placeholder='Labeled select'
        options={[
          { value: 1, label: 'Item #1' },
          { value: 2, label: 'Item #2' },
          { value: 3, label: 'Item #3' },
        ]}
      />
    </div>
  );
};
