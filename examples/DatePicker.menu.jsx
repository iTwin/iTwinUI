/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker, IconButton } from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [opened, setOpened] = React.useState(false);

  return (
    <>
      <IconButton onClick={() => setOpened(!opened)} label='Choose date'>
        <SvgCalendar />
      </IconButton>
      <span className='demo-label'>{currentDate.toString()}</span>
      {opened && (
        <div className='demo-container'>
          <DatePicker
            showYearSelection
            date={currentDate}
            onChange={(date) => {
              setCurrentDate(date);
            }}
          />
        </div>
      )}
    </>
  );
};
