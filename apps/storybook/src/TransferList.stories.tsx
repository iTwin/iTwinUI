/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable react/jsx-key */
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { TransferList, IconButton } from '@itwin/itwinui-react';

import {
  SvgChevronLeft,
  SvgChevronRight,
  SvgChevronLeftDouble,
  SvgChevronRightDouble,
} from '@itwin/itwinui-icons-react';

type TransferListProps = React.ComponentProps<typeof TransferList>;

export default {
  component: TransferList,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Core/TransferList',
} as Meta<TransferListProps>;

export const Basic: Story<TransferListProps> = (args) => {
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
      <TransferList.ListboxWrapper>
        <TransferList.Listbox>
          {optionData?.map((item, index) => {
            return (
              <TransferList.Item
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
              </TransferList.Item>
            );
          })}
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
      <TransferList.Toolbar>
        <IconButton
          styleType={'borderless'}
          label={'Move Right All'}
          onClick={() => {
            transfer(optionData, setOptionData, setAppliedData, true);
          }}
        >
          <SvgChevronRightDouble />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          label={'Move Right'}
          onClick={() =>
            transfer(optionData, setOptionData, setAppliedData, false)
          }
        >
          <SvgChevronRight />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          label={'Move Left'}
          onClick={() =>
            transfer(appliedData, setAppliedData, setOptionData, false)
          }
        >
          <SvgChevronLeft />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          label={'Move Left All'}
          onClick={() =>
            transfer(appliedData, setAppliedData, setOptionData, true)
          }
        >
          <SvgChevronLeftDouble />
        </IconButton>
      </TransferList.Toolbar>
      <TransferList.ListboxWrapper>
        <TransferList.Listbox>
          {appliedData.map((item, index) => {
            return (
              <TransferList.Item
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
              </TransferList.Item>
            );
          })}
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
    </TransferList>
  );
};
Basic.args = {};

export const WithLabel: Story<TransferListProps> = (args) => {
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
      <TransferList.ListboxWrapper>
        <TransferList.ListboxLabel>Options</TransferList.ListboxLabel>
        <TransferList.Listbox>
          {optionData?.map((item, index) => {
            return (
              <TransferList.Item
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
              </TransferList.Item>
            );
          })}
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
      <TransferList.Toolbar>
        <IconButton
          styleType={'borderless'}
          label={'Move Right All'}
          onClick={() => {
            transfer(optionData, setOptionData, setAppliedData, true);
          }}
        >
          <SvgChevronRightDouble />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          label={'Move Right'}
          onClick={() =>
            transfer(optionData, setOptionData, setAppliedData, false)
          }
        >
          <SvgChevronRight />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          label={'Move Left'}
          onClick={() =>
            transfer(appliedData, setAppliedData, setOptionData, false)
          }
        >
          <SvgChevronLeft />
        </IconButton>
        <IconButton
          styleType={'borderless'}
          label={'Move Left All'}
          onClick={() =>
            transfer(appliedData, setAppliedData, setOptionData, true)
          }
        >
          <SvgChevronLeftDouble />
        </IconButton>
      </TransferList.Toolbar>
      <TransferList.ListboxWrapper>
        <TransferList.ListboxLabel>Applied</TransferList.ListboxLabel>
        <TransferList.Listbox>
          {appliedData.map((item, index) => {
            return (
              <TransferList.Item
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
              </TransferList.Item>
            );
          })}
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
    </TransferList>
  );
};
WithLabel.args = {};
