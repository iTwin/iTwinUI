---
"@itwin/itwinui-react": minor
---

* Clicking a `MenuItem` with a non empty `submenuItems` array now toggles the submenu visibility.
  * Thus, passing a non empty `submenuItems` array and `onClick` to `MenuItem` at the same time is not supported.
  * If both props are passed, clicking the `MenuItem` will toggle the submenu visibility but also *still* call the `onClick` (to prevent a behavioral change).
