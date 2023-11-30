/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';
import Select from './Select.js';
import ComboBox from '../ComboBox/ComboBox.js';

beforeEach(() => {
  jest.clearAllMocks();
});

it.each(['Select', 'ComboBox'] as Array<'Select' | 'ComboBox'>)(
  'should show the overflow tag with the proper count when only one long tag is selected in %s (multiple=true)',
  (component) => {
    // Setting available width < required width to force overflow even when there is only one selected option.
    const requiredWidthSpy = jest
      .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
      .mockReturnValueOnce(350)
      .mockReturnValue(300);
    const availableWidthSpy = jest
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(100);

    const props = {
      options: [
        {
          label:
            'This is a super long tag that will be longer than the width of the SelectTagContainer',
          value: 1,
        },
        ...[...new Array(9)].map((_, index) => ({
          label: `Test${index}`,
          value: index + 2,
        })),
      ],
      value: [1],
      multiple: true,
    };

    const { container } = render(
      component === 'Select' ? (
        <Select {...props} />
      ) : (
        <ComboBox<number> {...props} multiple />
      ),
    );

    const select = container.querySelector(
      '.iui-input-with-icon',
    ) as HTMLElement;
    expect(select).toBeTruthy();

    const tagContainer = select.querySelector('.iui-select-tag-container');
    expect(tagContainer?.childNodes.length).toBe(1);
    expect(tagContainer?.childNodes[0]).toHaveTextContent('+1 item(s)');

    availableWidthSpy.mockRestore();
    requiredWidthSpy.mockRestore();
  },
);
