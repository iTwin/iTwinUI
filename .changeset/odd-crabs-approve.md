---
'@itwin/itwinui-react': major
---

Alert composition has been updated such that it is now made up of customizable subcomponents

```jsx
  <Alert>
    <Alert.Message>This is an alert.</Alert.Message>
  </Alert>
```

```jsx
  <Alert type='positive'>
    <Alert.Icon>
      <SvgSmileyHappy />
    </Alert.Icon>
    <Alert.Message>
      This is a positive message.
      <Alert.ClickableText onClick={() => action('Clicked more info!')}>
        More Info.
      </Alert.ClickableText>
    </Alert.Message>
    <Alert.CloseButton onClose={action('Close!')}>
      <Alert.CloseButtonIcon>
        <SvgCollapse />
      </Alert.CloseButtonIcon>
    </Alert.CloseButton>
  </Alert>
```
