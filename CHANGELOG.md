## 0.1.X

`Date`

### What's new
* **New SplitButton component added.**
* **New Typography components added: Blockquote, inline Code, and Kbd.**
* **Updated CONTRIBUTING and STYLEGUIDE docs.**

## 0.1.0

`2021-02-03`

## What has changed from the latest bwc-react package:

### Breaking changes
* **ThemeProvider component MUST be used inside your main app component as it provides global styles from iTwinUI.**
* **Refactored text elements.** Property `variant` was removed. Property `muted` renamed to `isMuted`.
* **Loader component removed.** Use ProgressIndicators instead.
* **Removed old Table component from core.**
* **Removed table components from innersource/Grid.**
* **HorizontalTabs `green` prop changed to `color`.** If you want green active tabs pass `color='green'` to HorizontalTabs props.
* **Spinner renamed to ProgressRadial. `internetExplorer` property is removed. `success` property replaced with `status`. Instead of `style` property, `size` property can be used to choose size.**
* **ProgressBar renamed to ProgressLinear. `labelLeft` and `labelRight` properties replaced with `labels`.**
* **Wizard component refactored and API changed.**
* **Removed exports of all svg icons.** Please use `@bentley/icons-generic-react` for your react svg component needs by manually depending on it.
* **Button component has new styleTypes: `cta`, `high-visibility` and `default`. `external` property was removed.**
* **IconButton was removed from innersource. Use one in the core now.**
* **IdeasButton was removed from innersource. Use one in the core now.**
* **MenuButton was removed from innersource.**
* **ButtonWithDropdown was removed from innersource.**
* **ButtonRow, Toolbar were removed from innersource. Use ButtonGroup from core.**
* **DatePicker was refactored. `dateFormat` and `disabled` properties were removed as now component renders only calendar. `setDate` was replaced with `onChange`.**
* **Input refactored. Removed `onEnter` property.**. Use `onKeyDown` to handle clicks if needed.
* **LabeledInput refactored. Removed `onEnter`, `onIconClick` properties.** Pass click handler together with `svgIcon` if needed.
* **Expandable block handles expansion itself.** You can still control it manually using `isExpanded` prop. If you were handling `onClick`, `onKeyDown` or `onKeyPress` events, now pass your callback function as `onToggle` prop.
* **Toaster refactored and API changed.** Prop `link` object property `url` changed to `onClick` and now accepts ONLY a function.
* **Tooltip prop `text` renamed to `content`. `children` has to be a valid JSX element.**
* **ToggleSwitch prop `on` removed. Control toggling through native input props (`checked`, `onchange`).**
* **Status renames: `success` -> `positive`, `error` -> `negative`, `info` -> `informational`.**
* **innersource folder removed.**
* **Modal API changes.** Modal does not handle buttons anymore, use `ModalButtonBar` with `core/Button` in the modal body instead. `onEnter` was removed, use `onKeyDown` instead. Props name changes: `dismissible` -> `isDismissible`, `closeHandle` -> `onClose`, `dismissOnOverlayPress` -> `closeOnExternalClick`, `dismissOnEscapeKey` -> `closeOnEsc`.
### What's new
* **Added footer component.**
* **HorizontalTabs has 2 more types: borderless and pill.** Pass `type='borderless'` or `type='pill'` to HorizontalTabs props.
* **Added error page component.**
* **Updated Radio component.**
* **Wizard component now has 2 new types: `long` and `workflow`.**
* **Updated Alert component with new props: `clickableText`, `onClick`, `onClose` and `isSticky`.**
* **Button component now has new `small` size.**
* **LabeledInput now has `inline` type.**
* **LabeledTextarea now has `inline` type and `svgIcon` property for custom icon.**
* **Updated Checkbox component.**
* **Use InputGroup component to group Checkbox or Radio components together.**
* **Toaster now exposes `onRemove` prop which is triggered after toast is being removed.**
* **Tooltip refactored. Now its visibility can be controlled by prop `isVisible`.**
* **ToggleSwitch refactored. Now it is using native input props. Label position can be controlled using `labelPosition` prop.**
* **New RadioTileGroup component added.**
* **New ThemeProvider component added.** It allows to switch between light and dark themes.
* **iTwinUI-React is generated to `CommonJS` and `ES` modules.** Usage of `ES` modules allows bundlers to tree-shake unused code resulting in smaller bundle sizes. 
