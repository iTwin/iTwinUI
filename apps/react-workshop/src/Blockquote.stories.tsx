/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Blockquote } from '@itwin/itwinui-react';

export default {
  title: 'Blockquote',
};

export const Basic = () => {
  return <Blockquote>This is a quote</Blockquote>;
};

export const WithFooter = () => {
  return (
    <Blockquote
      cite='https://www.bentley.com/en'
      footer={
        <>
          — Greg Bentley, <cite>NasdaqListed</cite>
        </>
      }
    >
      <p>
        For 36 years we have served engineers with our software, passionately
        believing that better performing and more resilient infrastructure is
        essential to improve the quality of life for people everywhere, sustain
        our environment, and grow our economies.
      </p>
    </Blockquote>
  );
};
