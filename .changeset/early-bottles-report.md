---
'@itwin/itwinui-react': major
'@itwin/itwinui-css': major
---

Removed legacy support for buttons and anchors in breadcrumbs.

- CSS Changes:
  - Removed css for classname `iui-breadcrumbs-item-overrrides`
  - Now use classnames `iui-breadcrumbs-button` and `iui-breadcrumbs-text` on breadcrumbs items
- React Changes:
  - Added composition component `Breadcrumbs.Item` to `Breadcrumbs`
  - Use `Breadcrumbs.Item` to style items in breadcrumbs
    - `type = 'button'` for button styling (default type)
    - `type = 'anchor'` for anchor styling
    - `type = 'text'` for only text styling
  - Button type has the property `onClick` available to use
  - Anchor type has the property `href` available to use
