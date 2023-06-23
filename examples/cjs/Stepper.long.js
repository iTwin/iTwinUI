/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex, Stepper } from '@itwin/itwinui-react';
const steps = [
  { name: 'First Step' },
  { name: 'Second Step' },
  { name: 'Third Step' },
  { name: 'Fourth Step' },
  { name: 'Fifth Step' },
  { name: 'Sixth Step' },
  { name: 'Last Step' },
];
export default () => {
  const [currentStep, setCurrentStep] = React.useState(2);
  return React.createElement(
    Flex,
    {
      flexDirection: 'column',
      gap: 'm',
      style: { minWidth: 'min(100%, 400px)' },
    },
    React.createElement(
      Flex.Item,
      { alignSelf: 'stretch' },
      React.createElement(Stepper, {
        currentStep: currentStep,
        steps: steps,
        onStepClick: (index) => {
          setCurrentStep(index);
        },
        type: 'long',
      }),
    ),
    React.createElement(
      Flex,
      null,
      React.createElement(
        Button,
        {
          disabled: currentStep === 0,
          onClick: () => {
            if (currentStep !== 0) setCurrentStep(currentStep - 1);
          },
        },
        'Previous',
      ),
      React.createElement(
        Button,
        {
          styleType: 'cta',
          disabled: currentStep === steps.length - 1,
          onClick: () => {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
          },
        },
        'Next',
      ),
    ),
  );
};
