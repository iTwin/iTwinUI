---
'@itwin/itwinui-react': major
---

Added new `Breadcrumbs.Item` subcomponent to use for custom `a` and `button` elements within the `Breadcrumbs`

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item key={0}>
    Breadcrumbs Span Item
  </Breadcrumbs.Item>
  <Breadcrumbs.Item key={1} onClick={() => {}}>
    Breadcrumbs Button Item
  </Breadcrumbs.Item>
  <Breadcrumbs.Item key={2} href='/'>
    Breadcrumbs Anchor Item
  </Breadcrumbs.Item>
</Breadcrumbs>
```
