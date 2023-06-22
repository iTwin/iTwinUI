'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var stepLabels = [
  { name: 'User Info' },
  { name: 'Color Selection' },
  { name: 'Explanation' },
];
exports['default'] = function () {
  var _a = React.useState(0),
    currentStep = _a[0],
    setCurrentStep = _a[1];
  var _b = React.useState(true),
    disableProgress = _b[0],
    setDisableProgress = _b[1];
  React.useEffect(
    function () {
      setDisableProgress(true);
    },
    [currentStep],
  );
  var stepOne = (
    <>
      <itwinui_react_1.Label required>Name</itwinui_react_1.Label>
      <itwinui_react_1.Input
        key='name'
        placeholder='Enter name'
        onChange={function (_a) {
          var value = _a.target.value;
          setDisableProgress(!value);
        }}
      />
      <itwinui_react_1.Label>Occupation</itwinui_react_1.Label>
      <itwinui_react_1.Input key='occupation' placeholder='Enter occupation' />
    </>
  );
  var stepTwo = (
    <itwinui_react_1.InputGroup
      key='color'
      label='Choose your favorite color'
      required
      onChange={function (_a) {
        var value = _a.target.value;
        setDisableProgress(!value);
      }}
    >
      <itwinui_react_1.Radio name='color' value='Red' label='Red' />
      <itwinui_react_1.Radio name='color' value='Orange' label='Orange' />
      <itwinui_react_1.Radio name='color' value='Yellow' label='Yellow' />
      <itwinui_react_1.Radio name='color' value='Green' label='Green' />
      <itwinui_react_1.Radio name='color' value='Blue' label='Blue' />
      <itwinui_react_1.Radio name='color' value='Purple' label='Purple' />
    </itwinui_react_1.InputGroup>
  );
  var stepThree = (
    <>
      <itwinui_react_1.Label required>
        Why is this your favorite color
      </itwinui_react_1.Label>
      <itwinui_react_1.Input
        key='explanation'
        placeholder='Enter text here...'
        onChange={function (_a) {
          var value = _a.target.value;
          setDisableProgress(!value);
        }}
      />
    </>
  );
  var steps = [stepOne, stepTwo, stepThree];
  return (
    <>
      <itwinui_react_1.Flex
        flexDirection='column'
        gap='m'
        style={{ minWidth: 'min(100%, 400px)' }}
      >
        <itwinui_react_1.Flex as='h2'>Color survey</itwinui_react_1.Flex>
        <itwinui_react_1.Flex.Item alignSelf='stretch'>
          <itwinui_react_1.Stepper
            currentStep={currentStep}
            steps={stepLabels}
            onStepClick={function (index) {
              setDisableProgress(true);
              setCurrentStep(index);
            }}
          />
        </itwinui_react_1.Flex.Item>
        <itwinui_react_1.Flex.Item
          alignSelf='flex-start'
          style={{ width: '100%' }}
        >
          {steps[currentStep]}
        </itwinui_react_1.Flex.Item>
        <itwinui_react_1.Flex>
          <itwinui_react_1.Button
            disabled={currentStep === 0}
            onClick={function () {
              if (currentStep !== 0) {
                setDisableProgress(true);
                setCurrentStep(currentStep - 1);
              }
            }}
          >
            Back
          </itwinui_react_1.Button>
          <itwinui_react_1.Button
            styleType='cta'
            disabled={disableProgress}
            onClick={function () {
              if (currentStep < steps.length - 1) {
                setDisableProgress(true);
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === 2 ? 'Register' : 'Next'}
          </itwinui_react_1.Button>
        </itwinui_react_1.Flex>
      </itwinui_react_1.Flex>
    </>
  );
};
