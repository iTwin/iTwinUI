/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex, Stepper } from '@itwin/itwinui-react';

const steps = [
  { name: 'Completed Step', description: 'Completed Tooltip' },
  { name: 'Current Step', description: 'Current Tooltip' },
  { name: 'Next Step', description: 'Next Tooltip' },
  { name: 'Last Step', description: 'Last Tooltip' },
];

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
