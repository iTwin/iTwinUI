/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Badge } from '@itwin/itwinui-react';

export default {
  title: 'Badge',
};

export const Basic = () => {
  return <Badge backgroundColor='skyblue'>Label</Badge>;
};

export const LongLabel = () => {
  return (
    <Badge backgroundColor='skyblue'>Long label that gets truncated</Badge>
  );
};

export const Statuses = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge backgroundColor='positive'>Success</Badge>
      <Badge backgroundColor='negative'>Error</Badge>
      <Badge backgroundColor='primary'>Informational</Badge>
      <Badge backgroundColor='warning'>Warning</Badge>
    </div>
  );
};
