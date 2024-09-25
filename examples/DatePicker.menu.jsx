/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker, Surface } from '@itwin/itwinui-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  return (
    <Wrapper>
      <DatePicker
        showYearSelection
        date={currentDate}
        onChange={(date) => {
          setCurrentDate(date);
        }}
        applyBackground={false}
        showDatesOutsideMonth={false}
      />
      <div className='demo-label'>{currentDate.toDateString()}</div>
    </Wrapper>
  );
};

function Wrapper({ children }) {
  return <Surface className='demo-container'>{children}</Surface>;
}
