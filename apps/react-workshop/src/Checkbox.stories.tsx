/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Checkbox } from '@itwin/itwinui-react';

export default {
  title: 'Checkbox',
};

export const Basic = () => {
  return <Checkbox label='Basic Checkbox' defaultChecked />;
};

export const Disabled = () => {
  return <Checkbox label='Disabled Checkbox' disabled />;
};
export const Indeterminate = () => {
  return <Checkbox label='Indeterminate Checkbox' indeterminate />;
};

export const Positive = () => {
  return <Checkbox label='Positive Checkbox' status='positive' />;
};
export const Warning = () => {
  return <Checkbox label='Warning Checkbox' status='warning' />;
};
export const Negative = () => {
  return <Checkbox label='Negative Checkbox' status='negative' />;
};

export const Loading = () => {
  return <Checkbox label='Loading Checkbox' isLoading />;
};

export const Visibility = () => {
  return <Checkbox label='Visibility Checkbox' variant='eyeball' />;
};
