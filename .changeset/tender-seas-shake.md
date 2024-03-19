---
"@itwin/itwinui-react": minor
---

The responsive behavior of Table columns has been improved in a few different ways:
- All columns now have a non-zero default min-width. While we still recommend passing a custom min-width based on your data, this default will help prevent resizable columns from becoming too small. 
- The filter and sort icons in a column header will now wrap to the next line, before the text starts wrapping.
- For cells that have a string value, the value will be automatically truncated after three lines.
