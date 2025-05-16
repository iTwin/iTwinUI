---
'@itwin/itwinui-react': minor
---

Visual changes to `Tabs` for better accessibility and appearance when in theme bridge mode.

- `Tabs.Wrapper` without `type` declared focus `outline-offset` inset more so to not obstruct the active tab stripe.
- `Tabs.Wrapper type='borderless'` dividing line reduced to give the active tab stripe a visual difference.
- `Tabs.Wrapper type='borderless'` active tab no longer has `background-color` change.
- `Tabs.TabDescription` has `color` change with `transition`.
