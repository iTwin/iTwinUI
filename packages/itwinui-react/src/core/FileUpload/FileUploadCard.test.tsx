/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SvgDocument, SvgUpload, SvgCheckmark } from '../utils';
import { FileUploadCard, FileUploadCardProps } from './FileUploadCard';
import { Button } from '../Buttons';

const CustomFileUploadCard = (props: FileUploadCardProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>(
    new Array<File>(
      new File(['mock-file'], 'test.txt', { type: 'text/plain' }),
    ),
  );

  return (
    <FileUploadCard
      files={files}
      onFilesChange={(files) => setFiles(files)}
      {...props}
    >
      <FileUploadCard.Icon>
        <SvgCheckmark />
      </FileUploadCard.Icon>
      <FileUploadCard.Text>
        <FileUploadCard.Label>TestLabel</FileUploadCard.Label>
        <FileUploadCard.Description>TestDescription</FileUploadCard.Description>
      </FileUploadCard.Text>
      <FileUploadCard.Action>
        <Button
          onClick={() => {
            setFiles([]);
          }}
        >
          Clear
        </Button>
        <FileUploadCard.Input ref={inputRef} />
      </FileUploadCard.Action>
    </FileUploadCard>
  );
};

it('should render empty FileUploadCard before a file is uploaded', () => {
  const { container } = render(<FileUploadCard />);

  const { container: uploadIcon } = render(
    <SvgUpload aria-hidden className='iui-icon' />,
  );
  const svg = container.querySelector('.iui-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(uploadIcon.firstChild);

  const anchor = container.querySelector('.iui-anchor') as HTMLElement;
  expect(anchor).toBeTruthy();
  expect(anchor.textContent).toEqual('Choose a file');

  const description = container.querySelector(
    '.iui-template-text div',
  ) as HTMLElement;
  expect(description).toBeTruthy();
  expect(description.textContent).toEqual('or drag & drop it here.');
});

it('should render FileUploadCard after a file is uploaded', () => {
  const files = new Array<File>(
    new File(['mock-file'], 'test.txt', { type: 'text/plain' }),
  );

  const { container } = render(<FileUploadCard files={files} />);

  const { container: documentIcon } = render(
    <SvgDocument aria-hidden className='iui-icon' />,
  );
  const svg = container.querySelector('.iui-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(documentIcon.firstChild);

  const label = container.querySelector('.iui-file-card-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('test.txt');

  const description = container.querySelector(
    '.iui-file-card-description',
  ) as HTMLElement;
  expect(description).toBeTruthy();

  const action = container.querySelector(
    '.iui-file-card-action',
  ) as HTMLElement;
  expect(action).toBeTruthy();
  expect(action.textContent).toEqual('Replace');
});

it.only('should render FileUploadCard with custom props', () => {
  const { container } = render(<CustomFileUploadCard />);

  const { container: checkmarkIcon } = render(
    <SvgCheckmark aria-hidden className='iui-icon' />,
  );

  const { container: uploadIcon } = render(
    <SvgUpload aria-hidden className='iui-icon' />,
  );

  let svg = container.querySelector('.iui-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(checkmarkIcon.firstChild);

  const label = container.querySelector('.iui-file-card-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('TestLabel');

  let description = container.querySelector(
    '.iui-file-card-description',
  ) as HTMLElement;
  expect(description).toBeTruthy();
  expect(description.textContent).toEqual('TestDescription');

  const action = container.querySelector(
    '.iui-file-card-action',
  ) as HTMLElement;
  expect(action).toBeTruthy();
  expect(action.textContent).toEqual('Clear');

  // Firing this event should close the file card and return an empty FileUploadCard
  fireEvent.click(action);

  svg = container.querySelector('.iui-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(uploadIcon.firstChild);

  const anchor = container.querySelector('.iui-anchor') as HTMLElement;
  expect(anchor).toBeTruthy();
  expect(anchor.textContent).toEqual('Choose a file');

  description = container.querySelector(
    '.iui-template-text div',
  ) as HTMLElement;
  expect(description).toBeTruthy();
  expect(description.textContent).toEqual('or drag & drop it here.');
});
