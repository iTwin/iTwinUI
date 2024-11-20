/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { Panels } from './Panels.js';
import { Button } from '../Buttons/Button.js';

it('should render in its most basic state', () => {
  const panelIdRoot = 'root';
  const panelIdMoreInfo = 'more-info';

  const { container } = render(
    <Panels.Wrapper>
      <Panels.Panel id={panelIdRoot}>
        <Panels.Header>Base</Panels.Header>
        <Panels.Trigger for={panelIdMoreInfo}>
          <Button>More details</Button>
        </Panels.Trigger>
      </Panels.Panel>

      <Panels.Panel id={panelIdMoreInfo}>
        <Panels.Header>More details</Panels.Header>
        Content
      </Panels.Panel>
    </Panels.Wrapper>,
  );

  expect(container.querySelector('.iui-panel-wrapper')).toBeTruthy();
  expect(
    container.querySelector('.iui-panel-wrapper > .iui-panel#root'),
  ).toBeTruthy();
  expect(
    container.querySelector('.iui-panel-wrapper > .iui-panel#more-info'),
  ).toBeFalsy();
});
