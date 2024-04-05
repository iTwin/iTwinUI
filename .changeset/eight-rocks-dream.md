---
"@itwin/itwinui-react": minor
---

Added the ability to control `Dialog` imperatively using `show()` and `close()` methods from its instance.

```tsx
const dialog = Dialog.useInstance();

<Button onClick={dialog.show}>Open dialog</Button>
<Dialog instance={dialog}>
  <Button onClick={dialog.close}>Close dialog</Button>
</Dialog>
```
