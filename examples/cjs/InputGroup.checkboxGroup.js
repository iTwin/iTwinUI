/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGroup, Checkbox } from '@itwin/itwinui-react';
export default () => {
  const option1Label = 'Football';
  const option2Label = 'Hockey';
  const [option1, setOption1] = React.useState(true);
  const [option2, setOption2] = React.useState(false);
  const [allOptions, setAllOptions] = React.useState(false);
  const [isIndeterminate, setIsIndeterminate] = React.useState(true);
  React.useEffect(() => {
    if (option1 && option2) {
      setAllOptions(true);
      setIsIndeterminate(false);
      return;
    }
    if (option1 || option2) {
      setAllOptions(false);
      setIsIndeterminate(true);
    } else {
      setAllOptions(false);
      setIsIndeterminate(false);
    }
  }, [option1, option2]);
  const onAllChange = (value) => {
    setAllOptions(value);
    setIsIndeterminate(false);
    setOption1(value);
    setOption2(value);
  };
  return React.createElement(
    InputGroup,
    { label: 'Select your hobbies', message: 'Choose some hobbies' },
    React.createElement(Checkbox, {
      onChange: (event) => onAllChange(event.target.checked),
      label: 'Select all',
      indeterminate: isIndeterminate,
      checked: allOptions,
    }),
    React.createElement(Checkbox, {
      onChange: (event) => setOption1(event.target.checked),
      label: option1Label,
      checked: option1,
    }),
    React.createElement(Checkbox, {
      onChange: (event) => setOption2(event.target.checked),
      label: option2Label,
      checked: option2,
    }),
  );
};
