---
"@itwin/itwinui-react": minor
---

`Input`'s and `Textarea`'s start/end inline padding when inside `InputWithDecorations` is now collapsed when it is preceded/followed by a `InputWithDecorations.Icon` or `InputWithDecorations.Button`. This prevents unnecessary empty space in `InputWithDecorations`. `InputWithDecorations.Icon` is a new subcomponent with the main purpose of collapsing the padding between the icon/button and input/textarea in `InputWithDecorations`.
