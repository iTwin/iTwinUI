---
'@itwin/itwinui-react': minor
---

`ComboBox` and `Select` now allow customizing the portal behavior of the floating listbox.
- To customize `ComboBox` portaling behavior, use `dropdownMenuProps.portal`.
- To customize `Select` portaling behavior, use `popoverProps.portal`.

<details>
<summary>Example</summary>

To turn off the default portaling behavior, use `portal: false`.

```jsx
<ComboBox
  options={[…]}
  dropdownMenuProps={{ portal: false }}
/>
```

```jsx
<ComboBox
  options={[…]}
  popoverProps={{ portal: false }}
/>
```

</details>
