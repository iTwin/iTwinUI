# Changelog

## 3.15.0

### Minor Changes

- [#2233](https://github.com/iTwin/iTwinUI/pull/2233): Added a new `dropdownMenuProps` prop to `SplitButton` for additional control over the menu (e.g. disable the [`hide` middleware](https://floating-ui.com/docs/hide)).
- [#2259](https://github.com/iTwin/iTwinUI/pull/2259): `ComboBox` and `Select` now allow customizing the portal behavior of the floating listbox.

  - To customize `ComboBox` portaling behavior, use `dropdownMenuProps.portal`.
  - To customize `Select` portaling behavior, use `popoverProps.portal`.

  <details>
  <summary>Example</summary>

  To turn off the default portaling behavior, use `portal: false`.

  ```jsx
  <ComboBox
    options={[…]}
    dropdownMenuProps={{ portal: false }}
  />
  ```

  ```jsx
  <Select
    options={[…]}
    popoverProps={{ portal: false }}
  />
  ```

  </details>

- [#2233](https://github.com/iTwin/iTwinUI/pull/2233): `Popover` now enables the [`hide` middleware](https://floating-ui.com/docs/hide) to hide the floating content when the trigger is hidden.
  - This also affects other popover-like components (e.g. `Select`, `ComboBox`, `DropdownMenu`, `SplitButton`).
  - If the floating content gets hidden even when it shouldn't (e.g. due to some custom styles interfering with the trigger's hide detection), consider disabling the `hide` middleware.
- [#2238](https://github.com/iTwin/iTwinUI/pull/2238): Passing `styleType="borderless"` to `SearchBox.ExpandButton` now works as expected. This is because collapsed `SearchBox` will now hide its border and background in favor of the ones from `SearchBox.ExpandButton`.

  <details>
  <summary>Example</summary>

  ```diff
  <SearchBox expandable>
    <SearchBox.CollapsedState>
  -     <SearchBox.ExpandButton/>
  +     <SearchBox.ExpandButton styleType="borderless"/>
    </SearchBox.CollapsedState>
    <SearchBox.ExpandedState>…</SearchBox.ExpandedState>
  </SearchBox>
  ```

  </details>

- [#2211](https://github.com/iTwin/iTwinUI/pull/2211): Added the ability to have custom `props` for each sub-component of `ColorPicker`.
  New props added associated with each sub-component are:
  - `ColorBuilder`: `colorFieldProps`, `colorDotProps`, `opacitySliderProps`, and `hueSliderProps`.
  - `ColorInputPanel`: `panelLabelProps`, `colorInputContainerProps`, `inputFieldsGroupProps` and `swapColorFormatButtonProps`.
  - `ColorPalette`: `labelProps`, and `paletteContainerProps`.

### Patch Changes

- [#2239](https://github.com/iTwin/iTwinUI/pull/2239): Fixed `scrollToRow` in un-virtualized `Table`. In virtualized `Table`, `scrollToRow` now scrolls to the top for consistent behavior.
- [#2233](https://github.com/iTwin/iTwinUI/pull/2233): `Popover`'s `middleware.hide` prop is now respected.
- [#2208](https://github.com/iTwin/iTwinUI/pull/2208): Fixed broken `subComponent` when enabling virtualization in `Table`.
- [#2208](https://github.com/iTwin/iTwinUI/pull/2208): `Table`'s animation to show and hide its `subComponent` is now removed.
- [#2252](https://github.com/iTwin/iTwinUI/pull/2252): Fixed an issue where some components (e.g. `VisuallyHidden` inside `ProgressRadial`) were losing their styles when reparented into a different window.

## 3.14.2

### Patch Changes

- [#2217](https://github.com/iTwin/iTwinUI/pull/2217): Fixed the `Footer`'s `translatedTitles` prop's type to allow passing partial translations.
- [#2218](https://github.com/iTwin/iTwinUI/pull/2218): Fixed a `Table` bug where custom `Cell` content was not taking up the entire available width in some cases.
- [#2216](https://github.com/iTwin/iTwinUI/pull/2216): Fixed the fallback CSS logic in `ThemeProvider` to load the correct stylesheet version.

## 3.14.1

### Patch Changes

- [#2209](https://github.com/iTwin/iTwinUI/pull/2209): Fixed an issue where nested `Popover`s were automatically closing due to faulty "outside click" detection.
- [#2213](https://github.com/iTwin/iTwinUI/pull/2213): Dev-only warnings have been improved so that they are correctly shown for every individual instance of a component. Additionally, these warnings are now logged using `console.error`, which results in a better stack trace.

## 3.14.0

### Minor Changes

- [#2040](https://github.com/iTwin/iTwinUI/pull/2040): The colors of disabled controls have been adjusted make them easier to distinguish from regular controls.
  - Also added hover state to disabled button, select, input, textarea, and actionable list item to help with accessibility.
- [#2153](https://github.com/iTwin/iTwinUI/pull/2153): Nested `ThemeProvider`s will now reuse the same toaster instead of creating new ones.
- [#2201](https://github.com/iTwin/iTwinUI/pull/2201): `List` and `ListItem` will now be rendered as `<div>`s instead of `<ul>`/`<li>`. This change makes these components less restrictive and less error-prone to use.
- [#2187](https://github.com/iTwin/iTwinUI/pull/2187): Floating elements will now use `position: fixed` instead of `position: absolute`.
  - This fixes some issues when a floating element is placed near the edge of the viewport.
  - Some components affected: `Tooltip`, `Popover`, `Select`, `DropdownMenu`, `ComboBox`, etc.
- [#2190](https://github.com/iTwin/iTwinUI/pull/2190): `Popover` now enables the [`size` middleware](https://floating-ui.com/docs/size) to prevent it from overflowing the viewport.
  - This also affects other popover-like components (e.g. `Select`, `ComboBox`, `DropdownMenu`).
  - `Popover` now also sets a default max-height of `400px` to prevent it from becoming too large. This can be customized using the `middleware.size.maxHeight` prop.
- [#2205](https://github.com/iTwin/iTwinUI/pull/2205): `tableFilters.TextFilter` now prevents the user from applying the filter when the text input is empty.
- [#2205](https://github.com/iTwin/iTwinUI/pull/2205): `BaseFilter` now renders as a `<form>` and `FilterButtonBar` now renders a `<button type="submit">`. Together, this enables the use of browser's built-in validation before applying filters.

  - The `setFilter` prop in `FilterButtonBar` has been deprecated, as `onSubmit` should be used instead.
    <details>
      <summary>Diff</summary>

    ```diff
      <BaseFilter
    +   onSubmit={() => setFilter(text)}
      >
        …
        <FilterButtonBar
    -     setFilter={() => setFilter(text)}
        />
      </BaseFilter>
    ```

    </details>

### Patch Changes

- [#2194](https://github.com/iTwin/iTwinUI/pull/2194): Fixed an issue where CommonJS files in the development build output (`DEV-cjs/` directory) were being treated as ESM, inadvertently causing runtime errors during development.
- [#2185](https://github.com/iTwin/iTwinUI/pull/2185): Portal containers will now default to a `<div>` rendered at the end of `<body>` instead of a `<div>` rendered inside the `<ThemeProvider>`.
- [#2202](https://github.com/iTwin/iTwinUI/pull/2202): `IconButton` will now reroute the HTML `title` prop to its own `label` prop for better accessibility. The `title` prop has also been marked deprecated to encourage the use of `label`.
- [#2168](https://github.com/iTwin/iTwinUI/pull/2168): Adjusted focus management in `Popover` so that it allows interactive elements inside the popover to be more easily focused. This more closely matches the behavior of the HTML `<dialog>` element, which focuses the first interactive element inside it.
- [#2207](https://github.com/iTwin/iTwinUI/pull/2207): Fixed a bug where `pointer-events: none` was sometimes applied to the main `<body>` when a `MenuItem` was hovered in a popout window.
- [#2189](https://github.com/iTwin/iTwinUI/pull/2189): Floating elements will now have a few pixels of padding from the edge of the viewport.
- [#2202](https://github.com/iTwin/iTwinUI/pull/2202): `IconButton` will now display warnings during development when it's missing a label.
- [#2178](https://github.com/iTwin/iTwinUI/pull/2178): Reduced layout thrashing on `Table` component by memoizing an expensive `ref` function.
- [#2194](https://github.com/iTwin/iTwinUI/pull/2194): The development build output is now also formatted using `prettier` for easier debugging.

## 3.13.4

### Patch Changes

- [#2138](https://github.com/iTwin/iTwinUI/pull/2138): Fixed an issue in `Table` column resizing where passing in a `width` value that was less than the column's default `minWidth` would cause an undesirable shift when the column was resized.
- [#2170](https://github.com/iTwin/iTwinUI/pull/2170): Fixed an issue in virtualized `Tree` where the `style` prop passed to `TreeNode` was not respected.
- [#2170](https://github.com/iTwin/iTwinUI/pull/2170): Fixed an issue in virtualized `Tree` where horizontal scroll was impossible to achieve.
- [#2174](https://github.com/iTwin/iTwinUI/pull/2174): Fixed an issue in `Table` where the virtualizer was being initialized when the `enableVirtualization` prop wasn't set to `true`.

## 3.13.3

### Patch Changes

- [#2163](https://github.com/iTwin/iTwinUI/pull/2163): Fixed an issue in virtualized `Table` where horizontal scroll was broken.

## 3.13.2

### Patch Changes

- [#2143](https://github.com/iTwin/iTwinUI/pull/2143): Added `border-radius` to the `Table` component so that the border radius is correctly applied to the `Table`'s corners.
- [#2161](https://github.com/iTwin/iTwinUI/pull/2161): Fixed issue where `emptyTableContent` would not appear on virutalized `Table` components.

## 3.13.1

### Patch Changes

- [#2147](https://github.com/iTwin/iTwinUI/pull/2147): Fixed a CSS issue in `ExpandableBlock` where its content wouldn't stay constrained by the width of the parent.
- [#2148](https://github.com/iTwin/iTwinUI/pull/2148): Fixed regression where the value of the `toggleRowSelected` action for the `Table` would be undefined when `selectSubRows` was set to `false`.

## 3.13.0

### Minor Changes

- [#2106](https://github.com/iTwin/iTwinUI/pull/2106): All internal CSS class prefixes have been changed to prevent style conflicts across minor versions.

  - While this is _not_ considered a breaking change according to our [support policy](https://github.com/iTwin/iTwinUI/wiki/Support-policy), this change might affect you if you ignore our pleas to not rely on these internal class names. The recommendation is to pass your own custom `className` through props.

- [#2131](https://github.com/iTwin/iTwinUI/pull/2131): Development-only warnings will now be properly excluded from the production build. This is done using a separate `"development"` entrypoint listed in `package.json#exports`.

- [#2135](https://github.com/iTwin/iTwinUI/pull/2135): Changed the column manager from a `DropdownMenu` to a `Popover` to fix invalid markup and accessibility issues.

- Added dependency on `@tanstack/react-virtual` to replace the custom virtual-scroll implementation. This affects the `enableVirtualization` prop in `ComboBox`, `Table`, and `Tree`.

  - [#2061](https://github.com/iTwin/iTwinUI/pull/2061): Virtualized `ComboBox` now correctly supports dynamic sizing, e.g. when options both with and without `subLabel` are present.
  - [#2092](https://github.com/iTwin/iTwinUI/pull/2092): Virtualized `Table` has been improved so that scrolling no longer jumps when rows are scrolled past.
  - [#2139](https://github.com/iTwin/iTwinUI/pull/2139): Virtualized `Tree` no longer requires a wrapping scrollable element, since the tree itself is scrollable now.
    <details>
      <summary>Diff</summary>

    ```diff
    - <div style={{overflow: 'auto', height: 'min(400px, 90vh)'}}>
        <Tree
          enableVirtualization
    +     style={{height: 'min(400px, 90vh)'}}
        />
    - </div>
    ```

    </details>

### Patch Changes

- [#2139](https://github.com/iTwin/iTwinUI/pull/2139): Added `overflow: auto` to `Tree` component to provide more consistent styling across components.
- [#2137](https://github.com/iTwin/iTwinUI/pull/2137): Console warnings will now be displayed during development when multiple versions of iTwinUI are detected.
- [#2145](https://github.com/iTwin/iTwinUI/pull/2145): Fixed an issue where the `Overlay` component was causing bundler warnings about a non-analyzable expression used in a dependency.
- [#2135](https://github.com/iTwin/iTwinUI/pull/2135): The `Table` column manager button's open state no longer has the `Button`'s blue active color.
- [#2142](https://github.com/iTwin/iTwinUI/pull/2142): Added `displayName`s to all components that were previously missing them.
- [#2141](https://github.com/iTwin/iTwinUI/pull/2141): `displayName`s have been eliminated from the production build, so they only show up during development.
- [#2135](https://github.com/iTwin/iTwinUI/pull/2135): `ActionColumn`'s `dropdownMenuProps` no longer exposes the unnecessary `matchWidth` prop.

## 3.12.2

### Patch Changes

- [#2127](https://github.com/iTwin/iTwinUI/pull/2127): Fixed an issue in `Dialog` and `Modal`, where long titles were not wrapping properly.

## 3.12.1

### Patch Changes

- [#2124](https://github.com/iTwin/iTwinUI/pull/2124): Fixed a CommonJS-related error where an internal variable was accidentally trying to override the [`module`](https://nodejs.org/api/modules.html#the-module-object) object.
- [#2122](https://github.com/iTwin/iTwinUI/pull/2122): The new JSX transform added in [v3.12.0](https://github.com/iTwin/iTwinUI/releases/tag/%40itwin%2Fitwinui-react%403.12.0) has been reverted, because React 17 [doesn't properly support it](https://github.com/facebook/react/issues/20235).

## 3.12.0

### Minor Changes

- [#2048](https://github.com/iTwin/iTwinUI/pull/2048): Added a new `defaultValue` prop to `ComboBox`. This is useful when you don't want to maintain your own state but still want to control the initial `value`.
- [#2076](https://github.com/iTwin/iTwinUI/pull/2076): Added open popover styling to `Button` (and `IconButton`). When an associated `Popover` or `DropdownMenu` is open, the button will now get a subtle visual indication.
- [#2111](https://github.com/iTwin/iTwinUI/pull/2111): Added the ability to pass arbitrary DOM props to `TreeNode`.
- [#2107](https://github.com/iTwin/iTwinUI/pull/2107): A new `meta` object is exported, containing meta information about the package.

  ```ts
  import { meta } from '@itwin/itwinui-react';

  console.log(meta.version, meta.module); // 3.12.0, ESM
  ```

- [#2048](https://github.com/iTwin/iTwinUI/pull/2048): Fixed a bug in `ComboBox` where the controlled state (`value` prop) was not given priority over the uncontrolled state. As a result:

  - Setting the default value using `value={myDefaultValue}` will no longer work. Instead, use the new `defaultValue` prop.
  - Resetting the value using `value={null}` will now force the ComboBox to be in _controlled_ mode. If you want to reset the value but be in _uncontrolled_ mode, then use `value={undefined}` instead.

- [#2101](https://github.com/iTwin/iTwinUI/pull/2101): Passing an `IconButton` to `Tile.QuickAction` and `Tile.TypeIndicator` is now deprecated. Use `Tile.IconButton` instead.
- [#2021](https://github.com/iTwin/iTwinUI/pull/2021): In menu-like components (`DropdownMenu`, `SplitButton`, `Table`'s column manager), using the _mouse_ to operate the menu will no longer move focus like it does when using the _keyboard_.
- [#2021](https://github.com/iTwin/iTwinUI/pull/2021): `MenuItem`'s `tabIndex` now is `0` when it's selected and `-1` when it's not. Additionally, `MenuItem` passed inside most menu type components (e.g. `DropdownMenu`, `SplitButton`, `Table`'s column manager, etc.) have roving `tabIndex`.
- Dependency changes:
  - [#2116](https://github.com/iTwin/iTwinUI/pull/2116): Bumped the minimum required version of `@floating-ui/react` to `0.26.18`.
  - [#2100](https://github.com/iTwin/iTwinUI/pull/2100): Replaced dependency on `tslib` with `@swc/helpers`. This is used mainly by the CommonJS build for [interop reasons](https://www.typescriptlang.org/docs/handbook/modules/appendices/esm-cjs-interop.html).

### Patch Changes

- [#2117](https://github.com/iTwin/iTwinUI/pull/2117): Fixed an error in `Select` caused by updating `@floating-ui/react` to `0.26.18`.
- [#2101](https://github.com/iTwin/iTwinUI/pull/2101): Fixed a small visual bug in `Tile.IconButton` where the hover state wasn't working.
- [#2021](https://github.com/iTwin/iTwinUI/pull/2021): `MenuItem` now renders as a `<button>` instead of a `<div>`.
- [#2113](https://github.com/iTwin/iTwinUI/pull/2113): Fixed an issue where a portaled `Popover` was sometimes showing up in the wrong window during the first render.
- [#2048](https://github.com/iTwin/iTwinUI/pull/2048): Fixed a bug in `ComboBox` where the `isSelected` passed to `itemRenderer` was always `false` whenever `multiple` was `true`.

### Build Output Changes

- [#2102](https://github.com/iTwin/iTwinUI/pull/2102): The build output is now generated using SWC and uses the [new JSX transform](https://react.dev/link/new-jsx-transform) instead of `React.createElement`.
- [#2118](https://github.com/iTwin/iTwinUI/pull/2118): Type declarations are now generated using TypeScript 5.5 with `"module": "NodeNext"`.
- [#2118](https://github.com/iTwin/iTwinUI/pull/2118): The `"exports"` fallback for `/react-table` types is now handled using [`typesVersions`](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection-with-typesversions).
- [#2100](https://github.com/iTwin/iTwinUI/pull/2100): The build output is now (again) formatted using `prettier` for easier debugging.
- [#2100](https://github.com/iTwin/iTwinUI/pull/2100): All code comments have been removed from the build output.

## 3.11.3

### Patch Changes

- [#2098](https://github.com/iTwin/iTwinUI/pull/2098): Fixed a regression in `Table` component where `selectSubRows` prop being set to `false` would cause parent rows to become uncheckable.

## 3.11.2

### Patch Changes

- [#2084](https://github.com/iTwin/iTwinUI/pull/2084): Fixed an issue where a portaled `ThemeProvider` would try to re-render infinitely.
- [#2083](https://github.com/iTwin/iTwinUI/pull/2083): Removed the accidentally added no-op `loading` prop in `IconButton`.
- [#2083](https://github.com/iTwin/iTwinUI/pull/2083): Fixed a visual bug where elements like `startIcon` and `endIcon` inside the `Button` (or its derivatives) were not hidden when the button was in a loading state. Now,`loading={true}` on `Button` hides _all_ its children except the `ProgressRadial`.

## 3.11.1

### Patch Changes

- [#2074](https://github.com/iTwin/iTwinUI/pull/2074): Fixed indentation of `Tree` nodes to be aligned regardless of the presence of expander button.
- [#2064](https://github.com/iTwin/iTwinUI/pull/2064): Adjusted `Dialog` and `ExpandableBlock` to round some CSS `transform` values. This helps avoid blurry text on Windows in some cases.
- [#2055](https://github.com/iTwin/iTwinUI/pull/2055): Fixed an issue in `Breadcrumbs.Item` where using a custom link component (e.g. `as={Link}` for client side routing) would break the CSS styling.
- [#2071](https://github.com/iTwin/iTwinUI/pull/2071): Fixed a minor issue in `ComboBox` where a `label` attribute was accidentally being added to options in the DOM.
- [#2068](https://github.com/iTwin/iTwinUI/pull/2068): Fixed `EditableCell` so that it correctly merges `className` and `style` props with the corresponding internal props.
- [#2073](https://github.com/iTwin/iTwinUI/pull/2073): Fixed CommonJS types exports for the `/react-table` entrypoint.
- [#2055](https://github.com/iTwin/iTwinUI/pull/2055): Fixed a regression from `v3.10.0` where non-button and non-link `Breadcrumbs.Item`s were getting a hover styling as if it were a button.

## 3.11.0

### Minor Changes

- [#2058](https://github.com/iTwin/iTwinUI/pull/2058): Added new `loading` prop to `Button`. This is useful when you want to display a brief loading state after the user clicks the button.

  ```jsx
  <Button loading={isProcessing}>Click me</Button>
  ```

- [#2057](https://github.com/iTwin/iTwinUI/pull/2057): Updated warning and negative background colors to better match the rest of the color palette.
- [#2060](https://github.com/iTwin/iTwinUI/pull/2060): Updated `Tooltip` to automatically use the [`popover` API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) in supported browsers. This ensures that tooltips appear in the top layer, avoiding stacking context issues.
- [#2022](https://github.com/iTwin/iTwinUI/pull/2022): Added optional props to `TreeNode` for customization: `nodeProps`, `contentProps`, `labelProps`, `titleProps`, `sublabelProps`, `checkboxProps`, `iconProps`, `expanderProps` and `subTreeProps`.

### Patch Changes

- [#2042](https://github.com/iTwin/iTwinUI/pull/2042): Fixed `Table` empty state horizontal alignment when table is very narrow.
- [#2054](https://github.com/iTwin/iTwinUI/pull/2054): Removed unnecessary gap below the inline `<InputGrid>` when no secondary line (`StatusMessage`) is present. Some other affected components: `LabeledInput`, `LabeledSelect`, `LabeledTextarea`.
- [#2049](https://github.com/iTwin/iTwinUI/pull/2049): Adjusted disabled controls' borders to slightly increase color contrast.
- [#2043](https://github.com/iTwin/iTwinUI/pull/2043): Adjusted the behavior of buttons so that double tapping them doesn't zoom the viewport on iOS.
- [#2044](https://github.com/iTwin/iTwinUI/pull/2044): Fixed a rare hydration error in `Surface` caused by using an empty string inside the `style` attribute.

## 3.10.1

### Patch Changes

- [#2031](https://github.com/iTwin/iTwinUI/pull/2031): Fixed an issue where popovers and dropdown menus used with `SidenavButton` were showing up inside a tooltip.
- [#2030](https://github.com/iTwin/iTwinUI/pull/2030): Fixed a visual bug where items in a `ButtonGroup` were displaying a double border when an associated `Popover` was opened.
- [#2026](https://github.com/iTwin/iTwinUI/pull/2026): Submenus within a `DropdownMenu` will now consistently require less precision when moving the mouse between the parent item and the submenu.

## 3.10.0

### Minor Changes

- [#1942](https://github.com/iTwin/iTwinUI/pull/1942): Clicking a `MenuItem` with `submenuItems` now toggles the submenu visibility.
  - If both `submenuItems` and `onClick` props are passed, then clicking the `MenuItem` will toggle the submenu visibility but also _still_ call the `onClick`. However, this behavior can lead to a confusing UX and is not recommended, so a warning will be shown.
- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): Aggregated a subset of CSS styles across some field components: `Button`, `Input`, `Textarea`, and `Select`, in order to reduce the CSS size and improve visual consistency. Some resulting changes:
  - `Input`, `Textarea`, and `Select` have a similar hover state as `Button`.
  - `Input`, `Textarea`, and `Select` now show their value as greyed out when disabled.
- [#1942](https://github.com/iTwin/iTwinUI/pull/1942): `DropdownMenu`'s keyboard navigation, hover triggers, and overall behavior has been improved.
- [#2010](https://github.com/iTwin/iTwinUI/pull/2010): Added new `labelProps` to `ToggleSwitch` to allow for customization of the label element.
- [#2011](https://github.com/iTwin/iTwinUI/pull/2011): Added dependency on `jotai`.

### Patch Changes

- [#1942](https://github.com/iTwin/iTwinUI/pull/1942): Disabled `MenuItem`s no longer show their submenu.
- [#1942](https://github.com/iTwin/iTwinUI/pull/1942): Fixed an issue in `DropdownMenu` where the submenus would not close in some circumstances, despite calling `close()` in `onClick`.
- [#2013](https://github.com/iTwin/iTwinUI/pull/2013): Fixed an issue with `Table` row selection not correctly deselecting all sub rows when the row has disabled sub rows or when some rows are filtered out.
- [#2009](https://github.com/iTwin/iTwinUI/pull/2009): Fixed an issue where `Popover` wasn't respecting the `ThemeProvider`'s `portalContainer`.
- [#2011](https://github.com/iTwin/iTwinUI/pull/2011): When `ThemeProvider` is portaled into popup windows, it will now automatically create a portal container in the correct document, avoiding the need to manually specify `portalContainer`.
- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): The small sized `TablePaginator`'s buttons are now squares instead of rectangles. This makes it consistent with the shape of the regular sized `TablePaginator` buttons.
- [#1919](https://github.com/iTwin/iTwinUI/pull/1919): The hover styling of `Breadcrumbs.Item` has been made more consistent across buttons and anchors.

## 3.9.1

### Patch Changes

- [#2005](https://github.com/iTwin/iTwinUI/pull/2005): Improved `IconButton` so that its tooltip is removed from the DOM when not visible.
- [#2004](https://github.com/iTwin/iTwinUI/pull/2004): Fixed a performance issue in `Tooltip` where expensive calculations were being run even when the tooltip was not visible.

## 3.9.0

### Minor Changes

- [#1994](https://github.com/iTwin/iTwinUI/pull/1994): Added `role="toolbar"` support to `ButtonGroup`. Use this to enable the [toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/), with arrow-key navigation functionality.

  ```jsx
  <ButtonGroup role="toolbar">
  ```

- [#1986](https://github.com/iTwin/iTwinUI/pull/1986): `tableFilters.DateRangeFilter` now accepts `showYearSelection` to enable year-selection buttons.

  ```js
  tableFilters.DateRangeFilter({ showYearSelection: true });
  ```

- [#1971](https://github.com/iTwin/iTwinUI/pull/1971): Added a new `stretched` prop to `Button` to allow it to span the full width of its container.
- [#1996](https://github.com/iTwin/iTwinUI/pull/1996): `Anchor` elements inside `Text` will now be underlined by default.

### Patch Changes

- [#1997](https://github.com/iTwin/iTwinUI/pull/1997): Fixed an issue where draggable `Dialog` was overriding its intrinsic size after mount.
- [#1981](https://github.com/iTwin/iTwinUI/pull/1981): Fixed `jest` detection logic to correctly exit from scenarios that should not be executed in unit test environments.
- [#1982](https://github.com/iTwin/iTwinUI/pull/1982): Fixed an issue where some components (such as `InputGroup`) were trying to render `undefined`, which is not supported in React 17.
- [#1986](https://github.com/iTwin/iTwinUI/pull/1986): Updated the date pickers in `tableFilters.DateRangeFilter` to _not_ display dates outside the current month.

## 3.8.1

### Patch Changes

- [#1964](https://github.com/iTwin/iTwinUI/pull/1964): Fixed a bug with `InformationPanel` where changing orientation after resizing the panel would cause the panel to maintain it's resized width/height.

## 3.8.0

### Minor Changes

- [#1957](https://github.com/iTwin/iTwinUI/pull/1957): Bumped the minimum required version of `@floating-ui/react` from `^0.26.3` to `^0.26.10`. (Make sure to also update transitive deps!)

### Patch Changes

- [#1962](https://github.com/iTwin/iTwinUI/pull/1962): Hydration checks have been added in some components to facilitate showing pure client-rendered content more eagerly.
- [#1968](https://github.com/iTwin/iTwinUI/pull/1968): Fixed a regression in `Table` where the layout of a custom `Cell` unexpectedly changed from horizontal to vertical.

## 3.7.4

### Patch Changes

- [#1944](https://github.com/iTwin/iTwinUI/pull/1944): Fixed an issue where `Tooltip` would stay open after clicking on the trigger element. The tooltip will now be correctly dismissed upon click.

  Also affects other components that use tooltips internally: `IconButton`, `SideNavigation`, etc.

- [#1955](https://github.com/iTwin/iTwinUI/pull/1955): Fixed a regression in `Tabs` where the panel content was not occupying the full width of the container.
- [#1954](https://github.com/iTwin/iTwinUI/pull/1954): Fixed an issue in older Safari versions where visually-hidden styles inside `ProgressRadial` were not being applied.

## 3.7.3

### Patch Changes

- [#1946](https://github.com/iTwin/iTwinUI/pull/1946): Fixed a bug in `Table` where resizing the columns and then toggling the column visibility in the column manager would trigger an unnecessary auto-scroll in the vertical direction.
- [#1943](https://github.com/iTwin/iTwinUI/pull/1943): Fixed a z-index issue in `Table` where the table resizer appeared above the sticky header cells.

## 3.7.2

### Patch Changes

- [#1939](https://github.com/iTwin/iTwinUI/pull/1939): Fixed an issue in `ButtonGroup` where the overflow logic was running even when `overflowButton` prop was not passed.

## 3.7.1

### Patch Changes

- [#1934](https://github.com/iTwin/iTwinUI/pull/1934): Fixed the types for `Table` column `filter` to allow `"includesSome"`, which is an already-supported filter function. Also improved the types for the `filter` prop to improve TS autocompletion.
- [#1936](https://github.com/iTwin/iTwinUI/pull/1936): Fixed an issue in `ProgressRadial` where the visually hidden "Loading." text was sometimes incorrectly displayed for a short while in the beginning.

## 3.7.0

### Minor Changes

- [#1863](https://github.com/iTwin/iTwinUI/pull/1863): The filter button inside a `Table` will now always be visible, instead of only being shown on hover/focus.
- [#1891](https://github.com/iTwin/iTwinUI/pull/1891): The entire `Table` is now scrollable instead of just the `Table`'s body. This leads to a better scroll experience (e.g. the `Table`'s header now scrolls horizontally when hovering a dragged column near the header's left or right edges).
- [#1863](https://github.com/iTwin/iTwinUI/pull/1863): The responsive behavior of `Table` columns has been improved in a few different ways:
  - All columns now have a non-zero default min-width. While we still recommend passing a custom min-width based on your data, this default will help prevent resizable columns from becoming too small.
  - The filter and sort icons in a column header will now wrap to the next line, before the text starts wrapping.
  - For cells that have a string value, the value will be automatically truncated after three lines.

## 3.6.3

### Patch Changes

- [#1916](https://github.com/iTwin/iTwinUI/pull/1916): Fixed the hover background for default tabs.

## 3.6.2

### Patch Changes

- [#1921](https://github.com/iTwin/iTwinUI/pull/1921): Fixed `Carousel.Dot`'s incorrect height.

## 3.6.1

### Patch Changes

- [#1909](https://github.com/iTwin/iTwinUI/pull/1909): Remove `margin-block` from `Badge`.

## 3.6.0

### Minor Changes

- [#1879](https://github.com/iTwin/iTwinUI/pull/1879): Added a new `native` prop to `Select` and `LabeledSelect`. When true, a native `<select>` element will be rendered.
- [#1886](https://github.com/iTwin/iTwinUI/pull/1886): Native `Select` (`<Select native>`) offers a new `styleType` prop that accepts the values: `default` (pre-existing) and `borderless` (new).
- [#1877](https://github.com/iTwin/iTwinUI/pull/1877): Fixed a bug in `InputGroup` where nested `<StatusMessage>`s were rendered when using `message={<StatusMessage>}`. As a result, non-string `message` values are no longer automatically wrapped in `<StatusMessage>`.
  - If you were passing a custom `ReactNode`, you might need to wrap it with `<StatusMessage>` for proper styling of `message`.
- [#1881](https://github.com/iTwin/iTwinUI/pull/1881): Added a new subcomponent `InputWithDecorations.Icon` to replace direct usage of `Icon` inside `InputWithDecorations`.
- Visual changes:
  - [#1828](https://github.com/iTwin/iTwinUI/pull/1828): Inline padding of `Icon` no longer changes with the icon size. It is now a constant of `--iui-size-xs`.
  - [#1881](https://github.com/iTwin/iTwinUI/pull/1881): `Input`'s and `Textarea`'s start/end inline padding when inside `InputWithDecorations` is now collapsed when it is preceded/followed by a `InputWithDecorations.Icon` or `InputWithDecorations.Button`. This prevents unnecessary empty space in `InputWithDecorations`.
  - [#1888](https://github.com/iTwin/iTwinUI/pull/1888): The expandable `SearchBox` now shows a regular-sized button in the collapsed state. Previously, it used to incorrectly be a square button.
  - [#1828](https://github.com/iTwin/iTwinUI/pull/1828): `SearchBox.Icon` no longer has the same width as `SearchBox.Button`. Its width also no longer changes with the `SearchBox` size. This is because its padding behavior is now similar to `Icon`'s padding behavior, where it uses a constant padding.
  - [#1897](https://github.com/iTwin/iTwinUI/pull/1897): All instances of `<SvgStatusError>` have been updated to reflect the new octagon shape from the latest version of iTwinUI-icons. Some components affected: `Icon`, `Alert`, `Toast`, `StatusMessage`.
  - [#1888](https://github.com/iTwin/iTwinUI/pull/1888): The expandable `SearchBox`'s animation/transition between the expanded and the collapsed states is now removed.

### Patch Changes

- [#1865](https://github.com/iTwin/iTwinUI/pull/1865): `Dialog`/`Modal` will no longer keep its wrapper in the DOM when `isOpen=false`.
- [#1889](https://github.com/iTwin/iTwinUI/pull/1889): `Dialog`/`Modal`'s close button will now be visually aligned based on the icon inside it, excluding the padding.
- [#1906](https://github.com/iTwin/iTwinUI/pull/1906): `Dialog`/`Modal` title will now wrap to multiple lines instead of getting clipped.
- [#1873](https://github.com/iTwin/iTwinUI/pull/1873): Fixed `Tab` stripe size and position calculation that sometimes used to cause unnecessary overflow and thus cause a horizontal scrollbar in `TabList`.
- [#1884](https://github.com/iTwin/iTwinUI/pull/1884): Fixed a bug that caused the `Tabs.Wrapper` to change size dependent on which `Tabs.Tab` was active.
- [#1901](https://github.com/iTwin/iTwinUI/pull/1901): Fixed a bug in `Table` where `initialState.columnOrder` was not being respected.
- [#1894](https://github.com/iTwin/iTwinUI/pull/1894): All instances of `box-sizing: content-box` have been reinforced with `!important` to prevent accidental overrides from application styles.
- [#1828](https://github.com/iTwin/iTwinUI/pull/1828): `InputWithDecorations` now has an inline padding of `1px` to account for the `1px` border's inline edges. This prevents content that touches the border's inline edges from being overlapped by the border by `1px`. Slightly modified expandable `SearchBox` styles to account for the new padding.

## 3.5.0

### Minor Changes

- [#1844](https://github.com/iTwin/iTwinUI/pull/1844): Interactive elements will now be correctly focused on Safari 17+.
- [#1860](https://github.com/iTwin/iTwinUI/pull/1860): `ThemeProvider` will now automatically specify an `accent-color` to match the current theme.
- [#1856](https://github.com/iTwin/iTwinUI/pull/1856): Added new `isExternal` prop to `Anchor`. When true, displays an icon at the end of link text.
- [#1858](https://github.com/iTwin/iTwinUI/pull/1858): `ToggleSwitch` will now show a checkmark icon by default in the checked state. `SvgCheckmark` no longer needs to be manually passed into the `icon` prop.
- [#1862](https://github.com/iTwin/iTwinUI/pull/1862): `Select` will now correctly reset its `value` if `null` is passed.
- [#1864](https://github.com/iTwin/iTwinUI/pull/1864): Added a new `underline` prop to `Anchor`. When true, anchors will be underlined by default instead of only on hover.
- [#1856](https://github.com/iTwin/iTwinUI/pull/1856): `Anchor` links that open in a new tab will now add a visually-hidden warning for screen-reader users. This can be combined with the `isExternal` prop, which adds a visual indication for sighted users.
- [#1859](https://github.com/iTwin/iTwinUI/pull/1859): `ProgressRadial` and `ProgressLinear` will now include a visually hidden "Loading" text alternative for non-sighted users.

### Patch Changes

- [#1845](https://github.com/iTwin/iTwinUI/pull/1845): Removed `:focus-visible` fallback styles for older browsers.
- [#1861](https://github.com/iTwin/iTwinUI/pull/1861): Added `width`/`height` attributes to inlined svgs, to make them more resilient in case CSS fails.

## 3.4.2

### Patch Changes

- [#1848](https://github.com/iTwin/iTwinUI/pull/1848): Removed `jsdom` from direct dependencies.

## 3.4.1

### Patch Changes

- [#1835](https://github.com/iTwin/iTwinUI/pull/1835): Fixed the bug where `Dialog`/`Modal` was invisible on the first render with `isOpen={true}`.
- [#1836](https://github.com/iTwin/iTwinUI/pull/1836): Updated Dialog resizer positioning to protrude outside the dialog.

## 3.4.0

### Minor Changes

- [#1824](https://github.com/iTwin/iTwinUI/pull/1824): `LinkAction` will now automatically render a `<button>` by default if no `href` is passed.
- [#1815](https://github.com/iTwin/iTwinUI/pull/1815): Removed unnecessary `Tag` styles, and added support for tags to be used as `<button>` elements.
- [#1813](https://github.com/iTwin/iTwinUI/pull/1813): Added warning status for `ProgressRadial`/`ProgressLinear`
- [#1815](https://github.com/iTwin/iTwinUI/pull/1815): Added `labelProps` and `removeButtonProps` to `Tag` to allow customizing internal parts.
- [#1821](https://github.com/iTwin/iTwinUI/pull/1821): Added new props to `Modal` to allow customizing inner DOM elements: `wrapperProps`, `backdropProps`, `titleBarProps`.
- [#1822](https://github.com/iTwin/iTwinUI/pull/1822): Added new `showDatesOutsideMonth` prop to `DatePicker`. Currently defaults to `true` but is recommended to be set to `false`.

## 3.3.4

### Patch Changes

- [#1816](https://github.com/iTwin/iTwinUI/pull/1816): Fixed an issue where `Table` was showing a dummy vertical scrollbar track inside the table header in Chromium 121 + Windows.
- [#1810](https://github.com/iTwin/iTwinUI/pull/1810): Fixed `Surface.Body` not being visually aligned with `Surface.Header` depending on scrollbar visibility.
- [#1776](https://github.com/iTwin/iTwinUI/pull/1776): Fixed broken animation in full-page `Modal` and `Dialog`.
- [#1809](https://github.com/iTwin/iTwinUI/pull/1809): Fixed `Table` bug where the table-body had an incorrect horizontal scrollbar/overflow when the `Table`'s width is reduced below the initial width.

## 3.3.3

### Patch Changes

- [#1800](https://github.com/iTwin/iTwinUI/pull/1800): Updated internal usage of `ResizeObserver` to prevent throwing a benign "ResizeObserver loop limit exceeded" error in React 17 apps. Some affected components: `ButtonGroup`, `Tabs`, `Table`, `Tree`, `Breadcrumbs`, etc.
- [#1807](https://github.com/iTwin/iTwinUI/pull/1807): iTwinUI will now also check for `vitest` and `mocha` (in addition to `jest`) before running any code that would cause problems in these test runners.

## 3.3.2

### Patch Changes

- [#1799](https://github.com/iTwin/iTwinUI/pull/1799): Fixed `Table` bug where columns were not resizable when their widths were specified as strings (E.g. `"20%"`, `"50ch"`).

## 3.3.1

### Patch Changes

- [#1796](https://github.com/iTwin/iTwinUI/pull/1796): Fixed a visual issue in `Table` where column headers were not aligned with rows when using expandable `subRows`.
- [#1795](https://github.com/iTwin/iTwinUI/pull/1795): Fixed blurring and resizing issues in Dialog/Modal by removing `overflow: hidden` and inline `transform` styles.

## 3.3.0

### Minor Changes

- [#1753](https://github.com/iTwin/iTwinUI/pull/1753): `LabeledInput` and `LabeledTextarea` have been slightly reworked to fix alignment and consistency issues when used with `svgIcon`.
- [#1777](https://github.com/iTwin/iTwinUI/pull/1777): `InputGrid` will now attempt to automatically associate labels, inputs and status messages with each other, in the event that they haven't been explicitly associated.
- [#1777](https://github.com/iTwin/iTwinUI/pull/1777): The `message` passed to `LabeledInput`, `LabeledTextarea`, `LabeledSelect` and `ComboBox` will now be associated with the input using `aria-describedby` for better accessibility.
- [#1794](https://github.com/iTwin/iTwinUI/pull/1794): `ExpandableBlock` now internally uses `LinkAction` for the trigger element. This slightly improves the accessibility, and opens up the possibility of including secondary actions.
- [#1786](https://github.com/iTwin/iTwinUI/pull/1786): The `portal.to` prop in floating elements now also accepts `null | undefined` which acts identically to the default prop behavior (i.e. as if `portal` was not passed). Components affected: `Dialog`, `DropdownMenu`, `Modal`, `Popover`, `SplitButton`, and `Tooltip`.
- [#1791](https://github.com/iTwin/iTwinUI/pull/1791): Added new `ListItem.Action` component for rendering links inside `ListItem`s while ensuring that clicking anywhere on the list item triggers the link. This component is a wrapper over the existing `LinkAction` component.
- [#1780](https://github.com/iTwin/iTwinUI/pull/1780): `ComboBox` now forwards its `ref`.
- [#1753](https://github.com/iTwin/iTwinUI/pull/1753): `StatusMessage` now renders no status icon if `startIcon === null`.

### Patch Changes

- [#1783](https://github.com/iTwin/iTwinUI/pull/1783): Fixed a Firefox-specific bug where focus outlines were not appearing correctly around menu items inside `ComboBox`.
- [#1792](https://github.com/iTwin/iTwinUI/pull/1792): Fixed an issue in `Table` where the "select all" checkbox was disabled if all top-level rows were disabled. The logic has been updated to also consider sub-rows.
- [#1788](https://github.com/iTwin/iTwinUI/pull/1788): `LinkAction` will no longer override styles from other components (such as `Anchor`).
- [#1753](https://github.com/iTwin/iTwinUI/pull/1753): Deprecated `svgIcon` in `LabeledSelect` in favor of passing `<StatusMessage startIcon={svgIcon} />` to the `message` prop.
- [#1787](https://github.com/iTwin/iTwinUI/pull/1787): Button, radial progress indicator, & select icons now use the correct icon variable color fill.

## 3.2.4

### Patch Changes

- [#1774](https://github.com/iTwin/iTwinUI/pull/1774): Fixed `Select` and `LabeledSelect` to correctly handle generic types.

## 3.2.3

### Patch Changes

- [#1772](https://github.com/iTwin/iTwinUI/pull/1772): Added `package.json` to exports map.

## 3.2.2

### Patch Changes

- [#1763](https://github.com/iTwin/iTwinUI/pull/1763): Reduced bundle size by optimizing how CSS modules are handled internally.

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
- [#1477](https://github.com/iTwin/iTwinUI/pull/1477): Added a new `portalContainer` prop to `ThemeProvider`. When specified, all floating elements (tooltips, toasts, dialogs) under the ThemeProvider will read this prop from context and portal into it.
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
