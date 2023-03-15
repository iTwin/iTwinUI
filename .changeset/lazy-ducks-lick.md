---
'@itwin/itwinui-react': minor
---

Added `LinkBox` and `LinkOverlay`components to improve components with action accessibility.

Usage:
```js
<LinkBox>
  <LinkOverlay href='/new-page'>Link to click</LinkOverlay>
</LinkBox>
```

Added `Tile.Action` to take advantage of these new a11y components in Tile.

Usage:
```js
<Tile 
  name={<LinkOverlay as='button' onClick={() => {/* Do things */}}>Tile name that is also a button</LinkOverlay>}
/>
```
