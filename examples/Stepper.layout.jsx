/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Button,
  Input,
  Label,
  Stepper,
  InputGroup,
  InputGrid,
  Radio,
} from '@itwin/itwinui-react';

const stepLabels = [
  { name: 'User Info' },
  { name: 'Color Selection' },
  { name: 'Explanation' },
];

export default () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [disableProgress, setDisableProgress] = React.useState(true);

  React.useEffect(() => {
    setDisableProgress(true);
  }, [currentStep]);
  const stepOne = (
    <InputGrid>
      <Label required>Name</Label>
      <Input
        key='name'
        placeholder='Enter name'
        onChange={({ target: { value } }) => {
          setDisableProgress(!value);
        }}
      />
      <Label>Occupation</Label>
      <Input key='occupation' placeholder='Enter occupation' />
    </InputGrid>
  );

  const stepTwo = (
    <InputGroup
      key='color'
      label='Choose your favorite color'
      required
      onChange={({ target: { value } }) => {
        setDisableProgress(!value);
      }}
    >
      <Radio name='color' value='Red' label='Red' />
      <Radio name='color' value='Orange' label='Orange' />
      <Radio name='color' value='Yellow' label='Yellow' />
      <Radio name='color' value='Green' label='Green' />
      <Radio name='color' value='Blue' label='Blue' />
      <Radio name='color' value='Purple' label='Purple' />
    </InputGroup>
  );

  const stepThree = (
    <InputGrid>
      <Label required>Why is this your favorite color</Label>
      <Input
        key='explanation'
        placeholder='Enter text here...'
        onChange={({ target: { value } }) => {
          setDisableProgress(!value);
        }}
      />
    </InputGrid>
  );

  const steps = [stepOne, stepTwo, stepThree];

  return (
    <>
      <div className='demo-container'>
        <h2 className='demo-header'>Color survey</h2>
        <div className='demo-stepper'>
          <Stepper
            currentStep={currentStep}
            steps={stepLabels}
            onStepClick={(index) => {
              setDisableProgress(true);
              setCurrentStep(index);
            }}
          />
        </div>
        <div className='demo-current-step'>{steps[currentStep]}</div>
        <div className='demo-button-container'>
          <Button
            disabled={currentStep === 0}
            onClick={() => {
              if (currentStep !== 0) {
                setDisableProgress(true);
                setCurrentStep(currentStep - 1);
              }
            }}
          >
            Back
          </Button>
          <Button
            styleType='cta'
            disabled={disableProgress}
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setDisableProgress(true);
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === 2 ? 'Register' : 'Next'}
          </Button>
        </div>
      </div>
    </>
  );
};
