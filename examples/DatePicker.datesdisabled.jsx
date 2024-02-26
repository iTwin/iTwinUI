/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker, IconButton, Popover } from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

export default () => {
  const startDate = new Date(2023, 6, 5, 14, 55, 22);
  const endDate = new Date(2023, 6, 12, 14, 55, 27);

  const isDateDisabled = (date) => {
    if (date.getMonth() !== 6) {
      return true;
    }
    if (date.getDate() < 5 || date.getDate() > 19) {
      return true;
    }
    return false;
  };

  const [visible, setVisible] = React.useState(false);

  return (
    <Popover
      content={
        <DatePicker
          enableRangeSelect={true}
          startDate={startDate}
          endDate={endDate}
          isDateDisabled={isDateDisabled}
          onChange={() => {
            setVisible(false);
          }}
          setFocus
          onBlur={(event) => {
            if (event.relatedTarget === null) {
              setVisible(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key == 'Escape') {
              setVisible(false);
            }
          }}
        />
      }
      placement='bottom'
      visible={visible}
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
