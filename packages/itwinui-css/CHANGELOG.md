# Changelog

## 3.0.0-dev.0

### Major Changes

- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): `.iui-breadcrumbs-content` now requires `.iui-button .iui-field` and `data-iui-variant="borderless"`.

  ```diff
    <button
  -   class="iui-breadcrumbs-content"
  +   class="iui-button iui-button-base iui-field iui-breadcrumbs-content"
  +   data-iui-variant="borderless"
    >
  ```

  When used with `<a>`, the same button classes must be used, and the content must be wrapped in a `<span>`. As a result, the anchor's hover state will now be more consistent with the button's hover state.

  ```diff
    <a
  -   class="iui-anchor iui-breadcrumbs-content"
  +   class="iui-anchor iui-button-base iui-button iui-field iui-breadcrumbs-content"
  +   data-iui-variant="borderless"
    >
  +   <span>
        …
  +   </span>
    </a>
  ```

- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): `.iui-select-tag-button` now requires `.iui-button .iui-field` and `data-iui-variant="borderless"`.

  ```diff
    <button
  -   class="iui-select-tag-button"
  +   class="iui-button iui-field iui-select-tag-button"
  +   data-iui-variant="borderless"
    >
  ```

  Similarly, `.iui-select-tag-button-icon` also requires `.iui-button-icon`.

  ```diff
  -  <span class="iui-select-tag-button-icon">
  +  <span class="iui-select-tag-button-icon iui-button-icon">
  ```

- [#1891](https://github.com/iTwin/iTwinUI/pull/1891): `.iui-table-row[data-iui-loading]` has been replaced with a new `iui-table-body-extra` class, which must be set on an element _outside_ the table-body.

  ```diff
   <div class="iui-table">
    …
    <div class="iui-table-body">
      …
  -   <div class="iui-table-row" data-iui-loading="true">
  -     <div class="iui-table-cell">
  -       <div class="iui-progress-indicator-radial"></div>
  -     </div>
  -   </div>
    </div>
  + <div class="iui-table-body-extra" data-iui-loading="true">
  +   <div class="iui-progress-indicator-radial"></div>
  + </div>
   </div>
  ```

- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): `.iui-table-paginator-page-button` now requires the same markup as borderless buttons. The `.iui-table-paginator-page-button-small` modifier class has been removed.

  ```diff
    <button
  -   class="iui-table-paginator-page-button iui-table-paginator-page-button-small"
  +   class="iui-table-paginator-page-button iui-button iui-button-base iui-field"
  +   data-iui-variant="borderless"
  +   data-iui-size="small"
    >
  ```

  As a result, the small paginator will now have a smaller width than before.

- [#1963](https://github.com/iTwin/iTwinUI/pull/1963): All styles have been wrapped in a cascade layer named `itwinui`.
- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): `.iui-sidenav-button.iui-expand` now requires `.iui-button .iui-field` and `data-iui-size="small"`.

  ```diff
    <button
  -   class="iui-button iui-button-base iui-sidenav-button iui-expand"
  +   class="iui-button iui-button-base iui-sidenav-button iui-field iui-expand"
  +   data-iui-size="small"
    >
  ```

