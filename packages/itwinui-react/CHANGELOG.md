# Changelog

## 3.2.1

### Patch Changes

- [#1760](https://github.com/iTwin/iTwinUI/pull/1760): Fixed `ComboBox` to correctly merge `inputProps.style` with internal styles.

## 3.2.0

### Minor Changes

- [#1734](https://github.com/iTwin/iTwinUI/pull/1734): `ThemeProvider` will now attempt to automatically load `styles.css` if using `theme="inherit"` (or `includeCss` if using other themes).

  While applications are still advised to manually import `styles.css`, this new behavior is intended to ease the migration for applications that may be using an older version of iTwinUI but want to consume dependencies that rely on iTwinUI v3.

- [#1744](https://github.com/iTwin/iTwinUI/pull/1744): `@itwin/itwinui-illustrations-react` has been made a direct dependency again, to avoid issues with bundlers attempting to bundle it even if `ErrorPage` is not used anywhere.

### Patch Changes

- [#1742](https://github.com/iTwin/iTwinUI/pull/1742): Fixed `ErrorPage` to correctly lazy import from `@itwin/itwinui-illustrations-react`.

## 3.1.2

### Patch Changes

- [#1740](https://github.com/iTwin/iTwinUI/pull/1740): Fixed `Select` and `Slider` to allow passing refs into `triggerProps` and `thumbProps` respectively.

## 3.1.1

### Patch Changes

- [#1738](https://github.com/iTwin/iTwinUI/pull/1738): Added missing `sideEffects` to prevent tree-shaking `styles.css` in webpack.

## 3.1.0

### Minor Changes

- [#1731](https://github.com/iTwin/iTwinUI/pull/1731): ThemeProvider will now correctly inherit theme changes from a v2 ancestor.
- [#1710](https://github.com/iTwin/iTwinUI/pull/1710): Added new `middleware` and `positionReference` props to `Popover` for more control over the positioning logic.
- [#1676](https://github.com/iTwin/iTwinUI/pull/1676): Added `size="small` prop to `Tree`, and decreased indentations on default size tree.
- [#1707](https://github.com/iTwin/iTwinUI/pull/1707): `FileUpload`'s `onFileDropped` prop will now expose the underlying drop event as the second argument. This can be useful for accessing information about the directory structure.
- [#1709](https://github.com/iTwin/iTwinUI/pull/1709): `IconButton`s inside a vertical `ButtonGroup` will now show tooltips on the right side by default, to avoid obscuring adjacent buttons in the group. The behavior of these tooltips can also be customized using the new `labelProps` prop, which can contain `labelProps.placement`, etc.

### Patch Changes

- [#1733](https://github.com/iTwin/iTwinUI/pull/1733): Fixed an overflow-related layout shift in vertical `Tabs`.
- [#1725](https://github.com/iTwin/iTwinUI/pull/1725): Table is now scrollable horizontally even when no rows are present.

## 3.0.11

### Patch Changes

- [#1716](https://github.com/iTwin/iTwinUI/pull/1716): Truncate the `select-tag` when only one tag is present in `select-tag-container`

## 3.0.10

### Patch Changes

- [#1711](https://github.com/iTwin/iTwinUI/pull/1711): Fixed an issue with `Tree` nodes not taking up the full width.

## 3.0.9

### Patch Changes

- [#1705](https://github.com/iTwin/iTwinUI/pull/1705): Fixed a hydration mismatch warning due to `id` in `ComboBox` and `Carousel`.

## 3.0.8

### Patch Changes

- [#1702](https://github.com/iTwin/iTwinUI/pull/1702): Fixed `Select` so that it works in uncontrolled mode (without `value`/`onChange` props).

## 3.0.7

### Patch Changes

- [#1700](https://github.com/iTwin/iTwinUI/pull/1700): Fixed an issue where Table was sometimes triggering sort after filtering.

## 3.0.6

### Patch Changes

- [#1693](https://github.com/iTwin/iTwinUI/pull/1693): Fixed an issue where Dialog content was appearing blurred on Windows.

## 3.0.5

### Patch Changes

- [#1683](https://github.com/iTwin/iTwinUI/pull/1683): Improved `ExpandableBlock` animation so that it doesn't push content outside its bounds.
- [#1687](https://github.com/iTwin/iTwinUI/pull/1687): Fixed `Overlay` component to correctly add polyfill for `inert`.

## 3.0.4

### Patch Changes

- [#1682](https://github.com/iTwin/iTwinUI/pull/1682): Memoize `useToaster`'s return value so that it can be more reliably used in dependency arrays.
- [#1681](https://github.com/iTwin/iTwinUI/pull/1681): Fixed an issue where `Select`'s menu was being positioned incorrectly after its first render.

## 3.0.3

### Patch Changes

- [#1660](https://github.com/iTwin/iTwinUI/pull/1660): Made Table's Ctrl+Shift click implementation more consistent with Windows Explorer's implementation.
- [#1660](https://github.com/iTwin/iTwinUI/pull/1660): Fixed occasional mismatch between the Table's visually selected rows and Table state's selected rows

## 3.0.2

### Patch Changes

- [#1663](https://github.com/iTwin/iTwinUI/pull/1663): Fixed `ThemeProvider` to correctly inherit `highContrast` option when using `theme="inherit"`.

## 3.0.1

### Patch Changes

- [#1661](https://github.com/iTwin/iTwinUI/pull/1661): Fixed Select re-rendering infinitely when used with React 17.

## 3.0.0

Welcome to the v3 release of `@itwin/itwinui-react`. 🎉

This release includes a few breaking changes which have been briefly listed below. For more details, see the [v3 migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v3-migration-guide).

### Major Changes

- [#1302](https://github.com/iTwin/iTwinUI/pull/1302): The dependencies on `@itwin/itwinui-css` and `@itwin/itwinui-variable` have been removed. This means `@itwin/itwinui-react` will expose its own stylesheet.
- [#1322](https://github.com/iTwin/iTwinUI/pull/1322): All css imports within components have been removed. `@itwin/itwinui-react/styles.css` must now be manually imported at the entrypoint.
- [#1302](https://github.com/iTwin/iTwinUI/pull/1302): All elements have had their class names changed to prevent conflict with older versions. It is strongly recommended to switch these internal classes with your own classes or data attributes.
- [#1389](https://github.com/iTwin/iTwinUI/pull/1389): iTwinUI now correctly supports both ESM and CJS environments.
- [#1583](https://github.com/iTwin/iTwinUI/pull/1583): Bumped minimum required react version to 17. If you're still on react 16, please update to react 17 (which has no breaking changes).
- [#1514](https://github.com/iTwin/iTwinUI/pull/1514): Table now has better type support. Types must now be imported from `@itwin/itwinui-react/react-table` instead of from `@types/react-table`.
- [#1346](https://github.com/iTwin/iTwinUI/pull/1346): The build now targets `es2020` instead of `es2018`.
- [#1311](https://github.com/iTwin/iTwinUI/pull/1311), [#1506](https://github.com/iTwin/iTwinUI/pull/1506): Replaced `tippy.js` with `floating-ui` in all popover-based components. While the basic usage is unchanged, all advanced props from tippy are no longer available. Components affected: Select, ComboBox, DropdownMenu, DropdownButton, SplitButton.
- [#1351](https://github.com/iTwin/iTwinUI/pull/1351): `toaster` import has been removed and replaced with `useToaster` which returns a toaster object with the same API.
- [#1265](https://github.com/iTwin/iTwinUI/pull/1265): Removed the deprecated `useTheme` hook. `<ThemeProvider>` is now always required to be wrapped around all iTwinUI components.
- [#1433](https://github.com/iTwin/iTwinUI/pull/1433): Updated `exports` to prevent importing internal utilities.
- [#1298](https://github.com/iTwin/iTwinUI/pull/1298): `Props` types will no longer be exported for any component. Use `React.ComponentProps` instead.
- [#1400](https://github.com/iTwin/iTwinUI/pull/1400): `ErrorPage` will now dynamically import illustrations. The peer dependency on `@itwin/itwinui-illustrations-react` will need to be manually installed if using `ErrorPage`.
- [#1478](https://github.com/iTwin/iTwinUI/pull/1478): ThemeProvider now defaults the `theme` value to `"inherit"` and falls back to `"light"` there is no parent theme found. Also the inherit behavior has been made more resilient for cases where react context fails.
- [#1269](https://github.com/iTwin/iTwinUI/pull/1269): All dialog variants have `flex` applied by default. This means the content should be wrapped with `Dialog.Content` or `ModalContent` for optimal layout.
- [#1300](https://github.com/iTwin/iTwinUI/pull/1300): `modalRootId` and `ownerDocument` props have been removed from `Modal`, in favor of the new `portal` prop (also available in `Dialog`).
- [#1461](https://github.com/iTwin/iTwinUI/pull/1461): Changed disabled button behavior to make them focusable and use `aria-disabled` instead of `disabled` attribute.
- [#1565](https://github.com/iTwin/iTwinUI/pull/1565): Removed `Menu` component. Use `DropdownMenu` instead.
- [#1406](https://github.com/iTwin/iTwinUI/pull/1406): Removed `setFocus` prop from Checkbox, ColorPicker, ComboBox, Input, LabeledInput, LabeledTextarea, Radio, RadioTile, Select, Slider, ToggleSwitch. Instead, `ref` can be used to focus the element.
- [#1548](https://github.com/iTwin/iTwinUI/pull/1548): Tabs are now always scrollable. Deprecated `overflowOptions` prop.
- [#1370](https://github.com/iTwin/iTwinUI/pull/1370): ProgressLinear has been refactored to be a single `<div>`.
- [#1356](https://github.com/iTwin/iTwinUI/pull/1356): ProgressRadial has been refactored to be a single `<div>` instead of using a nested svg. Also it is recommended to explicitly set `size` when using in other components.
- [#1544](https://github.com/iTwin/iTwinUI/pull/1544): Removed `iconDisplayStyle` prop from `LabeledInput` and `LabeledTextarea` components. `svgIcon` is now added inline. Users must use `StatusMessage` to add custom icon to the message.
- [#1626](https://github.com/iTwin/iTwinUI/pull/1626): Improved carousel accessibility and changed the markup so that the dots are present before the slides.
- [#1278](https://github.com/iTwin/iTwinUI/pull/1278): Adjusted calculations in ButtonGroup's `overflowButton` callback, so that it respects `overflowPlacement` and considers the presence of the overflowButton itself.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Removed `inputStyle` and `inputClassName` props from `LabeledInput`; style and className props are being passed down to input.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Removed `selectStyle` and `selectClassName` props from `LabeledSelect`; style and className props are being passed down to textarea.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Removed `textareaStyle` and `textareaClassName` props from `LabeledTextarea`; style and className props are being passed down to textarea.
- [#1371](https://github.com/iTwin/iTwinUI/pull/1371): `Checkbox`'s top-level `className` and `style` props will now always be applied on the checkbox input element instead of conditionally being applied on the wrapper.
- [#1409](https://github.com/iTwin/iTwinUI/pull/1409): `RadioTile`'s top-level `className` and `style` props will now be applied on the `<input>` element instead of the wrapper.
- [#1458](https://github.com/iTwin/iTwinUI/pull/1458): `SideNavButton`'s top-level props (className, style, etc) are now passed to the button instead of to the wrapper.
- [#1435](https://github.com/iTwin/iTwinUI/pull/1435): `SplitButton`'s top-level props (className, style, etc) are now passed to the button instead of the component wrapper.
- [#1304](https://github.com/iTwin/iTwinUI/pull/1304): Instead of cloning passed icons to set classes on them, the classes will now be set on a wrapping element. Affected components: `Header`, `Select`, `MenuItem`, `RadioTile`, `Tabs`, `Tile`, `ToggleSwitch`, `TreeNode`, `InputContainer` (and all input variants).
- [#1469](https://github.com/iTwin/iTwinUI/pull/1469): Updated internal DOM structure in Slider.
- [#1388](https://github.com/iTwin/iTwinUI/pull/1388): Removed previously-deprecated `HorizontalTabs` and `VerticalTabs` (replaced by `orientation` prop in `Tabs`).
- [#1383](https://github.com/iTwin/iTwinUI/pull/1383): Removed previously-deprecated `UserIcon` and `UserIconGroup` components. Also removed `userIcon` prop from `Header`.
- [#1296](https://github.com/iTwin/iTwinUI/pull/1296): Removed previously-deprecated typography components (`Body`, `Headline`, `Leading`, `Small`, `Subheading`, `Title`) which have been replaced by `Text`.
- [#1384](https://github.com/iTwin/iTwinUI/pull/1384): Removed previously-deprecated `Wizard` component (replaced by `Stepper` and `WorkflowDiagram`).
- [#1295](https://github.com/iTwin/iTwinUI/pull/1295): Deprecated MenuItem's `icon` and `badge` props in favor of new `startIcon` and `endIcon` props. Also affects `Select` and `ComboBox` options.
- [#1330](https://github.com/iTwin/iTwinUI/pull/1330): Deprecated `FileUploadTemplate`. Removed all of its references.

### Minor Changes

- [#1298](https://github.com/iTwin/iTwinUI/pull/1298): Most components are now polymorphic and forward their rest props and ref.
- [#1506](https://github.com/iTwin/iTwinUI/pull/1506): Added new `Popover` component for public use.
- [#1323](https://github.com/iTwin/iTwinUI/pull/1323): Added `placement` prop to `Dialog` to allow placing it at one of the corners.
- [#1523](https://github.com/iTwin/iTwinUI/pull/1523): Added `ariaStrategy` prop to Tooltip. Can be used to change how the tooltip is associated with the trigger element.
- [#1477](https://github.com/iTwin/iTwinUI/pull/1477): Added a new `portalContainer` prop to `ThemeProvider`. When specified, all floating elements (tooltips, toats, dialogs) under the ThemeProvider will read this prop from context and portal into it.
- [#1362](https://github.com/iTwin/iTwinUI/pull/1362): All elements under the root will now get a default focus styling matching `--iui-color-border-accent`.
- [#1373](https://github.com/iTwin/iTwinUI/pull/1373): Converted all physical CSS properties to their logical equivalents.
- [#1328](https://github.com/iTwin/iTwinUI/pull/1328): Added new `Overlay` component with customizable subcomponents: `Overlay.Wrapper`, `Overlay.HiddenContent`, `Overlay.Overlay`.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Added `status` prop to `Input`, `Textarea` and `Select`.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Added two new components for building complex input layouts.

  - `InputGrid` for the "outer" layout (label, inputs and statusMessage)
  - `InputWithDecorations` for the "inner" layout (start icon/button, end icon/button)

  `LabeledInput`, `LabeledSelect`, `LabeledTextarea` and table `DatePickerInput` have been updated to make use of these new components internally.

- [#1531](https://github.com/iTwin/iTwinUI/pull/1531): Selected options in Select/ComboBox will now have a checkmark.
- [#1573](https://github.com/iTwin/iTwinUI/pull/1573): Added `applyBackground` prop to ColorPicker and DatePicker.
- [#1321](https://github.com/iTwin/iTwinUI/pull/1321): Added `disabled` prop to ExpandableBlock component. When activated, it triggers the "disabled" CSS styling for the ExpandableBlock and disables user interaction with it.
- [#1355](https://github.com/iTwin/iTwinUI/pull/1355): Added new `padded` prop to `Icon`.
- [#1457](https://github.com/iTwin/iTwinUI/pull/1457): Added `htmlName` prop to the `HeaderButton` subcomponent which handles the native `name` attribute in `<button>`.
- [#1548](https://github.com/iTwin/iTwinUI/pull/1548): Added composition API to `Tabs`. Subcomponents: Wrapper, TabList, Tab, TabLabel, TabIcon, TabDescription, Actions, Panel.
- [#1255](https://github.com/iTwin/iTwinUI/pull/1255): Updated `Tile` component to allow composition of customizable subcomponents: `<Tile.Wrapper/>`, `<Tile.Name/>`, `<Tile.NameIcon/>`, `<Tile.NameLabel/>`, `<Tile.ThumbnailArea/>`, `<Tile.ThumbnailPicture/>`, `<Tile.BadgeContainer/>`, `<Tile.TypeIndicator/>`, `<Tile.QuickAction/>`, `<Tile.ContentArea/>`, `<Tile.Description/>`, `<Tile.MoreOptions/>`, `<Tile.Metadata/>`, `<Tile.Buttons/>`.
- [#1073](https://github.com/iTwin/iTwinUI/pull/1073): Added new `TransferList` component which is used to move one or more items between lists. Added the following subcomponents: `TransferList.ListWrapper`, `TransferList.ListboxWrapper`, `TransferList.ListboxLabel`, `TransferList.Listbox`, `TransferList.Item`, and `TransferList.Toolbar`
- [#1247](https://github.com/iTwin/iTwinUI/pull/1247): Alert can now be used through customizable subcomponents. The `onClose`, `clickableText`, and `clickableTextProps` props have been deprecated.
- [#1419](https://github.com/iTwin/iTwinUI/pull/1419): Added `htmlSize` prop to the `Input` component which handles the native `size` attribute in `<input>`.
- [#1369](https://github.com/iTwin/iTwinUI/pull/1369): Added new `Breadcrumbs.Item` subcomponent to use within `Breadcrumbs`. Directly passing `<a>`/`<Button>`/`<span>` as children is still supported but is deprecated.
- [#1403](https://github.com/iTwin/iTwinUI/pull/1403): Updated `DropdownMenu` to additionally accept list of JSX elements or a JSX fragment for `menuItems` prop.
- [#1610](https://github.com/iTwin/iTwinUI/pull/1610): Added `border` prop to `Surface`.
- [#1354](https://github.com/iTwin/iTwinUI/pull/1354): Updated `ExpandableBlock` to support customizable subcomponents: `<ExpandableBlock.Wrapper/>`, `<ExpandableBlock.Trigger/>`, `<ExpandableBlock.ExpandIcon/>`, `<ExpandableBlock.LabelArea/>`, `<ExpandableBlock.Title/>`, `<ExpandableBlock.Caption/>`, `<ExpandableBlock.EndIcon/>`, `<ExpandableBlock.Content/>`
- [#1435](https://github.com/iTwin/iTwinUI/pull/1435), [#1430](https://github.com/iTwin/iTwinUI/pull/1430), [#1510](https://github.com/iTwin/iTwinUI/pull/1510), [#1437](https://github.com/iTwin/iTwinUI/pull/1437), [#1466](https://github.com/iTwin/iTwinUI/pull/1466), [#1567](https://github.com/iTwin/iTwinUI/pull/1567), [#1440](https://github.com/iTwin/iTwinUI/pull/1440), [#1409](https://github.com/iTwin/iTwinUI/pull/1409), [#1355](https://github.com/iTwin/iTwinUI/pull/1355), [#1371](https://github.com/iTwin/iTwinUI/pull/1371), […]: Added new props to various components to allow passing custom class names for every DOM element.

### Patch Changes

- [#1605](https://github.com/iTwin/iTwinUI/pull/1605): Added `'use client'` directive for React Server Components support.
- [#1533](https://github.com/iTwin/iTwinUI/pull/1533): Fixed missing accessible name in SplitButton.
- [#1649](https://github.com/iTwin/iTwinUI/pull/1649): ThemeProvider will now inherit `portalContainer` if also inheriting theme.
- [#1446](https://github.com/iTwin/iTwinUI/pull/1446): Avatar has been refactored to be a single `<span>`. The colors have been updated to pass AAA contrast ratio.
- [#1354](https://github.com/iTwin/iTwinUI/pull/1354): Expandable block animation now uses pure css instead of javascript for transitioning.
- [#1609](https://github.com/iTwin/iTwinUI/pull/1609): Adjusted padding value for `Surface.Body`.
- [#1632](https://github.com/iTwin/iTwinUI/pull/1632): Adjusted gap between adjacent icons in searchbox.
- [#1492](https://github.com/iTwin/iTwinUI/pull/1492): Fixed `aria-owns` syntax for `TreeNode`
- [#1618](https://github.com/iTwin/iTwinUI/pull/1618): Improved accessibility of ColorPicker/ColorPalette/ColorSwatch.
- [#1389](https://github.com/iTwin/iTwinUI/pull/1389): The build output is now more readable, using a combination of `prettier` for formatting and `tslib` for import helpers.
- [#1360](https://github.com/iTwin/iTwinUI/pull/1360): The `color-scheme` property will now be correctly set for dark theme, resulting in better theming of built-in html elements.
- [#1495](https://github.com/iTwin/iTwinUI/pull/1495): Added accessible name to dropdown menu button in HeaderSplitButton.
- [#1486](https://github.com/iTwin/iTwinUI/pull/1486): DatePicker date tables now have accessible labels.
- [#1496](https://github.com/iTwin/iTwinUI/pull/1496): Added accessible button name to SideNavigation expand button.
- [#1499](https://github.com/iTwin/iTwinUI/pull/1499): Removed special handling of iPhone notch in Header and SideNavigation.
- [#1505](https://github.com/iTwin/iTwinUI/pull/1505): Gave accessible label to the sub-row toggle in <Table>.
- [#1397](https://github.com/iTwin/iTwinUI/pull/1397): Avatar will no longer incorrectly set aria-label on the status dot.
- [#1404](https://github.com/iTwin/iTwinUI/pull/1404): `aria-orientation` attribute removed from ButtonGroup to meet accessibility requirements.
- [#1420](https://github.com/iTwin/iTwinUI/pull/1420): RadioTile DOM has been simplified to remove a content wrapper `div`.

## 2.x

For any changes prior to 3.0.0, check out the [2.X changelog](https://github.com/iTwin/iTwinUI/blob/legacy/v2/packages/itwinui-react/CHANGELOG.md).
