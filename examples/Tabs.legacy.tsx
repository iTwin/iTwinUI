/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs, Tab, Text } from '@itwin/itwinui-react';

export default () => {
  return (
    <Tabs
      labels={[
        <Tab key={1} label='Apple' />,
        <Tab key={2} label='Orange' />,
        <Tab key={3} label='Grape' />,
      ]}
    >
      <Text style={{ paddingInline: 150 }}>Content for an active tab</Text>
    </Tabs>
  );
};
