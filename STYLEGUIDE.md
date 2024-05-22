## Style guide

### Import only the React namespace and use members from there instead of separate imports

```jsx
// Good: namespace import
import * as React from 'react';
```

```jsx
// Bad: named import
import { useState } from 'react';
```

```jsx
// Bad: default import
import React from 'react';
```

### Use type instead of interface

```jsx
// Good
export type AlertProps = { ... };
```

```jsx
// Bad
export interface IAlertProps {}
```

### Add JSDocs to all props

```jsx
// Good
export type AlertProps = {
  /**
   * Type of the alert.
   * @default 'informational'
   */
  type?: 'positive' | 'warning' | 'negative' | 'informational';
  ...
```

```jsx
// Bad (no comment)
export type AlertProps = {
  type?: 'positive' | 'warning' | 'negative' | 'informational';
  ...
```

### Add description and example how to use the component

```jsx
// Good

/**
 * A small box to quickly grab user attention and communicate a brief message.
 * @example
 * <Alert>This is a basic alert.</Alert>
 */
export const Alert = (props: AlertProps) => {
  ...
```

```jsx
// Bad (no comments)

export const Alert = (props: AlertProps) => {
  ...
```

```jsx
// Bad (no example)

/**
 * A small box to quickly grab user attention and communicate a brief message.
 */
export const Alert = (props: AlertProps) => {
  ...
```

### Destruct props and set default values

```jsx
// Good
export const Alert = (props: AlertProps) => {
  const {
    children,
    className,
    type = 'informational',
    clickableText,
    onClick,
    onClose,
    style,
    isSticky = false,
  } = props;
  ...
```

```jsx
// Bad
export const Alert = ({
    children,
    className,
    type = 'informational',
    clickableText,
    onClick,
    onClose,
    style,
    isSticky = false,
  }: AlertProps) => {
  ...
```

### Use classnames object syntax for conditional classes

```jsx
// Good
<Button
  className={cx(
    'iui-button',
    { 'iui-invisible': styleType === 'borderless' },
    className,
  )}
  ...
```

```jsx
// Bad (using short circuiting)
<Button
  className={cx(
    'iui-button',
    styleType === 'borderless' && 'iui-invisible',
    className,
  )}
  ...
```

### Use `getDocument`, `getWindow` instead of direct access

```jsx
// Good
getWindow()?.clearTimeout(1);
```

```jsx
// Good
getDocument()?.createElement('div');
```

```jsx
// Bad
window.clearTimeout(1);
```

```jsx
// Bad
document.createElement('div');
```

### Import `useLayoutEffect` (SSR-safe) from `utils` instead of using `React.useLayoutEffect` (client only)

```jsx
// Good
import { useLayoutEffect } from '../../utils/index.js';

useLayoutEffect(() => {});
```

```jsx
// Bad
React.useLayoutEffect(() => {});
```
