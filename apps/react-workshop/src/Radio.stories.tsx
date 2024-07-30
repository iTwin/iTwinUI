/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Radio } from '@itwin/itwinui-react';

export default {
  title: 'Radio',
};

export const Basic = () => {
  return <Radio label='Choose me!' defaultChecked />;
};

export const Disabled = () => {
  return <Radio disabled label='Cannot choose me!' />;
};

export const Positive = () => {
  return <Radio status='positive' label='Positive!' />;
};

export const Warning = () => {
  return <Radio status='warning' label='Careful!' />;
};

export const Negative = () => {
  return <Radio status='negative' label='Bad idea...' />;
};
