---
'@itwin/itwinui-react': minor
---

Added `Tile.Action` to take advantage of these new a11y components in Tile.

Usage:
```js
<Tile 
  name={<Tile.Action as='button' onClick={() => {/* Do things */}}>Tile name that is also a button</Tile.Action>}
/>
```
