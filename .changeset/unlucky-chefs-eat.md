---
"@itwin/itwinui-react": patch
---

`Input`'s and `Textarea`'s start/end inline padding when inside `InputWithDecorations` is collapsed when it is preceded/followed by a borderless `Button` (or `IconButton`) or a `<Icon padded>`. This prevents unnecessary empty space in `InputWithDecorations`.
