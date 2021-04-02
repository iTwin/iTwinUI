# Changelog

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
