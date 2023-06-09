/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, MenuItem, Badge, Button } from '@itwin/itwinui-react';
import { SvgImodelHollow } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile isDisabled={true}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Tile Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>
        </Tile.BadgeContainer>
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
      <Tile.Buttons>
        <Button disabled>Button</Button>
      </Tile.Buttons>
    </Tile>
  );
};
