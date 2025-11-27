/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  Button,
  ButtonGroup,
  DropdownMenu,
  IconButton,
  Input,
  MenuItem,
  Text,
} from '@itwin/itwinui-react';
import {
  SvgAdd,
  SvgDelete,
  SvgEdit,
  SvgUndo,
  SvgPlaceholder,
  SvgMore,
} from '@itwin/itwinui-icons-react';

export default {
  title: 'ButtonGroup',
};

export const WithIcons = () => {
  return (
    <ButtonGroup role='toolbar'>
      <IconButton label='Add' onClick={() => console.log('Clicked add!')}>
        <SvgAdd />
      </IconButton>
      <IconButton
        label='Edit'
        onClick={() => console.log('Clicked edit!')}
        isActive
      >
        <SvgEdit />
      </IconButton>
      <IconButton
        disabled
        label='Delete'
        onClick={() => console.log('Clicked delete!')}
      >
        <SvgDelete />
      </IconButton>
      <IconButton label='Undo' onClick={() => console.log('Clicked undo!')}>
        <SvgUndo />
      </IconButton>
    </ButtonGroup>
  );
};

export const Overflow = () => {
  const items = Array.from({ length: 10 }, (_, index) => (
    <IconButton key={index} label={`Item #${index}`}>
      <SvgPlaceholder />
    </IconButton>
  ));

  return (
    <ButtonGroup
      orientation='horizontal'
      overflowButton={(overflowStart) => (
        <DropdownMenu
          menuItems={(close) =>
            Array(items.length - overflowStart)
              .fill(null)
              .map((_, _index) => {
                const index = overflowStart + _index;
                return (
                  <MenuItem
                    key={index}
                    onClick={close}
                    startIcon={<SvgPlaceholder />}
                  >
                    Item #{index}
                  </MenuItem>
                );
              })
          }
        >
          <IconButton label='More'>
            <SvgMore />
          </IconButton>
        </DropdownMenu>
      )}
    >
      {items}
    </ButtonGroup>
  );
};
Overflow.decorators = [
  (Story: () => React.ReactNode) => (
    <>
      <Text variant='small' as='small' isMuted>
        Resize the container to see overflow behavior.
      </Text>
      <div
        style={{
          width: 'min(30rem, 100%)',
          border: '1px solid hotpink',
          padding: 8,
          overflow: 'hidden',
          resize: 'inline',
        }}
      >
        <Story />
      </div>
    </>
  ),
];

export const OverflowJustifyEnd = () => {
  const items = Array.from({ length: 10 }, (_, index) => (
    <IconButton key={index} label={`Item #${index}`}>
      <SvgPlaceholder />
    </IconButton>
  ));

  return (
    <ButtonGroup
      orientation='horizontal'
      justifyContent='flex-end'
      overflowButton={(overflowStart) => (
        <DropdownMenu
          menuItems={(close) =>
            Array(items.length - overflowStart)
              .fill(null)
              .map((_, _index) => {
                const index = overflowStart + _index;
                return (
                  <MenuItem
                    key={index}
                    onClick={close}
                    startIcon={<SvgPlaceholder />}
                  >
                    Item #{index}
                  </MenuItem>
                );
              })
          }
        >
          <IconButton label='More'>
            <SvgMore />
          </IconButton>
        </DropdownMenu>
      )}
    >
      {items}
    </ButtonGroup>
  );
};
OverflowJustifyEnd.decorators = [
  (Story: () => React.ReactNode) => (
    <>
      <Text variant='small' as='small' isMuted>
        Resize the container to see overflow behavior.
      </Text>
      <div
        style={{
          width: 'min(30rem, 100%)',
          border: '1px solid hotpink',
          padding: 8,
          overflow: 'hidden',
          resize: 'inline',
        }}
      >
        <Story />
      </div>
    </>
  ),
];

export const InputButtonCombo = () => {
  return (
    <ButtonGroup>
      <Input
        defaultValue='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ'
        readOnly
        style={{ minWidth: '30ch' }}
      />
      <Button
        styleType='high-visibility'
        onClick={async () => {
          await navigator.clipboard.writeText(
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ`,
          );
          console.log('Copied bearer token to clipboard');
        }}
      >
        Copy
      </Button>
    </ButtonGroup>
  );
};

export const Vertical = () => {
  return (
    <ButtonGroup orientation='vertical'>
      <IconButton label='Add' onClick={() => console.log('Clicked add!')}>
        <SvgAdd />
      </IconButton>
      <IconButton
        label='Edit'
        onClick={() => console.log('Clicked edit!')}
        isActive
      >
        <SvgEdit />
      </IconButton>
      <IconButton
        disabled
        label='Delete'
        onClick={() => console.log('Clicked delete!')}
      >
        <SvgDelete />
      </IconButton>
      <IconButton label='Undo' onClick={() => console.log('Clicked undo!')}>
        <SvgUndo />
      </IconButton>
    </ButtonGroup>
  );
};

export const VerticalOverflow = () => {
  const items = Array.from({ length: 10 }, (_, index) => (
    <IconButton key={index} label={`Item #${index}`}>
      <SvgPlaceholder />
    </IconButton>
  ));

  return (
    <ButtonGroup
      orientation='vertical'
      justifyContent='center'
      style={{ blockSize: '100%' }}
      overflowButton={(overflowStart) => (
        <DropdownMenu
          menuItems={(close) =>
            Array(items.length - overflowStart)
              .fill(null)
              .map((_, _index) => {
                const index = overflowStart + _index;
                return (
                  <MenuItem
                    key={index}
                    onClick={close}
                    startIcon={<SvgPlaceholder />}
                  >
                    Item #{index}
                  </MenuItem>
                );
              })
          }
        >
          <IconButton label='More'>
            <SvgMore />
          </IconButton>
        </DropdownMenu>
      )}
    >
      {items}
    </ButtonGroup>
  );
};
VerticalOverflow.decorators = [
  (Story: () => React.ReactNode) => (
    <>
      <Text variant='small' as='small' isMuted>
        Resize the container to see overflow behavior.
      </Text>
      <div
        style={{
          blockSize: 'min(20rem, 100vh)',
          inlineSize: 'min(20rem, 100vw)',
          border: '1px solid hotpink',
          padding: 8,
          resize: 'block',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    </>
  ),
];
