/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  SvgDocument,
  SvgUpload,
  SvgCheckmark,
  SvgSmileyHappy,
} from '../../utils/index.js';
import { FileUploadCard } from './FileUploadCard.js';
import { Button } from '../Buttons/Button.js';
import { FileEmptyCard } from './FileEmptyCard.js';

const CustomFileUploadCard = (
  props: React.ComponentProps<typeof FileUploadCard>,
) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>(
    new Array<File>(
      new File(['mock-file'], 'test.txt', { type: 'text/plain' }),
    ),
  );

  const emptyCard = (
    <FileEmptyCard>
      <FileEmptyCard.Icon>
        <SvgSmileyHappy />,
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
        <SvgCheckmark />,
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

  const { container: uploadIcon } = render(<SvgUpload />);
  const svg = container.querySelector(
    '.iui-file-card-empty-icon',
  ) as HTMLElement;
  expect(svg).toBeTruthy();
  expect(svg.firstChild).toEqual(uploadIcon.firstChild);

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

  const { container: documentIcon } = render(<SvgDocument />);
  const svg = container.querySelector('.iui-file-card-icon') as HTMLElement;
  expect(svg).toBeTruthy();
  expect(svg.firstChild).toEqual(documentIcon.firstChild);

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

  const { container: checkmarkIcon } = render(<SvgCheckmark />);

  const { container: smileyIcon } = render(<SvgSmileyHappy />);

  let svg = container.querySelector('.iui-file-card-icon') as HTMLElement;
  expect(svg).toBeTruthy();
  expect(svg.firstChild).toEqual(checkmarkIcon.firstChild);

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

  svg = container.querySelector('.iui-file-card-empty-icon') as HTMLElement;
  expect(svg).toBeTruthy();
  expect(svg.firstChild).toEqual(smileyIcon.firstChild);

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

  const input = container.querySelector('input') as HTMLInputElement;
  expect(input).toHaveAttribute('id', 'testId');

  const label = container.querySelector('label') as HTMLLabelElement;
  expect(label).toHaveTextContent('Choose a file');
  expect(label).toHaveAttribute('for', 'testId');
});
