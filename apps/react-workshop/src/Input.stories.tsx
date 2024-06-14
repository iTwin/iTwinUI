/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Input } from '@itwin/itwinui-react';

export default {
  title: 'Input',
};

export const Basic = () => {
  return <Input placeholder='Basic Input' />;
};

export const Disabled = () => {
  return <Input placeholder='Disabled Input' disabled={true} />;
};

export const Small = () => {
  return <Input placeholder='Small Input' size='small' />;
};

export const Status = () => {
  return <Input placeholder='Positive Input' status='positive' />;
};
