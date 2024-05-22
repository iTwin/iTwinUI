---
'@itwin/itwinui-react': minor
---

In iTwinUI components that use a menu (`DropdownMenu`, `SplitButton`, `Table`'s column manager), opening the menu using:
* a *mouse* by clicking on the trigger will no longer move the focus to the first focusable menu item (i.e. no unexpected focus jumps on mouse clicks).
* the *keyboard*'s <kbd>Enter</kbd> and <kbd>Space</kbd> keys will still move the focus to the first focusable menu item (i.e. retain easy focus movement logic for keyboard users).
