---
'@itwin/itwinui-react': minor
---

Removed dependency on `react-transition-group`. Notable changes in components: 
* `useToaster`: Animations have been reworked to directly use the web animations API.
* `Dialog` and `Modal`: Exit animations have been temporarily removed.
