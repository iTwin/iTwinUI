/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ButtonGroup,
  DropdownMenu,
  IconButton,
  MenuItem,
} from '@itwin/itwinui-react';
import { SvgMore, SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default () => {
  const buttons = Array.from({ length: 12 }, (_, index) => (
    <IconButton key={index} label={`Item #${index}`}>
      <SvgPlaceholder />
    </IconButton>
  ));

  return (
    <div className='demo-container'>
      <ButtonGroup
        overflowButton={(overflowStart) => (
          <DropdownMenu
            menuItems={(close) =>
              Array(buttons.length - overflowStart)
                .fill(null)
                .map((_, _index) => {
                  const index = overflowStart + _index;
                  return (
                    <MenuItem
                      key={index}
                      onClick={close}
                      startIcon={<SvgPlaceholder />}
                    >
                      Item #{index}
                    </MenuItem>
                  );
                })
            }
          >
            <IconButton label='More'>
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        )}
      >
        {buttons}
      </ButtonGroup>
    </div>
  );
};
