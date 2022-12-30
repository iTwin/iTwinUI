/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Stepper } from '@itwin/itwinui-react';

export default () => {
  const [currentStep, setCurrentStep] = React.useState(2);
  const steps = [
    { name: 'First Step' },
    { name: 'Completed Step' },
    { name: 'Current Step' },
    { name: 'Next Step' },
    { name: 'Last Step' },
  ];

  const onStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const previousStepHandler = () => {
    if (currentStep !== 0) setCurrentStep(currentStep - 1);
  };
  const nextStepHandler = () => {
    if (currentStep !== steps.length) setCurrentStep(currentStep + 1);
  };

  return (
    <div style={{ width: '90%' }}>
      <Stepper currentStep={currentStep} steps={steps} onStepClick={onStepClick} />
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
        <Button size='small' onClick={previousStepHandler}>
          Previous
        </Button>
        <Button styleType='cta' size='small' onClick={nextStepHandler}>
          Next
        </Button>
      </div>
    </div>
  );
};
