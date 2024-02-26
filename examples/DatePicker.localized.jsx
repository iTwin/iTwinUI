/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  DatePicker,
  IconButton,
  Popover,
  generateLocalizedStrings,
} from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [visible, setVisible] = React.useState(false);
  const localizedNames = generateLocalizedStrings('ja');
  return (
    <Popover
      content={
        <DatePicker
          date={currentDate}
          localizedNames={localizedNames}
          onChange={(date) => {
            setCurrentDate(date);
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
