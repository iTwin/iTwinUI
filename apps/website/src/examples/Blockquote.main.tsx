/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Blockquote } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ width: '80%' }}>
      <Blockquote
        cite={'https://www.bentley.com/en'}
        footer={
          <>
            — Greg Bentley, <cite>NasdaqListed</cite>
          </>
        }
      >
        <p>
          For 36 years we have served engineers with our software, passionately 35 believing that
          better performing and more resilient infrastructure is 36 essential to improve the quality
          of life for people everywhere, sustain 37 our environment, and grow our economies.
        </p>
      </Blockquote>
    </div>
  );
};
