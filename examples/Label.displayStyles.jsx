/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGrid, Input, Label, LabeledSelect } from '@itwin/itwinui-react';

export default () => {
  const [displayStyle, setDisplayStyle] = React.useState('block');
  return (
    <div className='demo-container'>
      <LabeledSelect
        label='Display style:'
        options={[
          { value: 'block', label: 'Block (default)' },
          { value: 'inline', label: 'Inline' },
        ]}
        onChange={(value) => setDisplayStyle(value)}
      />
      <InputGrid
        labelPlacement={displayStyle === 'inline' ? 'inline' : 'default'}
      >
        <Label displayStyle={displayStyle}>Name:</Label>
        <Input defaultValue='James Bond' />
      </InputGrid>
    </div>
  );
};
