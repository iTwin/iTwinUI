/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker, Popover, IconButton } from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 30, 0),
  );
  const [visible, setVisible] = React.useState(false);
  return (
    <div className='demo-container'>
      <Popover
        content={
          <DatePicker
            date={currentDate}
            onChange={(date) => {
              setCurrentDate(date);
              setVisible(false);
            }}
            showTime={true}
            useCombinedRenderer={true}
            minuteStep={30}
            use12Hours={true}
            setFocus
            showDatesOutsideMonth={false}
          />
        }
        placement='bottom-start'
        visible={visible}
        onVisibleChange={setVisible}
      >
        <IconButton label='Choose date'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span>{currentDate.toString()}</span>
    </div>
  );
};
