---
'@itwin/itwinui-react': minor
---

Added `actions` prop to `Tabs` to add right/bottom content to the horizontal/vertical tabs.

```tsx
<Tabs
  // ...
  actions={[
    <Button key={'Small'} size={'small'}>Small size button</Button>,
    <Button key={'Normal'}>Normal size button</Button>,
  ]}
>
  // ...
</Tabs>
```
