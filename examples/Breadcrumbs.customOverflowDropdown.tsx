/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Breadcrumbs,
  DropdownMenu,
  MenuItem,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  const items = Array(10)
    .fill(null)
    .map((_, index) => (
      <Breadcrumbs.Item onClick={() => {}} key={index}>
        Item {index}
      </Breadcrumbs.Item>
    ));

  return (
    <div
      style={{
        width: '75%',
        minWidth: 150,
        maxWidth: 425,
        border: '1px solid lightpink',
        padding: 8,
      }}
    >
      <Breadcrumbs
        overflowButton={(visibleCount: number) => (
          <DropdownMenu
            menuItems={(close) =>
              Array(items.length - visibleCount)
                .fill(null)
                .map((_, _index) => {
                  const index = visibleCount > 1 ? _index + 1 : _index;
                  const onClick = () => {
                    // open breadcrumb
                    close();
                  };
                  return (
                    <MenuItem key={index} onClick={onClick}>
                      Item {index}
                    </MenuItem>
                  );
                })
            }
          >
            <IconButton
              aria-label='Dropdown with more breadcrumbs'
              styleType='borderless'
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        )}
      >
        {items}
      </Breadcrumbs>
    </div>
  );
};
