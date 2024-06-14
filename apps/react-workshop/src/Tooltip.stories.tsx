/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button, Tooltip } from '@itwin/itwinui-react';
export default {
  title: 'Tooltip',
};

export const Top = () => {
  return (
    <Tooltip placement='top' content='Here I am!'>
      <Button id='tooltip-target'>Please, try to hover me!</Button>
    </Tooltip>
  );
};

export const Right = () => {
  return (
    <Tooltip placement='right' content='Here I am!'>
      <Button id='tooltip-target'>Please, try to hover me!</Button>
    </Tooltip>
  );
};

export const Bottom = () => {
  return (
    <Tooltip placement='bottom' content='Here I am!'>
      <Button id='tooltip-target'>Please, try to hover me!</Button>
    </Tooltip>
  );
};

export const Left = () => {
  return (
    <Tooltip placement='left' content='Here I am!'>
      <Button
        id='tooltip-target'
        style={{
          marginLeft: 100,
        }}
      >
        Please, try to hover me!
      </Button>
    </Tooltip>
  );
};

export const Controlled = () => {
  return (
    <Tooltip visible placement='left' content='Here I am!'>
      <Button id='tooltip-target'>No need to hover me</Button>
    </Tooltip>
  );
};
