---
"@itwin/itwinui-react": minor
---

Clicking a `MenuItem` with `submenuItems` now toggles the submenu visibility. Thus, passing `submenuItems` and `onClick` to `MenuItem` at the same time is not supported. Even if both props are passed, clicking the `MenuItem` will only toggle the submenu visibility and will not call `onClick`.
