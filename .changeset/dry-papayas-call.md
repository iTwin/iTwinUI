---
'@itwin/itwinui-react': minor
---

The `Surface` component can now be broken down using the `SurfaceHeader` and `SurfaceBody` subcomponents. Users can add padding to the body using `isPadded`

```jsx
<Surface >
  <Surface.Header>Surface Header Content</Surface.Header>
  <Surface.Body isPadded={true}>Surface Body Content</Surface.Body>
</Surface>
```
