---
'@itwin/itwinui-react': minor
'@itwin/itwinui-css': minor
---

- Added data attribute 'data-iui-overflow' - when true it adds styling for overflow tabs
- Added property 'overflowOptions' - contains `useOverflow`, which when true enables tabs to scroll if there's overflow

```typescript
const [index, setIndex] = React.useState(0);
return (
  <Tabs
    overflowButton={{ useOverflow: true }}
    onTabSelected={setIndex}
    activeIndex={index}
  >
    {tabs}
  </Tabs>
);
```
