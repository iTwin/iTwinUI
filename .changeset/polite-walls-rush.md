---
'@itwin/itwinui-react': major
---

Updated Tile component to be composition of customizable subcomponents with the following structure when all subcomponents are present:
```
    <Tile status isSelected isNew variant isActionable isLoading isDisabled >
      <Tile.Name>
        <Tile.NameIcon/>
        <Tile.NameLabel/>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer/>
        <Tile.ThumbnailPicture url />
        <Tile.TypeIndicator/>
        <Tile.QuickAction/>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description/>
        <Tile.MoreOptions/>
        <Tile.Metadata/>
      </Tile.ContentArea>
      <Tile.Buttons/>
    </Tile>
```
Certain props have been removed as they are now subcomponents: `name`, `description`, `metadata`, `thumbnail`, `badge`, `leftIcon`, `rightIcon`, `button`, `moreOptions` props have been removed.
