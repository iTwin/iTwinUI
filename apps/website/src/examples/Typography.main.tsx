/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Body, Headline, Leading, Small, Subheading, Title } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Headline>Headline</Headline>
      <Subheading>Subheading</Subheading>
      <Title>Title</Title>
      <Leading>Leading</Leading>
      <Body>Body</Body>
      <Small>Small</Small>
    </div>
  );
};
