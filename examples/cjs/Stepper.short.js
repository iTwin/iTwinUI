'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var steps = [
  { name: 'Previous Step' },
  { name: 'Current Step' },
  { name: 'Next Step' },
];
exports['default'] = function () {
  var _a = React.useState(1),
    currentStep = _a[0],
    setCurrentStep = _a[1];
  return (
    <itwinui_react_1.Flex
      flexDirection='column'
      gap='m'
      style={{ minWidth: 'min(100%, 400px)' }}
    >
      <itwinui_react_1.Flex.Item alignSelf='stretch'>
        <itwinui_react_1.Stepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={function (index) {
            setCurrentStep(index);
          }}
          type='default'
        />
      </itwinui_react_1.Flex.Item>

      <itwinui_react_1.Flex>
        <itwinui_react_1.Button
          disabled={currentStep === 0}
          onClick={function () {
            if (currentStep !== 0) setCurrentStep(currentStep - 1);
          }}
        >
          Previous
        </itwinui_react_1.Button>
        <itwinui_react_1.Button
          styleType='cta'
          disabled={currentStep === steps.length - 1}
          onClick={function () {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
          }}
        >
          Next
        </itwinui_react_1.Button>
      </itwinui_react_1.Flex>
    </itwinui_react_1.Flex>
  );
};
