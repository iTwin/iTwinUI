---
'@itwin/itwinui-react': minor
---

New `styleType` prop in `SearchBox.CollapsedState` to allow for borderless state. Any `SearchBox.ExpandButton`s inside `<SearchBox.CollapsedState styleType="borderless">` will have a default `styleType` of `"borderless"`.

<details>
<summary>Diff</summary>

```diff
<SearchBox expandable>
-   <SearchBox.CollapsedState>
+   <SearchBox.CollapsedState styleType="borderless">
    <SearchBox.ExpandButton /> // styleType="borderless" by default
  </SearchBox.CollapsedState>
  <SearchBox.ExpandedState>…</SearchBox.ExpandedState>
</SearchBox>
```

</details>
