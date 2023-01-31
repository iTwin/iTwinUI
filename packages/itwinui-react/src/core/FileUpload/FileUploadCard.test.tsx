// /*---------------------------------------------------------------------------------------------
//  * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
//  * See LICENSE.md in the project root for license terms and full copyright notice.
//  *--------------------------------------------------------------------------------------------*/
// import React from 'react';
// import { fireEvent, render } from '@testing-library/react';
// import { FileUploadCard } from './FileUploadCard';
// import { SvgDocument, SvgUpload } from '../utils';

// it('should render  after a file is uploaded', () => {
//   const mockedOnChange = jest.fn();
//   const file = new File(['mock-file'], 'test.txt', { type: 'text/plain' });

//   const { container } = render(
//     <FileUploadCard
//       label={file.name}
//       description={'Test File description'}
//       icon={<SvgUpload />}
//     />,
//   );

//   const label = container.querySelector(
//     '.iui-file-uploaded-template-label',
//   ) as HTMLElement;
//   expect(label).toBeTruthy();
//   expect(label.textContent).toEqual('test.txt');

//   const secondary = container.querySelector(
//     '.iui-file-uploaded-template-description',
//   ) as HTMLElement;
//   expect(secondary).toBeTruthy();

//   const { container: documentIcon } = render(
//     <SvgDocument aria-hidden className='iui-icon' />,
//   );
//   const svg = container.querySelector('.iui-icon') as SVGSVGElement;
//   expect(svg).toBeTruthy();
//   expect(svg).toEqual(documentIcon.firstChild);

//   const action = container.querySelector(
//     '.iui-file-uploaded-template-action',
//   ) as HTMLElement;
//   expect(action).toBeTruthy();
//   expect(action.textContent).toEqual('Choose a file');
// });
