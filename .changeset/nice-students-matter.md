---
'@itwin/itwinui-react': minor
---

DEV-only warnings will now only be properly excluded from the PROD bundle. This is done using a separate `"development"` entrypoint listed in `package.json#exports`.
