# Changelog

### [1.2.2](https://www.github.com/iTwin/iTwinUI/compare/v1.2.1...v1.2.2) (2022-12-09)

### Fixes

* **Select:** Use correct placeholder text color ([#846](https://www.github.com/iTwin/iTwinUI/issues/846)) ([0504714](https://www.github.com/iTwin/iTwinUI/commit/0504714599b97dc7a1c8458f6de48dad5037cb7c))

### [1.2.1](https://www.github.com/iTwin/iTwinUI/compare/v1.2.0...v1.2.1) (2022-12-08)

### Fixes

* **Code:** Remove `user-select: all` and extra declarations ([#836](https://www.github.com/iTwin/iTwinUI/issues/836)) ([8db6443](https://www.github.com/iTwin/iTwinUI/commit/8db64436470527571eae321272ac1cf1555e13c9))

## [1.2.0](https://www.github.com/iTwin/iTwinUI/compare/v1.1.0...v1.2.0) (2022-12-06)

### What's new

* **ExpandableBlock:** Add disabled state support through `disabled`/`aria-disabled` attribute on the toggle ([#821](https://www.github.com/iTwin/iTwinUI/issues/821)) ([5bb81cd](https://www.github.com/iTwin/iTwinUI/commit/5bb81cd016a4e9aecdbd5a9b3bfaa0c79976d81e))
* **`iui-root`**: Add `.iui-root-background` modifier to opt into setting the recommended background-color ([#833](https://www.github.com/iTwin/iTwinUI/issues/833)) ([ef6a969](https://www.github.com/iTwin/iTwinUI/commit/ef6a96977ce2e0d60a7e5ca2bb1f5b30bc6c35fc))

## [1.1.0](https://www.github.com/iTwin/iTwinUI/compare/v1.0.0...v1.1.0) (2022-12-01)

### What's new

* **ComboBox:** Add multi-select tags ([#817](https://www.github.com/iTwin/iTwinUI/issues/817)) ([244dfab](https://www.github.com/iTwin/iTwinUI/commit/244dfab8338035000d95260caf534a04d698ffdb))

### Fixes

* **Avatar:** Sizes have lower specificity, use CSS vars. ([#818](https://www.github.com/iTwin/iTwinUI/issues/818)) ([92ccc03](https://www.github.com/iTwin/iTwinUI/commit/92ccc0337777e97ab3b55d52b8ce1548e3026485))
* **Progress-indicator**: Overlay now intercepts clicks ([#827](https://www.github.com/iTwin/iTwinUI/issues/827)) ([89f4502](https://www.github.com/iTwin/iTwinUI/commit/89f4502460fd7a4fe5244b57997cc7d9800e8fdd))
* **Slider:** Change align `start` to `flex-start` ([#825](https://www.github.com/iTwin/iTwinUI/issues/825)) ([fad4a1f](https://www.github.com/iTwin/iTwinUI/commit/fad4a1f3068354ea18b4d0d8f08d1725d4887211))

## [1.0.0](https://www.github.com/iTwin/iTwinUI/compare/v0.63.1...v1.0.0) (2022-11-14)

Welcome to the v1 release of iTwinUI-css. 🎉

The API is now considered "stable" and going forward there will be no more breaking changes in minor version bumps.

Some of the highlights from this release include:

- The `@itwin/itwinui-css` package is now CSS-only. Sass files are no longer part of the deliverable.
- A new `@itwin/itwinui-variables` package has been introduced to replace Sass variables.
- Scoped themes support, allowing styling only part of the page or mixing themes in different parts of the page.
- Major visual updates across all themes.
  - Base themes pass WCAG 2.1 level AA requirements, high contrast themes pass level AAA.
  - Dark theme has received a complete overhaul.
- Major visual updates across all components.
  - Rounded corners in most components (using `--iui-border-radius-1`).
  - More consistent elevation by ensuring lighter backgounds (`--iui-color-background`) appear above darker ones (`--iui-color-background-backdrop`).
  - Alert and toast have a brand new look.
  - Baseline height has increased by 1px, resulting in height changes in many components.
  - Switched all sizes from `px` to `rem` to respect base font-size set in user preferences.
- Changes to class names and data attributes (see migration guide).
- Renamed and reorganized a few component files.
  - `inputs.css` has been split into `input.css`, `checkbox.css`, `radio.css`, `select.css`, etc.
  - `user-icon.css` is now `avatar.css`.
  - `wizard.css` has been split into `stepper.css` and `workflow-diagram.css`.
  - A few utility components have been combined into `utils.css`.
- Dropped IE11 support, removing any fallbacks for CSS variables, CSS grid, etc.
- New font families: _Noto Sans_ and _Noto Sans Mono_.
- Lots of bug fixes and improvements.

If you're interested in more details,

- check out our [iTwinUI-css v1 migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-v1-migration-guide) for a full list of changes in all components.
- check out our [iTwinUI-variables v1 migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-variables-v1-migration-guide) for how the old Sass variables map to the new CSS variables.
- check out a full diff of code changes in [`v0.63.1..v1.0.0`](https://www.github.com/iTwin/iTwinUI/compare/v0.63.1...v1.0.0).

## 0.X

For any changes prior to 1.0.0, check out the [0.X changelog](https://github.com/iTwin/iTwinUI/blob/v0/packages/itwinui-css/CHANGELOG.md).
