---
'@itwin/itwinui-react': patch
---

Changed the internal implementation of `Table` cells so that an extra wrapper element is rendered when the cell contains _text only_. Cells containing custom JSX content will now be rendered as-is, similar to how they behaved before [3.18.0](https://github.com/iTwin/iTwinUI/releases/tag/%40itwin%2Fitwinui-react%403.18.0).
