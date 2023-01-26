/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FileUploadTemplate } from './FileUploadTemplate';
import { SvgDocument, SvgUpload } from '../utils';

it('should render FileUploadTemplate', () => {
  const mockedOnChange = jest.fn();
  const { container } = render(
    <FileUploadTemplate onChange={mockedOnChange} />,
  );

  const input = container.querySelector(
    '.iui-browse-input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input);
  expect(mockedOnChange).toBeCalled();

  const label = container.querySelector(
    '.iui-template-text > .iui-anchor',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('Choose a file');

  const secondary = container.querySelector(
    '.iui-template-text > div',
  ) as HTMLElement;
  expect(secondary).toBeTruthy();
  expect(secondary.textContent).toEqual('or drag & drop it here.');

  const { container: uploadIcon } = render(
    <SvgUpload aria-hidden className='iui-icon' />,
  );
  const svg = container.querySelector('.iui-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(uploadIcon.firstChild);
});

it('should accept input props', () => {
  const { container } = render(
    <FileUploadTemplate
      onChange={jest.fn}
      acceptMultiple={false}
      acceptType='.txt, .png'
    />,
  );

  const input = container.querySelector(
    '.iui-browse-input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  expect(input.multiple).toBeFalsy();
  expect(input.accept).toEqual('.txt, .png');
});

it('should render FileUploadTemplate after a file is uploaded', () => {
  const mockedOnChange = jest.fn();
  const file = new File(['mock-file'], 'test.txt', { type: 'text/plain' });

  const { container } = render(
    <FileUploadTemplate
      onChange={mockedOnChange}
      acceptMultiple={false}
      data={{ file: file }}
    />,
  );

  const label = container.querySelector(
    '.iui-file-uploaded-template-label',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('test.txt');

  const secondary = container.querySelector(
    '.iui-file-uploaded-template-description',
  ) as HTMLElement;
  expect(secondary).toBeTruthy();

  const { container: documentIcon } = render(
    <SvgDocument aria-hidden className='iui-icon' />,
  );
  const svg = container.querySelector('.iui-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(documentIcon.firstChild);

  const action = container.querySelector(
    '.iui-file-uploaded-template-action',
  ) as HTMLElement;
  expect(action).toBeTruthy();
  expect(action.textContent).toEqual('Choose a file');
});
