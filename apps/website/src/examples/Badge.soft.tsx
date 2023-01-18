/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Badge } from '@itwin/itwinui-react';

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        columnGap: 4,
        placeItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '10px',
      }}
    >
      <Badge backgroundColor='skyblue'>Skyblue</Badge>
      <Badge backgroundColor='celery'>Celery</Badge>
      <Badge backgroundColor='froly'>Froly</Badge>
      <Badge backgroundColor='steelblue'>Steelblue</Badge>
      <Badge backgroundColor='sunglow'>Sunglow</Badge>
      <Badge backgroundColor='seabuckthorn'>Seabuckthorn</Badge>
      <Badge backgroundColor='montecarlo'>Montecarlo</Badge>
      <Badge backgroundColor='poloblue'>Poloblue</Badge>
      <Badge backgroundColor='bouquet'>Bouquet</Badge>
      <Badge backgroundColor='ash'>Ash</Badge>
      <Badge backgroundColor='oak'>Oak</Badge>
    </div>
  );
};
