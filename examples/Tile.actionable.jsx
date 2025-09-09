/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, Badge } from '@itwin/itwinui-react';

export default () => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Tile.Wrapper isSelected={selected}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>
          <Tile.Action onClick={() => setSelected((prev) => !prev)}>
            Stadium
          </Tile.Action>
        </Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1167' />
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>This Tile is going to be selected.</Tile.Description>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};
