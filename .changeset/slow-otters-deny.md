---
'@itwin/itwinui-react': patch
---

Fixed `cypress` detection logic to prevent treating it like a unit test. This thus prevents the skipping of internal logic that should not be executed in unit test environments.
