/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, MenuItem } from '@itwin/itwinui-react';
import { SvgImodelHollow } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile.Wrapper isLoading={true}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Loading Tile</Tile.NameLabel>
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
          <span>Loading tile</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};
