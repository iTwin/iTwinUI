---
'@itwin/itwinui-react': minor
---

All internal CSS class prefixes have been changed to prevent style conflicts across minor versions. While this is not considered a breaking change according to our [support policy](https://github.com/iTwin/iTwinUI/wiki/Support-policy), this change might affect you if you ignore our pleas to not rely on these internal class names. The recommendation is to pass your own custom `className` through props.
