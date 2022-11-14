# Changelog

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
- Renaming and reorganizing a few component files.
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

See [`CHANGELOG-v0.md`](https://github.com/iTwin/iTwinUI/blob/main/packages/itwinui-css/CHANGELOG-v0.md) for any changes prior to 1.0.0.
