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
        <TransferList.List>
          <TransferList.ListItem actionable>Item 1</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 2</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 3</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 4</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 5</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 6</TransferList.ListItem>
        </TransferList.List>
      </TransferList.Area>
    </TransferList>
  );
};
