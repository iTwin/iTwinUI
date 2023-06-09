/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, MenuItem } from '@itwin/itwinui-react';
import { SvgFolder } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgFolder />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Folder Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ContentArea>
        <Tile.Description>Folder description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1}>Item 1</MenuItem>
          <MenuItem key={2}>Item 2</MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <span>Folder metadata</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
