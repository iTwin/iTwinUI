---
"@itwin/itwinui-react": patch
---

When `ThemeProvider` is portaled into popup windows, it will now automatically create a portal container in the correct document, avoiding the need to manually specify `portalContainer`.
