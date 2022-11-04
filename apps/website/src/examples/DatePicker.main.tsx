/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker } from '@itwin/itwinui-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date(2022, 4, 11, 14, 55, 22));
  const onChange = (date: Date) => {
    setCurrentDate(date);
  };
  return <DatePicker showYearSelection date={currentDate} onChange={onChange} />;
};
