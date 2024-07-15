import { Button, ButtonGroup, Flex, IconButton } from '@itwin/itwinui-react';
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';
import { useSearchParams } from '@remix-run/react';
import React from 'react';

export default function ButtonGroupTest() {
  const [searchParams] = useSearchParams();

  const initialProvideOverflowButton =
    (searchParams.get('provideOverflowButton') ?? 'true') !== 'false';
  const orientation =
    (searchParams.get('orientation') as 'horizontal' | 'vertical') ||
    'horizontal';
  const overflowPlacement =
    (searchParams.get('overflowPlacement') as 'start' | 'end') || undefined;

  const [provideOverflowButton, setProvideOverflowButton] = React.useState(
    initialProvideOverflowButton,
  );

  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Button
        data-testid='toggle-provide-overflow-container'
        onClick={() => setProvideOverflowButton((prev) => !prev)}
      >
        Toggle provide overflow container (current ={' '}
        {`${provideOverflowButton}`})
      </Button>

      <div id='container'>
        <ButtonGroup
          role='toolbar'
          orientation={orientation as any}
          style={{
            background: 'hotpink',
            width: orientation === 'horizontal' ? '100%' : undefined,
            height: orientation === 'vertical' ? '100%' : undefined,
          }}
          overflowPlacement={overflowPlacement}
          overflowButton={
            provideOverflowButton
              ? (firstOverflowingIndex) => {
                  return (
                    <IconButton data-testid='overflow-button'>
                      {firstOverflowingIndex}
                    </IconButton>
                  );
                }
              : undefined
          }
        >
          <IconButton label='Button 1'>
            <SvgPlaceholder />
          </IconButton>
          <IconButton label='Button 2' isActive>
            <SvgPlaceholder />
          </IconButton>
          <IconButton disabled label='Button 3'>
            <SvgPlaceholder />
          </IconButton>
        </ButtonGroup>
      </div>
    </Flex>
  );
}
