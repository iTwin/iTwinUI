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
  const buttons = Array(12)
    .fill(null)
    .map((_, _index) => {
      return (
        <IconButton label='placeholder'>
          <SvgPlaceholder />
        </IconButton>
      );
    });

  return (
    <div style={{ maxWidth: '70%' }}>
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
            <IconButton label='more'>
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
