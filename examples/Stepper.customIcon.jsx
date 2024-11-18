/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Stepper } from '@itwin/itwinui-react';
import { SvgCheckmarkSmall } from '@itwin/itwinui-icons-react';

const steps = [
  { name: 'First Step' },
  { name: 'Second Step' },
  { name: 'Third Step' },
  { name: 'Last Step' },
];

export default () => {
  const [currentStep, setCurrentStep] = React.useState(2);

  return (
    <div className='demo-container'>
      <div className='demo-stepper'>
        <Stepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={(index) => {
            setCurrentStep(index);
          }}
          stepCircleRenderer={() => <SvgCheckmarkSmall />}
        />
      </div>

      <div className='demo-button-container'>
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
      </div>
    </div>
  );
};
