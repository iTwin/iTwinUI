import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../Buttons';

import { ModalButtonBar } from './ModalButtonBar';

it('should render in its most basic state', () => {
  const { container } = render(
    <ModalButtonBar>
      <Button>TestBtn1</Button>
      <Button>TestBtn2</Button>
    </ModalButtonBar>,
  );
  expect(container.querySelector('.iui-modal-button-bar')).toBeTruthy();
  screen.getByText('TestBtn1');
  screen.getByText('TestBtn2');
});
