---
"@itwin/itwinui-react": patch
---

`Tooltip`s no longer displayed upon clicking the trigger. They are now only shown upon hover or focus. This fixes issues like incorrectly displaying the `content` upon hovering out of the reference element after clicking it. Components that use `Tooltip` internally are also affected. (E.g.`IconButton`, `SideNavigation`, etc.)
