# @itwin/itwinui-variables

## Installation

```console
npm install @itwin/itwinui-variables
```

```console
yarn add @itwin/itwinui-variables
```

## Usage

Import in CSS:

```css
@import '@itwin/itwinui-variables';
```

Or in JS:

```js
import '@itwin/itwinui-variables';
```

> **Note**: If your project doesn't support export maps, then you might need to import the css file explicitly:
>
> ```css
> @import '@itwin/itwinui-variables/index.css';
> ```

Now you can start using the variables:

```css
button {
  background-color: var(--iui-color-background);
  border: var(--iui-color-border);
  color: var(--iui-color-text);
}
```

By default, the variables use light theme. You can switch to dark theme using `data-iui-theme` in your HTML.

```html
<body data-iui-theme="dark">
  <!-- your application code -->
</body>
```

You can also specify `data-iui-contrast` to switch to a high contrast theme.

```html
<body data-iui-theme="dark" data-iui-contrast="high">
  <!-- your application code -->
</body>
```

If you want the variables to automatically respect the user preferences (color-scheme and contrast), then import `os.css`:

```css
@import '@itwin/itwinui-variables/os.css';
```
