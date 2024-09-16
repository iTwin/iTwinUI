---
'@itwin/itwinui-react': minor
---

Passing `styleType="borderless"` to `SearchBox.ExpandButton` now works as expected. This is because collapsed `SearchBox` will now hide its border and background in favor of the ones from `SearchBox.ExpandButton`.

<details>
<summary>Example</summary>

```diff
<SearchBox expandable>
  <SearchBox.CollapsedState>
-     <SearchBox.ExpandButton/>
+     <SearchBox.ExpandButton styleType="borderless"/>
  </SearchBox.CollapsedState>
  <SearchBox.ExpandedState>…</SearchBox.ExpandedState>
</SearchBox>
```

</details>
