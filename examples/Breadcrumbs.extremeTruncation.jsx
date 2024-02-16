/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, MiddleTextTruncation } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={() => {}} className='demo-breadcrumbs-item'>
          <MiddleTextTruncation text='Root' endCharsCount={7} />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}} className='demo-breadcrumbs-item'>
          <MiddleTextTruncation text='My files' endCharsCount={7} />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}} className='demo-breadcrumbs-item'>
          <MiddleTextTruncation text='Documents' endCharsCount={7} />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}} className='demo-breadcrumbs-item'>
          <MiddleTextTruncation text='Status reports' endCharsCount={7} />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}} className='demo-breadcrumbs-item'>
          <MiddleTextTruncation text='December' endCharsCount={7} />
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
};
