/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, MenuItem } from '@itwin/itwinui-react';
import { SvgImodelHollow } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile status='positive'>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Tile Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1}>Item 1</MenuItem>
          <MenuItem key={2}>Item 2</MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <span>Tile with status</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
