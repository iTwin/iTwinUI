/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FileUploadTemplate } from './FileUploadTemplate.js';
import { SvgUpload } from '../../utils/index.js';

it('should render FileUploadTemplate', () => {
  const mockedOnChange = vi.fn();
  const { container } = render(
    <FileUploadTemplate onChange={mockedOnChange} />,
  );

  const template = container.querySelector('.iui-file-upload-template');
  expect(template).toBeTruthy();

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
    <SvgUpload aria-hidden className='iui-template-icon' />,
  );
  const svg = container.querySelector('.iui-template-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(uploadIcon.firstChild);
});

it('should accept input props', () => {
  const { container } = render(
    <FileUploadTemplate
      onChange={vi.fn}
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
