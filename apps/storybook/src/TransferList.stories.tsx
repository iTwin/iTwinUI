/* eslint-disable react/jsx-key */
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  TransferList,
  TransferListProps,
  IconButton,
} from '@itwin/itwinui-react';

import {
  SvgChevronLeft,
  SvgChevronRight,
  SvgChevronLeftDouble,
  SvgChevronRightDouble,
} from '@itwin/itwinui-icons-react';

export default {
  component: TransferList,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Core/TransferList',
} as Meta<TransferListProps>;

export const Basic: Story<TransferListProps> = (args) => {
  const [data, setData] = React.useState([
    { name: 'Item 1', active: false },
    { name: 'Item 2', active: false },
    { name: 'Item 3', active: false },
    { name: 'Item 4', active: false },
    { name: 'Item 5', active: false },
    { name: 'Item 6', active: false },
  ]);

  return (
    <TransferList {...args}>
      <TransferList.Area>
        <TransferList.List role={'listbox'}>
          {data.map((item, index) => {
            return (
              <TransferList.ListItem
                actionable
                active={item.active}
                onActiveChange={(isActive: boolean) => {
                  setData((oldData) => {
                    const newData = [...oldData];
                    const newObject = { ...newData[index] };
                    newObject.active = !isActive;
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
Basic.args = {};

export const WithLabel: Story<TransferListProps> = (args) => {
  const [data, setData] = React.useState([
    { name: 'Option 1', active: false },
    { name: 'Option 2', active: false },
    { name: 'Option 3', active: false },
    { name: 'Option 4', active: false },
    { name: 'Option 5', active: false },
    { name: 'Option 6', active: false },
  ]);

  const onDataEdit = React.useCallback((isActive: boolean, index: number) => {
    setData((oldData) => {
      const newData = [...oldData];
      const newObject = { ...newData[index] };
      newObject.active = !isActive;
      newData[index] = newObject;
      return newData;
    });
  }, []);

  return (
    <TransferList {...args}>
      <TransferList.Area>
        <TransferList.Label>Options</TransferList.Label>
        <TransferList.List role={'listbox'}>
          {data.map((item, index) => {
            return (
              <TransferList.ListItem
                actionable
                active={item.active}
                onActiveChange={onDataEdit(item.active, index)}
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
WithLabel.args = {};

export const WithToolbar: Story<TransferListProps> = (args) => {
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

  const [appliedData, setAppliedData] = React.useState([
    { name: 'Option 7', active: false },
  ]);

  const transfer = (
    fromData: Array<TransferItemDataType>,
    setFromData: (data: Array<TransferItemDataType>) => void,
    setToData: (data: Array<TransferItemDataType>) => void,
    sendAll?: boolean,
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
    <TransferList {...args}>
      <TransferList.Area>
        <TransferList.Label>Options</TransferList.Label>
        <TransferList.List role={'listbox'}>
          {optionData?.map((item, index) => {
            return (
              <TransferList.ListItem
                actionable
                active={item.active}
                onActiveChange={(isActive: boolean) => {
                  setOptionData((oldData) => {
                    const newData = [...oldData];
                    const newObject = { ...newData[index] };
                    newObject.active = !isActive;
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
          onClick={() =>
            transfer(optionData, setOptionData, setAppliedData, false)
          }
        >
          <SvgChevronRight />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          onClick={() =>
            transfer(appliedData, setAppliedData, setOptionData, false)
          }
        >
          <SvgChevronLeft />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          onClick={() =>
            transfer(appliedData, setAppliedData, setOptionData, true)
          }
        >
          <SvgChevronLeftDouble />
        </IconButton>
      </TransferList.Toolbar>
      <TransferList.Area>
        <TransferList.Label>Applied</TransferList.Label>
        <TransferList.List role={'listbox'}>
          {appliedData.map((item, index) => {
            return (
              <TransferList.ListItem
                actionable
                active={item.active}
                onActiveChange={(isActive: boolean) => {
                  setAppliedData((oldData) => {
                    const newData = [...oldData];
                    const newObject = { ...newData[index] };
                    newObject.active = !isActive;
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
WithToolbar.args = {};
