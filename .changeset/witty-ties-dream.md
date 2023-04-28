---
'@itwin/itwinui-react': minor
'@itwin/itwinui-css': patch
---

Changed the internal DOM structure of `LabeledInput` and `LabeledTextarea` to prefer explicit association over implicit. The `<label>` is now associated with the input using `htmlFor`/`id` and the container is a generic div.

This change improves accessibility, with no API changes and no effect on visuals.
