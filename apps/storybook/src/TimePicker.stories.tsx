/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  TimePicker,
  InputWithDecorations,
  MeridiemType,
  Popover,
} from '@itwin/itwinui-react';
import SvgCalendar from '@itwin/itwinui-icons-react/cjs/icons/Calendar';

export default {
  title: 'Core/TimePicker',
  component: TimePicker,
};

export const Basic = () => {
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 55, 22),
  );
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New Time value: ${date}`, { clearOnStoryChange: false })();
  };
  return (
    <>
      <InputWithDecorations style={{ width: 150 }} id='time-input'>
        <InputWithDecorations.Input
          value={currentDate.toLocaleTimeString('en-US', {
            timeStyle: 'short',
          })}
          readOnly
        />

        <Popover
          applyBackground
          placement='bottom-end'
          content={
            <TimePicker
              date={currentDate}
              onChange={onChange}
              setFocusHour
              use12Hours={false}
            />
          }
        >
          <InputWithDecorations.Button>
            <SvgCalendar />
          </InputWithDecorations.Button>
        </Popover>
      </InputWithDecorations>
    </>
  );
};

export const CustomRenderers = () => {
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 55, 22),
  );
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New Time value: ${date}`, { clearOnStoryChange: false })();
  };

  return (
    <>
      <InputWithDecorations style={{ width: 200 }} id='time-input'>
        <InputWithDecorations.Input
          value={currentDate.toLocaleTimeString('en-US', {
            timeStyle: 'short',
          })}
          readOnly
        />
        <Popover
          applyBackground
          placement='bottom-end'
          content={
            <TimePicker
              date={currentDate}
              onChange={onChange}
              setFocusHour
              use12Hours={false}
              hourRenderer={(date: Date) =>
                date.getHours() === 1
                  ? `${date.getHours()} hr`
                  : `${date.getHours()} hrs`
              }
              minuteRenderer={(date: Date) =>
                date.getMinutes() === 1
                  ? `${date.getMinutes()} min`
                  : `${date.getMinutes()} mins`
              }
              meridiemRenderer={(meridiem: MeridiemType) =>
                meridiem === 'AM' ? 'Before' : 'After'
              }
            />
          }
        >
          <InputWithDecorations.Button>
            <SvgCalendar />
          </InputWithDecorations.Button>
        </Popover>
      </InputWithDecorations>
    </>
  );
};

export const Combined = () => {
  const [currentDate, setCurrentDate] = React.useState(
    new Date(2021, 4, 11, 14, 55, 30),
  );
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New Time value: ${date}`, { clearOnStoryChange: false })();
  };
  const inputValueType = 'short';

  return (
    <>
      <InputWithDecorations style={{ width: 150 }} id='time-input'>
        <InputWithDecorations.Input
          value={currentDate.toLocaleTimeString('en-US', {
            timeStyle: inputValueType,
          })}
          readOnly
        />
        <Popover
          applyBackground
          placement='bottom-end'
          content={
            <TimePicker
              date={currentDate}
              onChange={onChange}
              setFocusHour
              useCombinedRenderer
              precision={'minutes'}
              hourStep={1}
              minuteStep={1}
              secondStep={15}
              use12Hours
            />
          }
        >
          <InputWithDecorations.Button>
            <SvgCalendar />
          </InputWithDecorations.Button>
        </Popover>
      </InputWithDecorations>
    </>
  );
};
