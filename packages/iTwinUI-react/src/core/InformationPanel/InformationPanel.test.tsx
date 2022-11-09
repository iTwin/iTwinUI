/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';

import { InformationPanel } from './InformationPanel';
import { InformationPanelWrapper } from './InformationPanelWrapper';
import { InformationPanelHeader } from './InformationPanelHeader';
import { InformationPanelBody } from './InformationPanelBody';
import { SvgCloseSmall, SvgMore } from '../utils';
import { IconButton } from '../Buttons';

const getBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
HTMLElement.prototype.getBoundingClientRect = () => {
  return {
    width: 400,
    height: 500,
    bottom: 1000,
    right: 1000,
  } as DOMRect;
};

afterAll(() => {
  HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;
});

it('should render in a basic state', () => {
  const { container } = render(
    <InformationPanel>
      <InformationPanelHeader>InfoPanel label</InformationPanelHeader>
      <InformationPanelBody>
        <span className='demo-content'>InfoPanel content</span>
      </InformationPanelBody>
    </InformationPanel>,
  );

  const infoPanel = container.querySelector(
    '.iui-information-panel.iui-right',
  ) as HTMLElement;
  expect(infoPanel).toBeTruthy();

  expect(
    infoPanel.querySelector('.iui-information-header-label'),
  ).toHaveTextContent('InfoPanel label');
  expect(
    infoPanel.querySelector('.iui-information-body > .demo-content'),
  ).toHaveTextContent('InfoPanel content');

  expect(
    infoPanel.querySelector('.iui-resizer > .iui-resizer-bar'),
  ).toBeTruthy();

  expect(
    infoPanel.querySelector(
      '.iui-information-header-actions > .iui-button[aria-label="Close"]',
    ),
  ).toBeFalsy();
});

it('should be visible when isOpen is set', () => {
  const { container } = render(<InformationPanel isOpen />);
  expect(container.querySelector('.iui-information-panel')).toHaveClass(
    'iui-visible',
  );
});

it('should accept horizontal orientation', () => {
  const { container } = render(<InformationPanel orientation='horizontal' />);
  expect(container.querySelector('.iui-information-panel')).toHaveClass(
    'iui-bottom',
  );
});

it('should allow turning off resizer', () => {
  const { container } = render(<InformationPanel resizable={false} />);
  expect(
    container.querySelector('.iui-information-panel .iui-resizer'),
  ).toBeFalsy();
});

it('should render close icon correctly', () => {
  const mockOnClose = jest.fn();
  const { container } = render(
    <InformationPanel>
      <InformationPanelHeader onClose={mockOnClose} />
    </InformationPanel>,
  );

  const infoPanel = container.querySelector(
    '.iui-information-panel',
  ) as HTMLElement;

  const {
    container: { firstChild: closeSvg },
  } = render(<SvgCloseSmall aria-hidden />);

  const closeButton = infoPanel.querySelector(
    '.iui-information-header > .iui-information-header-actions > .iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  const closeButtonIcon = closeButton.firstElementChild;
  const closeButtonIconSvg = closeButtonIcon?.firstElementChild;

  expect(closeButton).toHaveAttribute('aria-label', 'Close');
  expect(closeButtonIcon).toHaveClass('iui-button-icon');
  expect(closeButtonIcon).toHaveAttribute('aria-hidden', 'true');
  expect(closeButtonIconSvg).toEqual(closeSvg);

  expect(mockOnClose).not.toHaveBeenCalled();
  closeButton.click();
  expect(mockOnClose).toHaveBeenCalled();
});

it('should render custom header actions', () => {
  const {
    container: { firstChild: editButton },
  } = render(
    <IconButton styleType='borderless'>
      <SvgMore />
    </IconButton>,
  );
  const { container } = render(
    <InformationPanel>
      <InformationPanelHeader
        onClose={jest.fn()}
        actions={
          <IconButton styleType='borderless'>
            <SvgMore />
          </IconButton>
        }
      />
    </InformationPanel>,
  );

  const actions = container.querySelector(
    '.iui-information-header-actions',
  ) as HTMLElement;
  expect(actions.children).toHaveLength(2);
  expect(actions.firstElementChild).toEqual(editButton);
});

it('should handle resizing', () => {
  const { container } = render(<InformationPanel />);

  const infoPanel = container.querySelector(
    '.iui-information-panel',
  ) as HTMLElement;
  expect(infoPanel).not.toHaveAttribute('style');

  const resizer = infoPanel.querySelector('.iui-resizer') as HTMLElement;

  act(() => {
    fireEvent.pointerDown(resizer, { button: 0 });
    fireEvent.pointerMove(document, { clientX: 500 });
  });

  expect(infoPanel).toHaveStyle('width: 500px'); // 1000 - 500

  act(() => {
    fireEvent.pointerMove(document, { clientX: 400 });
  });
  expect(infoPanel).toHaveStyle('width: 600px'); // 1000 - 400

  act(() => {
    fireEvent.pointerMove(document, { clientX: 800 });
    fireEvent.pointerUp(document);
  });
  expect(infoPanel).toHaveStyle('width: 200px'); // 1000 - 800
});

it('should accept className and style props', () => {
  const { container } = render(
    <InformationPanel className='test-class' style={{ width: 400 }} />,
  );

  const infoPanel = container.querySelector(
    '.iui-information-panel',
  ) as HTMLElement;
  expect(infoPanel).toHaveClass('test-class');
  expect(infoPanel).toHaveStyle('width: 400px');
});

it('should render with wrapper', () => {
  const { container } = render(
    <InformationPanelWrapper className='test-class'>
      <InformationPanel />
    </InformationPanelWrapper>,
  );
  const wrapper = container.querySelector(
    '.iui-information-panel-wrapper',
  ) as HTMLElement;
  expect(wrapper).toBeTruthy();
  expect(wrapper).toHaveClass('test-class');
  expect(wrapper.querySelector('.iui-information-panel')).toBeTruthy();
});
