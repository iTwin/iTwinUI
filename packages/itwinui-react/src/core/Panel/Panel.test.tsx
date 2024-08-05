/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { Panels } from './Panel.js';
import { Button } from '../Buttons/Button.js';
import { SvgStar } from '@itwin/itwinui-icons-react';

it('should render in its most basic state', () => {
  const panelIdRoot = 'root';
  const panelIdMoreInfo = 'more-info';

  const { container } = render(
    <Panels.Wrapper initialActiveId={panelIdRoot}>
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
  ).toBeTruthy();
});

it('should allow custom children in Panels.BackButton', () => {
  const {
    container: { firstChild: starIcon },
  } = render(<SvgStar />);

  const { container } = render(
    <Panels.BackButton>
      <SvgStar />
    </Panels.BackButton>,
  );

  expect(container.querySelector('button svg')).toEqual(starIcon);
});
