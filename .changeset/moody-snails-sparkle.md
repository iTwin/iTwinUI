---
'@itwin/itwinui-css': minor
---

Removed accidental styling support for the invalid case of `.iui-input, .iui-input-with-icon > .iui-select-button` with `[data-iui-status='informational']`. This is invalid because an `informational` status on our input or select adds little to no meaning.
