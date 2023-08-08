/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Text } from '@itwin/itwinui-react';
import { useId } from '../packages/itwinui-react/src/core/utils/hooks/index.js';
import {
  SvgSmileyHappyVery,
  SvgSmileySadVery,
} from '@itwin/itwinui-icons-react';

export default () => {
  const labelId = useId();

  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <Text id={labelId} as='label' variant='leading'>
        Choose a happiness level
      </Text>
      <Slider
        thumbProps={() => {
          return {
            'aria-labelledby': labelId,
          };
        }}
        values={[50]}
        minLabel={<SvgSmileySadVery />}
        maxLabel={<SvgSmileyHappyVery />}
        tickLabels={['0', '20', '40', '60', '80', '100']}
        min={0}
        max={100}
        step={10}
      />
    </div>
  );
};
