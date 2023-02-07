# Changelog

## 2.4.0

### Minor Changes

- 054bc3ba: `<Avatar>`'s `image` now supports passing `<svg>` too

  ```tsx
  <Avatar image={<SvgUser />} />
  ```

- 06476ada: Added new `Flex` utility component and optional `Flex.Spacer`/`Flex.Item` subcomponents to make it easier to work with CSS flexbox and use iTwinUI design tokens for gap.

  ```jsx
  <Flex gap='xl' justifyContent='center'>
    <div>...</div>
    <div>...</div>
  </Flex>
  ```

  ```jsx
  <Flex>
    <Flex.Item>...</Flex.Item>
    <Flex.Spacer />
    <Flex.Item>...</Flex.Item>
    <Flex.Item>...</Flex.Item>
  </Flex>
  ```

- 44446e50: `DropdownButton` now exposes `dropdownMenuProps` to allow control over all popover props, such as `placement`.

### Patch Changes

- Updated dependencies
  - @itwin/itwinui-css@1.5.0

## 2.3.0

### Minor Changes

- c06caffe: Added `actions` prop to `Tabs` to add right/bottom content to the horizontal/vertical tabs.

  ```tsx
  <Tabs
    // ...
    actions={[
      <Button key={'Small'} size={'small'}>
        Small size button
      </Button>,
      <Button key={'Normal'}>Normal size button</Button>,
    ]}
  >
    // ...
  </Tabs>
  ```

- ec26b72d: `Anchor` can now be rendered as a button using `as` prop.

  ```jsx
  <Anchor as='button' onClick={() => {}}>
    ...
  </Anchor>
  ```

- dd13257f: Added new Icon component for displaying svgs

  - Supports `size` and `fill` props

  ```tsx
  <Icon size='medium' fill='positive'>
    <svg>...</svg>
  </Icon>
  ```

### Patch Changes

- 8e319bea: Removes transitions for `Toast` component when `prefer-reduced-motion` is active
- 24a0cf94: Fixed an issue where Table's `onBottomReached` callback was not being invoked when using strict mode with react 18.
- Updated dependencies
  - @itwin/itwinui-css@1.4.0

## 2.2.1

### Patch Changes

- 8e92e7e2: ComboBox dropdown width will now stay fixed when `enableVirtualization` is true.

## [2.2.0](https://www.github.com/iTwin/iTwinUI-react/compare/v2.1.0...v2.2.0) (2022-12-19)

### Minor changes

