---
'@itwin/itwinui-react': minor
---

`BaseFilter` now renders as a `<form>` and `FilterButtonBar` now renders a `<button type="submit">`. Together, this enables the use of browser's built-in validation before applying filters. The `setFilter` prop in `FilterButtonBar` has been deprecated, as `onSubmit` should be used instead.

```diff
  <BaseFilter
+   onSubmit={() => setFilter(text)}
  >
    …
    <FilterButtonBar
-     setFilter={() => setFilter(text)}
    />
  </BaseFilter>
```
