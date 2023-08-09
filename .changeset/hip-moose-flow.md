---
'@itwin/itwinui-react': major
---

ThemeProvider now defaults the `theme` value to `"inherit"` and falls back to `"light"` there is no parent theme found. Also the inherit behavior has been made more resilient for cases where react context fails.
