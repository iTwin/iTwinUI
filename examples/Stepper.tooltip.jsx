/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex, Stepper } from '@itwin/itwinui-react';

const steps = [
  { name: 'Completed step', description: 'Completed tooltip' },
  { name: 'Current step', description: 'Current tooltip' },
  { name: 'Next step', description: 'Next tooltip' },
  { name: 'Last step', description: 'Last tooltip' },
];

export default () => {
  const [currentStep, setCurrentStep] = React.useState(1);

  return (
    <Flex flexDirection='column' gap='m' className='demo-container'>
      <Flex.Item alignSelf='stretch'>
        <Stepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={(index) => {
            setCurrentStep(index);
          }}
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
