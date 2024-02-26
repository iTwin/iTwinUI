/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker, IconButton, Popover } from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  return (
    <>
      <Popover
        content={
          <div className='demo-container'>
            <DatePicker
              showYearSelection
              date={currentDate}
              onChange={(date) => {
                setCurrentDate(date);
              }}
            />
          </div>
        }
        placement='bottom'
      >
        <IconButton label='Choose date'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span className='demo-label'>{currentDate.toString()}</span>
    </>
  );
};
