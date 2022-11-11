/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState, Button } from '@itwin/itwinui-react';
import { Svg404 } from '@itwin/itwinui-illustrations-react';

export default () => {
  return (
    <NonIdealState
      svg={<Svg404 />}
      heading='Page not found'
      description={
        <>
          We can not find the iModel that you are looking for or it does not exist.
          <br />
          Visit the iModel HUB or contact our support team.
        </>
      }
      actions={
        <>
          <Button styleType={'high-visibility'}>Retry</Button>
          <Button>Contact us</Button>
        </>
      }
    />
  );
};
