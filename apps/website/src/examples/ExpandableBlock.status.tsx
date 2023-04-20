/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import { SvgSmileyHappy } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <ExpandableBlock status='positive' title='Positive block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock status='negative' title='Negative block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock status='warning' title='Warning block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock status='informational' title='Informational block'>
        Content in block!
      </ExpandableBlock>
      <ExpandableBlock endIcon={<SvgSmileyHappy />} title='Happy block'>
        Content in block!
      </ExpandableBlock>
    </div>
  );
};
