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
      <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
        <SvgCalendar />
      </IconButton>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
      {opened && (
        <div style={{ marginTop: 4 }}>
          <DatePicker
            showYearSelection
            date={currentDate}
            onChange={(date: Date) => {
              setCurrentDate(date);
            }}
          />
        </div>
      )}
    </>
  );
};
