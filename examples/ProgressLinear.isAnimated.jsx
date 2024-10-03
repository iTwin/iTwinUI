/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, ProgressLinear } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState(0);
  const intervalRef = React.useRef(null);
  const isDone = value === 100;

  React.useEffect(() => {
    if (!isDone) {
      intervalRef.current = setInterval(
        () => setValue((prevValue) => prevValue + 20),
        1500,
      );
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
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
