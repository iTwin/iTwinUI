---
'@itwin/itwinui-react': minor
'@itwin/itwinui-css': minor
---

Added new `Flex` utility component and optional `Flex.Spacer`/`Flex.Item` subcomponents to make it easier to work with CSS flexbox and use iTwinUI design tokens for gap.

```jsx
<Flex gap='xl' justifyContent='center'>
  <div>...</div>
  <div>...</div>
</Flex>
```

```jsx
<Flex>
  <Flex.Item>...</Flex.Item>
  <Flex.Spacer />
  <Flex.Item>...</Flex.Item>
  <Flex.Item>...</Flex.Item>
</Flex>
```
