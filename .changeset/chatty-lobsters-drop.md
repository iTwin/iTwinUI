---
'@itwin/itwinui-react': minor
---

`<Avatar>`'s `image` prop is now deprecated in favor of a new prop called `child`. This is to allow passing more generic children instead of just `<img>` tags.

```tsx
<Avatar child={<Icon><SvgAdd /></Icon> />
```

Passing `image` prop will still have the same behavior as before. If both `image` and `child` props are passed, `image` will be used.
