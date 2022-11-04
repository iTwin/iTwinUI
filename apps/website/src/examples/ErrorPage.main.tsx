/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ErrorPage } from '@itwin/itwinui-react';

export default () => {
  return (
    <ErrorPage
      errorType='503'
      errorMessage={
        <>
          Requested page has been moved permanently.
          <br />
          Unable to fulfill request.
        </>
      }
      primaryButtonLabel='Close'
      secondaryButtonLabel='Cancel'
      primaryButtonHandle={() => {}}
      secondaryButtonHandle={() => {}}
    />
  );
};
