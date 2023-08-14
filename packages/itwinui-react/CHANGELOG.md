# Changelog

## 3.0.0-dev.6

### Major Changes

- [#1409](https://github.com/iTwin/iTwinUI/pull/1409): `RadioTile`'s `className` and `style` props will now be applied on the `<input>` element instead of the wrapper. Added `wrapperProps`, `iconProps`, `labelProps`, `subLabelProps` to individually customize each part of the component.

### Minor Changes

- [#1457](https://github.com/iTwin/iTwinUI/pull/1457): Added `htmlName` prop to the `HeaderButton` subcomponent which handles the native `name` attribute in `<button>`.
- [#1437](https://github.com/iTwin/iTwinUI/pull/1437): Added headerWrapperProps, headerProps, bodyProps, and emptyTableContentProps to make each part of the Table component more customizable.
- [#1412](https://github.com/iTwin/iTwinUI/pull/1412): All styles have been wrapped inside a cascade layer named `itwinui`.
- [#1419](https://github.com/iTwin/iTwinUI/pull/1419): Added `htmlSize` prop to the `Input` component which handles the native `size` attribute in `<input>`.

### Patch Changes

- [#1420](https://github.com/iTwin/iTwinUI/pull/1420): RadioTile DOM has been simplified to remove a content wrapper `div`.

## 3.0.0-dev.5

### Major Changes

- [#1370](https://github.com/iTwin/iTwinUI/pull/1370): ProgressLinear has been refactored to be a single `<div>`.
- [#1371](https://github.com/iTwin/iTwinUI/pull/1371): Checkbox: `className` and `style` will now always be applied on the checkbox input element. Added new `wrapperProps` and `labelProps` to allow for styling of wrapper and label elements.
- [#1389](https://github.com/iTwin/iTwinUI/pull/1389): iTwinUI now correctly supports both ESM and CJS environments.
- [#1369](https://github.com/iTwin/iTwinUI/pull/1369): Added new `Breadcrumbs.Item` subcomponent to use for custom `a` and `button` elements within the `Breadcrumbs`
- [#1400](https://github.com/iTwin/iTwinUI/pull/1400): `ErrorPage` will now dynamically import illustrations. The peer dependency on `@itwin/itwinui-illustrations-react` will need to be manually installed if using `ErrorPage`.
- [#1354](https://github.com/iTwin/iTwinUI/pull/1354): Updated Expandable Block component to be composition of customizable subcomponents: <ExpandableBlock.Header/>, <ExpandableBlock.ExpandIcon/>, <ExpandableBlock.LabelArea/>, <ExpandableBlock.Title/>, <ExpandableBlock.Caption/>, <ExpandableBlock.EndIcon/>, <ExpandableBlock.Content/>

  The following props have been removed as they are now subcomponents: `title`, `caption`, `endIcon`

- [#1406](https://github.com/iTwin/iTwinUI/pull/1406): Removed `setFocus` prop from Checkbox, ColorPicker, ComboBox, Input, LabeledInput, LabeledTextarea, Radio, RadioTile, Select, Slider, ToggleSwitch. Users can use `ref` to focus the element.

### Minor Changes

- [#1373](https://github.com/iTwin/iTwinUI/pull/1373): Converted all physical CSS properties to their logical equivalents.
- [#1328](https://github.com/iTwin/iTwinUI/pull/1328): Created new Overlay component with customizable subcomponents: Overlay.Wrapper, Overlay.HiddenContent, Overlay.Overlay
- [#1403](https://github.com/iTwin/iTwinUI/pull/1403): Updated `DropdownMenu` to additionally accept list of JSX elements or a JSX fragment for `menuItems` prop,
- [#1407](https://github.com/iTwin/iTwinUI/pull/1407): Adding the ability for each node element in `NonIdealState` to have a custom `className`.

### Patch Changes

- [#1354](https://github.com/iTwin/iTwinUI/pull/1354): Expandable block animation now uses pure css instead of javascript for transitioning.
- [#1389](https://github.com/iTwin/iTwinUI/pull/1389): The build output is now more readable, using a combination of `prettier` for formatting and `tslib` for import helpers.
- [#1397](https://github.com/iTwin/iTwinUI/pull/1397): Avatar will no longer incorrectly set aria-label on the status dot.
- [#1404](https://github.com/iTwin/iTwinUI/pull/1404): `aria-orientation` attribute removed from ButtonGroup to meet accessibility requirements.

## 3.0.0-dev.4

### Major Changes

- [#1383](https://github.com/iTwin/iTwinUI/pull/1383): Removed previously-deprecated `UserIcon` and `UserIconGroup` components. Also removed `userIcon` prop from `Header`.
- [#1384](https://github.com/iTwin/iTwinUI/pull/1384): Removed previously-deprecated `Wizard` component (replaced by `Stepper` and `WorkflowDiagram`).
- [#1255](https://github.com/iTwin/iTwinUI/pull/1255): Updated Tile component to be composition of customizable subcomponents: `Tile.Name`, `Tile.NameIcon`, `Tile.NameLabel`, `Tile.Action`, `Tile.ThumbnailArea`, `Tile.ThumbnailPicture`, `Tile.BadgeContainer`, `Tile.TypeIndicator`, `Tile.QuickAction`, `Tile.ContentArea`, `Tile.Description`, `Tile.MoreOptions`, `Tile.Metadata`, `Tile.Buttons`. Certain props have been removed as they are now subcomponents: `name`, `description`, `metadata`, `thumbnail`, `badge`, `leftIcon`, `rightIcon`, `button`, `moreOptions`, `isActionable` props have been removed.

- [#1356](https://github.com/iTwin/iTwinUI/pull/1356): ProgressRadial has been refactored to be a single `<div>` instead of using a nested svg. Also it is recommended to explicitly set `size` when using in other components.
- [#1311](https://github.com/iTwin/iTwinUI/pull/1311): - Removed Tippy.js as dependency in Tooltip. Using FloatingUI instead.
- [#1388](https://github.com/iTwin/iTwinUI/pull/1388): Removed deprecated `HorizontalTabs` and `VerticalTabs` (replaced by `orientation` prop in `Tabs`).

### Minor Changes

- [#1362](https://github.com/iTwin/iTwinUI/pull/1362): All elements under the root will now get a default focus styling matching `--iui-color-border-accent`.

### Patch Changes

- [#1360](https://github.com/iTwin/iTwinUI/pull/1360): The `color-scheme` property will now be correctly set for dark theme, resulting in better theming of built-in html elements.

## 3.0.0-dev.3

### Major Changes

- [#1330](https://github.com/iTwin/iTwinUI/pull/1330): Deprecated `FileUploadTemplate`. Removed all of its references.
- [#1351](https://github.com/iTwin/iTwinUI/pull/1351): `toaster` import has been removed and replaced with `useToaster` which returns a toaster object with the same API.

## 3.0.0-dev.2

### Major Changes

- [#1300](https://github.com/iTwin/iTwinUI/pull/1300): `modalRootId` and `ownerDocument` props have been removed from `Modal`, in favor of the new `portal` prop (also available in `Dialog`).
- [#1247](https://github.com/iTwin/iTwinUI/pull/1247): Alert composition has been updated such that it is now made up of customizable subcomponents, thus removing the `onClose`, `clickableText`, and `clickableTextProps` props from `Alert`.
- [#1346](https://github.com/iTwin/iTwinUI/pull/1346): The build now targets `es2020` instead of `es2018`.

### Patch Changes

- [#1347](https://github.com/iTwin/iTwinUI/pull/1347): Fixed an issue where ThemeProvider warning was always logged even when using ThemeProvider.

## 3.0.0-dev.1

### Major Changes

- [#1302](https://github.com/iTwin/iTwinUI/pull/1302): The dependencies on `@itwin/itwinui-css` and `@itwin/itwinui-variable` have been removed. This means `@itwin/itwinui-react` will bring its own stylesheet.
- [#1322](https://github.com/iTwin/iTwinUI/pull/1322): All css imports within components have been removed. `@itwin/itwinui-react/styles.css` must now be manually imported at the entrypoint.
- [#1302](https://github.com/iTwin/iTwinUI/pull/1302): All elements have had their class names changed to prevent conflict with older versions. It is strongly recommended to switch these internal classes with your own classes or data attributes.

### Minor Changes

- [#1321](https://github.com/iTwin/iTwinUI/pull/1321): Added `disabled` prop to ExpandableBlock component. When activated, it triggers the "disabled" CSS styling for the ExpandableBlock and disables user interaction with it.
- [#1073](https://github.com/iTwin/iTwinUI/pull/1073): Added new `TransferList` component which is used to move one or more items between lists. Added the following subcomponents: `TransferList.ListWrapper`, `TransferList.ListboxWrapper`, `TransferList.ListboxLabel`, `TransferList.Listbox`, `TransferList.Item`, and `TransferList.Toolbar`
- [#1323](https://github.com/iTwin/iTwinUI/pull/1323): Added `placement` prop to `Dialog` to allow placing it at one of the corners.

## 3.0.0-dev.0

### Major Changes

- [#1296](https://github.com/iTwin/iTwinUI/pull/1296): Removed previously-deprecated typography components (`Body`, `Headline`, `Leading`, `Small`, `Subheading`, `Title`) which have been replaced by `Text`.
- [#1265](https://github.com/iTwin/iTwinUI/pull/1265): Removed the deprecated `useTheme` hook. `<ThemeProvider>` is now always required to be wrapped around all iTwinUI components.
- [#1278](https://github.com/iTwin/iTwinUI/pull/1278): Adjusted calculations in ButtonGroup's `overflowButton` callback, so that it respects `overflowPlacement` and considers the presence of the overflowButton itself.
- [#1295](https://github.com/iTwin/iTwinUI/pull/1295): Deprecated MenuItem's `icon` and `badge` props in favor of new `startIcon` and `endIcon` props. Also affects `Select` and `ComboBox` options.
- [#1298](https://github.com/iTwin/iTwinUI/pull/1298): `Props` types will no longer be exported for any component. Use `React.ComponentProps` instead.
- [#1304](https://github.com/iTwin/iTwinUI/pull/1304): Instead of cloning passed icons to set classes on them, the classes will now be set on a wrapping element. Affected components: `Header`, `Select`, `MenuItem`, `RadioTile`, `Tabs`, `ToggleSwitch`, `TreeNode`, `InputContainer` (and all input variants).
- [#1269](https://github.com/iTwin/iTwinUI/pull/1269): All dialog variants have `flex` applied by default. This means the content should be wrapped with `Dialog.Content` or `ModalContent` for optimal layout.

### Minor Changes

- [#1298](https://github.com/iTwin/iTwinUI/pull/1298): Most components are now polymorphic and forward their rest props and ref.

### Patch Changes

- Updated dependencies:
  - @itwin/itwinui-css@2.0.0-dev.0

## 2.12.1

### Patch Changes

- [#1467](https://github.com/iTwin/iTwinUI/pull/1467): Fixed an issue in Carousel where latest `onSlideChange` callback was being ignored.

## 2.12.0

### Minor Changes

- [#1415](https://github.com/iTwin/iTwinUI/pull/1415): The styling strategy has changed so there will now be a single stylesheet included at runtime, instead of separate css imports inside every component. All the styles are also wrapped in a cascade layer named `itwinui`. This behavior can be customized using the `includeCss` prop in `ThemeProvider`.

  **Important note**: The dependencies on `@itwin/itwinui-css` and `@itwin/itwinui-variables` have been removed, so these packages _don't_ need to be installed if you are only using components from `@itwin/itwinui-react`.

- [#1422](https://github.com/iTwin/iTwinUI/pull/1422): Changed `all: revert` to `all: revert-layer` so that only styles from the v1 layer are reverted, thus avoiding issues with inadvertently removing browser default styles.
- [#1443](https://github.com/iTwin/iTwinUI/pull/1443): `DropdownButton` now supports `styleType='high-visibility'` to make it blue. This should be used sparingly, as a default or borderless dropdown button is the better choice in most cases.
- [#1454](https://github.com/iTwin/iTwinUI/pull/1454): Added `disabled` prop to `ExpandableBlock` to disable intersction with it.
- [#1441](https://github.com/iTwin/iTwinUI/pull/1441): Added `placement` prop to `Dialog` to allow placing it at one of the corners.

## 2.11.11

### Patch Changes

- [#1448](https://github.com/iTwin/iTwinUI/pull/1448): Fix resizable Dialog bug where Dialog jumped around the screen when resized on right side.

## 2.11.10

### Patch Changes

- [#1424](https://github.com/iTwin/iTwinUI/pull/1424), [#1427](https://github.com/iTwin/iTwinUI/pull/1427): Fixed a few different resizing issues in Dialog.
- Updated dependencies:
  - @itwin/itwinui-css@1.11.5

## 2.11.9

### Patch Changes

- [#1421](https://github.com/iTwin/iTwinUI/pull/1421): Fixed an issue in Table where column reordering and editable cells were not working when v2 Table was used within a v1 app.
- Updated dependencies:
  - @itwin/itwinui-css@1.11.4

## 2.11.8

### Patch Changes

- [#1410](https://github.com/iTwin/iTwinUI/pull/1410): Fixed an issue in `Tabs` where tabs-list was becoming too tall when the tabpanel didn't have enough content inside.
- Updated dependencies:
  - @itwin/itwinui-css@1.11.3

## 2.11.7

### Patch Changes

- [#1376](https://github.com/iTwin/iTwinUI/pull/1376): Fix issue where a nested expandable block's expander icon would always display as expanded.
- Updated dependencies:
  - @itwin/itwinui-css@1.11.2

## 2.11.6

### Patch Changes

- [#1341](https://github.com/iTwin/iTwinUI/pull/1341): Table: fixed action column header content alignment when using globalFilterValue.

## 2.11.5

### Patch Changes

- [#1329](https://github.com/iTwin/iTwinUI/pull/1329): Fixed an issue where the visually hidden `FileUploadCard.Input` was inadvertently showing when focused.

## 2.11.4

### Patch Changes

- [#1319](https://github.com/iTwin/iTwinUI/pull/1319): DatePicker will no longer disable month and year navigation when the next/previous months are disabled.

## 2.11.3

### Patch Changes

- [#1309](https://github.com/iTwin/iTwinUI/pull/1309): Fixed missing CSS imports in `FileUploadCard` and `FileUpoadTemplate`.

## 2.11.2

### Patch Changes

- [#1288](https://github.com/iTwin/iTwinUI/pull/1288): Fixed hover styling for SearchBox.
- Updated dependencies:
  - @itwin/itwinui-css@1.11.1

## 2.11.1

### Patch Changes

- [#1284](https://github.com/iTwin/iTwinUI/pull/1284): Add fix in `useId` to avoid bundlers trying to import non-existing export.

## 2.11.0

### Minor Changes

- [#863](https://github.com/iTwin/iTwinUI/pull/863): Add `SearchBox` component for your search needs. It can be used as static or expandable version of SearchBox.

  ```ts
  <SearchBox inputProps={{placeholder:'Basic search'}} />
  <SearchBox expandable inputProps={{placeholder:'Expandable search'}} />
  ```

  `SearchBox` has `SearchBox.Icon`, `SearchBox.Button`, `SearchBox.Input`, `SearchBox.CollapseButton` and `SearchBox.ExpandButton` subcomponents which can be passed as children to customise the look.

- [#1060](https://github.com/iTwin/iTwinUI/pull/1060): Tabs - Added property `overflowOptions` - contains `useOverflow`, which when true enables tabs to scroll if there's overflow
  ```typescript
  <Tabs type='default' overflowButton={{ useOverflow: true }}>
    {tabs}
  </Tabs>
  ```

### Patch Changes

- [#1275](https://github.com/iTwin/iTwinUI/pull/1275): Fixed an issue where `ProgressRadial` was not correctly showing when used inside a v2 boundary within a v1 page.
- [#1156](https://github.com/iTwin/iTwinUI/pull/1156): Fixes an issue where table crashes when resizing the Column Manager column in expand mode.
- [#1246](https://github.com/iTwin/iTwinUI/pull/1246): All relative imports now use the `.js` extension, in preparation of better ESM support.
- [#1228](https://github.com/iTwin/iTwinUI/pull/1228): `ComboBox` and `Select` will now use a hidden live region to ensure that multiple selected options are announced by assistive technologies every time the selection is updated.
- [#1276](https://github.com/iTwin/iTwinUI/pull/1276): Fixed an issue where using Popover components in controlled mode (through `visible` prop) was appending it to the wrong root element.
- [#1281](https://github.com/iTwin/iTwinUI/pull/1281): Fixed an issue in ButtonGroup where null/undefined children were also getting wrapped by empty `<div>`s.
- [#1257](https://github.com/iTwin/iTwinUI/pull/1257): Fixed an issue where pseudo elements inside a v2 boundary were not reverting v1 styles.
- Updated dependencies:
  - @itwin/itwinui-css@1.11.0

## 2.10.1

### Patch Changes

- [#1245](https://github.com/iTwin/iTwinUI/pull/1245): Adjusted Checkbox so that its clickable target area is 24pxx24px by default (increased from 16x16) and 32x32 when used in a Table selection column.
- Updated dependencies:
  - @itwin/itwinui-css@1.10.3

## 2.10.0

### Minor Changes

- [#1231](https://github.com/iTwin/iTwinUI/pull/1231): Added `label` prop to `IconButton`. The label will be displayed visually as a tooltip when the button is hovered/focused and will be exposed as the button's accessible name.
- [#1211](https://github.com/iTwin/iTwinUI/pull/1211): The date range picker used in date filters now prevents users from picking a start date later than the end date or picking an end date earlier than the start date.
- [#1238](https://github.com/iTwin/iTwinUI/pull/1238): `Select` will now render a `<div role=combobox>` instead of a generic `<div>` for the trigger element. This element now also supports passing DOM props/attributes using `triggerProps`.

  `LabeledSelect` will correctly associate the label with select's trigger using `aria-labelledby`.

- [#1235](https://github.com/iTwin/iTwinUI/pull/1235): Changed the internal DOM structure of `LabeledInput` and `LabeledTextarea` to prefer explicit association over implicit. The `<label>` is now associated with the input using `htmlFor`/`id` and the container is a generic div.

  This change improves accessibility, with no API changes and no effect on visuals.

### Patch Changes

- [#1232](https://github.com/iTwin/iTwinUI/pull/1232): `IconButton` will now set `aria-pressed` attribute when `isActive` prop is used.
- [#1236](https://github.com/iTwin/iTwinUI/pull/1236): Fixed an issue in FileUploadCard where setState was called during render.
- [#1238](https://github.com/iTwin/iTwinUI/pull/1238): Fixed an issue in Select where `popoverProps.visible` was not being respected.
- Updated dependencies:
  - @itwin/itwinui-css@1.10.2

## 2.9.1

### Patch Changes

- [#1215](https://github.com/iTwin/iTwinUI/pull/1215): Code component when used inside an Anchor will now have correct styling.
- Updated dependencies:
  - @itwin/itwinui-css@1.10.1

## 2.9.0

### Minor Changes

- [#1106](https://github.com/iTwin/iTwinUI/pull/1106): Added new List and ListItem components.

  ```jsx
  <List>
    <ListItem>item 1</ListItem>
    <ListItem>item 2</ListItem>
    <ListItem>item 3</ListItem>
  </List>
  ```

### Patch Changes

- [#1210](https://github.com/iTwin/iTwinUI/pull/1210): Removed incorrect `role=tooltip` from Popover, DropdownMenu, Select and ComboBox.
- [#1209](https://github.com/iTwin/iTwinUI/pull/1209): Fixed an issue in ComboBox where disabled items didn't have a proper focus outline and were still selectable with keyboard.
- [#1149](https://github.com/iTwin/iTwinUI/pull/1149): added event.altKey to file with handleKeyDown and onKeyDown function
- Updated dependencies:
  - @itwin/itwinui-css@1.10.0

## 2.8.2

### Patch Changes

- [#1197](https://github.com/iTwin/iTwinUI/pull/1197): Reverted animation class change that broke Dialog.

## 2.8.1

### Patch Changes

- [#1195](https://github.com/iTwin/iTwinUI/pull/1195): Fixed an issue with missing css in LabeledSelect.

## 2.8.0

### Minor Changes

- 861fcab3: The `Surface` component can now be broken down using the `Surface.Header` and `Surface.Body` subcomponents. Users can add padding to the body using `isPadded`.

  ```jsx
  <Surface>
    <Surface.Header>Surface Header Content</Surface.Header>
    <Surface.Body isPadded={true}>Surface Body Content</Surface.Body>
  </Surface>
  ```

- 861fcab3: A new `Divider` component has been created which can be used horizontally or vertically

  ```jsx
  <Divider orientation={'vertical'} />
  ```

- 8c89441f: Added `VisuallyHidden`, a utility component for providing text to assistive technologies while hiding it visually.

  ```jsx
  <div aria-hidden='true'>★★★☆☆</div>
  <VisuallyHidden>3 stars out of 5</VisuallyHidden>
  ```

### Patch Changes

- 3ad2dd90: Fixed an issue in draggable/resizable dialogs opened in popup windows, where pointermove event listeners were not being removed correctly.
- 521610a0: iTwinUI will now show a warning in development if it detects that the page overrides the root font size. For more details, see the [migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v2-migration-guide#relative-font-size).
- 6caccc8d: Fixes jumpy animation when opening full page dialog
- Updated dependencies
  - @itwin/itwinui-css@1.9.0

## 2.7.0

### Minor Changes

- bea577e2: Updated the visuals for status colors in Badge.
- c581e9ed: Added `LinkBox` and `LinkAction`components to improve components with action accessibility.

  Usage:

  ```js
  <LinkBox>
    <LinkAction href='/new-page'>Link to click</LinkAction>
  </LinkBox>
  ```

- c581e9ed: Added `Tile.Action` to take advantage of these new a11y components in Tile.

  Usage:

  ```js
  <Tile
    name={
      <Tile.Action as='button' onClick={() => {/* Do things */}>
        Tile name that is also a button
      </Tile.Action>
    }
  />
  ```

- 61f44293: Added new `isDateDisabled` prop to DatePicker. Accepts a function which takes a date and returns a boolean to indicate whether that date is not selectable.

### Patch Changes

- 198d6a95: Remove the ability to set icon prop for ToggleSwitch when size is set to small
- c5cfa4c6: Fixed an issue with incremental migration where adding a close button to v2 Toaster was breaking v1 styles for the whole page.
- a1f235d0: Fixed Carousel showing warnings in React 16 when using arrow keys.
- c9dee6f5: Fixed an issue where Slider's tooltip was still visible after unmounting the component.
- 775933e3: The DOM order of Tile content has changed so that the name comes before the thumbnail region. This improves accessibility without affecting visuals.
- 028d4cd7: Updated actionable tile to have a more prominent hover effect.
- 341449ca: Fixes an issue where stripe width for borderless and pill tabs was rendering an incorrect length upon first visiting the page.
- Updated dependencies
  - @itwin/itwinui-css@1.8.0

## 2.6.0

### Minor Changes

- 85af52c6: Add small size toggle switch option using `size` prop as follows: `<ToggleSwitch size='small' />`
- 1b541699: Added a new FileUploadCard component which serves as a default UI for when a single file is uploaded. This can also be used as a child of FileUpload

  ```jsx
  <FileUploadCard />
  ```

  ```jsx
  const [files, setFiles] = React.useState<File[]>([]);

  <FileUpload
    onFileDropped={(files) => {
      setFiles(files);
    }}
  >
    <FileUploadCard files={files} onFilesChange={(files) => setFiles(files)} />
  </FileUpload>
  ```

### Patch Changes

- d2ffe2f2: `ComboBox` will not crash when user provided value is not in Options list.
- 56f9d524: HeaderLogo now supports `as` prop to allow rendering as a link. It will default to a `button` if `onClick` is passed, and `div` if not.
- Updated dependencies
  - @itwin/itwinui-css@1.7.0

## 2.5.1

### Patch Changes

- 9ad85ff2: The different density settings for table will now also affect horizontal spacing.

## 2.5.0

### Minor Changes

- 7e3a17f9: Table: Reintroduced the ability to pass a top-level Header property in the columns objects. This improves compatibility with the previous major version. There will be a warning shown only in dev environments to encourage using the new columns format.
- 2397ee0c: All styles will now be scoped and always take preference over previous major versions (`@itwin/itwinui-react`@`1.x`).

  This enables incremental adoption of `@itwin/itwinui-react`@`2.x` for some parts of the app, while still using `1.x` for the rest of the app.

  To use this feature, make sure that all parts that use v1 are updated to `@itwin/itwinui-css@0.63.2`, and then wrap the v2 parts in `ThemeProvider`:

  ```html
  <body>
    <!-- rest of your app (v1) -->

    <ThemeProvider>
      <!-- new UI built using v2 -->
    </ThemeProvider>
  </body>
  ```

  For packages, there is a new theme `'inherit'`. Setting this enables scoping without forcing the default light theme. When the app eventually updates to v2, it can use its own `ThemeProvider` with any theme, and the components inside your package will inherit the app's theme.

  ```html
  <body>
    <!-- rest of the app (maybe v1) -->

    <!-- inside your package ⬇️ -->
    <ThemeProvider theme='inherit'>
      <!-- v2 components inside package -->
    </ThemeProvider>
  </bod
  ```

### Patch Changes

- Updated dependencies
  - @itwin/itwinui-variables@2.0.0
  - @itwin/itwinui-css@1.6.0

## 2.4.4

### Patch Changes

- 8313002f: Fixed bug which gave an unexpected column order once columns were hidden, reordered, and then shown

## 2.4.3

### Patch Changes

- a987bc92: Fixed issue with `Table` autoscroll not completely showing a given row.

## 2.4.2

### Patch Changes

- cbcd97a4: Fixed an issue in ComboBox where the height of empty state content was not getting updated when using `enableVirtualization`.

## 2.4.1

### Patch Changes

- d6d4d76e: Fixed an issue where TablePaginator buttons were causing postbacks when used inside a form.

## 2.4.0

### Minor Changes

- 054bc3ba: `<Avatar>`'s `image` now supports passing `<svg>` too

  ```tsx
  <Avatar image={<SvgUser />} />
  ```

- 06476ada: Added new `Flex` utility component and optional `Flex.Spacer`/`Flex.Item` subcomponents to make it easier to work with CSS flexbox and use iTwinUI design tokens for gap.

  ```jsx
  <Flex gap='xl' justifyContent='center'>
    <div>...</div>
    <div>...</div>
  </Flex>
  ```

  ```jsx
  <Flex>
    <Flex.Item>...</Flex.Item>
    <Flex.Spacer />
    <Flex.Item>...</Flex.Item>
    <Flex.Item>...</Flex.Item>
  </Flex>
  ```

- 44446e50: `DropdownButton` now exposes `dropdownMenuProps` to allow control over all popover props, such as `placement`.

### Patch Changes

- Updated dependencies
  - @itwin/itwinui-css@1.5.0

## 2.3.0

### Minor Changes

- c06caffe: Added `actions` prop to `Tabs` to add right/bottom content to the horizontal/vertical tabs.

  ```tsx
  <Tabs
    // ...
    actions={[
      <Button key={'Small'} size={'small'}>
        Small size button
      </Button>,
      <Button key={'Normal'}>Normal size button</Button>,
    ]}
  >
    // ...
  </Tabs>
  ```

- ec26b72d: `Anchor` can now be rendered as a button using `as` prop.

  ```jsx
  <Anchor as='button' onClick={() => {}}>
    ...
  </Anchor>
  ```

- dd13257f: Added new Icon component for displaying svgs

  - Supports `size` and `fill` props

  ```tsx
  <Icon size='medium' fill='positive'>
    <svg>...</svg>
  </Icon>
  ```

### Patch Changes

- 8e319bea: Removes transitions for `Toast` component when `prefer-reduced-motion` is active
- 24a0cf94: Fixed an issue where Table's `onBottomReached` callback was not being invoked when using strict mode with react 18.
- Updated dependencies
  - @itwin/itwinui-css@1.4.0

## 2.2.1

### Patch Changes

- 8e92e7e2: ComboBox dropdown width will now stay fixed when `enableVirtualization` is true.

## [2.2.0](https://www.github.com/iTwin/iTwinUI-react/compare/v2.1.0...v2.2.0) (2022-12-19)

### Minor changes

- **NotificationMarker:** Add new `NotificationMarker` component ([#829](https://www.github.com/iTwin/iTwinUI-react/issues/829))
- **Table:** `onFilter` gets filtered rows ([#958](https://www.github.com/iTwin/iTwinUI-react/issues/958))
- **Timepicker:** Add combined time column ([#844](https://www.github.com/iTwin/iTwinUI-react/issues/844))

### Patch changes

- **Table:** Reset `columnOrder` when `columns` changes ([#983](https://www.github.com/iTwin/iTwinUI-react/issues/983))

## 2.1.1 (2022-12-16)

### Patch changes

- Use `import type` instead of `import { type }` for supporting older typescript versions ([#996](https://www.github.com/iTwin/iTwinUI-react/issues/996))

## [2.1.0](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.2...v2.1.0) (2022-12-12)

### Minor changes

- **Combobox:** Add support for multi-selection through `multiple` prop ([#830](https://www.github.com/iTwin/iTwinUI-react/issues/830))
- **ThemeProvider:** Add `applyBackground` to `themeOptions` prop. ([#974](https://www.github.com/iTwin/iTwinUI-react/issues/974))
  - Defaults to true for the topmost ThemeProvider in the tree.
- **Table:** Ctrl + Shift click now keeps previous selection & also shift clicks ([#888](https://www.github.com/iTwin/iTwinUI-react/issues/888))

### Patch changes

- **Table:** Ctrl and checkbox clicks update start row of shift selection ([#889](https://www.github.com/iTwin/iTwinUI-react/issues/889))

## 2.0.4 (2022-12-16)

### Patch changes

- Use `import type` instead of `import { type }` for supporting older typescript versions ([#996](https://www.github.com/iTwin/iTwinUI-react/issues/996))

## 2.0.3 (2022-12-12)

### Patch changes

- **ComboBox:** Move max-height to outer element to fix virtual scroll ([#986](https://www.github.com/iTwin/iTwinUI-react/issues/986))

## [2.0.2](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.1...v2.0.2) (2022-12-07)

### Patch changes

- **ThemeProvider:** Improved types to exclude `ownerDocument` from `themeOptions` if children passed ([#973](https://www.github.com/iTwin/iTwinUI-react/issues/973))

## [2.0.1](https://www.github.com/iTwin/iTwinUI-react/compare/v2.0.0...v2.0.1) (2022-12-05)

### Patch changes

- **useTheme:** Exit early if theme is already set on body ([#963](https://www.github.com/iTwin/iTwinUI-react/issues/963))
- **ModalButtonBar, ModalContent:** Wrap `DialogButtonBar` and `DialogContent` instead of directly assigning ([#961](https://www.github.com/iTwin/iTwinUI-react/issues/961))
- **Table:** Added localization for selected rows count ([#945](https://www.github.com/iTwin/iTwinUI-react/issues/945))
- Replaced all instances of `useLayoutEffect` with `useIsomorphicLayoutEffect` to fix SSR warnings ([#964](https://www.github.com/iTwin/iTwinUI-react/issues/964))
- Fixed css warnings about `start` vs `flex-start` through base itwinui-css update ([#962](https://www.github.com/iTwin/iTwinUI-react/issues/962))

## [2.0.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.48.1...v2.0.0) (2022-11-15)

Welcome to the v2 release of iTwinUI-react. 🎉

This release uses the brand new v1 of iTwinUI-css and iTwinUI-variables, which include significant visual changes and improvements.

These release notes offer a brief summary of the main changes. Check out the [iTwinUI-react v2 migration guide](https://github.com/iTwin/iTwinUI-react/wiki/iTwinUI-react-v2-migration-guide) for more details.

### ⚠ BREAKING CHANGES

iTwinUI no longer supports Internet Explorer. The build output now targets `es2018` rather than `es5`, and CSS variables and grid are used without fallbacks.

As for breaking API changes, there is only one:

- **Table:** `columns` prop must now be an array. First level `Header` is no longer required ([#935](https://www.github.com/iTwin/iTwinUI-react/issues/935))

```diff
- const columns = [{ Header: 'Table', columns: [{ accessor: 'name', Header: 'Name' }, … ] }];
+ const columns = [{ accessor: 'name', Header: 'Name' }, … ];

 <Table columns={columns} data={data} />
```

Other than that, props and components that were already deprecated in v1 have been removed:

- **Tabs:** Remove deprecated `HorizontalTab` and `HorizontalTabProps` ([#852](https://www.github.com/iTwin/iTwinUI-react/issues/852))
- **Checkbox, Radio:** Remove deprecated `checkmarkClassName` and `checkmarkStyle` ([#855](https://www.github.com/iTwin/iTwinUI-react/issues/855))
- **Alert:** Remove deprecated `onClick` prop ([#851](https://www.github.com/iTwin/iTwinUI-react/issues/851))

### Deprecations

We have also taken this opportunity to deprecate a few more things while not removing them just yet, to minimize the number of breaking changes.

- **Avatar, AvatarGroup:** Deprecate `UserIcon`/`UserIconGroup`, replace with `Avatar`/`AvatarGroup` ([#902](https://www.github.com/iTwin/iTwinUI-react/issues/902))
  - Also deprecated `userIcon` prop in `Header`.
- **Tabs:** Deprecate `HorizontalTabs`, `VerticalTabs` to use `Tabs` ([#908](https://www.github.com/iTwin/iTwinUI-react/issues/908))
- **Typography:** Deprecate Headline, Leading, Small, Subheading, Title, Body. Replaced with `Text`. ([#914](https://www.github.com/iTwin/iTwinUI-react/issues/914))
- **Wizard:** Deprecate `Wizard` to use `Stepper`/`WorkflowDiagram` ([#905](https://www.github.com/iTwin/iTwinUI-react/issues/905))
- **ErrorPage:** Deprecate `ErrorPage` and add `NonIdealState` for lower bundle size and inversion of control. ([#924](https://www.github.com/iTwin/iTwinUI-react/issues/924))

### What's new

- Allow scoped styles using `ThemeProvider` ([#825](https://github.com/iTwin/iTwinUI-react/pull/825))
- Add `exports` field to package.json. This improves compatibility with ESM environments like vitest. ([#845](https://www.github.com/iTwin/iTwinUI-react/issues/845))
- Removed dependency on `@itwin/itwinui-icons`. The icons are now inlined. ([#917](https://www.github.com/iTwin/iTwinUI-react/issues/917))
- **Table:** Add row loading state ([#871](https://www.github.com/iTwin/iTwinUI-react/issues/871))
- **Table:** Row selection count for paginator ([#837](https://www.github.com/iTwin/iTwinUI-react/issues/837))
- **Tile:** Add status and loading state ([#872](https://www.github.com/iTwin/iTwinUI-react/issues/872))

If you're interested in more details about every signle change, check out a full diff in [`v1.48.1..v2.0.0`](https://www.github.com/iTwin/iTwinUI-react/compare/v1.48.1...v2.0.0).

## 1.X

For any changes prior to 2.0.0, check out the [1.X changelog](https://github.com/iTwin/iTwinUI/blob/legacy/v1-react/packages/iTwinUI-react/CHANGELOG.md).
