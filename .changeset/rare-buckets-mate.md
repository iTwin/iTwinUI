---
'@itwin/itwinui-react': minor
---

Replaced old virtualization implementation with tanstack virtualization for the `Tree` component. This change introduces a change for users implementing virualized `Tree`s, where styles that were previously placed on the a component wrapping the tree should now be placed on the tree itself.

```diff
- <div style={{ height: 'min(400px, 90vh)', overflow: 'auto' }}>
+ <div>
    <Tree
      ...
      enableVirtualization
+     style={{ height: 'min(400px, 90vh)', overflow: 'auto' }}
    />
  </div>
```
