/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import Tippy from '@tippyjs/react';

export default ({ colors }: { colors: string[] }) => {
  return (
    <div data-iui-theme='dark' className={'color-list'}>
      {colors.map((color) => (
        <Tippy
          content={<div className='color-tooltip'>{color}</div>}
          key={color}
          aria={{ content: 'labelledby' }}
          delay={0}
          duration={[300, 50]}
          interactive
          allowHTML
          maxWidth={450}
        >
          <button
            key={color}
            aria-label={color}
            className={'color-list-item'}
            // @ts-ignore
            style={{ '--_color': color }}
          />
        </Tippy>
      ))}
    </div>
  );
};
