---
'@itwin/itwinui-react': minor
'@itwin/itwinui-css': minor
---

- Added data attribute 'data-iui-overflow' - when true it adds styling for overflow tabs
- Added property 'overflowButton' - enables tabs to be truncated and an overflow button to be shown; expects a function that takes the number of items that are visible and returns the 'ReactNode' to render

```typescript
const [index, setIndex] = React.useState(0);
return (
  <Tabs
    overflowButton={(visibleCount) => (
      <DropdownMenu
        menuItems={(close) =>
          Array(items.length - visibleCount)
          .fill(null)
          .map((_, _index) => {
            const index = visibleCount + _index + 1;
            const onClick = () => {
              // click on "index" tab
              setIndex(index - 1);
              close();
            };
            return (
              <MenuItem key={index} onClick={onClick}>
                Item {index}
              </MenuItem>
            );
          })
        }
      >
        <IconButton style={{ paddingTop: '12px', margin: '4px', height: 'auto' }} styleType='borderless'>
          <SvgMoreSmall />
       </IconButton>
      </DropdownMenu>
    )}
    onTabSelected={setIndex}
    activeIndex={index}
  >
    {tabs}
  </Tabs>
);
```
