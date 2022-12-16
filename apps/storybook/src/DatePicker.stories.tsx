/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import {
  DatePicker,
  IconButton,
  TimePicker,
  DatePickerProps,
  generateLocalizedStrings,
} from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

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
} as Meta<DatePickerProps>;

export const Basic: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(2021, 4, 11, 14, 55, 22),
    setFocus = true,
    localizedNames,
    ...rest
  } = args;
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(date);
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  React.useEffect(() => {
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
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(date);
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  React.useEffect(() => {
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

export const WithCombinedTime: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(2021, 4, 11, 14, 55, 22),
    setFocus = true,
    showTime = true,
    useCombinedRenderer = true,
    use12Hours = true,
    localizedNames,
    ...rest
  } = args;
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(date);
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  React.useEffect(() => {
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
            useCombinedRenderer={useCombinedRenderer}
            use12Hours={use12Hours}
          />
        </div>
      )}
    </>
  );
};

WithCombinedTime.args = {
  date: new Date(2021, 4, 11, 14, 55, 22),
  setFocus: true,
  showTime: true,
  useCombinedRenderer: true,
  use12Hours: true,
};

export const Localized: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(2021, 4, 11, 14, 55, 22),
    setFocus = true,
    localizedNames = generateLocalizedStrings('ja'),
    ...rest
  } = args;
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(date);
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  React.useEffect(() => {
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

export const WithYear: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(2021, 4, 11, 14, 55, 22),
    setFocus = true,
    localizedNames,
    ...rest
  } = args;
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(date);
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  React.useEffect(() => {
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
            showYearSelection
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

WithYear.args = {
  date: new Date(2021, 4, 11, 14, 55, 22),
  showYearSelection: true,
};

export const Range: Story<DatePickerProps> = (args) => {
  const {
    setFocus = true,
    localizedNames,
    startDate = new Date(2022, 6, 13, 14, 55, 22),
    endDate = new Date(2022, 6, 27, 14, 55, 22),
    ...rest
  } = args;
  const [opened, setOpened] = React.useState(false);
  const [currentStartDate, setCurrentStartDate] = React.useState(startDate);
  const [currentEndDate, setCurrentEndDate] = React.useState(endDate);
  const onChange = (startDate: Date, endDate?: Date) => {
    setCurrentStartDate(startDate);
    endDate && setCurrentEndDate(endDate);
    action(`New start date value: ${startDate}`, {
      clearOnStoryChange: false,
    })();
    endDate &&
      action(`New end date value: ${endDate}`, { clearOnStoryChange: false })();
  };

  React.useEffect(() => {
    setCurrentStartDate(new Date(startDate));
    setCurrentEndDate(new Date(endDate));
    return () => action('', { clearOnStoryChange: true })();
  }, [startDate, endDate]);
  return (
    <>
      <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
        <SvgCalendar />
      </IconButton>
      <span style={{ marginLeft: 16 }}>
        Start Date: {currentStartDate.toString()}
      </span>
      <span style={{ marginLeft: 16 }}>
        End Date: {currentEndDate.toString()}
      </span>
      {opened && (
        <div style={{ marginTop: 4 }}>
          <DatePicker
            {...rest}
            enableRangeSelect
            startDate={currentStartDate}
            endDate={currentEndDate}
            onChange={onChange}
            localizedNames={localizedNames}
            setFocus={setFocus}
          />
        </div>
      )}
    </>
  );
};

Range.args = {
  startDate: new Date(2022, 6, 13, 14, 55, 22),
  endDate: new Date(2022, 6, 27, 14, 55, 22),
};
