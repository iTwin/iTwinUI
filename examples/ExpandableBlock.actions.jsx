/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock, IconButton } from '@itwin/itwinui-react';
import { SvgMoreVertical } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger
          label='My disclosure'
          endIcon={
            <IconButton
              label='More options'
              styleType='borderless'
              size='small'
              onClick={() => console.log('Clicked more options')}
            >
              <SvgMoreVertical />
            </IconButton>
          }
        />

        <ExpandableBlock.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          doloremque sint nobis harum. Harum atque, minima in aliquid nostrum
          corporis.
        </ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
    </div>
  );
};
