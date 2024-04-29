---
"@itwin/itwinui-react": minor
---

Clicking a `MenuItem` with `submenuItems` now toggles the submenu visibility.
  * If both `submenuItems` and `onClick` props are passed, then clicking the `MenuItem` will toggle the submenu visibility but also *still* call the `onClick`. However, this behavior can lead to a confusing UX and is not recommended, so a warning will be shown.
