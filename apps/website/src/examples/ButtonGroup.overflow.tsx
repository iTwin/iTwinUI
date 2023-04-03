/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, DropdownMenu, IconButton, MenuItem } from '@itwin/itwinui-react';
import {
  SvgAdd,
  SvgEdit,
  SvgDelete,
  SvgUndo,
  SvgMore,
  SvgPlaceholder,
} from '@itwin/itwinui-icons-react';

export default () => {
  const buttons = Array(12)
    .fill(null)
    .map((_, _index) => {
      return (
        <IconButton>
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
                    <MenuItem key={index} onClick={onClick} icon={<SvgPlaceholder />}>
                      Button #{index}
                    </MenuItem>
                  );
                })
            }
          >
            <IconButton>
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
