/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker, generateLocalizedStrings } from '@itwin/itwinui-react';

export default () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const localizedNames = generateLocalizedStrings('ja');
  return (
    <DatePicker
      date={currentDate}
      localizedNames={localizedNames}
      onChange={(date: Date) => {
        setCurrentDate(date);
      }}
    />
  );
};
