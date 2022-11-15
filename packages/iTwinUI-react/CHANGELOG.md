# Changelog

## [2.0.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.48.1...v2.0.0) (2022-11-15)

Welcome to the v2 release of iTwinUI-react. 🎉

This release uses the brand new v1 of iTwinUI-css and iTwinUI-variables, which include significant visual changes and improvements.

These release notes offer a brief summary of the main changes. Check out the [iTwinUI-react v2 migration guide](https://github.com/iTwin/iTwinUI-react/wiki/iTwinUI-react-v2-migration-guide) for more details.

### ⚠ BREAKING CHANGES

There is only one new breaking change in this release.

* **Table:** `columns` prop must now be an array. First level `Header` is no longer required ([#935](https://www.github.com/iTwin/iTwinUI-react/issues/935)) ([83d5cfe](https://www.github.com/iTwin/iTwinUI-react/commit/83d5cfe93980b628c79ec3951d05663a054699fc))

Other than that, we have removed props and components that were already deprecated in v1.

* **Tabs:** Remove deprecated `HorizontalTab` and `HorizontalTabProps` ([#852](https://www.github.com/iTwin/iTwinUI-react/issues/852)) ([31ddeae](https://www.github.com/iTwin/iTwinUI-react/commit/31ddeaed3dc5919f69edb1bd9580d766fabc35c2))
* **Checkbox, Radio:** Remove deprecated `checkmarkClassName` and `checkmarkStyle` ([#855](https://www.github.com/iTwin/iTwinUI-react/issues/855)) ([5c339be](https://www.github.com/iTwin/iTwinUI-react/commit/5c339beddd117bdf5a834b96dff65d4fd67d5255))
* **Alert:** Remove deprecated `onClick` prop ([#851](https://www.github.com/iTwin/iTwinUI-react/issues/851)) ([f307fe9](https://www.github.com/iTwin/iTwinUI-react/commit/f307fe9448d0bf793885ddc0e5399cb8cd9dcadb))

### Deprecations

We have taken this opportunity to deprecate a few more things while not removing them just yet, to minimize the number of breaking changes.

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

If you're interested in more details about every signle change, check out a full diff in [`v1.48.1..v2.0.0`](https://www.github.com/iTwin/iTwinUI/compare/v1.48.1...v2.0.0).

## 1.X

For any changes prior to 2.0.0, check out the [1.X changelog](https://github.com/iTwin/iTwinUI-react/blob/v1/packages/iTwinUI-react/CHANGELOG.md).
