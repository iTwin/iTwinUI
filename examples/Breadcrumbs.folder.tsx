/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Breadcrumbs,
  DropdownMenu,
  MenuItem,
  Input,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgFolder } from '@itwin/itwinui-icons-react';

export default () => {
  const items = React.useMemo(
    () => ['Root', 'My files', 'Documents', 'Status reports'],
    [],
  );

  const [lastIndex, setLastIndex] = React.useState(items.length - 1);
  const [isEditing, setIsEditing] = React.useState(false);

  const breadcrumbItems = React.useMemo(
    () =>
      items.slice(0, lastIndex + 1).map((item, index) => (
        <Breadcrumbs.Item
          key={`Breadcrumb${index}`}
          onClick={() => {
            if (lastIndex !== index) {
              setLastIndex(index);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {item}
        </Breadcrumbs.Item>
      )),
    [items, lastIndex],
  );

  return (
    <div
      style={{ display: 'inline-flex', width: 418, justifyContent: 'center' }}
    >
      <DropdownMenu
        menuItems={(close) =>
          items.map((item, index) => (
            <MenuItem
              key={`Item${index}`}
              onClick={() => {
                setLastIndex(index);
                setIsEditing(false);
                close();
              }}
            >
              {item}
            </MenuItem>
          ))
        }
      >
        <IconButton styleType='borderless' label='All levels'>
          <SvgFolder />
        </IconButton>
      </DropdownMenu>

      {isEditing ? (
        <Input
          aria-label='Path'
          defaultValue={items.slice(0, lastIndex + 1).join('/')}
          onChange={({ target: { value } }) => {
            const lastItem = value.substring(
              value.lastIndexOf('/', value.length - 2) + 1,
            );
            setLastIndex(items.findIndex((item) => lastItem.includes(item)));
          }}
          onKeyDown={({ key }) => key === 'Enter' && setIsEditing(false)}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      )}
    </div>
  );
};
