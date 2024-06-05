---
'@itwin/itwinui-react': patch
---

Fixed a visual bug where elements like `startIcon` and `endIcon` inside the `Button` (or its derivatives) were not hidden when the button was in a loading state. Now,`loading={true}` on `Button` hides *all* its children except the `ProgressRadial`.
