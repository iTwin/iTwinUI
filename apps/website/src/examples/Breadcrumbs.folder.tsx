/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Button,
  IconButton,
  Breadcrumbs,
  DropdownButton,
  DropdownMenu,
  MenuItem,
  Input,
} from '@itwin/itwinui-react';
import { SvgFolder } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div style={{ display: 'inline-flex', marginBottom: 128 }}>
      <DropdownButton
        startIcon={<SvgFolder aria-hidden />}
        styleType='borderless'
        menuItems={(close) => [
          <MenuItem key={1} onClick={close}>
            Root
          </MenuItem>,
          <MenuItem key={2} onClick={close}>
            My files
          </MenuItem>,
          <MenuItem key={3} onClick={close}>
            Documents
          </MenuItem>,
          <MenuItem key={4} onClick={close}>
            Status reports
          </MenuItem>,
          <MenuItem key={5} onClick={close}>
            December
          </MenuItem>,
        ]}
      />
      <Breadcrumbs>
        <Button key={0} onClick={() => {}}>
          Root
        </Button>
        <Button key={1} onClick={() => {}}>
          My files
        </Button>
        <Button key={2} onClick={() => {}}>
          Documents
        </Button>
        <Button key={3} onClick={() => {}}>
          Status reports
        </Button>
        <Button key={4} onClick={() => {}}>
          December
        </Button>
      </Breadcrumbs>
    </div>
  );
};
