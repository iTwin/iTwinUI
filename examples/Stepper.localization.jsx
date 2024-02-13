/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex, Stepper } from '@itwin/itwinui-react';
import './Stepper.localization.css';

const steps = [
  { name: 'First Step' },
  { name: 'Second Step' },
  { name: 'Third Step' },
  { name: 'Fourth Step' },
  { name: 'Fifth Step' },
  { name: 'Sixth Step' },
  { name: 'Last Step' },
];

const localization = {
  stepsCountLabel: (currentStep, totalSteps) =>
    `Localized step ${currentStep} of ${totalSteps}:`,
};

export default () => {
  const [currentStep, setCurrentStep] = React.useState(2);

  return (
    <Flex flexDirection='column' gap='m' className='localization-stepper-flex'>
      <Flex.Item alignSelf='stretch'>
        <Stepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={(index) => {
            setCurrentStep(index);
          }}
          type='long'
          localization={localization}
        />
      </Flex.Item>

      <Flex>
        <Button
          disabled={currentStep === 0}
          onClick={() => {
            if (currentStep !== 0) setCurrentStep(currentStep - 1);
          }}
        >
          Previous
        </Button>
        <Button
          styleType='cta'
          disabled={currentStep === steps.length - 1}
          onClick={() => {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
          }}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};
