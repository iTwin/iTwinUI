---
'@itwin/itwinui-react': patch
---

Fixed an issue in `toaster` where toasts was portaling into a new container when used inside `<Popover>`. With this change, the global toaster container will be correctly reused.
