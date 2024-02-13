/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import './ExpandableBlock.main.css';

export default () => {
  return (
    <div className='main-expandable-block-container'>
      <ExpandableBlock title='Expandable Block'>
        Content in block!
      </ExpandableBlock>
    </div>
  );
};
