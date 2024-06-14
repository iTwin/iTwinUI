/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ProgressRadial } from '@itwin/itwinui-react';

export default {
  title: 'ProgressRadial',
};

export const Determinate = () => {
  return <ProgressRadial value={50} />;
};

export const Indeterminate = () => {
  return <ProgressRadial indeterminate />;
};

export const Positive = () => {
  return <ProgressRadial status={'positive'} value={50} />;
};

export const Negative = () => {
  return <ProgressRadial status={'negative'} value={50} />;
};

export const Warning = () => {
  return <ProgressRadial status={'warning'} value={50} />;
};

export const DeterminateWithContent = () => {
  return <ProgressRadial value={50}>50</ProgressRadial>;
};
