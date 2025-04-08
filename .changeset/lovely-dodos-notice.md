---
'@itwin/itwinui-react': minor
---

Passing the `name` prop to `<Tile.Name>` now internally wraps the name with `<Tile.NameLabel>` to make the behavior consistent with the composition API.

i.e. The following two examples are now equivalent:

```tsx
<Tile.Name name="My Tile" />
```

```tsx
<Tile.Name>
  <Tile.NameLabel>My Tile</Tile.NameLabel>
</Tile.Name>
```
