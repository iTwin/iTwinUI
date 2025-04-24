---
'@itwin/itwinui-react': patch
---

Fixed an issue in `Dialog`/`Modal` where nested floating elements (e.g. `Select` dropdown) were not interactable because they were being portaled incorrectly.
