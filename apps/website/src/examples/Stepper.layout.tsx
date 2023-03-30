/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex, Input, Label, Stepper, InputGroup, Radio } from '@itwin/itwinui-react';

const stepLabels = [{ name: 'User Info' }, { name: 'Color Selection' }, { name: 'Explanation' }];

export default () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [disableProgress, setDisableProgress] = React.useState(true);

  React.useEffect(() => {
    setDisableProgress(true);
  }, [currentStep]);
  const stepOne = (
    <>
      <Label required>Name</Label>
      <Input
        placeholder='Enter name'
        onChange={({ target: { value } }) => {
          setDisableProgress(!value);
        }}
      />
      <Label htmlFot='occupation'>Occupation</Label>
      <Input id='occupation' placeholder='Enter occupation' />
    </>
  );

  const stepTwo = (
    <InputGroup
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
    <>
      <Label required>Why is this your favorite color</Label>
      <Input
        placeholder='Enter text here...'
        onChange={({ target: { value } }) => {
          setDisableProgress(!value);
        }}
      />
    </>
  );

  const steps = [stepOne, stepTwo, stepThree];

  return (
    <>
      <Flex flexDirection='column' gap='m' style={{ minWidth: 'min(100%, 400px)' }}>
        <Flex as='h2'>Color survey</Flex>
        <Flex.Item alignSelf='stretch'>
          <Stepper
            currentStep={currentStep}
            steps={stepLabels}
            onStepClick={(index: number) => {
              setDisableProgress(true);
              setCurrentStep(index);
            }}
          />
        </Flex.Item>
        <Flex.Item alignSelf='flex-start' style={{ width: '100%' }}>
          {steps[currentStep]}
        </Flex.Item>
        <Flex>
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
        </Flex>
      </Flex>
    </>
  );
};
