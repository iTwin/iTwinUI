/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { InputGrid } from './InputGrid.js';
import { StatusMessage } from '../StatusMessage/StatusMessage.js';
import { Label } from '../Label/Label.js';
import { Input } from '../Input/Input.js';
import { ComboBox } from '../ComboBox/ComboBox.js';
import { InputWithDecorations } from '../InputWithDecorations/InputWithDecorations.js';
import { Textarea } from '../Textarea/Textarea.js';
import { Select } from '../Select/Select.js';

const assertBaseElement = (container: HTMLElement) => {
  const inputContainer = container.querySelector('.iui-input-grid');
  expect(inputContainer).toBeTruthy();
  return inputContainer;
};

it('should render correctly in its most basic state', () => {
  const { container } = render(
    <InputGrid>
      <Label>label</Label>
      <input />
      <StatusMessage>message</StatusMessage>
    </InputGrid>,
  );
  assertBaseElement(container);
});

it('should render correctly with inline label', () => {
  const { container } = render(
    <InputGrid labelPlacement='inline'>
      <Label>label</Label>
      <input />
      <StatusMessage>message</StatusMessage>
    </InputGrid>,
  );
  assertBaseElement(container);
  const inputContainer = container.querySelector('.iui-input-grid');
  expect(inputContainer).toHaveAttribute('data-iui-label-placement', 'inline');
});

it('should take class and style', () => {
  const { container } = render(
    <InputGrid className='my-class' style={{ width: 50 }}>
      <Label>label</Label>
      <input />
      <StatusMessage>message</StatusMessage>
    </InputGrid>,
  );
  assertBaseElement(container);
  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  expect(inputContainer).toHaveClass('iui-input-grid my-class');
  expect(inputContainer.style.width).toBe('50px');
});

describe.each([false, true])('should associate label and message', (hasIds) => {
  it.each`
    Component                     | name
    ${Input}                      | ${'Input'}
    ${Textarea}                   | ${'Textarea'}
    ${InputWithDecorations.Input} | ${'InputWithDecorations.Input'}
    ${'input'}                    | ${'input'}
    ${'textarea'}                 | ${'textarea'}
    ${'select'}                   | ${'select'}
  `(`with $name ${hasIds ? '(has user ids)' : ''}`, ({ Component }) => {
    const { container } = render(
      <InputGrid>
        <Label id={hasIds ? 'id1' : undefined}>The label</Label>
        {Component === InputWithDecorations.Input ? (
          <InputWithDecorations>
            <Component id={hasIds ? 'id2' : undefined} />
          </InputWithDecorations>
        ) : (
          <Component id={hasIds ? 'id2' : undefined} />
        )}
        <StatusMessage id={hasIds ? 'id3' : undefined}>
          The message
        </StatusMessage>
      </InputGrid>,
    );

    const input = container.querySelector(
      'input, textarea, select',
    ) as HTMLElement;
    expect(input).toHaveAccessibleName('The label');
    expect(input).toHaveAccessibleDescription('The message');
  });

  it.each`
    Component   | name
    ${ComboBox} | ${'ComboBox'}
    ${Select}   | ${'Select'}
  `(`with $name ${hasIds ? '(has user ids)' : ''}`, ({ Component }) => {
    const { container } = render(
      <InputGrid>
        <Label id={hasIds ? 'id1' : undefined}>The label</Label>
        <Component id={hasIds ? 'id2' : undefined} options={[]} />
        <StatusMessage id={hasIds ? 'id3' : undefined}>
          The message
        </StatusMessage>
      </InputGrid>,
    );

    const combobox = container.querySelector('[role=combobox]') as HTMLElement;
    expect(combobox).toHaveAccessibleName('The label');
    expect(combobox).toHaveAccessibleDescription('The message');
  });
});
