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
  const [optionData, setOptionData] = React.useState([
    { name: 'Option 1', active: false },
    { name: 'Option 2', active: false },
    { name: 'Option 3', active: false },
    { name: 'Option 4', active: false },
    { name: 'Option 5', active: false },
    { name: 'Option 6', active: false },
  ]);
  const [appliedData, setAppliedData] = React.useState([
    { name: 'Option 7', active: false },
  ]);
  const transfer = (fromData, setFromData, setToData, sendAll) => {
    setToData((oldToData) => {
      const newToData = [...oldToData];
      const newFromData = [];
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
  return React.createElement(
    TransferList,
    { style: { width: 500 } },
    React.createElement(
      TransferList.ListboxWrapper,
      null,
      React.createElement(TransferList.ListboxLabel, null, 'Options'),
      React.createElement(
        TransferList.Listbox,
        null,
        optionData?.map((item, index) => {
          return React.createElement(
            TransferList.Item,
            {
              actionable: true,
              active: item.active,
              onActiveChange: (isActive) => {
                setOptionData((oldData) => {
                  const newData = [...oldData];
                  const newObject = { ...newData[index] };
                  newObject.active = isActive;
                  newData[index] = newObject;
                  return newData;
                });
              },
            },
            item.name,
          );
        }),
      ),
    ),
    React.createElement(
      TransferList.Toolbar,
      null,
      React.createElement(
        IconButton,
        {
          styleType: 'borderless',
          label: 'Move Right All',
          onClick: () => {
            transfer(optionData, setOptionData, setAppliedData, true);
          },
        },
        React.createElement(SvgChevronRightDouble, null),
      ),
      React.createElement(
        IconButton,
        {
          styleType: 'borderless',
          label: 'Move Right',
          onClick: () =>
            transfer(optionData, setOptionData, setAppliedData, false),
        },
        React.createElement(SvgChevronRight, null),
      ),
      React.createElement(
        IconButton,
        {
          styleType: 'borderless',
          label: 'Move Left',
          onClick: () =>
            transfer(appliedData, setAppliedData, setOptionData, false),
        },
        React.createElement(SvgChevronLeft, null),
      ),
      React.createElement(
        IconButton,
        {
          styleType: 'borderless',
          label: 'Move Left All',
          onClick: () =>
            transfer(appliedData, setAppliedData, setOptionData, true),
        },
        React.createElement(SvgChevronLeftDouble, null),
      ),
    ),
    React.createElement(
      TransferList.ListboxWrapper,
      null,
      React.createElement(TransferList.ListboxLabel, null, 'Applied'),
      React.createElement(
        TransferList.Listbox,
        null,
        appliedData.map((item, index) => {
          return React.createElement(
            TransferList.Item,
            {
              actionable: true,
              active: item.active,
              onActiveChange: (isActive) => {
                setAppliedData((oldData) => {
                  const newData = [...oldData];
                  const newObject = { ...newData[index] };
                  newObject.active = isActive;
                  newData[index] = newObject;
                  return newData;
                });
              },
            },
            item.name,
          );
        }),
      ),
    ),
  );
};
