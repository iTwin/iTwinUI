---
"@itwin/itwinui-css": patch
---

`.iui-search-input` and `.iui-search-icon` are now no-op. This is because the main objective of these two classes was collapsing the padding between the icon and `input`/`textarea` in `.iui-input-flex-container`, and that is now handled by `.iui-input-flex-container-icon` instead. 
