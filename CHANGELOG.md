# Changelog

## [0.13.1]

`2021-05-12`

### Fixes

- **Added missing header imports in barrel.**

## [0.13.0]

`2021-05-12`

### What's new

- **Added header component**. Also added header button and header logo.

### Fixes

- **Added filter icon active state and table background color.**
- **Increased specificity of default user-icon**

## [0.12.0]

`2021-05-04`

### What's new

- **Added new column-filter component** under table.css.
- **Added new file-upload template.**
- **Restructured user-icon classes** from `.iui-user-icons-small` into `.iui-user-icon .iui-small`.

### Fixes

- **Fixed some icon issues in table and pill tabs.**
- **Fixed some visual issues in file-upload.**
- **Fixed tile text blurring issues.**

## [0.11.0]

`2021-04-28`

### What's new

- **Added `iui-color-foreground-body-invert` variable.**
- **Icons now use `iui-icons-color-` variables**, allowing easy overrides.

### Fixes

- **Fixed tooltip text blurring issues** by removing frosted glass effect.

## [0.10.0]

`2021-04-21`

### What's new

- **Tooltip styling has been updated** to use a frosted glass background.

### Fixes

- **Fixed tile visual bugs:** folder name overflow and metadata spacing.
- **Fixed footer hover and focus states.**
- **Fixed scrollbar width in firefox.**

## [0.9.0]

`2021-04-15`

### What's new

- **Toast notifications have shortened classes and use borderless buttons.**
- **Modals have shortened classes and use borderless buttons.**

### Fixes

- **Fixed SVG issues** within linear progress indicator, checkbox, and radio.

## 0.8.0

`2021-04-14`

### What's new

- **Date picker can now display time** and classes have been renamed.

## 0.7.0

`2021-04-09`

### What's new

- **Added `variables.scss`** to import only SASS variables.
- **Added file upload component.**

### Fixes

- **Alert class name restructured.**
- **Removed remaining global CSS overrides.** It is recommended to apply `iui-body` class to `<body>` element in your app. Also, `<a>` styling was moved into `iui-anchor` class and mixin.
- **Renamed css files to singular.**

## 0.6.0

`2021-04-02`

### Fixes

- **Updated active and selected states in button and tile.**
- **Changed block comments to line comments.**
- **Updated select classes.**

## 0.5.0

`2021-03-31`

### What's new

- **Updated button hover state** to have a more consistent visual appearance.
- **Added menu item `iui-disabled` state**.
- **Added new classes to tag container**: `iui-truncate` and `iui-scroll` classes for overflow and `iui-visible` for background.

### Fixes

- **Removed footer positioning.**
- **Removed global style resets.** They are now applied directly to our components.
- **Button class names restructured** from `.iui-buttons-cta-large` into `.iui-button .iui-cta .iui-large`.
- **Button label is wrapped** within `<span class="iui-label">`.
- **`iui-invisible` button style is replaced with `iui-borderless`**, which is used in codeblock and tags.

## 0.4.2

`2021-03-23`

### Fixes

- **Fixed spacing and alignment in grouped radios and checkboxes.**

## 0.4.1

`2021-03-18`

### Fixes

- **Fixed styling issues in Tile**: description text now overflows with ellipsis and options icon has a visibility class.
- **Removed extra margins from various inputs and buttons.**

## 0.4.0

`2021-03-12`

### What's new

- **Tiles have been completely revamped with new features and styling.** Use the new `iui-tile` class from tile.css.

### Fixes

- **Fixed padding on selected rows in flextables for high resolutions.**
- **Fixed an issue with focus states on invisible buttons.**
- **Fixed mouse events in tooltip** so that tooltip text cannot be selected.
- **Fixed icon coloring classes not applying `fill` to svg `path`.**

## 0.3.0

`2021-03-02`

### What's new

- **Basic tags and tag container added.**
- **Icon coloring classes added.**

### Fixes

- **Fixed autocomplete styling for inputs.**
- **Fixed padding for selected rows in flextable.**
- **Fixed margins in various components.** Added visual testing and html minification, which revealed several instances where spacing was not set by css margin but by html whitespace.

## 0.2.1

`2021-02-17`

### Fixes

- **Global style resets have 0 specificity now.**

[0.13.1]: https://github.com/iTwin/iTwinUI/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/iTwin/iTwinUI/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/iTwin/iTwinUI/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/iTwin/iTwinUI/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/iTwin/iTwinUI/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/iTwin/iTwinUI/compare/v0.8.0...v0.9.0
