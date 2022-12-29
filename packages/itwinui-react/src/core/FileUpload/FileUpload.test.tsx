/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { FileUpload } from './FileUpload';

it('should render dragContent and children', () => {
  const mockContent = 'Mock drag content';
  const mockChildren = 'Mock children to wrap';
  const { container } = render(
    <FileUpload dragContent={mockContent} onFileDropped={jest.fn}>
      {mockChildren}
    </FileUpload>,
  );

  const component = container.querySelector('.iui-file-upload') as HTMLElement;
  expect(component).toBeTruthy();

  const content = container.querySelector('.iui-content') as HTMLElement;
  expect(content).toBeTruthy();
  expect(content.textContent).toEqual(mockContent);

  const children = component.firstChild as HTMLElement;
  expect(children).toBeTruthy();
  expect(children.textContent).toEqual(mockChildren);
});

it('should apply content class to children if dragContent not passed', () => {
  const mockChildren = 'Mock children to wrap';
  const { container } = render(
    <FileUpload onFileDropped={jest.fn}>{mockChildren}</FileUpload>,
  );
  expect(container.querySelector('.iui-file-upload')).toBeTruthy();

  const content = container.querySelector('.iui-content') as HTMLElement;
  expect(content).toBeTruthy();
  expect(content.textContent).toEqual(mockChildren);
});

it('should handle drag and drop events correctly', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <FileUpload onFileDropped={mockFn}>Mock content</FileUpload>,
  );

  const component = container.querySelector('.iui-file-upload') as HTMLElement;
  expect(component).toBeTruthy();

  expect(container.querySelector('.iui-content')).toBeTruthy();

  const file = new File(['mock-file'], 'test.txt', { type: 'text/plain' });
  const mockDataTransfer = {
    dataTransfer: { files: [file], items: [{ kind: 'file', type: file.type }] },
  };

  fireEvent.dragEnter(component, mockDataTransfer);
  expect(container.querySelector('.iui-file-upload.iui-drag')).toBeTruthy();

  fireEvent.dragLeave(component, mockDataTransfer);
  expect(container.querySelector('.iui-file-upload.iui-drag')).toBeFalsy();

  fireEvent.dragEnter(component, mockDataTransfer);
  fireEvent.drop(component, mockDataTransfer);
  expect(mockFn).toHaveBeenCalledWith([file]);
});
