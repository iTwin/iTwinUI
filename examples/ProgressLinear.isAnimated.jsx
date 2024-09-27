/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressLinear } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      const newValue = value + 20;
      setValue(newValue > 100 ? 0 : newValue);
    }, 3000);
  }, [value]);

  return (
    <div className='demo-container'>
      <ProgressLinear value={value} isAnimated />
    </div>
  );
};
