---
'@itwin/itwinui-react': patch
---

Fixed bug where `SplitButton`'s `dropdownMenuProps.middleware` prop was not being respected and instead `dropdownmenuprops` was being added to the DOM.
