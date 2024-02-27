/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker } from '@itwin/itwinui-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <DatePicker
        showYearSelection
        date={currentDate}
        onChange={(date) => {
          setCurrentDate(date);
          setVisible(false);
        }}
      />
      <span className='demo-label'>{currentDate.toString()}</span>
    </>
  );
};
