---
'@itwin/itwinui-react': patch
---

Fixed an issue where CommonJS files in the development build output (`DEV-cjs/` directory) were being treated as ESM, inadvertently causing runtime errors during development.
