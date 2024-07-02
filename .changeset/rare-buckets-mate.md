---
'@itwin/itwinui-react': minor
---

Replaced old virtualization implementation with `@tanstack/react-virtual` for the `Tree` component. Also adds `overflow: 'auto'` to the style of the outer `Tree` div when the `Tree` is virtualized, removing the need for a wrapping scrollable element.

```diff
- <div style={{overflow: 'auto', height: 'min(400px, 90vh)'}}>
    <Tree
      enableVirtualization
+     style={{height: 'min(400px, 90vh)'}}
    />
- </div>
```
