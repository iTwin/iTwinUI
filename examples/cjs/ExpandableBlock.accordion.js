/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    { style: { width: 'min(100%, 300px)' } },
    React.createElement(
      ExpandableBlock,
      { title: 'Block #1' },
      'Content in block!',
    ),
    React.createElement(
      ExpandableBlock,
      { title: 'Block #2' },
      'Content in block!',
    ),
    React.createElement(
      ExpandableBlock,
      { title: 'Block #3' },
      'Content in block!',
    ),
  );
};
