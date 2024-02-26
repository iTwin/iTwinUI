/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker, Popover, IconButton } from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  return (
    <Popover
      content={
        <DatePicker
          date={currentDate}
          onChange={(date) => {
            setCurrentDate(date);
          }}
          showTime={true}
          useCombinedRenderer={true}
          use12Hours={true}
        />
      }
      placement='bottom'
    >
      <IconButton label='Choose date'>
        <SvgCalendar />
      </IconButton>
    </Popover>
  );
};
