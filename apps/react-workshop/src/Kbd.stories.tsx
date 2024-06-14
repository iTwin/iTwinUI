/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Kbd, KbdKeys } from '@itwin/itwinui-react';

export default {
  title: 'Keyboard Key',
};

export const Basic = () => {
  return <Kbd>A</Kbd>;
};

export const PredefinedKey = () => {
  return <Kbd>{KbdKeys.Enter}</Kbd>;
};
