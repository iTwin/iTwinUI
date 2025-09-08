/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, Badge } from '@itwin/itwinui-react';

export default () => {
  const [selected, setSelected] = React.useState(true);
  return (
    <Tile.Wrapper isSelected={selected}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>
          <Tile.Action onClick={() => setSelected((prev) => !prev)}>
            Selected Tile
          </Tile.Action>
        </Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='/assets/stadium.png' />
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>This tile is selected.</Tile.Description>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};
