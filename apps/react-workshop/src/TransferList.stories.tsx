/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useState } from 'react';
import { TransferList, IconButton } from '@itwin/itwinui-react';
import {
  SvgChevronLeft,
  SvgChevronRight,
  SvgChevronLeftDouble,
  SvgChevronRightDouble,
} from '@itwin/itwinui-icons-react';

export default {
  title: 'TransferList',
};

export const Basic = () => {
  type TransferItemDataType = {
    name: string;
    active: boolean;
  };

  const [optionData, setOptionData] = useState([
    { name: 'Option 1', active: false },
    { name: 'Option 2', active: false },
    { name: 'Option 3', active: false },
    { name: 'Option 4', active: false },
    { name: 'Option 5', active: false },
    { name: 'Option 6', active: false },
  ]);

  const [appliedData, setAppliedData] = useState([
    { name: 'Option 7', active: false },
  ]);

  const transfer = (
    fromData: Array<TransferItemDataType>,
    setFromData: React.Dispatch<React.SetStateAction<TransferItemDataType[]>>,
    setToData: React.Dispatch<React.SetStateAction<TransferItemDataType[]>>,
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
      return newToData as TransferItemDataType[];
    });
  };

  return (
    <TransferList>
      <TransferList.ListboxWrapper>
        <TransferList.Listbox>
          {optionData?.map((item, index) => {
            return (
              <TransferList.Item
                key={item.name}
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
                key={item.name}
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

export const WithLabel = () => {
  type TransferItemDataType = {
    name: string;
    active: boolean;
  };

  const [optionData, setOptionData] = useState([
    { name: 'Option 1', active: false },
    { name: 'Option 2', active: false },
    { name: 'Option 3', active: false },
    { name: 'Option 4', active: false },
    { name: 'Option 5', active: false },
    { name: 'Option 6', active: false },
  ]);

  const [appliedData, setAppliedData] = useState([
    { name: 'Option 7', active: false },
  ]);

  const transfer = (
    fromData: Array<TransferItemDataType>,
    setFromData: React.Dispatch<React.SetStateAction<TransferItemDataType[]>>,
    setToData: React.Dispatch<React.SetStateAction<TransferItemDataType[]>>,
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
    <TransferList>
      <TransferList.ListboxWrapper>
        <TransferList.ListboxLabel>Options</TransferList.ListboxLabel>
        <TransferList.Listbox>
          {optionData?.map((item, index) => {
            return (
              <TransferList.Item
                key={item.name}
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
                key={item.name}
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
