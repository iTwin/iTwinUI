/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgSmileyHappy from '@itwin/itwinui-icons-react/cjs/icons/SmileyHappy';
import SvgSmileySad from '@itwin/itwinui-icons-react/cjs/icons/SmileySad';
import { useState, useEffect } from 'react';
import {
  Checkbox,
  InputGroup,
  Radio,
  ToggleSwitch,
} from '@itwin/itwinui-react';

export default {
  title: 'InputGroup',
};

export const RadioGroup = () => {
  const option1Label = <SvgSmileyHappy />;
  const option2Label = <SvgSmileySad />;
  return (
    <>
      <InputGroup label='Radio group' message='Tell me how happy you are'>
        <Radio
          name='choice'
          value='option1'
          onChange={() => console.log('Clicked option 1!')}
          label={option1Label}
        />
        <Radio
          name='choice'
          value='option2'
          onChange={() => console.log('Clicked option 2!')}
          label={option2Label}
        />
      </InputGroup>
    </>
  );
};

export const CheckboxGroup = () => {
  const option1Label = 'Football';
  const option2Label = 'Hockey';
  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);
  const [allOptions, setAllOptions] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(true);

  useEffect(() => {
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

  const onAllChange = (value: boolean) => {
    setAllOptions(value);
    setIsIndeterminate(false);
    setOption1(value);
    setOption2(value);
  };
  return (
    <InputGroup label='Select your hobbies' message='Choose some hobbies'>
      <Checkbox
        onChange={(event) => onAllChange(event.target.checked)}
        label='Select all'
        indeterminate={isIndeterminate}
        checked={allOptions}
      />
      <Checkbox
        onChange={(event) => setOption1(event.target.checked)}
        label={option1Label}
        checked={option1}
      />
      <Checkbox
        onChange={(event) => setOption2(event.target.checked)}
        label={option2Label}
        checked={option2}
      />
    </InputGroup>
  );
};

export const ToggleGroup = () => {
  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);

  return (
    <InputGroup label='Toggle group'>
      <ToggleSwitch
        onChange={(event) => setOption1(event.target.checked)}
        checked={option1}
        label='Toggle feature No.1'
      />
      <ToggleSwitch checked={true} disabled label='This you cannot change' />
      <ToggleSwitch
        onChange={(event) => setOption2(event.target.checked)}
        label='Toggle feature No.2'
        checked={option2}
      />
    </InputGroup>
  );
};
