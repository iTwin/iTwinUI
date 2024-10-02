/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, ProgressLinear } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState(0);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (value < 100) {
      timeoutRef.current = setTimeout(
        () => setValue((prevValue) => prevValue + 20),
        1500,
      );
    } else {
      clearTimeout(timeoutRef.current);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [value]);

  return (
    <div className='demo-container'>
      <ProgressLinear
        value={value}
        isAnimated
        labels={
          value < 100 ? ['Loading...', `${value}%`] : ['Upload succeeded.']
        }
        status={value === 100 ? 'positive' : undefined}
      />
      <Button onClick={() => setValue(0)}>Reset process</Button>
    </div>
  );
};
