/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, ProgressLinear } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState(0);
  const timeoutRef = React.useRef(null);
  const isDone = value === 100;

  React.useEffect(() => {
    if (!isDone) {
      timeoutRef.current = setTimeout(
        () => setValue((prevValue) => prevValue + 20),
        1500,
      );
    } else {
      clearTimeout(timeoutRef.current);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isDone]);

  return (
    <div className='demo-container'>
      <ProgressLinear
        value={value}
        isAnimated
        labels={!isDone ? ['Loading...', `${value}%`] : ['Upload succeeded.']}
        status={isDone ? 'positive' : undefined}
      />
      <Button onClick={() => setValue(0)}>Reset process</Button>
    </div>
  );
};
