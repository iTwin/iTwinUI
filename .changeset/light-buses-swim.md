---
'@itwin/itwinui-react': major
---

- Added `InputGrid` component to position label, user choice input and message.
- Added `InputWithDecorations` component. Users can add any icon or borderless button to the input for seamless look.
- `LabeledInput`: 
    - updated to use new InputGrid and InputWithDecorations; 
    - removed `inputStyle` and `inputClassName` props; style and className props are being passed down to input;
    - added `wrapperProps`, `labelProps`, `messageProps`, `messageIconProps`, `inputWrapperProps` to pass props to subcomponents;
- `LabeledSelect`:
    - updated to use new InputGrid and InputWithDecorations; 
    - removed `selectStyle` and `selectClassName` props; style and className props are being passed down to select;
    - added `wrapperProps`, `labelProps`, `messageProps`, `messageIconProps` to pass props to subcomponents;
- `LabeledTextarea`:
    - updated to use new InputGrid and InputWithDecorations; 
    - removed `textareaStyle` and `textareaClassName` props; style and className props are being passed down to textarea;
    - added `wrapperProps`, `labelProps`, `messageProps`, `messageIconProps` to pass props to subcomponents;
- `Input`, `Select`, `Textarea` has status prop;
- Added 'padded' prop `Icon` to allow setting default padding;
