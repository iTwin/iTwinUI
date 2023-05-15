/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Flex } from '@itwin/itwinui-react';
import { SvgCloseSmall } from '@itwin/itwinui-icons-react';

export default () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  return (
    <Flex style={{ width: '70%' }}>
      <SearchBox aria-label='Search input'>
        <SearchBox.Icon />
        <SearchBox.Input
          placeholder='Try typing...'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        {inputValue !== '' ? (
          <SearchBox.Button
            label='Clear'
            onClick={() => {
              setInputValue('');
            }}
          >
            <SvgCloseSmall />
          </SearchBox.Button>
        ) : null}
      </SearchBox>
    </Flex>
  );
};