- [#1915](https://github.com/iTwin/iTwinUI/pull/1915): `iui-anchor` must now be explicitly added to `<a>` elements, in addition to the previous `iui-alert-link`, `iui-breadcrumbs-content`, `iui-tag-basic`, and `iui-toast-anchor` classes.

  ```diff
  -<a class="iui-alert-link">
  +<a class="iui-anchor iui-alert-link">
  ```

  ```diff
  -<a class="iui-breadcrumbs-content">
  +<a class="iui-anchor iui-breadcrumbs-content">
  ```

  ```diff
  -<a class="iui-tag-basic">
  +<a class="iui-anchor iui-tag-basic">
  ```

  ```diff
  -<a class="iui-toast-anchor">
  +<a class="iui-anchor iui-toast-anchor">
  ```

  Additionally, all `<a>` elements within `iui-legal-footer` elements will need the `iui-anchor` class.

  ```diff
  <li class="iui-legal-footer-item">
  - <a>...</a>
  + <a class="iui-anchor>...</a>
  </li>
  ```

- [#1932](https://github.com/iTwin/iTwinUI/pull/1932): All individual component CSS files have been removed. Instead, import `all.css` (the root export).

  ```diff
  - @import "@itwin/itwinui-css/css/anchor.css";
  - @import "@itwin/itwinui-css/css/button.css";
    …
  + @import "@itwin/itwinui-css";
  ```

- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): Added `.iui-field` class to be used with `.iui-button`, `.iui-input`, and `.iui-select-button`. These components now have consistent styling for base, hover and disabled states.

  ```diff
    <button
  -   class="iui-button iui-button-base"
  +   class="iui-button iui-button-base iui-field"
    >
  ```

  ```diff
    <input
  -   class="iui-input"
  +   class="iui-input iui-field"
    >
  ```

  ```diff
    <div
  -   class="iui-select-button"
  +   class="iui-select-button iui-field"
    >
  ```

- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): Ideas button now requires `.iui-button-idea` and `data-iui-variant="high-visibility"` instead of `data-iui-variant="idea"`.

  ```diff
   <button
  -  class="iui-button iui-button-base"
  +  class="iui-button iui-button-base iui-field iui-button-idea"
  -  data-iui-variant="idea"
  +  data-iui-variant="high-visibility"
   >
  ```

