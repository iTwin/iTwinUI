/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
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
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

type ButtonGroupProps = React.ComponentProps<typeof ButtonGroup>;

export default {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    id: { control: { disable: true } },
    children: { control: { disable: true } },
  },
} as Meta<ButtonGroupProps>;

export const WithIcons = () => {
  return (
    <ButtonGroup>
      <IconButton onClick={action('Clicked add!')}>
        <SvgAdd />
      </IconButton>
      <IconButton onClick={action('Clicked edit!')} isActive>
        <SvgEdit />
      </IconButton>
      <IconButton disabled onClick={action('Clicked delete!')}>
        <SvgDelete />
      </IconButton>
      <IconButton onClick={action('Clicked undo!')}>
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
    <>
      <Text variant='small' as='small' isMuted>
        Resize the viewport to see overflow behavior.
      </Text>
      <div
        style={{
          maxWidth: 'clamp(300px, 50%, 100%)',
          border: '1px solid hotpink',
          padding: 8,
        }}
      >
        <ButtonGroup
          orientation='horizontal'
          overflowButton={(overflowStart) => {
            return (
              <DropdownMenu
                menuItems={(close) => {
                  const length = items.length - overflowStart;

                  return Array.from({ length }, (_, _index) => {
                    const index = overflowStart + _index;

                    return (
                      <MenuItem
                        key={index}
                        onClick={close}
                        icon={<SvgPlaceholder />}
                      >
                        Item #{index}
                      </MenuItem>
                    );
                  });
                }}
              >
                <IconButton label='More'>
                  <SvgMore />
                </IconButton>
              </DropdownMenu>
            );
          }}
        >
          {items}
        </ButtonGroup>
      </div>
    </>
  );
};

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
          action('Copied bearer token to clipboard')();
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
      <IconButton onClick={action('Clicked add!')}>
        <SvgAdd />
      </IconButton>
      <IconButton onClick={action('Clicked edit!')} isActive>
        <SvgEdit />
      </IconButton>
      <IconButton disabled onClick={action('Clicked delete!')}>
        <SvgDelete />
      </IconButton>
      <IconButton onClick={action('Clicked undo!')}>
        <SvgUndo />
      </IconButton>
    </ButtonGroup>
  );
};

export const VerticalOverflow = () => {
  const buttons = Array(10)
    .fill(null)
    .map((_, index) => (
      <IconButton
        key={index}
        onClick={() => action(`Clicked on button ${index + 1}`)()}
      >
        <SvgPlaceholder />
      </IconButton>
    ));

  return (
    <ButtonGroup
      orientation='vertical'
      style={{ height: 'clamp(100px, 40vmax, 80vh)' }}
      overflowButton={(overflowStart) => (
        <DropdownMenu
          menuItems={(close) =>
            Array(buttons.length - overflowStart + 1)
              .fill(null)
              .map((_, _index) => {
                const index = overflowStart + _index;
                const onClick = () => {
                  action(`Clicked button ${index} (overflow)`)();
                  close();
                };
                return (
                  <MenuItem
                    key={index}
                    onClick={onClick}
                    icon={<SvgPlaceholder />}
                  >
                    Button #{index}
                  </MenuItem>
                );
              })
          }
        >
          <IconButton onClick={() => action('Clicked on overflow icon')()}>
            <SvgMore />
          </IconButton>
        </DropdownMenu>
      )}
    >
      {buttons}
    </ButtonGroup>
  );
};
VerticalOverflow.decorators = [
  (Story) => (
    <>
      <Text variant='small' as='small' isMuted>
        Resize the viewport to see overflow behavior.
      </Text>
      <div style={{ border: '1px solid hotpink', padding: 8 }}>
        <Story />
      </div>
    </>
  ),
];
