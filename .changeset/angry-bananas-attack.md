---
'@itwin/itwinui-react': patch
---

`IconButton` will now reroute the HTML `title` prop to its own `label` prop for better accessibility. The `title` prop has also been marked deprecated to encourage the use of `label`.
