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
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      IconButton,
      { onClick: () => setOpened(!opened), id: 'picker-button' },
      React.createElement(SvgCalendar, null),
    ),
    React.createElement(
      'span',
      { style: { marginLeft: 16 } },
      currentDate.toString(),
    ),
    opened &&
      React.createElement(
        'div',
        { style: { marginTop: 4 } },
        React.createElement(DatePicker, {
          showYearSelection: true,
          date: currentDate,
          onChange: (date) => {
            setCurrentDate(date);
          },
        }),
      ),
  );
};
