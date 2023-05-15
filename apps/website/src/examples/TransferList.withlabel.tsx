/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { TransferList } from '@itwin/itwinui-react';

export default () => {
  return (
    <TransferList style={{ width: 500 }}>
      <TransferList.Area>
        <TransferList.Label>Options</TransferList.Label>
        <TransferList.List>
          <TransferList.ListItem actionable>Option 1</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 2</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 3</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 4</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 5</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 6</TransferList.ListItem>
        </TransferList.List>
      </TransferList.Area>
    </TransferList>
  );
};
