/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Stepper, type StepperLocalization } from '@itwin/itwinui-react';
import { SvgCheckmarkSmall } from '@itwin/itwinui-icons-react';

export default {
  title: 'Stepper',
};

export const Basic = () => {
  const onStepClick = (index: number) => {
    console.log(`Clicked index: ${index}`);
  };
  return (
    <Stepper
      currentStep={2}
      steps={[
        { name: 'First Step' },
        { name: 'Completed Step' },
        { name: 'Current Step' },
        { name: 'Next Step' },
        { name: 'Last Step' },
      ]}
      onStepClick={onStepClick}
    />
  );
};

export const CustomIcon = () => {
  const onStepClick = (index: number) => {
    console.log(`Clicked index: ${index}`);
  };
  return (
    <Stepper
      currentStep={2}
      steps={[
        { name: 'First Step' },
        { name: 'Completed Step' },
        { name: 'Current Step' },
        { name: 'Next Step' },
        { name: 'Last Step' },
      ]}
      completedStepRenderer={() => <SvgCheckmarkSmall />}
      onStepClick={onStepClick}
    />
  );
};

export const Long = () => {
  const onStepClick = (index: number) => {
    console.log(`Clicked index: ${index}`);
  };
  return (
    <Stepper
      type='long'
      currentStep={2}
      steps={[
        { name: 'First Step' },
        { name: 'Completed Step' },
        { name: 'Current Step' },
        { name: 'Next Step' },
        { name: 'Last Step' },
      ]}
      onStepClick={onStepClick}
    />
  );
};
export const LocalizedLong = () => {
  const currentStep = 2;
  const localization: StepperLocalization = {
    stepsCountLabel: (currentStep, totalSteps) =>
      `Localized step ${currentStep} of ${totalSteps}:`,
  };
  const onStepClick = (index: number) => {
    console.log(`Clicked index: ${index}`);
  };
  return (
    <Stepper
      type='long'
      currentStep={currentStep}
      steps={[
        { name: 'First Step' },
        { name: 'Completed Step' },
        { name: 'Current Step' },
        { name: 'Next Step' },
        { name: 'Last Step' },
      ]}
      localization={localization}
      onStepClick={onStepClick}
    />
  );
};

export const WithTooltips = () => {
  const onStepClick = (index: number) => {
    console.log(`Clicked index: ${index}`);
  };
  return (
    <Stepper
      currentStep={2}
      steps={[
        { name: 'First Step', description: 'First Step Description' },
        { name: 'Completed Step', description: 'Completed Step Description' },
        { name: 'Current Step', description: 'Current Step Description' },
        { name: 'Next Step', description: 'Next Step Description' },
        { name: 'Last Step', description: 'Last Step Description' },
      ]}
      onStepClick={onStepClick}
    />
  );
};