- [#2101](https://github.com/iTwin/iTwinUI/pull/2101): `.iui-tile-thumbnail-type-indicator` and `.iui-tile-thumbnail-quick-action` should now be applied on wrapper element, and the button inside should have the new `.iui-tile-thumbnail-button` class. This reduces code complexity and fixes a visual bug with the hover state.

  ```diff
  + <div class="iui-tile-thumbnail-quick-action">
     <button
  -    class="iui-field iui-button-base iui-button iui-tile-thumbnail-quick-action"
  +    class="iui-field iui-button-base iui-button iui-tile-thumbnail-button"
       data-iui-variant="borderless"
       data-iui-size="small"
     >
       …
     </button>
  + </div>
  ```

- [#1935](https://github.com/iTwin/iTwinUI/pull/1935): Replaces the size classes for `iui-avatar` with a new `data-iui-size` attribute.

  ```diff
  - <div class="iui-avatar iui-small">
  + <div class="iui-avatar" data-iui-size="small">
  ```

  Possible values include: `"small"`, `"medium"`, `"large"`, and `"x-large"`. Defaults to `"medium"`.

- [#1938](https://github.com/iTwin/iTwinUI/pull/1938): `iui-breadcrumbs` will need to be added to the classes of all `iui-header-breadcrumbs` elements. `iui-breadcrumbs-list` will also need to be added to the classes of all `iui-header-breadcrumbs-list` elements.

  ```diff
  - <nav class="iui-header-breadcrumbs">
  - <ol class="iui-header-breadcrumbs-list">
  + <nav class="iui-breadcrumbs iui-header-breadcrumbs">
  + <ol class="iui-breadcrumbs-list iui-header-breadcrumbs-list">
  ```

### Minor Changes

- [#1863](https://github.com/iTwin/iTwinUI/pull/1863): The filter button inside a Table will now always be visible, instead of only being shown on hover/focus.
- [#1915](https://github.com/iTwin/iTwinUI/pull/1915): `iui-anchor` can now be styled with status colors using a new `data-iui-status` attribute.

  ```html
  <a class="iui-anchor" data-iui-status="negative">...</a>
  ```

  Possible values include: `"positive"`, `"negative"`, `"informational"`, and `"warning"`.

- [#2058](https://github.com/iTwin/iTwinUI/pull/2058): Added loading state to `iui-button`, via the `data-iui-loading` attribute and the `iui-button-spinner` class.

  ```html
  <button class="iui-button" data-iui-loading="true" aria-disabled="true">
    <span>Click me</span>
    <div class="iui-progress-indicator-radial iui-button-spinner" data-iui-indeterminate="true"></div>
  </button>
  ```

- [#2058](https://github.com/iTwin/iTwinUI/pull/2058): Added `iui-button-label` class to be used on the `<span>` containing the text inside a button.
- [#2060](https://github.com/iTwin/iTwinUI/pull/2060): Added support for `popover` attribute in `iui-tooltip`.
- [#2076](https://github.com/iTwin/iTwinUI/pull/2076): Added a new `data-iui-has-popover` attribute to `iui-button` to be applied when the button has an associated popover/dropdown-menu that is currently open.

  ```html
  <button class="iui-button" data-iui-has-popover="open"></button>
  ```

- [#2088](https://github.com/iTwin/iTwinUI/pull/2088): `.iui-field` handles icon fill, used within button and select.
- [#1935](https://github.com/iTwin/iTwinUI/pull/1935): The default size for an `iui-avatar` element that appears inside of an `iui-tile` is now the same default size as all other `iui-avatar` elements. Setting `data-iui-size` to `"x-large"` will give the `iui-avatar` the size of the old default.

  ```diff
  <div class="iui-tile-thumbnail-icon">
  - <span class="iui-avatar"></span>
  + <span class="iui-avatar" data-iui-size="x-large"></span>
  </div>
  ```

### Patch Changes

- [#2064](https://github.com/iTwin/iTwinUI/pull/2064): `transform` values in dialog and expandable-block have been rounded to help avoid blurry text on Windows.
- [#1916](https://github.com/iTwin/iTwinUI/pull/1916): Fixed the hover background for default tabs.
- [#2042](https://github.com/iTwin/iTwinUI/pull/2042): Fix table empty state horizontal alignment when table is very narrow.
- [#2074](https://github.com/iTwin/iTwinUI/pull/2074): Fix indentation of tree node without expander button.
- [#2021](https://github.com/iTwin/iTwinUI/pull/2021): `.iui-menu-item` also handles `button` elements.
- [#1955](https://github.com/iTwin/iTwinUI/pull/1955): Fixed a regression in `iui-tabs` where the panel content was not occupying the full width of the container.
- [#1943](https://github.com/iTwin/iTwinUI/pull/1943): Fixed a z-index issue in `Table` where the `iui-table-resizer` appeared above the sticky header cells.
- [#2030](https://github.com/iTwin/iTwinUI/pull/2030): Updated selectors in `button-group` to only consider `iui-field` and `iui-input-flex-container` children.
- [#2083](https://github.com/iTwin/iTwinUI/pull/2083): Fixed a visual bug where elements like `iui-button-icon` inside the `iui-button` were not hidden when the button was in a loading state. Now, `data-iui-loading="true"` on `iui-button` hides _all_ its children except `iui-button-spinner`.
- [#2054](https://github.com/iTwin/iTwinUI/pull/2054): Remove unnecessary gap below `.iui-input-grid` when `data-iui-label-placement='inline'` and when no secondary line (`iui-status-message`) is present.
- [#1921](https://github.com/iTwin/iTwinUI/pull/1921): Fixed carousel dot button's incorrect height.
- [#2043](https://github.com/iTwin/iTwinUI/pull/2043): Adjusted the behavior of buttons so that double tapping them doesn't zoom the viewport on iOS.
- [#1909](https://github.com/iTwin/iTwinUI/pull/1909): Remove `margin-block` from badge.

## 2.5.0

### Minor Changes

- [#1881](https://github.com/iTwin/iTwinUI/pull/1881): `input`'s and `textarea`'s start/end inline padding when inside `.iui-input-flex-container` is now collapsed when it is preceded/followed by a `.iui-input-flex-container-icon` (e.g. borderless `.iui-button` or padded `.iui-svg-icon`). This prevents unnecessary empty space in the flex container. `.iui-input-flex-container-icon` is a new class with the main purpose of collapsing the padding between the icon/button and input/textarea in `.iui-input-flex-container`.
- [#1889](https://github.com/iTwin/iTwinUI/pull/1889): Added `data-iui-shift` attribute selectors to borderless buttons, to help with visual alignment.
- [#1879](https://github.com/iTwin/iTwinUI/pull/1879): Add styling for native `<select>` element.
- [#1886](https://github.com/iTwin/iTwinUI/pull/1886): Add borderless select variant.
- [#1865](https://github.com/iTwin/iTwinUI/pull/1865): `iui-backdrop` will now also fade in when `iui-backdrop-visible` is present during mount.

### Patch Changes

- [#1828](https://github.com/iTwin/iTwinUI/pull/1828): Inline padding of `Icon` no longer changes with the icon size. It is now a constant of `--iui-size-xs`.
- [#1889](https://github.com/iTwin/iTwinUI/pull/1889): The close button in dialog will now be visually aligned based on the icon inside it, excluding the padding.
- [#1828](https://github.com/iTwin/iTwinUI/pull/1828): `.iui-input-flex-container` now has an inline padding of `1px` to account for the `1px` border's inline edges. This prevents content that touches the border's inline edges from being overlapped by the border by `1px`. Slightly modified `.iui-expandable-searchbox` styles to account for the new padding.
- [#1888](https://github.com/iTwin/iTwinUI/pull/1888): The `.iui-expandable-searchbox` now shows a regular-sized button in the collapsed state. Previously, it used to incorrectly be a square button.
- [#1888](https://github.com/iTwin/iTwinUI/pull/1888): `.iui-expandable-searchbox`'s animation/transition between the expanded and the collapsed states is now removed.
- [#1884](https://github.com/iTwin/iTwinUI/pull/1884): Fixes bug that caused the `.iui-tabs-wrapper` to change size dependent on which `.iui-tab` was active.
- [#1828](https://github.com/iTwin/iTwinUI/pull/1828): The `.iui-svg-icon` inside the `.iui-searchbox` no longer has the same width as `.iui-button`. Its width also no longer changes with the `.iui-searchbox` size. This is because its padding behavior is now similar to `.iui-svg-icon`'s padding behavior, where it uses a constant padding.
- [#1894](https://github.com/iTwin/iTwinUI/pull/1894): All instances of `box-sizing: content-box` have been reinforced with `!important` to prevent accidental overrides from application styles.
- [#1906](https://github.com/iTwin/iTwinUI/pull/1906): Dialog title will now wrap to multiple lines instead of getting clippped.
- [#1881](https://github.com/iTwin/iTwinUI/pull/1881): `.iui-search-input` and `.iui-search-icon` are now no-op. This is because the main objective of these two classes was collapsing the padding between the icon and `input`/`textarea` in `.iui-input-flex-container`, and that is now handled by `.iui-input-flex-container-icon` instead.

## 2.4.0

### Minor Changes

- [#1864](https://github.com/iTwin/iTwinUI/pull/1864): Added a new `data-iui-underline` attribute to `iui-anchor`. When set to `"true"`, anchors will be underlined by default instead of only on hover.
- [#1858](https://github.com/iTwin/iTwinUI/pull/1858): `toggle-switch` will no longer hide icons when size is set to "small". The recommendation is to always display a checkmark icon, even for small sizes.

### Patch Changes

- [#1845](https://github.com/iTwin/iTwinUI/pull/1845): Removed `:focus-visible` fallback styles for older browsers.

## 2.3.1

### Patch Changes

- [#1835](https://github.com/iTwin/iTwinUI/pull/1835): Replaced dialog/modal animation state related classes (`.iui-dialog-animation-enter` and `.iui-dialog-animation-enter-active`) with css animations.

## 2.3.0

### Minor Changes

- [#1815](https://github.com/iTwin/iTwinUI/pull/1815): Removed unnecessary `Tag` styles, and added support for tags to be used as `<button>` elements.
- [#1813](https://github.com/iTwin/iTwinUI/pull/1813): Added warning status for `ProgressRadial`/`ProgressLinear`
- [#1822](https://github.com/iTwin/iTwinUI/pull/1822): Adjusted date-picker styles to allow rendering empty elements without any hover states. This is useful when dates outside the current month don't need to be shown.

## 2.2.2

### Patch Changes

- [#1816](https://github.com/iTwin/iTwinUI/pull/1816): Fixed an issue where `Table` was showing a dummy vertical scrollbar track inside the table header in Chromium 121 + Windows.
- [#1810](https://github.com/iTwin/iTwinUI/pull/1810): Fixed `Surface.Body` not being visually aligned with `Surface.Header` depending on scrollbar visibility.

## 2.2.1

### Patch Changes

- [#1795](https://github.com/iTwin/iTwinUI/pull/1795): Fixed blurring and resizing issues in Dialog/Modal by removing `overflow: hidden` and inline `transform` styles.

## 2.2.0

### Minor Changes

- [#1753](https://github.com/iTwin/iTwinUI/pull/1753): Removed accidental styling support for the invalid case of `.iui-input, .iui-input-with-icon > .iui-select-button` with `[data-iui-status='informational']`. This is invalid because an `informational` status on our input or select adds little to no meaning.

### Patch Changes

- [#1783](https://github.com/iTwin/iTwinUI/pull/1783): Fixed a Firefox-specific bug where focus outlines were not appearing correctly around menu items inside `ComboBox`.
- [#1787](https://github.com/iTwin/iTwinUI/pull/1787): Button, radial progress indicator, & select icons use icon variable color fill.
- [#1788](https://github.com/iTwin/iTwinUI/pull/1788): Decreased specificity of `iui-link-action` and `iui-link-box` so that they do not override styles from other classes applied on the same element.
- [#1753](https://github.com/iTwin/iTwinUI/pull/1753): `.iui-input-with-icon` now applies padding to the `:first-child` only when there is an end-icon button.

## 2.1.0

### Minor Changes

- [#1676](https://github.com/iTwin/iTwinUI/pull/1676): Add small size tree option & decrease indentations on default size tree.
- [#1725](https://github.com/iTwin/iTwinUI/pull/1725): Added an optional data attribute (`data-iui-loading`) to be used on a table row (`iui-table-row`) when it only contains loading content (e.g. ProgressRadial)

### Patch Changes

- [#1733](https://github.com/iTwin/iTwinUI/pull/1733): Fixed an overflow-related layout shift in vertical `Tabs`.

## 2.0.4

### Patch Changes

- [#1716](https://github.com/iTwin/iTwinUI/pull/1716): Truncate the `select-tag` when only one tag is present in `select-tag-container`

## 2.0.3

### Patch Changes

- [#1711](https://github.com/iTwin/iTwinUI/pull/1711): Fixed an issue with `Tree` nodes not taking up the full width.

## 2.0.2

### Patch Changes

- [#1700](https://github.com/iTwin/iTwinUI/pull/1700): Fixed an issue where Table was sometimes triggering sort after filtering.

## 2.0.1

### Patch Changes

- [#1683](https://github.com/iTwin/iTwinUI/pull/1683): Improved `ExpandableBlock` animation so that it doesn't push content outside its bounds.

## 2.0.0

Welcome to the v2 release of `@itwin/itwinui-css`. 🎉

This release includes a few breaking changes which have been listed below. For more details, see the [migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-css-v2-migration-guide).

### Major Changes

- [#1548](https://github.com/iTwin/iTwinUI/pull/1548): Using `aria-selected` instead of `iui-active` in Tabs to set active styling.
- [#1446](https://github.com/iTwin/iTwinUI/pull/1446): `iui-avatar` has been refactored to be a single `<span>`, and the status is now applied using the `data-iui-status` attribute. The colors have been updated to pass AAA contrast ratio.
- [#1548](https://github.com/iTwin/iTwinUI/pull/1548): Combined tabs stripe variables: `--iui-stripe-left` and `--iui-stripe-top` into `--iui-tabs-stripe-position`; `--iui-stripe-width` and `--iui-stripe-height` into `--iui-tabs-stripe-size`.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): `iui-transfer-list-listbox-label` and `iui-input-container` classes were removed.
- [#1255](https://github.com/iTwin/iTwinUI/pull/1255): `iui-folder` is updated to use `display: grid`. `iui-tile-name` is now moved outside of `iui-tile-content` for folder variant.
- [#1420](https://github.com/iTwin/iTwinUI/pull/1420): `<div class="iui-radio-tile-content">` has been removed from radio-tile. Also, `data-iui-disabled` attribute must be set on the radio-tile for browsers that don't support `:has` (firefox).
- [#1573](https://github.com/iTwin/iTwinUI/pull/1573): Removed background from color-picker, date-picker/time-picker, and column-filter. Use `iui-popover-surface` class to add it back.
- [#1489](https://github.com/iTwin/iTwinUI/pull/1489): `--iui-color-dot-inset` has been split into `--iui-color-dot-inset-block` and `--iui-color-dot-inset-inline`.
- [#1369](https://github.com/iTwin/iTwinUI/pull/1369): The `iui-breadcrumbs-item-overrides` class name has been removed. Breadcrumbs items now use the `iui-breadcrumbs-content` class name.
- [#1577](https://github.com/iTwin/iTwinUI/pull/1577): `iui-scroll` modifier is no longer needed on `iui-menu`.
- [#1626](https://github.com/iTwin/iTwinUI/pull/1626): Improved carousel accessibility and changed the markup so that the dots are present before the slides.
- [#1529](https://github.com/iTwin/iTwinUI/pull/1529): Removed location-marker component.
- [#1469](https://github.com/iTwin/iTwinUI/pull/1469): Replaced `iui-slider-vertical` class modifier with `data-iui-orientation`.
  - `iui-slider-rail` class is now `::before` pseudo element of `iui-slider`.
- [#1322](https://github.com/iTwin/iTwinUI/pull/1322): Removed input-container code from `utils.css` in favor of `input-container.css`.
- [#1354](https://github.com/iTwin/iTwinUI/pull/1354): Renamed the following expandable-block classes: `iui-header`, `iui-icon`, `iui-title`, `iui-caption` to be scoped to expandable-block.
  - Updated the following modifier classes to be data attributes: `iui-expanded`, `iui-small`, `iui-borderless`.
- [#1370](https://github.com/iTwin/iTwinUI/pull/1370): `iui-progress-indicator-linear` has been refactored to be a single `<div>`. Size, status, indeterminate variant, animation, etc are now specified using data attributes.
- [#1523](https://github.com/iTwin/iTwinUI/pull/1523): Removed `iui-tooltip-container` and `iui-tooltip-visible` classes. The display is now toggled using the `hidden` HTML attribute, and the positioning should be managed using custom JS/CSS.
- [#1302](https://github.com/iTwin/iTwinUI/pull/1302): `border-box` will now be set for _all_ elements under `iui-root`.
- [#1610](https://github.com/iTwin/iTwinUI/pull/1610): Replaced `--iui-surface-border-color` with `--iui-surface-border` for full customization of border. Also removed `--iui-surface-border-radius` and `--iui-surface-background-color`.
- [#1328](https://github.com/iTwin/iTwinUI/pull/1328): `iui-progress-overlay` has been renamed to `iui-overlay` and moved to `overlay.scss`.
- [#1295](https://github.com/iTwin/iTwinUI/pull/1295): `iui-menu-item` and `iui-menu-description` classes were removed.
- [#1548](https://github.com/iTwin/iTwinUI/pull/1548): `data-iui-scroll-placement` attributes in Tabs were removed. Updated tabs start and end masks to be applied on scroll animation.
- [#1356](https://github.com/iTwin/iTwinUI/pull/1356): `iui-progress-radial` has been refactored to be a single `<div>` instead of using a nested svg. Size and status have been moved to data attributes. Also it is recommended to explicitly set `size` when using in other components.
- [#1556](https://github.com/iTwin/iTwinUI/pull/1556): Items inside button-group no longer need a wrapping `<div>`.
- [#1304](https://github.com/iTwin/iTwinUI/pull/1304): Instead of cloning passed icons to set classes on them, the classes will now be set on a wrapping element. Affected components: `Header`, `Select`, `MenuItem`, `RadioTile`, `Tabs`, `Tile`, `ToggleSwitch`, `TreeNode`, `InputContainer` (and all input variants).
- [#1559](https://github.com/iTwin/iTwinUI/pull/1559): Changed `iui-button-group-vertical` class to `iui-button-group` with attribute `data-iui-orientation="vertical"`.
- [#1548](https://github.com/iTwin/iTwinUI/pull/1548): The `iui-tabs` element has changed from `<ul>` to `<div>`. `iui-tabs` children are no longer wrapped in an `<li>` element.
- [#1247](https://github.com/iTwin/iTwinUI/pull/1247): Replaced the `iui-alert-icon`, `iui-alert-button`, and `iui-alert-button-icon` class names with `iui-svg-icon`, `iui-button`, and `iui-button-icon` respectively.
- [#1269](https://github.com/iTwin/iTwinUI/pull/1269): All dialog variants have `flex` applied by default. This means the content should be wrapped with `Dialog.Content` or `ModalContent` for optimal layout.
- [#1548](https://github.com/iTwin/iTwinUI/pull/1548): The `iui-tab-label` wrapper class has been removed. The `iui-tab-label` class now applies to the `<span>` which holds the tab's label. `iui-tab-description` is now a `<span>` element.
- [#1270](https://github.com/iTwin/iTwinUI/pull/1270): Change `line-height` to use a unitless value.

### Minor Changes

- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Added `iui-input-group-wrapper` class to allow inline labels for input groups.
- [#1373](https://github.com/iTwin/iTwinUI/pull/1373): Converted all physical CSS properties to their logical equivalents.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Added `iui-input-grid` class for outer input styling.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Added status styling to `input` and `select`.
- [#1565](https://github.com/iTwin/iTwinUI/pull/1565): Updated menu styling and added `iui-popover-surface` class for standalone popovers.
- [#1073](https://github.com/iTwin/iTwinUI/pull/1073): Added new `TransferList` component which is used to move one or more items between lists. Added the following subcomponents: `TransferList.ListWrapper`, `TransferList.ListboxWrapper`, `TransferList.ListboxLabel`, `TransferList.Listbox`, `TransferList.Item`, and `TransferList.Toolbar`
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Added padded styling to Icon using `data-iui-padded` attribute.
- [#1362](https://github.com/iTwin/iTwinUI/pull/1362): All elements under the root will now get a default focus styling matching `--iui-color-border-accent`.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Added `iui-status-message` class to wrap StatusMessage icon and content.
- [#1363](https://github.com/iTwin/iTwinUI/pull/1363): `iui-svg-icon` now supports controlling size and fill using `--iui-svg-size` and `--iui-svg-fill` custom properties.

### Patch Changes

- [#1354](https://github.com/iTwin/iTwinUI/pull/1354): Expandable block animation now uses pure css instead of javascript for transitioning.
- [#1609](https://github.com/iTwin/iTwinUI/pull/1609): Adjusted padding value for `Surface.Body`.
- [#1632](https://github.com/iTwin/iTwinUI/pull/1632): Adjusted gap between adjacent icons in searchbox.
- [#1351](https://github.com/iTwin/iTwinUI/pull/1351): `.iui-toast-anchor` can now be applied on a `<button>`.
- [#1499](https://github.com/iTwin/iTwinUI/pull/1499): Removed special handling of iPhone notch in Header and SideNavigation.

## 1.x

For any changes prior to 2.0.0, check out the [1.X changelog](https://github.com/iTwin/iTwinUI/blob/legacy/v2/packages/itwinui-css/CHANGELOG.md).
