---
'@itwin/itwinui-react': minor
---

- Removed iui-slider-rail element and corresponding railProps. 
- Slider container now uses data-iui-orientation and data-iui-disabled attributes for orientation and disabling the track respectively. 
- Thumb uses this style = --iui-slider-thumb-position: ${lowPercent}% insted of style = ? { insetInlineStart: `${lowPercent}%` } : { insetBlockEnd: `${lowPercent}%` })}.
- Fixed Slider with CustomTickNoToolTip inside storybook by controlling the state.
