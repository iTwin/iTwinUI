/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Anchor } from '@itwin/itwinui-react';

export default {
  title: 'Anchor',
};

export const Basic = () => {
  return <Anchor href='https://www.example.com/'>www.example.com</Anchor>;
};

export const AsButton = () => {
  return (
    <Anchor as='button' onClick={() => console.log('clicked')}>
      Perform action
    </Anchor>
  );
};

export const External = () => {
  return (
    <Anchor href='https://www.example.com/' isExternal target='_blank'>
      www.example.com
    </Anchor>
  );
};

export const Underline = () => {
  return (
    <Anchor href='https://www.example.com/' underline>
      www.example.com
    </Anchor>
  );
};
