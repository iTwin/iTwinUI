# Changelog

## [2.2.0](https://www.github.com/iTwin/iTwinUI-react/compare/v2.1.0...v2.2.0) (2022-12-19)

### What's new

* **NotificationMarker:** Add new `NotificationMarker` component ([#829](https://www.github.com/iTwin/iTwinUI-react/issues/829)) ([6a0a6c3](https://www.github.com/iTwin/iTwinUI-react/commit/6a0a6c3913a0d5ca51f9835f517bdac36236e8c9))
* **Table:** `onFilter` gets filtered rows ([#958](https://www.github.com/iTwin/iTwinUI-react/issues/958)) ([84bc9e9](https://www.github.com/iTwin/iTwinUI-react/commit/84bc9e9dd957ed7e87ef9f3fc617c83c74127a5f))
* **Timepicker:** Add combined time column ([#844](https://www.github.com/iTwin/iTwinUI-react/issues/844)) ([86050eb](https://www.github.com/iTwin/iTwinUI-react/commit/86050eb6d971437f287d13dbf9935d8dafbbb281))

### Fixes

* **Table:** Reset `columnOrder` when `columns` changes ([#983](https://www.github.com/iTwin/iTwinUI-react/issues/983)) ([4f184f6](https://www.github.com/iTwin/iTwinUI-react/commit/4f184f6caf37545a0008e6b9cd5d218bd218fdbd))

### 2.1.1 (2022-12-16)

### Fixes

* Use `import type` instead of `import { type }` for supporting older typescript versions ([#996](https://www.github.com/iTwin/iTwinUI-react/issues/996)) 

## [2.1.0](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.2...v2.1.0) (2022-12-12)

### What's new

* **Combobox:** Add support for multi-selection through `multiple` prop ([#830](https://www.github.com/iTwin/iTwinUI-react/issues/830)) ([ced7588](https://www.github.com/iTwin/iTwinUI-react/commit/ced7588acee5273e83c0b0d05a732f260997b9bb))
* **ThemeProvider:** Add `applyBackground` to `themeOptions` prop. ([#974](https://www.github.com/iTwin/iTwinUI-react/issues/974)) ([13cff7f](https://www.github.com/iTwin/iTwinUI-react/commit/13cff7fab356e1015e2e7c361f15c6a7c8fe4d6b))
  * Defaults to true for the topmost ThemeProvider in the tree.
* **Table:** Ctrl + Shift click now keeps previous selection & also shift clicks ([#888](https://www.github.com/iTwin/iTwinUI-react/issues/888)) ([13edfb5](https://www.github.com/iTwin/iTwinUI-react/commit/13edfb5ecc62de284ac03cc2fc27b8a41b4f7b61))

### Fixes

* **Table:** Ctrl and checkbox clicks update start row of shift selection ([#889](https://www.github.com/iTwin/iTwinUI-react/issues/889)) ([21900d4](https://www.github.com/iTwin/iTwinUI-react/commit/21900d42900f7a03305bf2040cc64ddb29361b2d))

### 2.0.3 (2022-12-12)

### Fixes

* **ComboBox:** Move max-height to outer element to fix virtual scroll ([#986](https://www.github.com/iTwin/iTwinUI-react/issues/986)) ([596559e](https://www.github.com/iTwin/iTwinUI-react/commit/596559e7158877e09c98c5c672e8a58a9507a33d))

### [2.0.2](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.1...v2.0.2) (2022-12-07)

### Fixes

* **ThemeProvider:** Improved types to exclude `ownerDocument` from `themeOptions` if children passed ([#973](https://www.github.com/iTwin/iTwinUI-react/issues/973)) ([36997de](https://www.github.com/iTwin/iTwinUI-react/commit/36997de383c4783c192318f2fb617289a7dce2dd))

### [2.0.1](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.0...v2.0.1) (2022-12-05)

### Fixes

* **useTheme:** Exit early if theme is already set on body ([#963](https://www.github.com/iTwin/iTwinUI-react/issues/963)) ([29033d4](https://www.github.com/iTwin/iTwinUI-react/commit/29033d488bc6cefb3ea064305898ade85475e2ff))
* **ModalButtonBar, ModalContent:** Wrap `DialogButtonBar` and `DialogContent` instead of directly assigning ([#961](https://www.github.com/iTwin/iTwinUI-react/issues/961)) ([0881e92](https://www.github.com/iTwin/iTwinUI-react/commit/0881e92f037b7ce717f05742014ac2d6dd8c580d))
* **Table:** Added localization for selected rows count ([#945](https://www.github.com/iTwin/iTwinUI-react/issues/945)) ([71f2326](https://www.github.com/iTwin/iTwinUI-react/commit/71f232605237e0095ebe0bff4cf01d241c143c49))
* Replaced all instances of `useLayoutEffect` with `useIsomorphicLayoutEffect` to fix SSR warnings ([#964](https://www.github.com/iTwin/iTwinUI-react/issues/964)) ([15b0389](https://www.github.com/iTwin/iTwinUI-react/commit/15b038934e55d3f61631113d91f2952127426c1d))
* Fixed css warnings about `start` vs `flex-start` through base itwinui-css update ([#962](https://www.github.com/iTwin/iTwinUI-react/issues/962))

## [2.0.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.48.1...v2.0.0) (2022-11-15)

Welcome to the v2 release of iTwinUI-react. 🎉

This release uses the brand new v1 of iTwinUI-css and iTwinUI-variables, which include significant visual changes and improvements.

These release notes offer a brief summary of the main changes. Check out the [iTwinUI-react v2 migration guide](https://github.com/iTwin/iTwinUI-react/wiki/iTwinUI-react-v2-migration-guide) for more details.

### ⚠ BREAKING CHANGES

iTwinUI no longer supports Internet Explorer. The build output now targets `es2018` rather than `es5`, and CSS variables and grid are used without fallbacks.

As for breaking API changes, there is only one:

* **Table:** `columns` prop must now be an array. First level `Header` is no longer required ([#935](https://www.github.com/iTwin/iTwinUI-react/issues/935)) ([83d5cfe](https://www.github.com/iTwin/iTwinUI-react/commit/83d5cfe93980b628c79ec3951d05663a054699fc))
```diff
- const columns = { Header: 'Table', columns: [{ accessor: 'name', Header: 'Name' }, … ] };
+ const columns = [{ accessor: 'name', Header: 'Name' }, … ];

 <Table columns={columns} data={data} />
```

Other than that, props and components that were already deprecated in v1 have been removed:

* **Tabs:** Remove deprecated `HorizontalTab` and `HorizontalTabProps` ([#852](https://www.github.com/iTwin/iTwinUI-react/issues/852)) ([31ddeae](https://www.github.com/iTwin/iTwinUI-react/commit/31ddeaed3dc5919f69edb1bd9580d766fabc35c2))
* **Checkbox, Radio:** Remove deprecated `checkmarkClassName` and `checkmarkStyle` ([#855](https://www.github.com/iTwin/iTwinUI-react/issues/855)) ([5c339be](https://www.github.com/iTwin/iTwinUI-react/commit/5c339beddd117bdf5a834b96dff65d4fd67d5255))
* **Alert:** Remove deprecated `onClick` prop ([#851](https://www.github.com/iTwin/iTwinUI-react/issues/851)) ([f307fe9](https://www.github.com/iTwin/iTwinUI-react/commit/f307fe9448d0bf793885ddc0e5399cb8cd9dcadb))

### Deprecations

We have also taken this opportunity to deprecate a few more things while not removing them just yet, to minimize the number of breaking changes.

* **Avatar, AvatarGroup:** Deprecate `UserIcon`/`UserIconGroup`, replace with `Avatar`/`AvatarGroup` ([#902](https://www.github.com/iTwin/iTwinUI-react/issues/902)) ([4001bd1](https://www.github.com/iTwin/iTwinUI-react/commit/4001bd12aa9021fdcbb3e49c271eec10ec853a83))
  - Also deprecated `userIcon` prop in `Header`.
* **Tabs:** Deprecate `HorizontalTabs`, `VerticalTabs` to use `Tabs` ([#908](https://www.github.com/iTwin/iTwinUI-react/issues/908)) ([f7e205e](https://www.github.com/iTwin/iTwinUI-react/commit/f7e205e9679169701bc52942ee7adf53679b8336))
* **Typography:** Deprecate Headline, Leading, Small, Subheading, Title, Body. Replaced with `Text`. ([#914](https://www.github.com/iTwin/iTwinUI-react/issues/914)) ([30d6c02](https://www.github.com/iTwin/iTwinUI-react/commit/30d6c026a3a8e058418d25d382d030d68cbf20ff))
* **Wizard:** Deprecate `Wizard` to use `Stepper`/`WorkflowDiagram` ([#905](https://www.github.com/iTwin/iTwinUI-react/issues/905)) ([8d16db3](https://www.github.com/iTwin/iTwinUI-react/commit/8d16db3350b60c548a7389d4a9ea0b95b3f9d6bd))
* **ErrorPage:** Deprecate `ErrorPage` and add `NonIdealState` for lower bundle size and inversion of control. ([#924](https://www.github.com/iTwin/iTwinUI-react/issues/924)) ([88cafdb](https://www.github.com/iTwin/iTwinUI-react/commit/88cafdbcf2dd9af3ef9605fa676d2775ed59d7cb))

### What's new

* Allow scoped styles using `ThemeProvider` ([#825](https://github.com/iTwin/iTwinUI-react/pull/825))
* Add `exports` field to package.json. This improves compatibility with ESM environments like vitest. ([#845](https://www.github.com/iTwin/iTwinUI-react/issues/845)) ([f58ca09](https://www.github.com/iTwin/iTwinUI-react/commit/f58ca09ae2301a10bc1a3d242c6feddccffea209))
* Removed dependency on `@itwin/itwinui-icons`. The icons are now inlined. ([#917](https://www.github.com/iTwin/iTwinUI-react/issues/917)) ([a598632](https://www.github.com/iTwin/iTwinUI-react/commit/a5986322e46bd8146754ed963503fdafff5c2061))
* **Table:** Add row loading state ([#871](https://www.github.com/iTwin/iTwinUI-react/issues/871)) ([22ac046](https://www.github.com/iTwin/iTwinUI-react/commit/22ac04661baba29fbfda49f9c2cb49176b26d7cb))
* **Table:** Row selection count for paginator ([#837](https://www.github.com/iTwin/iTwinUI-react/issues/837)) ([e43148a](https://www.github.com/iTwin/iTwinUI-react/commit/e43148af9fc6250cf2470d258831a3ef8d33e582))
* **Tile:** Add status and loading state ([#872](https://www.github.com/iTwin/iTwinUI-react/issues/872)) ([2fcb41f](https://www.github.com/iTwin/iTwinUI-react/commit/2fcb41f5c41a8a32d32a3312edecf8e2b646033e))

If you're interested in more details about every signle change, check out a full diff in [`v1.48.1..v2.0.0`](https://www.github.com/iTwin/iTwinUI-react/compare/v1.48.1...v2.0.0).

## 1.X

For any changes prior to 2.0.0, check out the [1.X changelog](https://github.com/iTwin/iTwinUI-react/blob/v1/packages/iTwinUI-react/CHANGELOG.md).
