---
'@itwin/itwinui-react': minor
---

`Portal`'s `portal.to` now also accepts `null | undefined` which acts identically to the default prop behavior (i.e. as if `portal` was not passed). Consequently, `Dialog` & `Modal`'s `portal.to` also reflects this change.
