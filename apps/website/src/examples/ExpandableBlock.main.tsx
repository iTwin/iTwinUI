/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <ExpandableBlock title='Basic Block #1'>Content in block!</ExpandableBlock>
      <ExpandableBlock title='Basic Block #2'>Content in block!</ExpandableBlock>
      <ExpandableBlock title='Basic Block #3'>Content in block!</ExpandableBlock>
    </div>
  );
};
