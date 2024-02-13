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
import './ButtonGroup.overflow.css';

export default () => {
  const buttons = Array(12)
    .fill(null)
    .map((_, _index) => {
      return (
        <IconButton label='Placeholder'>
          <SvgPlaceholder />
        </IconButton>
      );
    });

  return (
    <div className='overflow-button-group-container'>
      <ButtonGroup
        overflowButton={(overflowStart) => (
          <DropdownMenu
            menuItems={(close) =>
              Array(buttons.length - overflowStart + 1)
                .fill(null)
                .map((_, _index) => {
                  const index = overflowStart + _index;
                  const onClick = () => {
                    close();
                  };
                  return (
                    <MenuItem
                      key={index}
                      onClick={onClick}
                      startIcon={<SvgPlaceholder />}
                    >
                      Button #{index}
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
