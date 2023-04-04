/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import { SvgSmileyHappy } from '@itwin/itwinui-react/cjs/core/utils';

export default () => {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <ExpandableBlock status='positive' title='Positive expandable block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock status='negative' title='Negative expandable block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock status='warning' title='Warning expandable block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock status='informational' title='Informational expandable block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock endIcon={<SvgSmileyHappy />} title='Positive expandable block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock status='positive' title='Positive expandable block'>
        Content in block!
      </ExpandableBlock>
    </div>
  );
};
