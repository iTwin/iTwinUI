# Changelog

## [0.24.1]

`2021-07-14`

### Fixes

- **Fixed select menu alignment and overflow.**
- **Fixed table body overflow.**
- **Fixed slider touch action.**

## [0.24.0]

`2021-07-13`

### What's new

- **Added new slider component.**
- **Added new menu-item features**: sublabels, dividers, disabled items and multi-select.

## [0.23.0]

`2021-07-12`

### What's new

- **Changed `.iui-body` to use `iui-color-background-2`** by default.
- **Added `.iui-stacked` class to user-icon list**, allowing for unstacked lists.
- **Added `.iui-user-icon-count` class** to have different styling from other user-icons in the list.

### Fixes

- **Updated font fallbacks for all components.**
- **Updated all transitions to respect reduced-motion user preference.**

## [0.22.1]

`2021-07-01`

## Fixes

- **Added back svg selector to tab icons** for backwards compatibility.

## [0.22.0]

`2021-06-28`

### What's new

- **Updated tabs styles to support sublabels, icons, and disabled tabs.**
- **Added user-icon lists and svg support to user-icons.**
- **Added transition to table expandable rows.**

## [0.21.0]

`2021-06-21`

### What's new

- **Added new 'warning' category to toast-notification.**

## [0.20.3]

`2021-06-18`

### Fixes

- **Fixed select text truncation bug.**
- **Fixed table column resizer activation.**

## [0.20.2]

`2021-06-14`

### Fixes

- **Fixed table bugs**: filter icon spacing, sort icon fill, and header cell cursor.

## [0.20.1]

`2021-06-11`

### Fixes

- **Fixed file-upload input selector so it can now be nested inside label.**
- **Changed checkboxes and radio so they no longer get focus ring for mouse clicks.**

## [0.20.0]

`2021-06-10`

### What's new

- **Updated table class names and added some new styles.**

### Fixes

- **Fixed undefined variable error in variables.scss**.

## [0.19.0]

`2021-06-10`

### What's new

- **Added small and large sizes to inputs and buttons.** Also removed bottom margin.

## [0.18.1]

`2021-06-07`

### Fixes

- **Fixed sidenav buttons not always overriding styles from default button.**

## [0.18.0]

`2021-06-03`

### What's new

- **Added separate time-picker component** for standalone use or within date-picker.

### Fixes

- **Renamed expandable block content class to `.iui-expandable-content`** to prevent conflicts with other components.
- **Fixed Dart Sass deprecation warning about division operator** by replacing `/` with `*`.

## [0.17.1]

`2021-05-28`

### Fixes

- **Improved wizard responsive design** by using percentage width.
- **Fixed user-icon size not working when placed in icon button.**

## [0.17.0]

`2021-05-26`

### What's new

- **Added breadcrumbs component.**
- **Added `.iui-x-small` and `.iui-large` sizes to radial progress indicator.**

### Fixes

- **Fixed wizard responsive design issues.**
- **Fixed Sass deprecation warning about `!global` assignments.**

## [0.16.0]

`2021-05-20`

### What's new

- **Changed header class to `.iui-page-header`** and made it responsive.

## [0.15.0]

`2021-05-17`

### What's new

- **Added side-navigation component.**
- **Added `.iui-required` class to labeled inputs** and removed automatic colon after all labels.

## [0.14.0]

`2021-05-17`

### What's new

- **Added progress indicator overlay.**
- **Added fieldset component.**

### Fixes

- **Added nav and aria attributes to header breadcrumbs.**

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

[0.24.1]: https://github.com/iTwin/iTwinUI/compare/v0.24.0...v0.24.1
[0.24.0]: https://github.com/iTwin/iTwinUI/compare/v0.23.0...v0.24.0
[0.23.0]: https://github.com/iTwin/iTwinUI/compare/v0.22.1...v0.23.0
[0.22.1]: https://github.com/iTwin/iTwinUI/compare/v0.22.0...v0.22.1
[0.22.0]: https://github.com/iTwin/iTwinUI/compare/v0.21.0...v0.22.0
[0.21.0]: https://github.com/iTwin/iTwinUI/compare/v0.20.3...v0.21.0
[0.20.3]: https://github.com/iTwin/iTwinUI/compare/v0.20.2...v0.20.3
[0.20.2]: https://github.com/iTwin/iTwinUI/compare/v0.20.1...v0.20.2
[0.20.1]: https://github.com/iTwin/iTwinUI/compare/v0.20.0...v0.20.1
[0.20.0]: https://github.com/iTwin/iTwinUI/compare/v0.19.0...v0.20.0
[0.19.0]: https://github.com/iTwin/iTwinUI/compare/v0.18.1...v0.19.0
[0.18.1]: https://github.com/iTwin/iTwinUI/compare/v0.18.0...v0.18.1
[0.18.0]: https://github.com/iTwin/iTwinUI/compare/v0.17.1...v0.18.0
[0.17.1]: https://github.com/iTwin/iTwinUI/compare/v0.17.0...v0.17.1
[0.17.0]: https://github.com/iTwin/iTwinUI/compare/v0.16.0...v0.17.0
[0.16.0]: https://github.com/iTwin/iTwinUI/compare/v0.15.0...v0.16.0
[0.15.0]: https://github.com/iTwin/iTwinUI/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/iTwin/iTwinUI/compare/v0.13.1...v0.14.0
[0.13.1]: https://github.com/iTwin/iTwinUI/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/iTwin/iTwinUI/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/iTwin/iTwinUI/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/iTwin/iTwinUI/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/iTwin/iTwinUI/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/iTwin/iTwinUI/compare/v0.8.0...v0.9.0
