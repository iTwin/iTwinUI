# Changelog

### [1.23.2](https://www.github.com/iTwin/iTwinUI-react/compare/v1.23.1...v1.23.2) (2021-11-04)

### Fixes

* **Header:** Fixed hover effects on header logo. ([#413](https://www.github.com/iTwin/iTwinUI-react/issues/413)) ([a360a8e](https://www.github.com/iTwin/iTwinUI-react/commit/a360a8e5db6c98017d151d7f7e6d4e3ba768eb04))

### [1.23.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.23.0...v1.23.1) (2021-11-02)

### Fixes

* **Select:** Set max-width to 2x min-width ([#407](https://www.github.com/iTwin/iTwinUI-react/issues/407)) ([b863b1d](https://www.github.com/iTwin/iTwinUI-react/commit/b863b1d8917be9b64954bce03d75f60eb5f80d7a))
* **SideNavigation:** Add `isSubmenuOpen` prop to `SidenavButton`. ([#388](https://www.github.com/iTwin/iTwinUI-react/issues/388)) ([d9b8a34](https://www.github.com/iTwin/iTwinUI-react/commit/d9b8a34f35c17507c9a9e38fa0543aab43038e0a))
  * This prop allows for proper styling when submenu is open but page is not active.

## [1.23.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.22.0...v1.23.0) (2021-10-26)

### What's new

* **ColorPicker:** Add new `ColorPicker` component ([#346](https://www.github.com/iTwin/iTwinUI-react/issues/346)) ([5a82af9](https://www.github.com/iTwin/iTwinUI-react/commit/5a82af9e5ff76b77d3681a496e3af4da7928d890))
  * Add new subcomponents: `ColorBuilder`, `ColorInputPanel`, and `ColorPalette`

## [1.22.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.21.1...v1.22.0) (2021-10-19)

### What's new

* **InformationPanel:** Add new `InformationPanel` component ([#364](https://www.github.com/iTwin/iTwinUI-react/issues/364)) ([95c6483](https://www.github.com/iTwin/iTwinUI-react/commit/95c648353dc1053c740a5cbc2a5c5df38cec266b))
* **Alert:** Add new `clickableTextProps` prop ([#357](https://www.github.com/iTwin/iTwinUI-react/issues/357)) ([a5b7ec2](https://www.github.com/iTwin/iTwinUI-react/commit/a5b7ec25aacb5490a01b971ae22a77fe9c174013))
* **ExpandableBlock:** Add small size ([#372](https://www.github.com/iTwin/iTwinUI-react/issues/372)) ([08f7df8](https://www.github.com/iTwin/iTwinUI-react/commit/08f7df87029d1c1cf5009dc122248da91a7ec076))
* **Menu:** Added `MenuExtraContent` component ([#375](https://www.github.com/iTwin/iTwinUI-react/issues/375)) ([382fdb5](https://www.github.com/iTwin/iTwinUI-react/commit/382fdb54e906a247c2f3a82b25c624c460f8b3d2))
* **RadioTileGroup:** Add `status`, `message` and `svgIcon` props ([#355](https://www.github.com/iTwin/iTwinUI-react/issues/355)) ([7a65110](https://www.github.com/iTwin/iTwinUI-react/commit/7a65110479f8422603b438065a18fcd2b19db147))
* **SideNavigation:** Add new `submenu` prop and `SidenavSubmenu` component ([#376](https://www.github.com/iTwin/iTwinUI-react/issues/376)) ([1c8e0c5](https://www.github.com/iTwin/iTwinUI-react/commit/1c8e0c5500452f5d4368e73c952b99fd51bad262))
* **Table:** Added pagination support  ([#351](https://www.github.com/iTwin/iTwinUI-react/issues/351)) ([6d7eb8f](https://www.github.com/iTwin/iTwinUI-react/commit/6d7eb8fa52a38d87ffbaed19bdf344c1e2d905b1))
* **Toaster:** Return `close` function for individual toasts ([#370](https://www.github.com/iTwin/iTwinUI-react/issues/370)) ([905e56b](https://www.github.com/iTwin/iTwinUI-react/commit/905e56b8051e33b5a6e394b248a2e77ea08798ce))

### Fixes

* **ComboBox:** `onChange` no longer gets called on mount ([#373](https://www.github.com/iTwin/iTwinUI-react/issues/373)) ([db5406a](https://www.github.com/iTwin/iTwinUI-react/commit/db5406a4c3a43aeb09f2dadc932379f7dd1a564f))
* **ComboBox:** Reset filteredOptions if options are updated ([#381](https://www.github.com/iTwin/iTwinUI-react/issues/381)) ([7bda333](https://www.github.com/iTwin/iTwinUI-react/commit/7bda3336cd3fff98f7de7ad404d1829dc12aae6b))

### [1.21.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.21.0...v1.21.1) (2021-10-07)

### Fixes

* **RadioTilesGroup:** Fixed z-index issue and added wrap ([#359](https://www.github.com/iTwin/iTwinUI-react/issues/359)) ([3461b0f](https://www.github.com/iTwin/iTwinUI-react/commit/3461b0f4ad33ac545208029fcf26613ca8f9823c))

## [1.21.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.20.0...v1.21.0) (2021-10-05)

### What's new

* **ComboBox:** Add new `ComboBox` component with list autocomplete (list is filtered when typing in input) ([#338](https://www.github.com/iTwin/iTwinUI-react/issues/338)) ([92ac59e](https://www.github.com/iTwin/iTwinUI-react/commit/92ac59e01614bb658783d8a49aa7558f6bf61938))
* **Tile:** Make `thumbnail` prop optional ([#354](https://www.github.com/iTwin/iTwinUI-react/issues/354)) ([b5a5a4e](https://www.github.com/iTwin/iTwinUI-react/commit/b5a5a4ed295ffd373180b84635ed198966f3a993))

## [1.20.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.19.0...v1.20.0) (2021-09-28)

### What's new

* **Menu:** Added `MenuDivider` component. ([#323](https://www.github.com/iTwin/iTwinUI-react/issues/323)) ([91fdafb](https://www.github.com/iTwin/iTwinUI-react/commit/91fdafb8150842afdb87c9c0ced936791b57a9a4))
* **Table:** Added a flag `selectRowOnClick`. ([#337](https://www.github.com/iTwin/iTwinUI-react/issues/337)) ([20cba1d](https://www.github.com/iTwin/iTwinUI-react/commit/20cba1d847cb140466aea77a8958bb638662926b))

## [1.19.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.18.0...v1.19.0) (2021-09-21)

### What's new

* **LabeledInput** and **LabeledTextarea**: Add new `iconDisplayStyle` prop to allow hybrid layouts. ([#309](https://www.github.com/iTwin/iTwinUI-react/issues/309)) ([45b82c2](https://www.github.com/iTwin/iTwinUI-react/commit/45b82c2232c09c4b54b2db14eb53bb3be3bd276a))
* **Toasts**: Add new `animateOutTo` prop for improved exit animation. ([#316](https://www.github.com/iTwin/iTwinUI-react/issues/316)) ([886efff](https://www.github.com/iTwin/iTwinUI-react/commit/886efff098d0cee98d0bcd9bd096c20f8f51d931))

## [1.18.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.17.0...v1.18.0) (2021-09-13)

### What's new

* **ExpandableBlock:** Add new `status` and `endIcon` props ([#303](https://www.github.com/iTwin/iTwinUI-react/issues/303)) ([3285db2](https://www.github.com/iTwin/iTwinUI-react/commit/3285db20efd9bda9d7b86ff3dbaea15759bc65f6))
* **Table:** Editable cell. Pass `EditableCell` component to column `cellRenderer` property. ([#307](https://www.github.com/iTwin/iTwinUI-react/issues/307)) ([0457702](https://www.github.com/iTwin/iTwinUI-react/commit/0457702e476a0770f9e114e60b024df3c1092342))

### Fixes

* **Tooltip:** Fixed `Tooltip` content clipping when it is next to the viewport edge ([#314](https://www.github.com/iTwin/iTwinUI-react/issues/314)) ([5661310](https://www.github.com/iTwin/iTwinUI-react/commit/56613109ae483b1f610ddfb75c9e062072247c8b))

## [1.17.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.16.2...v1.17.0) (2021-08-31)

### What's new

* **Toaster:** Add settings to customize placement and order ([#276](https://www.github.com/iTwin/iTwinUI-react/issues/276)) ([5101330](https://www.github.com/iTwin/iTwinUI-react/commit/510133015231876c2dc05421bd52b7deaacb6877))
* **Modal:** Focus is now trapped inside modal ([#282](https://www.github.com/iTwin/iTwinUI-react/issues/282)) ([95ea900](https://www.github.com/iTwin/iTwinUI-react/commit/95ea900adfb1bb626597ddcfbcc395f5412a60a4))
* **Wizard:** Improve accessibility and forward ref ([#290](https://www.github.com/iTwin/iTwinUI-react/issues/290)) ([69cfa62](https://www.github.com/iTwin/iTwinUI-react/commit/69cfa62aafdf9ddfa1658c1fa50556364db8eec6))

### Fixes

* `svgIcon` prop can now override status icon in all input groups and labeled inputs ([#295](https://www.github.com/iTwin/iTwinUI-react/issues/295)) ([4eac51e](https://www.github.com/iTwin/iTwinUI-react/commit/4eac51e41d300b42f8f74d1f218acba1e607039e))
* **DropdownButton:** Forward ref to allow popovers ([#297](https://www.github.com/iTwin/iTwinUI-react/issues/297)) ([d4aa6a3](https://www.github.com/iTwin/iTwinUI-react/commit/d4aa6a3dcaf0f3896fa0e77c63af2da343f20542))
* **HeaderButton:** Removed native `name` prop to allow ReactNode ([#301](https://www.github.com/iTwin/iTwinUI-react/issues/301)) ([4001d6d](https://www.github.com/iTwin/iTwinUI-react/commit/4001d6da33e26b4ebf5403e1121edf72abc26c7c))

### [1.16.2](https://www.github.com/iTwin/iTwinUI-react/compare/v1.16.1...v1.16.2) (2021-08-25)

### Fixes

* **Table:** Fixed failing user tests by copying filter functions from `react-table` ([#292](https://www.github.com/iTwin/iTwinUI-react/issues/292)) ([53ace9e](https://www.github.com/iTwin/iTwinUI-react/commit/53ace9e0c1beacd4dfc0deb151f93a0bd4f659a3))

### [1.16.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.16.0...v1.16.1) (2021-08-24)

### Fixes

* **Fixed a bug in `VerticalTabs` where it was not rendered correctly.** ([#283](https://www.github.com/iTwin/iTwinUI-react/issues/283)) ([325d51d](https://www.github.com/iTwin/iTwinUI-react/commit/325d51d09101d7c7091009eda4be381d76d24fe8))

## [1.16.0] (2021-08-24)

### What's new

- **Added sub-rows support to `Table`.** Use the `subRows` field in your `data` entries.
- **Added responsive overflow handling to `ButtonGroup`** through `overflowButton` prop.
- **Added new animation style to `ExpandableBlock`.**
- **Added ability to pass native HTML attributes in `Select`** and arbitrary props in `SelectOption`.
- **Added new `VerticalTabs` component**, similar to `HorizontalTabs`.
  - Renamed `HorizontalTab` component to `Tab`, for use in both `HorizontalTabs` and `VerticalTabs`.

### Fixes

- **Fixed workflow `Wizard` styling and behavior** to ignore current and clickable steps.
- **Fixed a bug in `HeaderButton`** where `menuItems` would throw error when `undefined`.

## [1.15.0] (2021-08-17)

### What's new

- **Updated `Badge` styling** and added preset colors to `backgroundColor` prop.
- **Added new polymorphic `Text` component.**
- **Added new `Fieldset` component** for grouping inputs.
- **Added new `density` prop to `Table`** to reduce row height for a condensed or extra-condensed table.
- **Added split variant to `HeaderButton`.** Used when both `onClick` and `menuItems` props are specified.

### Fixes

- **Fixed a `Table` bug where filter icon is hidden when `manualFilters` is on and no data is returned after filtering.**

### [1.14.1] (2021-08-05)

### Fixes

- **Fixed a bug where Arrow keydown on `Slider` propagated to parent container's scrollbars.**

## [1.14.0] (2021-08-03)

### What's new

- **`Table` can now accept custom row props** through `rowProps` prop.

### Fixes

- **Fixed a bug in `Slider` where thumb focus was lost on keyboard navigation.**
- **Fixed `UserIconGroup` prop type for `countIconProps`** to support refs.

### [1.13.1] (2021-07-29)

### Fixes

- **Fixed `Table` bug when selecting filtered rows throws an exception.**
- **Fixed `Table` empty state background color** through base CSS package.

## [1.13.0] (2021-07-29)

### What's new

- **Added new `Breadcrumbs` component.** Handles overflow based on available space and resizes.
- **Added support for nested menus in `MenuItem`** through new `subMenuItems` prop.

### Fixes

- **Made `Button` children optional** to allow using buttons with only icons.
- **Fix `Slider` bug where onChange was not always called after pointerUp.**

## [1.12.0] (2021-07-20)

### What's new

- **Changed default body background color** through CSS package.
- **Added new `Slider` component** - supports single/multiple/custom thumbs, ticks and tooltips.
- **Added new `UserIconGroup` component** - stacked/non-stacked, animated lists with custom count icon behavior.
- **Added new `sublabel` and `size` props to `MenuItem` and `SelectOption`.**
- **Added sublabel and icon support to `HorizontalTabs` component.** Pass new `HorizontalTab` component to `labels` prop.
- **Added keyboard navigation to `HorizontalTabs`,** with auto/manual tab selection using `focusActivationMode`.

### Fixes

- **Fixed `Table` overflow when selection is enabled and min width is set for columns.**

## [1.11.0] (2021-07-08)

### What's new

- **Improved row selection in `Table`.** Clicking on rows will now select them and fire the `onRowClick` callback.
- **Allowing to disable specific rows in `Table`.** Provide `isRowDisabled` prop.

## [1.10.0] (2021-07-01)

### What's new

- **Added expanding functionality for `Table`.** Provide `subComponent` prop.
- **Added ability to control opening `Select` menu.** Provide `visible` in `popoverProps` prop.
- **Updated styling for `HorizontalTabs`** through base CSS package.
- **Improved `Table` documentation.**

## [1.9.0] (2021-06-21)

### What's new

- **Added `acceptType` prop to `FileUploadTemplate`.**
- **Added 'warning' category to `Toast`.** Use `toaster.warning()`.

### Fixes

- **Added missing `id` prop in some components.**

### [1.8.1] (2021-06-17)

### Fixes

- **Fixed a bug when `Table` sorting or filtering triggered `onSelect`.**

## [1.8.0] (2021-06-15)

### What's new

- **Added `size` prop to `Input` and `Select` components.** Supports small and large sizes.
- **Updated `Table` styles** through base CSS package.

### Fixes

- **Fixed `ProgressRadial` not using `className` prop correctly.**

### [1.7.2] (2021-06-09)

### Fixes

- **Fixed `DropdownMenu` not closing when tabbing out.**
  - Also fixed in derived components: `DropdownButton`, `SplitButton`, and `Select`.

### [1.7.1] (2021-06-08)

### Fixes

- **Replaced all `document` and `window` with get functions to support SSR.**

## [1.7.0] (2021-06-07)

### What's new

- **Added `TimePicker` component** for standalone use or within `DatePicker` (through `showTime` prop).
- **Improved popup window support** by removing `document` references in `Popover` and adding `ownerDocument` prop to `Modal`.

### Fixes

- **Fixed `ownerDocument` in `useTheme` breaking SSR build.**
- **Fixed when `Table` columns change doesn't cause rows to re-render.**
- **Fixed `SidenavButton` styling issues** through base CSS package.

### [1.6.1] (2021-06-03)

### Fixes

- **Fixed `ExpandableBlock` breaking some components when used together**, through base CSS package.

## [1.6.0] (2021-05-31)

### What's new

- **Added number range filter to `Table`.** Use `tableFilters.NumberRangeFilter`.
- **Updated `ThemeProvider` component and `useTheme` hook to allow specification of ownerDocument**. This provides support for theme in popup browser windows.
- **Added new sizes to `ProgressRadial`.** The `size` prop can now accept 'x-small' and 'large' as values.

### Fixes

- **Fixed `Modal` leaving behind inline styles on body when unmounted.**
- **Moved `Select` dropdown element inside the main select container.**
- **Fixed `Wizard` resizing and `UserIcon` size issues** through base CSS package.

## [1.5.0] (2021-05-20)

### What's new

- **Added new `Header` component,** with a condensed version available through `isSlim` prop.
  - **Added new `HeaderLogo` component** for use with the Header `appLogo` prop.
  - **Added new `HeaderBreadcrumbs` and `HeaderButton` component** for use with the Header `breadcrumbs` prop.
- **Added new `SideNavigation` component** and `SidenavButton` subcomponent.
- **Added date filter to `Table`.** Use `tableFilters.DateRangeFilter`.

### Fixes

- **Fixed `Table` bug where filter actions would also trigger sorting.**

### [1.4.1] (2021-05-17)

### Fixes

- **`toaster` now creates container element only when used.**

## [1.4.0] (2021-05-12)

### What's new

- **Added filtering to `Table`.** Use `Filter` and `filter` fields in columns. All filters can be found in `tableFilters` object.

## [1.3.0] (2021-05-11)

### What's new

- **Added new `FileUpload` component** with drag & drop functionality.
- **Added lazy loading to `Table`** with new `onBottomReached` and `onRowInViewport` props.

### Fixes

- **Fixed `Table` bug when change of `onSelection` handler would cause infinite rerendering loop.**
- **Bumped @itwin/itwinui-icons-react to 1.1.1** which fixes relative path exports.

## [1.2.0] (2021-04-29)

### What's new

- **Added optional tooltip for `Wizard` steps.** Provide `description` property to `steps` prop.
- **`DropdownMenu` has new `popoverProps`** for customizing popover behavior.

### Fixes

- **Fixed image sizing issues in `ErrorPage`**.
- **Fixed tooltip text blurring issues** through base CSS package.

## [1.1.0] (2021-04-21)

### What's new

- **`DropdownButton` now supports `styleType='borderless'`.**
- **`Tooltip` has a new uniform visual style** through base CSS package.

### Fixes

- **Fixed minor bugs in `Tile` and `Footer`** through base CSS package.

## 1.0.0 (2021-04-15)

### What's new

- **Replaced `Popover` with tippy.js library.**
  - Components affected: `DropdownMenu`, `Select`, `DropdownButton`, `SplitButton`, `Tooltip`.
  - These components now use `TippyProps` (e.g. `onShow`, `onHide`, `visible`, `placement`), replacing old props.
- **Added `getUserColor` function** that returns a data-visualization color for `UserIcon` background.
- **Updated React to v17.**
- **iTwinUI is now open source and public!** 🎉

### Fixes

- **Fixed several icon issues.**

### 0.6.2 (2021-04-12)

### What's new

- **`iui-body` class is added to body.** Global overrides were removed.

### 0.6.1 (2021-04-08)

### Fixes

- **`Footer` got back separators.**

## 0.6.0 (2021-04-05)

### What's new

- **`Button` has new `startIcon` and `endIcon` props**, and all button styling has been completely revamped.
- **`MenuItem` and `SelectOption` have a new `disabled` prop.**
- **`TagContainer` has new `overflow` and `background` props**, which offer scrolling capabilities and better visuals.

### Fixes

- **Icons are now imported directly to reduce bundle size for CommonJS.**
- **`Footer` no longer has `fixed` position** in base iTwinUI CSS, allowing for manually positioning it.
- **Some global style resets have been removed** in base iTwinUI CSS to prevent conflicts.

### 0.5.1 (2021-03-23)

### What's new

- **Added ability to pass down HTML `data-*` attributes for all components**. Any valid props not used by components will be passed down to root elements.

### Fixes

- **Fixed Tile menu option onClick not passing args.**
- **Fixed Storybook theming of IdeasButton and Footer in Docs tab.**
- **Fixed spacing in InputGroup** through base iTwinUI CSS package.
- **Fixed positioning of input elements** through base iTwinUI CSS package.

## 0.5.0 (2021-03-18)

### What's new

- **Added `Tile` component.**
- **Added column sort to `Table`.** Pass `isSortable={true}` to enable sort for a table. You can disable sort for individual columns by setting `disableSortBy: true` in a column definition.
- **Added support for `styleType='borderless'` to `IconButton`.**
- **Added `TagContainer` component.**
- **Added `variant='basic'` to `Tag`, for use with the new `TagContainer`.**

### Fixes

- **Fixed tooltip interactions with mouse.**
- **Fixed margin issues in various components** through base iTwinUI CSS package.

### 0.4.1 (2021-03-09)

### Fixes

- **Fixed `Popover` overriding child's onClick.**

## 0.4.0 (2021-03-02)

### What's new

- **`DropdownButton` component added.**
- **Added selection to `Table`.** Pass `isSelectable={true}` and `onSelect` to `Table`.

### Fixes

- **Fixed child `ref` not getting set in `Popover`.**
- **Fixed margins in various components** through base iTwinUI CSS package.
- **Removed duplicate `title` prop from some components.**

## 0.3.0 (2021-02-22)

### What's new

- **`Badge` component added.**
- **Overview page added to Storybook.**

### Fixes

- **`positioner` class renamed to `iui-positioner`**
- **React.FC removed, so children is required for some components.**

### 0.2.1 (2021-02-12)

### Fixes

- **Tooltips show properly when used in modals.**
- **Components do not blink on init, if OS theme is dark.**

## 0.2.0 (2021-02-11)

### What's new

- **`SplitButton` component added.**
- **Typography components added: `Blockquote`, inline `Code`, and `Kbd`.**
- **Updated CONTRIBUTING and STYLEGUIDE docs.**
- **Added copyright headers to all files.**
- **Adding `ThemeProvider` is not mandatory anymore.**
- **`useTheme()` hook can also be used as an alternative to `ThemeProvider` for theming.**

### Fixes

- **Components are themed in Storybook Docs tab.**

## 0.1.0 (2021-02-03)

## What has changed from the latest bwc-react package:

### Breaking changes

- **ThemeProvider component MUST be used inside your main app component as it provides global styles from iTwinUI.**
- **Refactored text elements.** Property `variant` was removed. Property `muted` renamed to `isMuted`.
- **Loader component removed.** Use ProgressIndicators instead.
- **Removed old Table component from core.**
- **Removed table components from innersource/Grid.**
- **HorizontalTabs `green` prop changed to `color`.** If you want green active tabs pass `color='green'` to HorizontalTabs props.
- **Spinner renamed to ProgressRadial. `internetExplorer` property is removed. `success` property replaced with `status`. Instead of `style` property, `size` property can be used to choose size.**
- **ProgressBar renamed to ProgressLinear. `labelLeft` and `labelRight` properties replaced with `labels`.**
- **Wizard component refactored and API changed.**
- **Removed exports of all svg icons.** Please use `@bentley/icons-generic-react` for your react svg component needs by manually depending on it.
- **Button component has new styleTypes: `cta`, `high-visibility` and `default`. `external` property was removed.**
- **IconButton was removed from innersource. Use one in the core now.**
- **IdeasButton was removed from innersource. Use one in the core now.**
- **MenuButton was removed from innersource.**
- **ButtonWithDropdown was removed from innersource.**
- **ButtonRow, Toolbar were removed from innersource. Use ButtonGroup from core.**
- **DatePicker was refactored. `dateFormat` and `disabled` properties were removed as now component renders only calendar. `setDate` was replaced with `onChange`.**
- **Input refactored. Removed `onEnter` property.**. Use `onKeyDown` to handle clicks if needed.
- **LabeledInput refactored. Removed `onEnter`, `onIconClick` properties.** Pass click handler together with `svgIcon` if needed.
- **Expandable block handles expansion itself.** You can still control it manually using `isExpanded` prop. If you were handling `onClick`, `onKeyDown` or `onKeyPress` events, now pass your callback function as `onToggle` prop.
- **Toaster refactored and API changed.** Prop `link` object property `url` changed to `onClick` and now accepts ONLY a function.
- **Tooltip prop `text` renamed to `content`. `children` has to be a valid JSX element.**
- **ToggleSwitch prop `on` removed. Control toggling through native input props (`checked`, `onchange`).**
- **Status renames: `success` -> `positive`, `error` -> `negative`, `info` -> `informational`.**
- **innersource folder removed.**
- **Modal API changes.** Modal does not handle buttons anymore, use `ModalButtonBar` with `core/Button` in the modal body instead. `onEnter` was removed, use `onKeyDown` instead. Props name changes: `dismissible` -> `isDismissible`, `closeHandle` -> `onClose`, `dismissOnOverlayPress` -> `closeOnExternalClick`, `dismissOnEscapeKey` -> `closeOnEsc`.

### What's new

- **Added footer component.**
- **HorizontalTabs has 2 more types: borderless and pill.** Pass `type='borderless'` or `type='pill'` to HorizontalTabs props.
- **Added error page component.**
- **Updated Radio component.**
- **Wizard component now has 2 new types: `long` and `workflow`.**
- **Updated Alert component with new props: `clickableText`, `onClick`, `onClose` and `isSticky`.**
- **Button component now has new `small` size.**
- **LabeledInput now has `inline` type.**
- **LabeledTextarea now has `inline` type and `svgIcon` property for custom icon.**
- **Updated Checkbox component.**
- **Use InputGroup component to group Checkbox or Radio components together.**
- **Toaster now exposes `onRemove` prop which is triggered after toast is being removed.**
- **Tooltip refactored. Now its visibility can be controlled by prop `isVisible`.**
- **ToggleSwitch refactored. Now it is using native input props. Label position can be controlled using `labelPosition` prop.**
- **New RadioTileGroup component added.**
- **New ThemeProvider component added.** It allows to switch between light and dark themes.
- **iTwinUI-React is generated to `CommonJS` and `ES` modules.** Usage of `ES` modules allows bundlers to tree-shake unused code resulting in smaller bundle sizes.

[1.16.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.15.0...v1.16.0
[1.15.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.14.1...v1.15.0
[1.14.1]: https://github.com/iTwin/iTwinUI-react/compare/v1.14.0...v1.14.1
[1.14.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.13.1...v1.14.0
[1.13.1]: https://github.com/iTwin/iTwinUI-react/compare/v1.13.0...v1.13.1
[1.13.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.8.1...v1.9.0
[1.8.1]: https://github.com/iTwin/iTwinUI-react/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.7.2...v1.8.0
[1.7.2]: https://github.com/iTwin/iTwinUI-react/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/iTwin/iTwinUI-react/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.6.1...v1.7.0
[1.6.1]: https://github.com/iTwin/iTwinUI-react/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/iTwin/iTwinUI-react/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.0.0...v1.1.0
