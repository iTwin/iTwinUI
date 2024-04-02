---
"@itwin/itwinui-css": major
---

Add `.iui-field` class to unify & centralize basic styling for `<button>`, `<input>`, `<textarea>`, and `<select>`.

Introduce `<button data-iui-type>` with values of `feedback` or `dropdown`.

```diff
<button
  class="
    iui-button
+   iui-field
-   iui-button-dropdown
  "
+ data-iui-type="dropdown"
>
```

```diff
<button
  class="
    iui-button
+   iui-field
  "
- data-iui-variant="idea"
+ data-iui-variant="high-visibility"
+ data-iui-type="feedback"
>
```
