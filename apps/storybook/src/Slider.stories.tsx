/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useMemo, useCallback, useState } from '@storybook/addons';
import { Text, Slider } from '@itwin/itwinui-react';
import SvgSmileyHappy from '@itwin/itwinui-icons-react/cjs/icons/SmileyHappy';
import SvgSmileySad from '@itwin/itwinui-icons-react/cjs/icons/SmileySad';

export default {
  title: 'Input/Slider',
  component: Slider,
  decorators: [
    (Story, context) => (
      <div
        style={{
          ...(context.story.includes('Vertical')
            ? { height: 'calc(100vh - 24px)', width: 'fit-content' }
            : {}),
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Basic = () => {
  return <Slider values={[50]} />;
};

export const Range = () => {
  return <Slider values={[20, 80]} min={0} max={100} />;
};

export const MultiThumbsAllowCrossing = () => {
  return (
    <Slider
      thumbProps={(index: number) => {
        const eventsIds = [
          'building-south',
          'building-north',
          'building-west',
          'building-east',
        ];
        const color = 0 == index % 2 ? 'blue' : 'red';
        return {
          style: { backgroundColor: color },
          id: `${eventsIds[index]}`,
        };
      }}
      values={[20, 40, 60, 80]}
      trackDisplayMode={'even-segments'}
      thumbMode={'allow-crossing'}
    />
  );
};

export const WithCustomThumb = () => {
  return (
    <Slider
      thumbProps={() => {
        return {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#999',
            width: '36px',
            height: '26px',
            borderRadius: '4px',
            transform: 'translateX(-19.2px)',
          },
          children: (
            <span
              style={{
                pointerEvents: 'none',
                marginBottom: '4px',
              }}
            >
              |||
            </span>
          ),
        };
      }}
      values={[50]}
      minLabel={<SvgSmileySad />}
      maxLabel={<SvgSmileyHappy />}
      railContainerProps={{ style: { margin: '0 8px' } }}
    />
  );
};

export const Disabled = () => {
  return <Slider min={0} max={60} values={[30]} disabled />;
};

export const CustomTooltip = () => {
  return (
    <Slider
      min={0}
      max={60}
      values={[20]}
      tickLabels={['0', '20', '40', '60']}
      tooltipProps={(index, val) => {
        return { placement: 'right', content: `\$${val}.00` };
      }}
    />
  );
};

export const CustomTickNoTooltip = () => {
  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat('default', {
      month: 'short',
      day: '2-digit',
      timeZone: 'UTC',
    });
  }, []);

  const [currentDate, setCurrentDate] = useState(
    new Date(Date.UTC(2019, 0, 1)),
  );

  const [values, setValues] = React.useState([0]);

  const updateDate = useCallback((values: number[]) => {
    setValues(values);
    const newDate = new Date(Date.UTC(2019, 0, values[0]));
    setCurrentDate(newDate);
  }, []);

  return (
    <>
      <Slider
        min={1}
        max={365}
        values={values}
        tooltipProps={() => {
          return { visible: false };
        }}
        minLabel={'Date'}
        maxLabel={''}
        orientation={'horizontal'}
        onUpdate={updateDate}
        onChange={updateDate}
        tickProps={{ className: 'some-tick' }}
      />
      <Text
        as='p'
        style={{
          textAlign: 'center',
        }}
      >
        {dateFormatter.format(currentDate)}
      </Text>
    </>
  );
};

CustomTickNoTooltip.decorators = [
  (Story) => (
    <div style={{ width: '50%' }}>
      <Story />
    </div>
  ),
];

export const DecimalIncrement = () => {
  return <Slider min={0} max={50} step={2.5} values={[25]} />;
};

export const Vertical = () => {
  return <Slider values={[50]} orientation='vertical' />;
};
