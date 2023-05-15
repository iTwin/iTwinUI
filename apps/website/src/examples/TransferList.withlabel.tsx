/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { TransferList, IconButton } from '@itwin/itwinui-react';
import {
  SvgChevronLeftDouble,
  SvgChevronRightDouble,
  SvgChevronRight,
  SvgChevronLeft,
} from '@itwin/itwinui-icons-react';

export default () => {
  type TransferItemDataType = {
    name: string;
    active: boolean;
  };

  const [optionData, setOptionData] = React.useState([
    { name: 'Option 1', active: false },
    { name: 'Option 2', active: false },
    { name: 'Option 3', active: false },
    { name: 'Option 4', active: false },
    { name: 'Option 5', active: false },
    { name: 'Option 6', active: false },
  ]);

  const [appliedData, setAppliedData] = React.useState([{ name: 'Option 7', active: false }]);

  const transfer = (
    fromData: Array<TransferItemDataType>,
    setFromData: (data: Array<TransferItemDataType>) => void,
    setToData: (data: Array<TransferItemDataType>) => void,
    sendAll?: boolean
  ) => {
    setToData((oldToData) => {
      const newToData = [...oldToData];
      const newFromData: Array<TransferItemDataType> = [];
      fromData.forEach((item) => {
        if (sendAll || item.active === true) {
          const newItem = item;
          newItem.active = false;
          newToData.push(newItem);
        } else {
          newFromData.push(item);
        }
      });
      setFromData(newFromData);
      return newToData;
    });
  };

  return (
    <TransferList style={{ width: 500 }}>
      <TransferList.Area>
        <TransferList.Label>Options</TransferList.Label>
        <TransferList.List>
          {optionData?.map((item, index) => {
            return (
              <TransferList.ListItem
                actionable
                active={item.active}
                onActiveChange={(isActive: boolean) => {
                  setOptionData((oldData) => {
                    const newData = [...oldData];
                    const newObject = { ...newData[index] };
                    newObject.active = isActive;
                    newData[index] = newObject;
                    return newData;
                  });
                }}
              >
                {item.name}
              </TransferList.ListItem>
            );
          })}
        </TransferList.List>
      </TransferList.Area>
      <TransferList.Toolbar>
        <IconButton
          styleType={'borderless'}
          onClick={() => {
            transfer(optionData, setOptionData, setAppliedData, true);
          }}
        >
          <SvgChevronRightDouble />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          onClick={() => transfer(optionData, setOptionData, setAppliedData, false)}
        >
          <SvgChevronRight />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          onClick={() => transfer(appliedData, setAppliedData, setOptionData, false)}
        >
          <SvgChevronLeft />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          onClick={() => transfer(appliedData, setAppliedData, setOptionData, true)}
        >
          <SvgChevronLeftDouble />
        </IconButton>
      </TransferList.Toolbar>
      <TransferList.Area>
        <TransferList.Label>Applied</TransferList.Label>
        <TransferList.List>
          {appliedData.map((item, index) => {
            return (
              <TransferList.ListItem
                actionable
                active={item.active}
                onActiveChange={(isActive: boolean) => {
                  setAppliedData((oldData) => {
                    const newData = [...oldData];
                    const newObject = { ...newData[index] };
                    newObject.active = isActive;
                    newData[index] = newObject;
                    return newData;
                  });
                }}
              >
                {item.name}
              </TransferList.ListItem>
            );
          })}
        </TransferList.List>
      </TransferList.Area>
    </TransferList>
  );
};
