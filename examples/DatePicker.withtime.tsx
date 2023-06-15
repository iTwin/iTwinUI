/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker } from '@itwin/itwinui-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  return (
    <DatePicker
      date={currentDate}
      onChange={(date: Date) => {
        setCurrentDate(date);
      }}
      showTime={true}
    />
  );
};
