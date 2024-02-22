---
'@itwin/itwinui-react': minor
---

Added a new `renderWrapperWhenClosed` prop to `Dialog` and `Modal`. So far, the dialog/modal wrapper has always been rendered regardless of the `isOpen`. So the default value of `renderWrapperWhenClosed` is set to `true` (no breaking change). Pass `false` to not render the wrapper when `isOpen=false`.
