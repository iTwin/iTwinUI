/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { TransferList, IconButton } from '@itwin/itwinui-react';
import {
  SvgChevronDown,
  SvgChevronUp,
  SvgChevronRight,
  SvgChevronLeft,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <TransferList style={{ width: 500 }}>
      <TransferList.Area>
        <TransferList.Label>Options</TransferList.Label>
        <TransferList.List role={'listbox'}>
          <TransferList.ListItem actionable>Option 1</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 2</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 3</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 4</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 5</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 6</TransferList.ListItem>
        </TransferList.List>
      </TransferList.Area>
      <TransferList.Toolbar>
        <IconButton styleType={'borderless'}>
          <SvgChevronUp />
        </IconButton>
        <IconButton styleType={'borderless'}>
          <SvgChevronDown />
        </IconButton>
        <IconButton styleType={'borderless'}>
          <SvgChevronLeft />
        </IconButton>
        <IconButton styleType={'borderless'}>
          <SvgChevronRight />
        </IconButton>
      </TransferList.Toolbar>
      <TransferList.Area>
        <TransferList.Label>Applied</TransferList.Label>
        <TransferList.List role={'listbox'}>
          <TransferList.ListItem actionable>Option 7</TransferList.ListItem>
        </TransferList.List>
      </TransferList.Area>
    </TransferList>
  );
};
