/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { DatePicker } from '@itwin/itwinui-react';

export default () => {
  const startDate = new Date(2023, 6, 5, 14, 55, 22);
  const endDate = new Date(2023, 6, 12, 14, 55, 27);

  return (
    <DatePicker
      enableRangeSelect={true}
      startDate={startDate}
      endDate={endDate}
    />
  );
};
