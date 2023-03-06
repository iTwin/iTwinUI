/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SvgDocument, SvgUpload, SvgCheckmark, SvgSmileyHappy } from '../utils';
import { FileUploadCard, FileUploadCardProps } from './FileUploadCard';
import { Button } from '../Buttons';
import { FileEmptyCard } from './FileEmptyCard';

const CustomFileUploadCard = (props: FileUploadCardProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>(
    new Array<File>(
      new File(['mock-file'], 'test.txt', { type: 'text/plain' }),
    ),
  );

  const emptyCard = (
    <FileEmptyCard>
      <FileEmptyCard.Icon>
        <SvgSmileyHappy aria-hidden className='iui-icon' />,
      </FileEmptyCard.Icon>
      <FileEmptyCard.Text>
        <FileUploadCard.InputLabel>Custom Title Text</FileUploadCard.InputLabel>
        <div>Custom Description Text</div>
      </FileEmptyCard.Text>
    </FileEmptyCard>
  );

  return (
    <FileUploadCard
      files={files}
      onFilesChange={(files) => setFiles(files)}
      emptyCard={emptyCard}
      input={<FileUploadCard.Input ref={inputRef} id={'testId'} />}
      {...props}
    >
      <FileUploadCard.Icon>
        <SvgCheckmark aria-hidden className='iui-icon' />,
      </FileUploadCard.Icon>
      <FileUploadCard.Info>
        <FileUploadCard.Title>TestLabel</FileUploadCard.Title>
        <FileUploadCard.Description>TestDescription</FileUploadCard.Description>
      </FileUploadCard.Info>
      <FileUploadCard.Action>
        <Button
          onClick={() => {
            setFiles([]);
          }}
        >
          Clear
        </Button>
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
    '.iui-file-card-empty-action div',
  ) as HTMLElement;
  expect(description).toBeTruthy();
  expect(description.textContent).toEqual('to upload.');
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

  const label = container.querySelector('.iui-file-card-title') as HTMLElement;
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

it('should render FileUploadCard with custom props', () => {
  const { container } = render(<CustomFileUploadCard />);

  const { container: checkmarkIcon } = render(
    <SvgCheckmark aria-hidden className='iui-icon' />,
  );

  const { container: smileyIcon } = render(
    <SvgSmileyHappy aria-hidden className='iui-icon' />,
  );

  let svg = container.querySelector('.iui-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(checkmarkIcon.firstChild);

  const label = container.querySelector('.iui-file-card-title') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('TestLabel');

  let description = container.querySelector(
    '.iui-file-card-description',
  ) as HTMLElement;
  expect(description).toBeTruthy();
  expect(description.textContent).toEqual('TestDescription');

  const action = container.querySelector(
    '.iui-file-card-action .iui-button',
  ) as HTMLElement;
  expect(action).toBeTruthy();
  expect(action.textContent).toEqual('Clear');

  // Firing this event should close the file card and return an empty FileUploadCard
  fireEvent.click(action);

  svg = container.querySelector('.iui-icon') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(smileyIcon.firstChild);

  const anchor = container.querySelector('.iui-anchor') as HTMLElement;
  expect(anchor).toBeTruthy();
  expect(anchor.textContent).toEqual('Custom Title Text');

  description = container.querySelector(
    '.iui-file-card-empty-action div',
  ) as HTMLElement;
  expect(description).toBeTruthy();
  expect(description.textContent).toEqual('Custom Description Text');
});

it('should render FileUploadCard with custom id', () => {
  const { container } = render(
    <FileUploadCard input={<FileUploadCard.Input id={'testId'} />} />,
  );

  const anchor = container.querySelector('.iui-anchor') as HTMLElement;
  expect(anchor).toBeTruthy();
  expect(anchor.textContent).toEqual('Choose a file');

  const input = container.querySelector('.iui-visually-hidden') as HTMLElement;
  expect(input).toBeTruthy();
  expect(input.id).toEqual('testId');

  const inputLabel = screen.getByLabelText('Choose a file', {
    selector: 'input',
  });
  expect(inputLabel).toBeTruthy();
});
