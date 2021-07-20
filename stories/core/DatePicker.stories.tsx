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
import { CreeveyMeta } from 'creevey';

export default {
  title: 'Core/DatePicker',
  component: DatePicker,
  subcomponents: { TimePicker },
  argTypes: {
    onChange: { control: { disable: true } },
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    date: { control: 'date' },
  },
  args: {
    setFocus: true,
  },
  parameters: {
    creevey: {
      ignoreElements: ['#picker-button + span'],
      tests: {
        async open() {
          const button = await this.browser.findElement({
            id: 'picker-button',
          });

          await this.browser.actions().click(button).perform();
          await this.expect(await this.takeScreenshot()).to.matchImage(
            'opened',
          );
        },
      },
    },
  },
} as Meta<DatePickerProps> & CreeveyMeta;

export const Basic: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(2021, 4, 11, 14, 55, 22),
    setFocus = true,
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
      <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
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
  date: new Date(2021, 4, 11, 14, 55, 22),
};

export const WithTime: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(2021, 4, 11, 14, 55, 22),
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
      <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
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
  date: new Date(2021, 4, 11, 14, 55, 22),
  setFocus: true,
  showTime: true,
};

export const Localized: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(2021, 4, 11, 14, 55, 22),
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
      <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
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
  date: new Date(2021, 4, 11, 14, 55, 22),
  localizedNames: generateLocalizedStrings('ja'),
};
