/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { IdeasButton } from '@itwin/itwinui-react';

export default {
  title: 'Buttons/IdeasButton',
};

export const Ideas = () => {
  return <IdeasButton onClick={() => console.log('clicked')} />;
};

export const LocalizedIdeas = () => {
  return (
    <IdeasButton
      feedbackLabel='Localized feedback'
      onClick={() => console.log('clicked')}
    />
  );
};
