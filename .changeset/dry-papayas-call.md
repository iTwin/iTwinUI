---
'@itwin/itwinui-react': minor
---

The `Surface` component can now be broken down using the `SurfaceHeader` and `SurfaceBody` subcomponents. Users can set the children vertically using `hasLayout` and add padding to the body using `isPadded`

```jsx
<Surface hasLayout={true}>
  <Surface.Header>Surface Header Content</Surface.Header>
  <Surface.Body isPadded={true}>Surface Body Content</Surface.Body>
</Surface>
```
