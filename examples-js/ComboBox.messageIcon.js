/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, StatusMessage } from '@itwin/itwinui-react';
import { SvgClock } from '@itwin/itwinui-icons-react';
export default () => {
  const [value, setValue] = React.useState('');
  const options = React.useMemo(
    () => [
      { label: '9:30 AM', value: '9:30' },
      { label: '10:00 AM', value: '10:00' },
      { label: '10:30 AM', value: '10:30' },
      { label: '1:00 PM', value: '1:00' },
      { label: '2:00 PM', value: '2:00' },
      { label: '2:30 PM', value: '2:30' },
      { label: '4:30 PM', value: '4:30' },
    ],
    [],
  );
  return React.createElement(ComboBox, {
    options: options,
    message: React.createElement(
      StatusMessage,
      { startIcon: React.createElement(SvgClock, null) },
      'Appointments run for 30 minutes.',
    ),
    inputProps: { placeholder: 'Select appointment time' },
    onChange: setValue,
    value: value,
  });
};
