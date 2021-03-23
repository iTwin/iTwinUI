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
