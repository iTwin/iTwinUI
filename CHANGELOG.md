# Changelog

## [1.7.0]

`2021-06-07`

### What's new

- **Added `TimePicker` component** for standalone use or within `DatePicker` (through `showTime` prop).
- **Improved popup window support** by removing `document` references in `Popover` and adding `ownerDocument` prop to `Modal`.

### Fixes

- **Fixed `ownerDocument` in `useTheme` breaking SSR build.**
- **Fixed when `Table` columns change doesn't cause rows to re-render.**
- **Fixed `SidenavButton` styling issues** through base CSS package.

## [1.6.1]

`2021-06-03`

### Fixes

- **Fixed `ExpandableBlock` breaking some components when used together**, through base CSS package.

## [1.6.0]

`2021-05-31`

### What's new

- **Added number range filter to `Table`.** Use `tableFilters.NumberRangeFilter`.
- **Updated `ThemeProvider` component and `useTheme` hook to allow specification of ownerDocument**. This provides support for theme in popup browser windows.
- **Added new sizes to `ProgressRadial`.** The `size` prop can now accept 'x-small' and 'large' as values.

### Fixes

- **Fixed `Modal` leaving behind inline styles on body when unmounted.**
- **Moved `Select` dropdown element inside the main select container.**
- **Fixed `Wizard` resizing and `UserIcon` size issues** through base CSS package.

## [1.5.0]

`2021-05-20`

### What's new

- **Added new `Header` component,** with a condensed version available through `isSlim` prop.
  - **Added new `HeaderLogo` component** for use with the Header `appLogo` prop.
  - **Added new `HeaderBreadcrumbs` and `HeaderButton` component** for use with the Header `breadcrumbs` prop.
- **Added new `SideNavigation` component** and `SidenavButton` subcomponent.
- **Added date filter to `Table`.** Use `tableFilters.DateRangeFilter`.

### Fixes

- **Fixed `Table` bug where filter actions would also trigger sorting.**

## [1.4.1]

`2021-05-17`

### Fixes

- **`toaster` now creates container element only when used.**

## [1.4.0]

`2021-05-12`

### What's new

- **Added filtering to `Table`.** Use `Filter` and `filter` fields in columns. All filters can be found in `tableFilters` object.

## [1.3.0]

`2021-05-11`

### What's new

- **Added new `FileUpload` component** with drag & drop functionality.
- **Added lazy loading to `Table`** with new `onBottomReached` and `onRowInViewport` props.

### Fixes

- **Fixed `Table` bug when change of `onSelection` handler would cause infinite rerendering loop.**
- **Bumped @itwin/itwinui-icons-react to 1.1.1** which fixes relative path exports.

## [1.2.0]

`2021-04-29`

### What's new

- **Added optional tooltip for `Wizard` steps.** Provide `description` property to `steps` prop.
- **`DropdownMenu` has new `popoverProps`** for customizing popover behavior.

### Fixes

- **Fixed image sizing issues in `ErrorPage`**.
- **Fixed tooltip text blurring issues** through base CSS package.

## [1.1.0]

`2021-04-21`

### What's new

- **`DropdownButton` now supports `styleType='borderless'`.**
- **`Tooltip` has a new uniform visual style** through base CSS package.

### Fixes

- **Fixed minor bugs in `Tile` and `Footer`** through base CSS package.

## 1.0.0

`2021-04-15`

### What's new

- **Replaced `Popover` with tippy.js library.**
  - Components affected: `DropdownMenu`, `Select`, `DropdownButton`, `SplitButton`, `Tooltip`.
  - These components now use `TippyProps` (e.g. `onShow`, `onHide`, `visible`, `placement`), replacing old props.
- **Added `getUserColor` function** that returns a data-visualization color for `UserIcon` background.
- **Updated React to v17.**
- **iTwinUI is now open source and public!** 🎉

### Fixes

- **Fixed several icon issues.**

## 0.6.2

`2021-04-12`

### What's new

- **`iui-body` class is added to body.** Global overrides were removed.

## 0.6.1

`2021-04-08`

### Fixes

- **`Footer` got back separators.**

## 0.6.0

`2021-04-05`

### What's new

- **`Button` has new `startIcon` and `endIcon` props**, and all button styling has been completely revamped.
- **`MenuItem` and `SelectOption` have a new `disabled` prop.**
- **`TagContainer` has new `overflow` and `background` props**, which offer scrolling capabilities and better visuals.

### Fixes

- **Icons are now imported directly to reduce bundle size for CommonJS.**
- **`Footer` no longer has `fixed` position** in base iTwinUI CSS, allowing for manually positioning it.
- **Some global style resets have been removed** in base iTwinUI CSS to prevent conflicts.

## 0.5.1

`2021-03-23`

### What's new

- **Added ability to pass down HTML `data-*` attributes for all components**. Any valid props not used by components will be passed down to root elements.

### Fixes

- **Fixed Tile menu option onClick not passing args.**
- **Fixed Storybook theming of IdeasButton and Footer in Docs tab.**
- **Fixed spacing in InputGroup** through base iTwinUI CSS package.
- **Fixed positioning of input elements** through base iTwinUI CSS package.

## 0.5.0

`2021-03-18`

### What's new

- **Added `Tile` component.**
- **Added column sort to `Table`.** Pass `isSortable={true}` to enable sort for a table. You can disable sort for individual columns by setting `disableSortBy: true` in a column definition.
- **Added support for `styleType='borderless'` to `IconButton`.**
- **Added `TagContainer` component.**
- **Added `variant='basic'` to `Tag`, for use with the new `TagContainer`.**

### Fixes

- **Fixed tooltip interactions with mouse.**
- **Fixed margin issues in various components** through base iTwinUI CSS package.

## 0.4.1

`2021-03-09`

### Fixes

- **Fixed `Popover` overriding child's onClick.**

## 0.4.0

`2021-03-02`

### What's new

- **`DropdownButton` component added.**
- **Added selection to `Table`.** Pass `isSelectable={true}` and `onSelect` to `Table`.

### Fixes

- **Fixed child `ref` not getting set in `Popover`.**
- **Fixed margins in various components** through base iTwinUI CSS package.
- **Removed duplicate `title` prop from some components.**

## 0.3.0

`2021-02-22`

### What's new

- **`Badge` component added.**
- **Overview page added to Storybook.**

### Fixes

- **`positioner` class renamed to `iui-positioner`**
- **React.FC removed, so children is required for some components.**

## 0.2.1

`2021-02-12`

### Fixes

- **Tooltips show properly when used in modals.**
- **Components do not blink on init, if OS theme is dark.**

## 0.2.0

`2021-02-11`

### What's new

- **`SplitButton` component added.**
- **Typography components added: `Blockquote`, inline `Code`, and `Kbd`.**
- **Updated CONTRIBUTING and STYLEGUIDE docs.**
- **Added copyright headers to all files.**
- **Adding `ThemeProvider` is not mandatory anymore.**
- **`useTheme()` hook can also be used as an alternative to `ThemeProvider` for theming.**

### Fixes

- **Components are themed in Storybook Docs tab.**

## 0.1.0

`2021-02-03`

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

[1.7.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.6.1...v1.7.0
[1.6.1]: https://github.com/iTwin/iTwinUI-react/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/iTwin/iTwinUI-react/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/iTwin/iTwinUI-react/compare/v1.0.0...v1.1.0