- **NotificationMarker:** Add new `NotificationMarker` component ([#829](https://www.github.com/iTwin/iTwinUI-react/issues/829))
- **Table:** `onFilter` gets filtered rows ([#958](https://www.github.com/iTwin/iTwinUI-react/issues/958))
- **Timepicker:** Add combined time column ([#844](https://www.github.com/iTwin/iTwinUI-react/issues/844))

### Patch changes

- **Table:** Reset `columnOrder` when `columns` changes ([#983](https://www.github.com/iTwin/iTwinUI-react/issues/983))

## 2.1.1 (2022-12-16)

### Patch changes

- Use `import type` instead of `import { type }` for supporting older typescript versions ([#996](https://www.github.com/iTwin/iTwinUI-react/issues/996))

## [2.1.0](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.2...v2.1.0) (2022-12-12)

### Minor changes

- **Combobox:** Add support for multi-selection through `multiple` prop ([#830](https://www.github.com/iTwin/iTwinUI-react/issues/830))
- **ThemeProvider:** Add `applyBackground` to `themeOptions` prop. ([#974](https://www.github.com/iTwin/iTwinUI-react/issues/974))
  - Defaults to true for the topmost ThemeProvider in the tree.
- **Table:** Ctrl + Shift click now keeps previous selection & also shift clicks ([#888](https://www.github.com/iTwin/iTwinUI-react/issues/888))

### Patch changes

- **Table:** Ctrl and checkbox clicks update start row of shift selection ([#889](https://www.github.com/iTwin/iTwinUI-react/issues/889))

## 2.0.4 (2022-12-16)

### Patch changes

- Use `import type` instead of `import { type }` for supporting older typescript versions ([#996](https://www.github.com/iTwin/iTwinUI-react/issues/996))

## 2.0.3 (2022-12-12)

### Patch changes

- **ComboBox:** Move max-height to outer element to fix virtual scroll ([#986](https://www.github.com/iTwin/iTwinUI-react/issues/986))

## [2.0.2](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.1...v2.0.2) (2022-12-07)

### Patch changes

- **ThemeProvider:** Improved types to exclude `ownerDocument` from `themeOptions` if children passed ([#973](https://www.github.com/iTwin/iTwinUI-react/issues/973))

## [2.0.1](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.0...v2.0.1) (2022-12-05)

### Patch changes

- **useTheme:** Exit early if theme is already set on body ([#963](https://www.github.com/iTwin/iTwinUI-react/issues/963))
- **ModalButtonBar, ModalContent:** Wrap `DialogButtonBar` and `DialogContent` instead of directly assigning ([#961](https://www.github.com/iTwin/iTwinUI-react/issues/961))
- **Table:** Added localization for selected rows count ([#945](https://www.github.com/iTwin/iTwinUI-react/issues/945))
- Replaced all instances of `useLayoutEffect` with `useIsomorphicLayoutEffect` to fix SSR warnings ([#964](https://www.github.com/iTwin/iTwinUI-react/issues/964))
- Fixed css warnings about `start` vs `flex-start` through base itwinui-css update ([#962](https://www.github.com/iTwin/iTwinUI-react/issues/962))

## [2.0.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.48.1...v2.0.0) (2022-11-15)

Welcome to the v2 release of iTwinUI-react. 🎉

This release uses the brand new v1 of iTwinUI-css and iTwinUI-variables, which include significant visual changes and improvements.

These release notes offer a brief summary of the main changes. Check out the [iTwinUI-react v2 migration guide](https://github.com/iTwin/iTwinUI-react/wiki/iTwinUI-react-v2-migration-guide) for more details.

### ⚠ BREAKING CHANGES

iTwinUI no longer supports Internet Explorer. The build output now targets `es2018` rather than `es5`, and CSS variables and grid are used without fallbacks.

As for breaking API changes, there is only one:

- **Table:** `columns` prop must now be an array. First level `Header` is no longer required ([#935](https://www.github.com/iTwin/iTwinUI-react/issues/935))

```diff
- const columns = [{ Header: 'Table', columns: [{ accessor: 'name', Header: 'Name' }, … ] }];
+ const columns = [{ accessor: 'name', Header: 'Name' }, … ];

 <Table columns={columns} data={data} />
```

Other than that, props and components that were already deprecated in v1 have been removed:

- **Tabs:** Remove deprecated `HorizontalTab` and `HorizontalTabProps` ([#852](https://www.github.com/iTwin/iTwinUI-react/issues/852))
- **Checkbox, Radio:** Remove deprecated `checkmarkClassName` and `checkmarkStyle` ([#855](https://www.github.com/iTwin/iTwinUI-react/issues/855))
- **Alert:** Remove deprecated `onClick` prop ([#851](https://www.github.com/iTwin/iTwinUI-react/issues/851))

### Deprecations

We have also taken this opportunity to deprecate a few more things while not removing them just yet, to minimize the number of breaking changes.

- **Avatar, AvatarGroup:** Deprecate `UserIcon`/`UserIconGroup`, replace with `Avatar`/`AvatarGroup` ([#902](https://www.github.com/iTwin/iTwinUI-react/issues/902))
  - Also deprecated `userIcon` prop in `Header`.
- **Tabs:** Deprecate `HorizontalTabs`, `VerticalTabs` to use `Tabs` ([#908](https://www.github.com/iTwin/iTwinUI-react/issues/908))
- **Typography:** Deprecate Headline, Leading, Small, Subheading, Title, Body. Replaced with `Text`. ([#914](https://www.github.com/iTwin/iTwinUI-react/issues/914))
- **Wizard:** Deprecate `Wizard` to use `Stepper`/`WorkflowDiagram` ([#905](https://www.github.com/iTwin/iTwinUI-react/issues/905))
- **ErrorPage:** Deprecate `ErrorPage` and add `NonIdealState` for lower bundle size and inversion of control. ([#924](https://www.github.com/iTwin/iTwinUI-react/issues/924))

### What's new

- Allow scoped styles using `ThemeProvider` ([#825](https://github.com/iTwin/iTwinUI-react/pull/825))
- Add `exports` field to package.json. This improves compatibility with ESM environments like vitest. ([#845](https://www.github.com/iTwin/iTwinUI-react/issues/845))
- Removed dependency on `@itwin/itwinui-icons`. The icons are now inlined. ([#917](https://www.github.com/iTwin/iTwinUI-react/issues/917))
- **Table:** Add row loading state ([#871](https://www.github.com/iTwin/iTwinUI-react/issues/871))
- **Table:** Row selection count for paginator ([#837](https://www.github.com/iTwin/iTwinUI-react/issues/837))
- **Tile:** Add status and loading state ([#872](https://www.github.com/iTwin/iTwinUI-react/issues/872))

If you're interested in more details about every signle change, check out a full diff in [`v1.48.1..v2.0.0`](https://www.github.com/iTwin/iTwinUI-react/compare/v1.48.1...v2.0.0).

## 1.X

For any changes prior to 2.0.0, check out the [1.X changelog](https://github.com/iTwin/iTwinUI-react/blob/v1/packages/iTwinUI-react/CHANGELOG.md).
