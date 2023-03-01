---
'@itwin/itwinui-css': major
---

-The issue was once the user use tab to select the checkbox, there would be a combination of blue and grey border. To resolve the issue is to make the blue border primary and not have the grey border visable. Originally, the css code was in psudo-element ::before. We took it out the psudo-element and add the code to parent with a few tweeks.+Fixe
