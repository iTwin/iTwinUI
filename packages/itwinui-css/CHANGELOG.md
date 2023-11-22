# Changelog

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
