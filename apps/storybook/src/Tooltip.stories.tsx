/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Tooltip } from '@itwin/itwinui-react';
export default {
  title: 'Core/Tooltip',
};

export const Top = () => {
  return (
    <Tooltip placement='top' content='Here I am!'>
      <div
        id='tooltip-target'
        style={{
          marginTop: 40,
          marginLeft: 100,
          width: 'fit-content',
        }}
      >
        Please, try to hover me!
      </div>
    </Tooltip>
  );
};

export const Right = () => {
  return (
    <Tooltip placement='right' content='Here I am!'>
      <div
        id='tooltip-target'
        style={{
          marginTop: 40,
          marginLeft: 100,
          width: 'fit-content',
        }}
      >
        Please, try to hover me!
      </div>
    </Tooltip>
  );
};

export const Bottom = () => {
  return (
    <Tooltip placement='bottom' content='Here I am!'>
      <div
        id='tooltip-target'
        style={{
          marginTop: 40,
          marginLeft: 100,
          width: 'fit-content',
        }}
      >
        Please, try to hover me!
      </div>
    </Tooltip>
  );
};

export const Left = () => {
  return (
    <Tooltip placement='left' content='Here I am!'>
      <div
        id='tooltip-target'
        style={{
          marginTop: 40,
          marginLeft: 100,
          width: 'fit-content',
        }}
      >
        Please, try to hover me!
      </div>
    </Tooltip>
  );
};

export const Controlled = () => {
  return (
    <Tooltip visible placement='left' content='Here I am!'>
      <div
        style={{
          marginTop: 40,
          marginLeft: 100,
          width: 'fit-content',
        }}
      >
        No need to hover me
      </div>
    </Tooltip>
  );
};
