/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Button,
  Flex,
  Input,
  Label,
  Stepper,
  InputGroup,
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
  const stepOne = React.createElement(
    React.Fragment,
    null,
    React.createElement(Label, { required: true }, 'Name'),
    React.createElement(Input, {
      key: 'name',
      placeholder: 'Enter name',
      onChange: ({ target: { value } }) => {
        setDisableProgress(!value);
      },
    }),
    React.createElement(Label, null, 'Occupation'),
    React.createElement(Input, {
      key: 'occupation',
      placeholder: 'Enter occupation',
    }),
  );
  const stepTwo = React.createElement(
    InputGroup,
    {
      key: 'color',
      label: 'Choose your favorite color',
      required: true,
      onChange: ({ target: { value } }) => {
        setDisableProgress(!value);
      },
    },
    React.createElement(Radio, { name: 'color', value: 'Red', label: 'Red' }),
    React.createElement(Radio, {
      name: 'color',
      value: 'Orange',
      label: 'Orange',
    }),
    React.createElement(Radio, {
      name: 'color',
      value: 'Yellow',
      label: 'Yellow',
    }),
    React.createElement(Radio, {
      name: 'color',
      value: 'Green',
      label: 'Green',
    }),
    React.createElement(Radio, { name: 'color', value: 'Blue', label: 'Blue' }),
    React.createElement(Radio, {
      name: 'color',
      value: 'Purple',
      label: 'Purple',
    }),
  );
  const stepThree = React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Label,
      { required: true },
      'Why is this your favorite color',
    ),
    React.createElement(Input, {
      key: 'explanation',
      placeholder: 'Enter text here...',
      onChange: ({ target: { value } }) => {
        setDisableProgress(!value);
      },
    }),
  );
  const steps = [stepOne, stepTwo, stepThree];
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Flex,
      {
        flexDirection: 'column',
        gap: 'm',
        style: { minWidth: 'min(100%, 400px)' },
      },
      React.createElement(Flex, { as: 'h2' }, 'Color survey'),
      React.createElement(
        Flex.Item,
        { alignSelf: 'stretch' },
        React.createElement(Stepper, {
          currentStep: currentStep,
          steps: stepLabels,
          onStepClick: (index) => {
            setDisableProgress(true);
            setCurrentStep(index);
          },
        }),
      ),
      React.createElement(
        Flex.Item,
        { alignSelf: 'flex-start', style: { width: '100%' } },
        steps[currentStep],
      ),
      React.createElement(
        Flex,
        null,
        React.createElement(
          Button,
          {
            disabled: currentStep === 0,
            onClick: () => {
              if (currentStep !== 0) {
                setDisableProgress(true);
                setCurrentStep(currentStep - 1);
              }
            },
          },
          'Back',
        ),
        React.createElement(
          Button,
          {
            styleType: 'cta',
            disabled: disableProgress,
            onClick: () => {
              if (currentStep < steps.length - 1) {
                setDisableProgress(true);
                setCurrentStep(currentStep + 1);
              }
            },
          },
          currentStep === 2 ? 'Register' : 'Next',
        ),
      ),
    ),
  );
};
