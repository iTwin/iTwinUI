import * as React from 'react';
import { Button, Flex, Popover, Surface } from '@itwin/itwinui-react';
import { Virtualized } from './ItwinTree';

export default function App() {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Virtualized />
      <Popover
        content={
          <Surface
            style={{
              inlineSize: 500,
              blockSize: 500,
            }}
          >
            I'm flying… to the sun{' '}
          </Surface>
        }
      >
        <Button>Button</Button>
      </Popover>
    </Flex>
  );
}
