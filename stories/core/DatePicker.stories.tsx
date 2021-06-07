/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { useEffect, useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DatePicker, IconButton, TimePicker } from '../../src/core';
import {
  DatePickerProps,
  generateLocalizedStrings,
} from '../../src/core/DatePicker/DatePicker';
import SvgCalendar from '@itwin/itwinui-icons-react/cjs/icons/Calendar';

export default {
  title: 'Core/DatePicker',
  component: DatePicker,
  subcomponents: { TimePicker },
  argTypes: {
    onChange: { control: { disable: true } },
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    date: { control: 'date' },
    setFocus: { defaultValue: true },
  },
} as Meta<DatePickerProps>;

export const Basic: Story<DatePickerProps> = (args) => {
  const { date = new Date(), setFocus = true, localizedNames, ...rest } = args;
  const [opened, setOpened] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  useEffect(() => {
    setCurrentDate(new Date(date));
    return () => action('', { clearOnStoryChange: true })();
  }, [date]);
  return (
    <>
      <IconButton onClick={() => setOpened(!opened)}>
        <SvgCalendar />
      </IconButton>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
      {opened && (
        <div style={{ marginTop: 4 }}>
          <DatePicker
            {...rest}
            date={currentDate}
            onChange={onChange}
            localizedNames={localizedNames}
            setFocus={setFocus}
          />
        </div>
      )}
    </>
  );
};

Basic.args = {
  date: new Date(),
};

export const WithTime: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(),
    setFocus = true,
    showTime = true,
    localizedNames,
    ...rest
  } = args;
  const [opened, setOpened] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  useEffect(() => {
    setCurrentDate(new Date(date));
    return () => action('', { clearOnStoryChange: true })();
  }, [date]);
  return (
    <>
      <IconButton onClick={() => setOpened(!opened)}>
        <SvgCalendar />
      </IconButton>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
      {opened && (
        <div style={{ marginTop: 4 }}>
          <DatePicker
            {...rest}
            date={currentDate}
            onChange={onChange}
            localizedNames={localizedNames}
            setFocus={setFocus}
            showTime={showTime}
          />
        </div>
      )}
    </>
  );
};

WithTime.args = {
  date: new Date(),
  setFocus: true,
  showTime: true,
};

export const Localized: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(),
    setFocus = true,
    localizedNames = generateLocalizedStrings('ja'),
    ...rest
  } = args;
  const [opened, setOpened] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  useEffect(() => {
    setCurrentDate(new Date(date));
    return () => action('', { clearOnStoryChange: true })();
  }, [date]);
  return (
    <>
      <IconButton onClick={() => setOpened(!opened)}>
        <SvgCalendar />
      </IconButton>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
      {opened && (
        <div style={{ marginTop: 4 }}>
          <DatePicker
            {...rest}
            date={currentDate}
            onChange={onChange}
            localizedNames={localizedNames}
            setFocus={setFocus}
          />
        </div>
      )}
    </>
  );
};

Localized.args = {
  date: new Date(),
  localizedNames: generateLocalizedStrings('ja'),
};
