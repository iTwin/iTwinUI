/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import { SvgSmileyHappy } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    'div',
    { style: { width: 'min(100%, 300px)' } },
    React.createElement(
      ExpandableBlock,
      { status: 'positive', title: 'Positive block' },
      'Content in block!',
    ),
    React.createElement(
      ExpandableBlock,
      { status: 'negative', title: 'Negative block' },
      'Content in block!',
    ),
    React.createElement(
      ExpandableBlock,
      { status: 'warning', title: 'Warning block' },
      'Content in block!',
    ),
    React.createElement(
      ExpandableBlock,
      { status: 'informational', title: 'Informational block' },
      'Content in block!',
    ),
    React.createElement(
      ExpandableBlock,
      {
        endIcon: React.createElement(SvgSmileyHappy, null),
        title: 'Happy block',
      },
      'Content in block!',
    ),
  );
};
