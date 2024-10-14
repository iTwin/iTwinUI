/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, ProgressLinear } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState(0);
  const isDone = value === 100;

  React.useEffect(() => {
    let interval;

    if (!isDone) {
      interval = setInterval(
        () => setValue((prevValue) => prevValue + 20),
        1500,
      );
    }

    return () => clearInterval(interval);
  }, [isDone]);

  return (
    <div className='demo-container'>
      <ProgressLinear
        value={value}
        isAnimated={!isDone}
        labels={!isDone ? ['Loading...', `${value}%`] : ['Upload succeeded.']}
        status={isDone ? 'positive' : undefined}
        key={isDone.toString()}
      />
      <Button onClick={() => setValue(0)}>Reset process</Button>
    </div>
  );
};
