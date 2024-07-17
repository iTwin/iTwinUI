import { Button, ButtonGroup, Flex, IconButton } from '@itwin/itwinui-react';
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';
import { useSearchParams } from '@remix-run/react';
import React from 'react';

export default function ButtonGroupTest() {
  const [searchParams] = useSearchParams();

  const exampleType = (searchParams.get('exampleType') ?? 'default') as
    | 'default'
    | 'overflow';
  const initialProvideOverflowButton =
    searchParams.get('provideOverflowButton') !== 'false';
  const orientation =
    (searchParams.get('orientation') as 'horizontal' | 'vertical') ||
    'horizontal';
  const overflowPlacement =
    (searchParams.get('overflowPlacement') as 'start' | 'end') || undefined;

  const Default = () => {
    const [provideOverflowButton, setProvideOverflowButton] = React.useState(
      initialProvideOverflowButton,
    );

    return (
      <Flex flexDirection='column' alignItems='flex-start'>
        <Button
          data-testid='toggle-provide-overflow-container'
          onClick={() => setProvideOverflowButton((prev) => !prev)}
        >
          {`Toggle provide overflow container (current =${provideOverflowButton})`}
        </Button>

        <div id='container' style={{ background: 'hotpink' }}>
          <ButtonGroup
            role='toolbar'
            orientation={orientation as any}
            style={{
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
  };

  const Overflow = () => {
    const buttons = [...Array(10)].map((_, index) => (
      <IconButton key={index}>
        <SvgPlaceholder />
      </IconButton>
    ));

    return (
      <div id='container' style={{ background: 'hotpink' }}>
        <ButtonGroup
          overflowButton={(startIndex) => <IconButton>{startIndex}</IconButton>}
          overflowPlacement={overflowPlacement}
        >
          {buttons}
        </ButtonGroup>
      </div>
    );
  };

  return exampleType === 'default' ? <Default /> : <Overflow />;
}
