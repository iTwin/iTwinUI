/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker, Popover, IconButton } from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [visible, setVisible] = React.useState(false);

  return (
    <Popover
      content={
        <DatePicker
          showYearSelection
          date={currentDate}
          onChange={(date) => {
            setCurrentDate(date);
            setVisible(false);
          }}
          setFocus
        />
      }
      placement='bottom'
      visible={visible}
      onVisibleChange={setVisible}
    >
      <IconButton
        label='Choose date'
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <SvgCalendar />
      </IconButton>
    </Popover>
  );
};
