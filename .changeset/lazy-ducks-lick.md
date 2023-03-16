---
'@itwin/itwinui-react': minor
---

Added `LinkBox` and `LinkAction`components to improve components with action accessibility.

Usage:
```js
<LinkBox>
  <LinkAction href='/new-page'>Link to click</LinkAction>
</LinkBox>
```

Added `Tile.Action` to take advantage of these new a11y components in Tile.

Usage:
```js
<Tile 
  name={<LinkAction as='button' onClick={() => {/* Do things */}}>Tile name that is also a button</LinkAction>}
/>
```
