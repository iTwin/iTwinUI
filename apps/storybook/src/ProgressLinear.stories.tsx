/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable react/jsx-key */
import SvgStatusErrorHollow from '@itwin/itwinui-icons-react/cjs/icons/StatusErrorHollow';
import SvgStatusSuccessHollow from '@itwin/itwinui-icons-react/cjs/icons/StatusSuccessHollow';
import React from 'react';
import { ProgressLinear, Icon } from '@itwin/itwinui-react';

export default {
  title: 'ProgressIndicators/ProgressLinear',
  component: ProgressLinear,
};

export const Determinate = () => {
  return <ProgressLinear value={50} />;
};

export const DeterminateAnimated = () => {
  return <ProgressLinear value={50} isAnimated />;
};

export const Indeterminate = () => {
  return <ProgressLinear indeterminate />;
};

export const LabeledCenter = () => {
  return <ProgressLinear value={50} labels={['Centered Label']} />;
};

export const LabeledLeftRight = () => {
  return <ProgressLinear value={50} labels={['Loading...', '50%']} />;
};

export const Positive = () => {
  return (
    <ProgressLinear
      value={100}
      labels={[
        'Upload done!',
        <Icon>
          <SvgStatusSuccessHollow />
        </Icon>,
      ]}
      status='positive'
    />
  );
};

export const Negative = () => {
  return (
    <ProgressLinear
      value={45}
      labels={[
        'Upload failed',
        <Icon>
          <SvgStatusErrorHollow />
        </Icon>,
      ]}
      status='negative'
    />
  );
};
