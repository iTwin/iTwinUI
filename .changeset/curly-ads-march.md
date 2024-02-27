---
"@itwin/itwinui-react": minor
---

Fixed `LabeledSelect` bug where nested `<StatusMessage>`s were rendered when `message={<StatusMessage>}`. As a result, now when `typeof message!=="string"`, `message` is no longer automatically wrapped in `<StatusMessage>`. So you might need to manually wrap your custom `ReactNode` with `<StatusMessage>` for proper styling of `message`.
