/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  DatePicker,
  IconButton,
  Popover,
  generateLocalizedStrings,
} from '@itwin/itwinui-react';
import { SvgCalendar } from '@itwin/itwinui-icons-react';

export default {
  title: 'DatePicker',
};

export const Basic = () => {
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 55, 22),
  );
  const onChange = (date: Date) => {
    setCurrentDate(date);
    console.log(`New date value: ${date}`);
  };

  return (
    <>
      <Popover
        content={
          <DatePicker
            date={currentDate}
            onChange={onChange}
            setFocus
            showDatesOutsideMonth={false}
          />
        }
      >
        <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
    </>
  );
};

export const WithTime = () => {
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 55, 22),
  );
  const onChange = (date: Date) => {
    setCurrentDate(date);
    console.log(`New date value: ${date}`);
  };

  return (
    <>
      <Popover
        content={
          <DatePicker
            date={currentDate}
            onChange={onChange}
            setFocus
            showTime
            showDatesOutsideMonth={false}
          />
        }
      >
        <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
    </>
  );
};

export const WithCombinedTime = () => {
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 30, 0),
  );
  const onChange = (date: Date) => {
    setCurrentDate(date);
    console.log(`New date value: ${date}`);
  };

  return (
    <>
      <Popover
        content={
          <DatePicker
            date={currentDate}
            onChange={onChange}
            setFocus
            showTime
            useCombinedRenderer
            minuteStep={30}
            use12Hours
            showDatesOutsideMonth={false}
          />
        }
      >
        <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
    </>
  );
};

export const Localized = () => {
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 55, 22),
  );
  const onChange = (date: Date) => {
    setCurrentDate(date);
    console.log(`New date value: ${date}`);
  };

  return (
    <>
      <Popover
        content={
          <DatePicker
            date={currentDate}
            onChange={onChange}
            localizedNames={generateLocalizedStrings('ja')}
            setFocus
            showDatesOutsideMonth={false}
          />
        }
      >
        <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
    </>
  );
};
export const WithYear = () => {
  const [opened, setOpened] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 55, 22),
  );
  const onChange = (date: Date) => {
    setCurrentDate(date);
    console.log(`New date value: ${date}`);
  };
  return (
    <>
      <Popover
        content={
          <DatePicker
            showYearSelection
            date={currentDate}
            onChange={onChange}
            setFocus
          />
        }
      >
        <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
    </>
  );
};

export const Range = () => {
  const [opened, setOpened] = React.useState(false);
  const [currentStartDate, setCurrentStartDate] = React.useState(
    new Date(2022, 6, 13, 14, 55, 22),
  );
  const [currentEndDate, setCurrentEndDate] = React.useState(
    new Date(2022, 6, 27, 14, 55, 22),
  );
  const onChange = (startDate: Date, endDate?: Date) => {
    setCurrentStartDate(startDate);
    endDate && setCurrentEndDate(endDate);
    console.log(`New start date value: ${startDate}`, {
      clearOnStoryChange: false,
    });
    endDate &&
      console.log(`New end date value: ${endDate}`, {
        clearOnStoryChange: false,
      });
  };
  return (
    <>
      <Popover
        content={
          <DatePicker
            enableRangeSelect
            startDate={currentStartDate}
            endDate={currentEndDate}
            onChange={onChange}
            setFocus
            showDatesOutsideMonth={false}
          />
        }
      >
        <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span style={{ marginLeft: 16 }}>
        Start Date: {currentStartDate.toString()}
      </span>
      <span style={{ marginLeft: 16 }}>
        End Date: {currentEndDate.toString()}
      </span>
    </>
  );
};

export const SomeDatesDisabled = () => {
  const [opened, setOpened] = React.useState(false);
  const [currentStartDate, setCurrentStartDate] = React.useState(
    new Date(2022, 6, 13, 14, 55, 22),
  );
  const [currentEndDate, setCurrentEndDate] = React.useState(
    new Date(2022, 6, 17, 14, 55, 22),
  );

  // only allow selecting dates in July 11-22
  const isDateDisabled = (date: Date) => {
    if (date.getMonth() !== 6) {
      return true;
    }
    if (date.getDate() < 11 || date.getDate() > 22) {
      return true;
    }
    return false;
  };

  const onChange = (startDate: Date, endDate?: Date) => {
    setCurrentStartDate(startDate);
    endDate && setCurrentEndDate(endDate);
  };

  return (
    <>
      <Popover
        content={
          <DatePicker
            enableRangeSelect
            startDate={currentStartDate}
            endDate={currentEndDate}
            onChange={onChange}
            setFocus
            isDateDisabled={isDateDisabled}
            showDatesOutsideMonth={false}
          />
        }
      >
        <IconButton onClick={() => setOpened(!opened)} id='picker-button'>
          <SvgCalendar />
        </IconButton>
      </Popover>
      <span style={{ marginLeft: 16 }}>
        Start Date: {currentStartDate.toLocaleDateString()}
      </span>
      <span style={{ marginLeft: 16 }}>
        End Date: {currentEndDate.toLocaleDateString()}
      </span>
    </>
  );
};
