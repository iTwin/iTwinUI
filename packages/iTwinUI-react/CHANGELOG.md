# Changelog

### 1.48.2

- Fixed an issue where Table's `onBottomReached` callback was not being invoked when using strict mode with react 18.

### [1.48.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.48.0...v1.48.1) (2022-10-24)

### Fixes

* **Modal:** Apply z-index on dialog wrapper ([#892](https://www.github.com/iTwin/iTwinUI-react/issues/892)) ([0637b54](https://www.github.com/iTwin/iTwinUI-react/commit/0637b54769f14b48075460d94cf64937f90a9ee3))

## [1.48.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.47.1...v1.48.0) (2022-10-18)

### Fixes

* **Slider:** `onUpdate` called on thumb keyboard press, keyboard `onChange` called onKeyUp ([#857](https://www.github.com/iTwin/iTwinUI-react/issues/857)) ([e881387](https://www.github.com/iTwin/iTwinUI-react/commit/e881387b3bf01163c74d4b5dbd945c20616fd237))
* **Table:** Fix "un/select all rows" behavior when a filter is applied ([81a54f7](https://www.github.com/iTwin/iTwinUI-react/commit/81a54f794afcc7490799da03914ffa156fa1055f))

### [1.47.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.47.0...v1.47.1) (2022-10-10)

### Fixes

* Add `tippy.js` as a direct dependency ([#865](https://www.github.com/iTwin/iTwinUI-react/issues/865)) ([7220ba2](https://www.github.com/iTwin/iTwinUI-react/commit/7220ba278dd34a2ef4bea3e2b25446ad9b0a7d38))

## [1.47.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.46.0...v1.47.0) (2022-10-03)

### What's new

* **Table:** Column resize modes ([#835](https://www.github.com/iTwin/iTwinUI-react/issues/835)) ([771a517](https://www.github.com/iTwin/iTwinUI-react/commit/771a517aa2031d5936521764a09613b6433ff283))

### Fixes

* **Table:** Fixed when fast resizing caused Table to throw an error ([#848](https://www.github.com/iTwin/iTwinUI-react/issues/848)) ([058ad3a](https://www.github.com/iTwin/iTwinUI-react/commit/058ad3a7c1bb4a3198a4dde1105cca47a2ef2998))

## [1.46.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.45.0...v1.46.0) (2022-09-20)

### What's new

* **Dialog:** Added new `Dialog` compound component that was previously used by `Modal` internally.
  - Supports dragging through `isDraggable` and `relativeTo` props ([#771](https://www.github.com/iTwin/iTwinUI-react/issues/771)) ([6e19020](https://www.github.com/iTwin/iTwinUI-react/commit/6e1902011c323485cdf74b64c4778de6309c0820))
  - Supports resizing through `isResizable` prop ([#823](https://www.github.com/iTwin/iTwinUI-react/issues/823)) ([635de22](https://www.github.com/iTwin/iTwinUI-react/commit/635de226416196b23babe07c455e7571611a993f))
* **Breadcrumbs:** Add `overflowButton` property ([#814](https://www.github.com/iTwin/iTwinUI-react/issues/814)) ([5a53003](https://www.github.com/iTwin/iTwinUI-react/commit/5a53003ea7c68854f412713edf49ec489505b134))
* **DatePicker:** Date range support ([#737](https://www.github.com/iTwin/iTwinUI-react/issues/737)) ([33a815a](https://www.github.com/iTwin/iTwinUI-react/commit/33a815a2588251ff48f0f1852ec1b07957970069))
* **Table:** Enable `useGlobalFilter` ([#810](https://www.github.com/iTwin/iTwinUI-react/issues/810)) ([b5133cc](https://www.github.com/iTwin/iTwinUI-react/commit/b5133cccb624380b1e4734bf3fe75858c046cf7e))
* **Table:** Now supports shift click to select multiple rows ([#774](https://www.github.com/iTwin/iTwinUI-react/issues/774)) ([e868dc2](https://www.github.com/iTwin/iTwinUI-react/commit/e868dc285975ccf19635ff24edba017fea55d376))

### Fixes

* **ButtonGroup:** Handle overflow when available space is smaller than one element ([#827](https://www.github.com/iTwin/iTwinUI-react/issues/827)) ([f3691d3](https://www.github.com/iTwin/iTwinUI-react/commit/f3691d34306bad9203d85c5708650b524926fb79))
* **Modal:** Fixed body overflow handling when there is a dialog inside another dialog ([#776](https://www.github.com/iTwin/iTwinUI-react/issues/776)) ([68feac4](https://www.github.com/iTwin/iTwinUI-react/commit/68feac425d335d11d5b0fd306bd35e5815910d17))
* **Dialog:** Only focus dialog when `setFocus` is `true` ([#809](https://www.github.com/iTwin/iTwinUI-react/issues/809)) ([ddd7a9c](https://www.github.com/iTwin/iTwinUI-react/commit/ddd7a9cbceabaf5699b03b8d9d19b2676b53372f))
* **Table:** Exposing `BaseFilter` in `index.ts` ([#826](https://www.github.com/iTwin/iTwinUI-react/issues/826)) ([9cddd2c](https://www.github.com/iTwin/iTwinUI-react/commit/9cddd2c8e347e849916637c2c8a60ba24c342a75))
* **VirtualScroll:** Show all children upon toggling display/visibility ([#811](https://www.github.com/iTwin/iTwinUI-react/issues/811)) ([77810a6](https://www.github.com/iTwin/iTwinUI-react/commit/77810a67745411e235abe31578f3eb265d81a9eb))

## [1.45.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.44.0...v1.45.0) (2022-08-25)

### What's new

* **MiddleTextTruncation:** Add text renderer for customizing rendered content ([#787](https://www.github.com/iTwin/iTwinUI-react/issues/787)) ([293ebea](https://www.github.com/iTwin/iTwinUI-react/commit/293ebeac844eb540c1d5c7f999e176f3be377d8e))
* **Table:** Add `Cell` and `Row` status. Icons support in `DefaultCell` ([#788](https://www.github.com/iTwin/iTwinUI-react/issues/788)) ([9b0282e](https://www.github.com/iTwin/iTwinUI-react/commit/9b0282e610434301ff69e296086304afc5648034))

## [1.44.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.43.1...v1.44.0) (2022-08-23)

### What's new

* **Select:** Multiple selection support ([#700](https://www.github.com/iTwin/iTwinUI-react/issues/700)) ([b7d34c1](https://www.github.com/iTwin/iTwinUI-react/commit/b7d34c1702ae416d969bed21098270f7aa7731a9))

### Fixes

* **Table:** Show correct icon on hover for columns with `sortDescFirst` ([#779](https://www.github.com/iTwin/iTwinUI-react/issues/779)) ([acf19a2](https://www.github.com/iTwin/iTwinUI-react/commit/acf19a23d4680e6e1c1789e45b8e76e0848d8166))

### [1.43.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.43.0...v1.43.1) (2022-08-18)

### Fixes

* **Dialog:** Fixed import path for `useTheme` ([#780](https://www.github.com/iTwin/iTwinUI-react/issues/780)) ([dc5f65a](https://www.github.com/iTwin/iTwinUI-react/commit/dc5f65af8a4a7e8d50f05952084a2ffe98bc0800))

## [1.43.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.42.0...v1.43.0) (2022-08-17)

### What's new

* **Footer:** Allows to use composition to customize Footer as you wish ([#754](https://www.github.com/iTwin/iTwinUI-react/issues/754)) ([48dfe52](https://www.github.com/iTwin/iTwinUI-react/commit/48dfe524f4ac45a81cd98504f38c50420f47664a))
* **Slider:** Adding vertical orientation support ([#747](https://www.github.com/iTwin/iTwinUI-react/issues/747)) ([18cb893](https://www.github.com/iTwin/iTwinUI-react/commit/18cb89317118081ab425606f5679be56e1b60552))
* **Table:** Style `DropdownMenu` inside of `ActionColumn` in `Table` ([#756](https://www.github.com/iTwin/iTwinUI-react/issues/756)) ([1116369](https://www.github.com/iTwin/iTwinUI-react/commit/111636962076797cbbc0f0b8b5ae4077a7e5a8d2))

### Fixes

* **Breadcrumbs**, **ButtonGroup**: Fix focus getting lost while resizing on overflow ([#777](https://www.github.com/iTwin/iTwinUI-react/issues/777)) ([8ee9c7b](https://www.github.com/iTwin/iTwinUI-react/commit/8ee9c7b57829b330cea7db5f89864c90211ec4d1))
* **Table:** Enabled scrollToRow for lazy-loading tables ([#775](https://www.github.com/iTwin/iTwinUI-react/issues/775)) ([c57b458](https://www.github.com/iTwin/iTwinUI-react/commit/c57b458e7d74609d44d3f0d304e49ee2c1f22d54))
* **Table:** Syncing header and body horizontal scroll state ([#760](https://www.github.com/iTwin/iTwinUI-react/issues/760)) ([5ceeec2](https://www.github.com/iTwin/iTwinUI-react/commit/5ceeec279585ca5af92f1b26440c354ee6eeb027))

## [1.42.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.41.0...v1.42.0) (2022-07-26)

### Fixes

* **ComboBox:** Prevent infinite loop when `options` change ([#738](https://www.github.com/iTwin/iTwinUI-react/issues/738)) ([7788f45](https://www.github.com/iTwin/iTwinUI-react/commit/7788f451fcbf9dd7959d3fa727c0cdee3485bbcd))
* **Small:** Use `small` element instead of `p` ([#735](https://www.github.com/iTwin/iTwinUI-react/issues/735)) ([c59f213](https://www.github.com/iTwin/iTwinUI-react/commit/c59f21326e049bce50e24c729a46482b74ef63c3))


### What's new

* **Table:** Scroll table to selected item ([#689](https://www.github.com/iTwin/iTwinUI-react/issues/689)) ([afa947b](https://www.github.com/iTwin/iTwinUI-react/commit/afa947b15411305c1bfc57b239d916fc599acfbe))
* **Tree:** Virtualization ([#713](https://www.github.com/iTwin/iTwinUI-react/issues/713)) ([d4d3575](https://www.github.com/iTwin/iTwinUI-react/commit/d4d35758fa0c8f00811f387cc8453b82e9773c85))

## [1.41.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.40.1...v1.41.0) (2022-07-13)

### What's new

* **ErrorPage:** Add time-out and redirect status codes ([#715](https://www.github.com/iTwin/iTwinUI-react/issues/715)) ([a5fb85f](https://www.github.com/iTwin/iTwinUI-react/commit/a5fb85f1f0ef9517a065db02384875d7c5d87f95))
* **Modal:** Update classes through the css package update ([#724](https://www.github.com/iTwin/iTwinUI-react/issues/724)) ([d13e0bf](https://www.github.com/iTwin/iTwinUI-react/commit/d13e0bf7941581a3b8d275b744bf77ebd7ae95d4))
  - Now `style` and `className` props are applied on the dialog element itself.
* Border radius was changed from `3px` to `4px` through the css package update in all elements ([#724](https://www.github.com/iTwin/iTwinUI-react/issues/724)) ([d13e0bf](https://www.github.com/iTwin/iTwinUI-react/commit/d13e0bf7941581a3b8d275b744bf77ebd7ae95d4))

### Fixes

* **Combobox:** Allow users to reset the value ([#728](https://www.github.com/iTwin/iTwinUI-react/issues/728)) ([f6c0b0d](https://www.github.com/iTwin/iTwinUI-react/commit/f6c0b0d66ac9ac725a23e07980c9dd7298084ae4))
* **Table:** Prevent crashing when clearing editable cell ([#732](https://www.github.com/iTwin/iTwinUI-react/issues/732)) ([0dedd3b](https://www.github.com/iTwin/iTwinUI-react/commit/0dedd3b8804ce98ce836d4bbbf58db83a4f9bfde))
* **Table:** Set correct intersection root for margin to work ([#708](https://www.github.com/iTwin/iTwinUI-react/issues/708)) ([55e4848](https://www.github.com/iTwin/iTwinUI-react/commit/55e48481f95c3351c127d495bd3c20134fd4a77f))

### [1.40.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.40.0...v1.40.1) (2022-06-17)

### Fixes

* **Table:** Horizontal scroll is working when virtual scroll is enabled ([#711](https://www.github.com/iTwin/iTwinUI-react/issues/711)) ([d3db504](https://www.github.com/iTwin/iTwinUI-react/commit/d3db504d3a44a4da2c1f34a392f99aae478ef2a3))

## [1.40.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.39.0...v1.40.0) (2022-06-10)

### What's new

* **Combobox:** Loading state with skeletons ([#655](https://www.github.com/iTwin/iTwinUI-react/issues/655)) ([cc1c7fb](https://www.github.com/iTwin/iTwinUI-react/commit/cc1c7fb6b5c494c94c01fe06483b788e0a27ec36))
* **Table:** Add sticky columns feature ([#695](https://www.github.com/iTwin/iTwinUI-react/issues/695)) ([eb6b0c0](https://www.github.com/iTwin/iTwinUI-react/commit/eb6b0c03e83b6e1417a444901c033a52545de186))

### Fixes

* **Table:** Overriding min-width for the whole table ([#706](https://www.github.com/iTwin/iTwinUI-react/issues/706)) ([ad8173b](https://www.github.com/iTwin/iTwinUI-react/commit/ad8173b5764277a06a4b87a408e80affb2271749))
* **Table:** Removed title from selection checkboxes ([#704](https://www.github.com/iTwin/iTwinUI-react/issues/704)) ([5f72e59](https://www.github.com/iTwin/iTwinUI-react/commit/5f72e59a6d6e66b5f69c30ad82f7b37017242df6))

## [1.39.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.38.0...v1.39.0) (2022-06-03)

### What's new

* Add support of react 18 ([#656](https://www.github.com/iTwin/iTwinUI-react/issues/656)) ([b7a4c7b](https://www.github.com/iTwin/iTwinUI-react/commit/b7a4c7ba1e26445308dcb7f1fd5a374743de4e6f))
* **Combobox:** Virtualization ([#539](https://www.github.com/iTwin/iTwinUI-react/issues/539)) ([9e93871](https://www.github.com/iTwin/iTwinUI-react/commit/9e93871c59935a39f6ee1d633d96df04b78f33a1))

### Fixes

* **Carousel:** Use event handler instead of useEffect for scroll ([#683](https://www.github.com/iTwin/iTwinUI-react/issues/683)) ([bcf125b](https://www.github.com/iTwin/iTwinUI-react/commit/bcf125be76495352a06c063bc7a0d5d2a884c860))
* **Toaster:** Fix inital position setting ([#687](https://www.github.com/iTwin/iTwinUI-react/issues/687)) ([c58b747](https://www.github.com/iTwin/iTwinUI-react/commit/c58b74786bf90a165993afb2eec926f74b37a1eb))

### [1.38.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.38.0...v1.38.1) (2022-05-23)

### Fixes

* **Toaster:** Fix initial position setting ([#687](https://www.github.com/iTwin/iTwinUI-react/issues/687)) ([c58b747](https://www.github.com/iTwin/iTwinUI-react/commit/c58b74786bf90a165993afb2eec926f74b37a1eb))

## [1.38.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.37.3...v1.38.0) (2022-05-23)

### What's new

* **ComboBox:** Full component refactor to improve performance by using components composition ([#618](https://www.github.com/iTwin/iTwinUI-react/issues/618)) ([5d56809](https://www.github.com/iTwin/iTwinUI-react/commit/5d56809c46ad312402669f9cb2dbf6c8d3c733ad))

### Fixes

* **Table:** Allow 'false' as valid filter value ([#664](https://www.github.com/iTwin/iTwinUI-react/issues/664)) ([628cc26](https://www.github.com/iTwin/iTwinUI-react/commit/628cc26afc044e1b3f1c09b2489b31fe15b34de1))
* **Toaster:** Do not call `ReactDOM` render multiple times ([#667](https://www.github.com/iTwin/iTwinUI-react/issues/667)) ([195a857](https://www.github.com/iTwin/iTwinUI-react/commit/195a8573157ce6588e0edb40569770ffa4636584))
* Visuals changes after CSS update ([#678](https://www.github.com/iTwin/iTwinUI-react/issues/678)) ([16b9310](https://www.github.com/iTwin/iTwinUI-react/commit/16b93106c8d3787cc3f6bdee469604db6167ccf0))
  - **Select:** Arrow color
  - **Tabs:** Description color
  - **Skeleton:** Background color
  - **Checkbox:** Add border to disabled state

### [1.37.3](https://www.github.com/iTwin/iTwinUI-react/compare/v1.37.2...v1.37.3) (2022-05-06)

### Fixes

* **Slider:** Skip drawing track if thumb values are out of range ([#652](https://www.github.com/iTwin/iTwinUI-react/issues/652)) ([38d6574](https://www.github.com/iTwin/iTwinUI-react/commit/38d657423d2def7d54b9e195f0c543a35e725d3f))

### [1.37.2](https://www.github.com/iTwin/iTwinUI-react/compare/v1.37.1...v1.37.2) (2022-05-04)

### Fixes

* **Table:** Fix direction of sort icons ([#645](https://www.github.com/iTwin/iTwinUI-react/issues/645)) ([1a0683b](https://www.github.com/iTwin/iTwinUI-react/commit/1a0683b2d8f18b8ec80412e2208fbfa12df88d51))
* **Table:** Fix error of headless table ([#648](https://www.github.com/iTwin/iTwinUI-react/issues/648)) ([87c6b9e](https://www.github.com/iTwin/iTwinUI-react/commit/87c6b9eb0b8338357aec107af3f7a7539dd0f5a3))

### [1.37.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.37.0...v1.37.1) (2022-04-22)

### Fixes

* **ComboBox:** Use latest value of `onChange` prop ([#636](https://www.github.com/iTwin/iTwinUI-react/issues/636)) ([a1f705e](https://www.github.com/iTwin/iTwinUI-react/commit/a1f705e05a7608f66e56d3555c679c180fadcae0))

## [1.37.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.36.0...v1.37.0) (2022-04-21)

### What's new

* **SkipToContent:** Add `SkipToContent` Component ([#618](https://www.github.com/iTwin/iTwinUI-react/issues/618)) ([5d56809](https://www.github.com/iTwin/iTwinUI-react/commit/5d56809c46ad312402669f9cb2dbf6c8d3c733ad))
* **Surface:** Add `Surface` component ([#624](https://www.github.com/iTwin/iTwinUI-react/issues/624)) ([aa8f992](https://www.github.com/iTwin/iTwinUI-react/commit/aa8f99228cd4069bcba237c4a599d4735beccd0e))
* **Table:** Single selection of rows ([#628](https://www.github.com/iTwin/iTwinUI-react/issues/628)) ([b8e0bf6](https://www.github.com/iTwin/iTwinUI-react/commit/b8e0bf63cbb07d8bd21fc165a505af1388e57a98))
* **Tile:** Add `isActionable` prop to use for interactive tile ([#631](https://www.github.com/iTwin/iTwinUI-react/issues/631)) ([abfb807](https://www.github.com/iTwin/iTwinUI-react/commit/abfb8073c129c06488be276e4d301b89bf4588d5))

### Fixes

* **Table:** Add support for `preventDefault` in row click events ([#629](https://www.github.com/iTwin/iTwinUI-react/issues/629)) ([997897d](https://www.github.com/iTwin/iTwinUI-react/commit/997897d438ff00ed9d63da1745c81f37957c14ba))
* **Header:** Fix `HeaderButton` spacing through css package update ([4094a3b](https://www.github.com/iTwin/iTwinUI-react/commit/4094a3bc94c8e589b4dbc6a2fd68f4f00389d941))

## [1.36.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.35.0...v1.36.0) (2022-04-15)

### What's new

* **Table:** Added `ColumnManager` for hiding columns ([#564](https://www.github.com/iTwin/iTwinUI-react/issues/564)) ([71cf927](https://www.github.com/iTwin/iTwinUI-react/commit/71cf9278d1e75dc426f24976a497d40b18da3c87))
  - `ActionColumn` was added to use with `ColumnManager`. It can be used for fixed width columns (i.e. column with menu).
* **Table:** Default columns customization ([#599](https://www.github.com/iTwin/iTwinUI-react/issues/599)) ([e665821](https://www.github.com/iTwin/iTwinUI-react/commit/e665821b66972136873797058da6cd4036f4dd2d))
  - `ExpanderColumn` and `SelectionColumn` were added for custom implementation of expansion and selection.

### Fixes

* **Menu:** Fixed keyboard navigation when `MenuItem` contains selectable children ([#625](https://www.github.com/iTwin/iTwinUI-react/issues/625)) ([082e384](https://www.github.com/iTwin/iTwinUI-react/commit/082e384ed5ccc1fb2ded9ccc69bca06be6e3f29b))
* **Popover:** Stop propagation of click in `Popover` ([#619](https://www.github.com/iTwin/iTwinUI-react/issues/619)) ([298cbf3](https://www.github.com/iTwin/iTwinUI-react/commit/298cbf3aba050763b481252ba76f5c945b5c2e17))

## [1.35.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.34.2...v1.35.0) (2022-04-05)

### What's new

* **Carousel:** Add new Carousel Component ([#569](https://www.github.com/iTwin/iTwinUI-react/issues/569)) ([fc7040c](https://www.github.com/iTwin/iTwinUI-react/commit/fc7040c712011bdf40a6d5b3e9c4bad78a532523))
* **DatePicker:** Add year selection ([#604](https://www.github.com/iTwin/iTwinUI-react/issues/604)) ([2f57da6](https://www.github.com/iTwin/iTwinUI-react/commit/2f57da6ef07202290e4f6d214a0581dae1528007))
* **Modal:** Add full page modal ([#588](https://www.github.com/iTwin/iTwinUI-react/issues/588)) ([711a55b](https://www.github.com/iTwin/iTwinUI-react/commit/711a55b2b4373ce4bd99d770a3edc5f9aae516bc))
  - Add `ModalContent` component for better scroll experience.
* **Theme:** Add support for high contrast themes ([#610](https://www.github.com/iTwin/iTwinUI-react/issues/610)) ([b1b6d95](https://www.github.com/iTwin/iTwinUI-react/commit/b1b6d9519ec0290bd6759a31fc4cc4a7c8ab03e3))
  - High contrast themes are automatically used if user's OS prefers it. It can also be specified manually using `themeOptions.highContrast`.

### Fixes

* **Table:** `onBottomReached` was triggered on filtered Table ([#607](https://www.github.com/iTwin/iTwinUI-react/issues/607)) ([2f9cf24](https://www.github.com/iTwin/iTwinUI-react/commit/2f9cf24fd0eecee1bff27cbf8d69281062e3e33d))

### [1.34.2](https://www.github.com/iTwin/iTwinUI-react/compare/v1.34.1...v1.34.2) (2022-03-29)

### Fixes

* **Table:** Date filter makes range from the begigging to the end of the day ([#601](https://www.github.com/iTwin/iTwinUI-react/issues/601)) ([ae978b7](https://www.github.com/iTwin/iTwinUI-react/commit/ae978b7df3a59f9cd18474346d88083d888e36e3))

### [1.34.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.34.0...v1.34.1) (2022-03-24)

### Fixes

* **ComboBox:** Combine internal input onChange with `inputProps.onChange` ([#597](https://www.github.com/iTwin/iTwinUI-react/issues/597)) ([e033753](https://www.github.com/iTwin/iTwinUI-react/commit/e033753c81f3b9298df6eb198581c75344f96c00))

## [1.34.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.33.1...v1.34.0) (2022-03-22)

### What's new

* **Table:** support for draggable columns ([#561](https://www.github.com/iTwin/iTwinUI-react/issues/561)) ([0e741f5](https://www.github.com/iTwin/iTwinUI-react/commit/0e741f5c0838996a5f45c57abedf41daeef652d4))

### Fixes

* **ToggleSwitch:** updated toggle switch styles through css package ([#592](https://www.github.com/iTwin/iTwinUI-react/issues/592)) ([3a0be35](https://www.github.com/iTwin/iTwinUI-react/commit/3a0be355d4363fe7d704c3fd6f975c509c65da2b))
* **UserIcon:** busy status now also shows an icon

### [1.33.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.33.0...v1.33.1) (2022-03-18)

### Fixes

* **ButtonGroup:** Add vertical support to `overflowButton` ([#579](https://www.github.com/iTwin/iTwinUI-react/issues/579)) ([aad619b](https://www.github.com/iTwin/iTwinUI-react/commit/aad619b6dc7d65ffd79c8d33111489b1b8d27680))
* **Slider:** Fixed to call onUpdate on rail click ([#587](https://www.github.com/iTwin/iTwinUI-react/issues/587)) ([e7cc679](https://www.github.com/iTwin/iTwinUI-react/commit/e7cc6796308928230f2d2c7c79b6ee35286595a7))
* **Table:** Removed wrapper span from checkbox ([#583](https://www.github.com/iTwin/iTwinUI-react/issues/583)) ([996377b](https://www.github.com/iTwin/iTwinUI-react/commit/996377bf44cdacd9f42361f2199c2a83420ca15b))

## [1.33.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.32.0...v1.33.0) (2022-03-07)

### What's new

* **ButtonGroup:** Add new `orientation` prop to allow showing vertical group ([#577](https://www.github.com/iTwin/iTwinUI-react/issues/577)) ([f6cd52f](https://www.github.com/iTwin/iTwinUI-react/commit/f6cd52f39dd139439281114d3ade99e486ab6bfb))
* **ComboBox:** Add new `message` prop ([#554](https://www.github.com/iTwin/iTwinUI-react/issues/554)) ([8113860](https://www.github.com/iTwin/iTwinUI-react/commit/8113860499e6156d97992919204b3b8c7e46197b))
  * This new prop can accept a string or the new `StatusMessage` component for customizing icon.
* **Footer:** Allow overriding and removing default footer elements ([#544](https://www.github.com/iTwin/iTwinUI-react/issues/544)) ([76396a4](https://www.github.com/iTwin/iTwinUI-react/commit/76396a4cc0a88bb7680316cf4642b732729abd7a))

## [1.32.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.31.0...v1.32.0) (2022-02-25)

### What's new

* **Popover:** Append to `body` by default and increase z-index ([#562](https://www.github.com/iTwin/iTwinUI-react/issues/562)) ([66df49f](https://www.github.com/iTwin/iTwinUI-react/commit/66df49fec85ec13707cc73bb3fdf84ca3a4c7655))
  - This will fix many clipping and positioning issues in tooltips and dropdowns, without the need for any workarounds.
  - If a popover is nested within another popover which is already appended to document.body, then it should use `appendTo='parent'`.
* **Tree:** Add new Tree Component ([#468](https://www.github.com/iTwin/iTwinUI-react/issues/468)) ([1d5083c](https://www.github.com/iTwin/iTwinUI-react/commit/1d5083c612cd1f1b1cbec0e5ea82b8b573d72b86))
* **ComboBox:** Add new `itemRenderer` prop for customizing the look of menu items ([#547](https://www.github.com/iTwin/iTwinUI-react/issues/547)) ([d866d32](https://www.github.com/iTwin/iTwinUI-react/commit/d866d32a719dea6e359519ae40bc66dc7df209e1))
* **ExpandableBlock:** Add borderless variant via new `styleType` prop ([#557](https://www.github.com/iTwin/iTwinUI-react/issues/557)) ([9e8c8ab](https://www.github.com/iTwin/iTwinUI-react/commit/9e8c8ab76a7c6d24c51d5eea9e4424417c0e2fad))
* **Checkbox** and **Radio**: Render without `<label>` wrapper if `label` prop is not passed ([#556](https://www.github.com/iTwin/iTwinUI-react/issues/556)) ([a436cbf](https://www.github.com/iTwin/iTwinUI-react/commit/a436cbf333629b2603bf160f9a8ffe2592093805))

### Fixes

* **Menu:** Fix lost item focus in edge cases ([#563](https://www.github.com/iTwin/iTwinUI-react/issues/563)) ([3ccb5ed](https://www.github.com/iTwin/iTwinUI-react/commit/3ccb5ed98ac4f60479e0450abb31cbb659d902b9))

## [1.31.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.30.0...v1.31.0) (2022-02-15)

### What's new

* **Select:** Now uses an svg for the arrow to match ComboBox ([#540](https://www.github.com/iTwin/iTwinUI-react/issues/540)) ([c0ad092](https://www.github.com/iTwin/iTwinUI-react/commit/c0ad0921f859130f4cc866999ba2d31187b192ac))

### Fixes

* **ButtonGroup:** Fixed z-index handling through base CSS package.
* **Popover:** Fixed popover not hiding when target is scrolled off screen.

## [1.30.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.29.3...v1.30.0) (2022-02-08)

### What's new

* **ButtonGroup:** Add new `overflowPlacement` prop to allow placing `overflowButton` at start ([#527](https://www.github.com/iTwin/iTwinUI-react/issues/527)) ([442ba87](https://www.github.com/iTwin/iTwinUI-react/commit/442ba87f8ba45240f07e8cacd9463cd95e5ec1e7))
* **Table:** Added new `enableVirtualization` prop for row virtualization ([#236](https://www.github.com/iTwin/iTwinUI-react/issues/236)) ([178bb75](https://www.github.com/iTwin/iTwinUI-react/commit/178bb756bf14fd0f780433ca33ea2a151d4c1436))

### Fixes

* **Popover:** Prevent from adding 5px padding ([#534](https://www.github.com/iTwin/iTwinUI-react/issues/534)) ([fea4782](https://www.github.com/iTwin/iTwinUI-react/commit/fea47823ae730b3e9b2bab2e2ec75b1ba8101b27))
* **Slider:** Handle pointermove events only when thumb is active ([#528](https://www.github.com/iTwin/iTwinUI-react/issues/528)) ([e41b53b](https://www.github.com/iTwin/iTwinUI-react/commit/e41b53b7ccda245f298bb33c6984f2431d917932))

### [1.29.3](https://www.github.com/iTwin/iTwinUI-react/compare/v1.29.2...v1.29.3) (2022-01-26)

### Fixes

* **Radio:** Fix radio dot size ([#525](https://www.github.com/iTwin/iTwinUI-react/issues/525)) ([8d952b9](https://www.github.com/iTwin/iTwinUI-react/commit/8d952b91dc83d21881f7ecca323cab55f5403d90))

### [1.29.2](https://www.github.com/iTwin/iTwinUI-react/compare/v1.29.1...v1.29.2) (2022-01-24)

### Fixes

* **Button:** Fix event typings for inline handlers ([#519](https://www.github.com/iTwin/iTwinUI-react/issues/519)) ([c72f5fd](https://www.github.com/iTwin/iTwinUI-react/commit/c72f5fdae00f61d38295f30111f36c403590ebfe))
* **Modal:** Dont use `stopPropagation` for closing on backdrop click ([#518](https://www.github.com/iTwin/iTwinUI-react/issues/518)) ([83a2400](https://www.github.com/iTwin/iTwinUI-react/commit/83a240046f4f04cc625fa8e53fe62d83a7af4c8b))

### [1.29.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.29.0...v1.29.1) (2022-01-19)

### Fixes

* **Button:** Improve polymorphic handling ([#512](https://www.github.com/iTwin/iTwinUI-react/issues/512)) ([6827264](https://www.github.com/iTwin/iTwinUI-react/commit/6827264397b3be5edde70426e43419a8ff161894))

## [1.29.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.28.0...v1.29.0) (2022-01-11)

### What's new

* **Button:** Allow rendering as anchor element using `as` prop ([#409](https://www.github.com/iTwin/iTwinUI-react/issues/409)) ([9dfcef7](https://www.github.com/iTwin/iTwinUI-react/commit/9dfcef7ba1c2dc2a43b49fc8e40ef2dcbd89bd0b))
* **Anchor:** Add new anchor component ([#501](https://www.github.com/iTwin/iTwinUI-react/issues/501)) ([684c18b](https://www.github.com/iTwin/iTwinUI-react/commit/684c18b313a3a7485a766b784d28a482e38e1a3d))
* **useTheme:** Add event listener to respond to theme changes ([#491](https://www.github.com/iTwin/iTwinUI-react/issues/491)) ([b940ef0](https://www.github.com/iTwin/iTwinUI-react/commit/b940ef0eccc762e07c76bb46beb4a7e8de793d11))

## [1.28.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.27.0...v1.28.0) (2021-12-21)

### What's new

* **ButtonGroup:** Add support for input+button combo ([#492](https://www.github.com/iTwin/iTwinUI-react/issues/492), [#481](https://github.com/iTwin/iTwinUI-react/pull/481)) ([b8b15fd](https://www.github.com/iTwin/iTwinUI-react/commit/b8b15fd4a6f67fac03063a6fdeec1ea6216899c4))
* **Table:** Added zebra stripes to rows ([#478](https://www.github.com/iTwin/iTwinUI-react/issues/478)) ([76d3eda](https://www.github.com/iTwin/iTwinUI-react/commit/76d3eda5d14aab2b02187c58fab70e93878c73cc))
* **Table:** Proper support for horizontal scroll ([#495](https://www.github.com/iTwin/iTwinUI-react/issues/495)) ([079c2c0](https://www.github.com/iTwin/iTwinUI-react/commit/079c2c020be46f14ff41d407e81eee1487adfcab))

### Fixes

* **Table:** Prevents from triggering sort when filtering ([#487](https://www.github.com/iTwin/iTwinUI-react/issues/487)) ([d1e6165](https://www.github.com/iTwin/iTwinUI-react/commit/d1e61655bddffc37fa3f91b95766145f18392844))

## [1.27.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.26.1...v1.27.0) (2021-12-14)

### What's new

* **Checkbox:** Add visibility (eyeball) checkbox using `variant` prop ([#470](https://www.github.com/iTwin/iTwinUI-react/issues/470)) ([cda4416](https://www.github.com/iTwin/iTwinUI-react/commit/cda44162a5b40686228c542ab0251b6861dd8359))
* **ComboBox:** Add `status` prop ([#473](https://www.github.com/iTwin/iTwinUI-react/issues/473)) ([8f5f098](https://www.github.com/iTwin/iTwinUI-react/commit/8f5f09804a541cab8c2add6417e57b9693e69714))
* **Table:** Add `rowsPerPageLabel` to paginator localization ([#427](https://www.github.com/iTwin/iTwinUI-react/issues/427)) ([52d5c86](https://www.github.com/iTwin/iTwinUI-react/commit/52d5c86efc569238221a7e39cad2d17636c7f9b8))
* **Table:** Added column resizing using `isResizable` prop ([#448](https://www.github.com/iTwin/iTwinUI-react/issues/448)) ([4c25fe1](https://www.github.com/iTwin/iTwinUI-react/commit/4c25fe1ec5de8f2f6bf771c4adf11bc6ad5e0dd2))
* **Tabs:** Add `wrapperClassName` prop ([#451](https://www.github.com/iTwin/iTwinUI-react/issues/451)) ([574480a](https://www.github.com/iTwin/iTwinUI-react/commit/574480a8cd7cc92b95a79d2d53ddae0b39d6c5f5))

### Fixes

* **ErrorPage:** Add `className` and `style` props ([#479](https://www.github.com/iTwin/iTwinUI-react/issues/479)) ([74f9060](https://www.github.com/iTwin/iTwinUI-react/commit/74f906058b12adb85f2653a0b4e7a1d808df1ef5))
* **ModalButtonBar:** Add `className` and `style` props ([#474](https://www.github.com/iTwin/iTwinUI-react/issues/474)) ([2228cc7](https://www.github.com/iTwin/iTwinUI-react/commit/2228cc7ad56c5f1a104abb93b33107af30de62c9))

### [1.26.1](https://www.github.com/iTwin/iTwinUI-react/compare/v1.26.0...v1.26.1) (2021-12-03)

### Fixes

* **MiddleTextTruncation:** Fix resizing by adding flex grow ([#455](https://www.github.com/iTwin/iTwinUI-react/issues/455)) ([17cd7fb](https://www.github.com/iTwin/iTwinUI-react/commit/17cd7fbbef9f5c35a121d664922fb1a5706be037))

## [1.26.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.25.0...v1.26.0) (2021-11-30)

### What's new

* **InformationPanel:** Add `InformationPanelContent` for inner rows ([#433](https://www.github.com/iTwin/iTwinUI-react/issues/433)) ([a706bcb](https://www.github.com/iTwin/iTwinUI-react/commit/a706bcb04f9af512131d9ed08fef1529314d2bb1))
* **MiddleTextTruncation:** Utility to truncate text with ellipsis in the middle ([#330](https://www.github.com/iTwin/iTwinUI-react/issues/330)) ([371b56f](https://www.github.com/iTwin/iTwinUI-react/commit/371b56fa9150fdd110c92d05b3944f376d37441c))

### Fixes

* **DatePicker:** Make date arg required in `onChange` ([#437](https://www.github.com/iTwin/iTwinUI-react/issues/437)) ([ee79248](https://www.github.com/iTwin/iTwinUI-react/commit/ee792488a10e43a9b0f8ea6d77c30ef1897eb86c))
* **Table:** Don't show paginator when there is only one page ([#441](https://www.github.com/iTwin/iTwinUI-react/issues/441)) ([e40cbc8](https://www.github.com/iTwin/iTwinUI-react/commit/e40cbc81929da14ea2754e5d847c0efe8af70203))

## [1.25.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.24.0...v1.25.0) (2021-11-16)

### What's new

* **Label:** Add new standalone `Label` component ([#431](https://www.github.com/iTwin/iTwinUI-react/issues/431)) ([8e40b69](https://www.github.com/iTwin/iTwinUI-react/commit/8e40b69d2b5e9272c01e528cdfd75060357069a8))

### Fixes

* **ColorPicker:** Upgrade color conversion to remove rounding issues ([#425](https://www.github.com/iTwin/iTwinUI-react/issues/425)) ([1ce4905](https://www.github.com/iTwin/iTwinUI-react/commit/1ce4905219325080b5a6a4e5de200101d5b0860e))
* **Table:** Fixed pagniator to handle a large number of items ([#428](https://www.github.com/iTwin/iTwinUI-react/issues/428)) ([1d947fc](https://www.github.com/iTwin/iTwinUI-react/commit/1d947fc3f55091b9b6da1ed7e7fa167b931cb8a0))

## [1.24.0](https://www.github.com/iTwin/iTwinUI-react/compare/v1.23.2...v1.24.0) (2021-11-09)

### What's new

* **ColorPicker:** Add `showAlpha` prop to show opacity slider and input ([#408](https://www.github.com/iTwin/iTwinUI-react/issues/408)) ([a2a7528](https://www.github.com/iTwin/iTwinUI-react/commit/a2a75283f20d2fad937361779cbe04dc99d0cc74))

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
