/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex, Stepper, StepperLocalization } from '@itwin/itwinui-react';

const steps = [
  { name: 'First Step' },
  { name: 'Second Step' },
  { name: 'Third Step' },
  { name: 'Fourth Step' },
  { name: 'Fifth Step' },
  { name: 'Sixth Step' },
  { name: 'Last Step' },
];

const localization: StepperLocalization = {
  stepsCountLabel: (currentStep, totalSteps) => `Localized step ${currentStep} of ${totalSteps}:`,
};

export default () => {
  const [currentStep, setCurrentStep] = React.useState(2);

  return (
    <Flex flexDirection='column' gap='m' style={{ minWidth: 'min(100%, 400px)' }}>
      <Flex.Item alignSelf='stretch'>
        <Stepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={(index: number) => {
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
