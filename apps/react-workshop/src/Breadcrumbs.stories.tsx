/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useMemo, useState } from 'react';
import {
  IconButton,
  Breadcrumbs,
  DropdownButton,
  DropdownMenu,
  MenuItem,
  Input,
  Text,
} from '@itwin/itwinui-react';
import {
  SvgChevronRightDouble,
  SvgFolder,
  SvgMore,
} from '@itwin/itwinui-icons-react';

export default {
  title: 'Breadcrumbs',
};

export const Basic = () => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item key={0} onClick={() => console.log('Root')}>
        Root
      </Breadcrumbs.Item>
      <Breadcrumbs.Item key={1} onClick={() => console.log('Item 1')}>
        Item 1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item key={2} onClick={() => console.log('Item 2')}>
        Item 2
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
};

export const Links = () => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item key={0} href='/'>
        iTwinUI
      </Breadcrumbs.Item>
      <Breadcrumbs.Item key={1} href='/?path=/docs/core-breadcrumbs'>
        Breadcrumbs
      </Breadcrumbs.Item>
      <Breadcrumbs.Item key={2}>Links</Breadcrumbs.Item>
    </Breadcrumbs>
  );
};

export const CustomSeparator = () => {
  return (
    <Breadcrumbs separator={<SvgChevronRightDouble />}>
      <Breadcrumbs.Item key={0} onClick={() => console.log('Root')}>
        Root
      </Breadcrumbs.Item>
      <Breadcrumbs.Item key={1} onClick={() => console.log('Item 1')}>
        Item 1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item key={2} onClick={() => console.log('Item 2')}>
        Item 2
      </Breadcrumbs.Item>
    </Breadcrumbs>
  );
};

export const Overflow = () => {
  const items = Array(10)
    .fill(null)
    .map((_, index) => (
      <Breadcrumbs.Item
        key={index}
        onClick={() => console.log(`Clicked on breadcrumb ${index + 1}`)}
      >
        Item {index}
      </Breadcrumbs.Item>
    ));

  return <Breadcrumbs>{items}</Breadcrumbs>;
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
          border: '1px solid lightpink',
          padding: 8,
          resize: 'inline',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    </>
  ),
];

export const CustomOverflowBackButton = () => {
  const items = Array(10)
    .fill(null)
    .map((_, index) => (
      <Breadcrumbs.Item
        key={index}
        onClick={() => console.log(`Clicked on breadcrumb ${index + 1}`)}
      >
        Item {index}
      </Breadcrumbs.Item>
    ));

  return (
    <Breadcrumbs
      overflowButton={(visibleCount: number) => {
        const previousBreadcrumb =
          visibleCount > 1 ? items.length - visibleCount : items.length - 2;
        return (
          <IconButton
            aria-label={`Item ${previousBreadcrumb}`}
            onClick={() => {
              console.log(`Visit breadcrumb ${previousBreadcrumb}`);
            }}
            styleType='borderless'
            label={`Item ${previousBreadcrumb}`}
            labelProps={{
              placement: 'bottom',
            }}
          >
            <SvgMore />
          </IconButton>
        );
      }}
    >
      {items}
    </Breadcrumbs>
  );
};
CustomOverflowBackButton.decorators = [
  (Story: () => React.ReactNode) => (
    <>
      <Text variant='small' as='small' isMuted>
        Resize the container to see overflow behavior.
      </Text>
      <div
        style={{
          width: 'min(30rem, 100%)',
          // border: '1px solid lightpink',
          // padding: 8,
          resize: 'inline',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    </>
  ),
];

export const CustomOverflowDropdown = () => {
  const items = Array(10)
    .fill(null)
    .map((_, index) => (
      <Breadcrumbs.Item
        key={index}
        onClick={() => console.log(`Clicked on breadcrumb ${index + 1}`)}
      >
        Item {index}
      </Breadcrumbs.Item>
    ));

  return (
    <Breadcrumbs
      overflowButton={(visibleCount: number) => (
        <DropdownMenu
          menuItems={(close) =>
            Array(items.length - visibleCount)
              .fill(null)
              .map((_, _index) => {
                const index = visibleCount > 1 ? _index + 1 : _index;
                const onClick = () => {
                  console.log(`Visit breadcrumb ${index}`);
                  close();
                };
                return (
                  <MenuItem key={index} onClick={onClick}>
                    Item {index}
                  </MenuItem>
                );
              })
          }
        >
          <IconButton
            aria-label='Dropdown with more breadcrumbs'
            onClick={() => console.log('Clicked on overflow icon')}
            styleType='borderless'
          >
            <SvgMore />
          </IconButton>
        </DropdownMenu>
      )}
    >
      {items}
    </Breadcrumbs>
  );
};
CustomOverflowDropdown.decorators = [
  (Story: () => React.ReactNode) => (
    <>
      <Text variant='small' as='small' isMuted>
        Resize the container to see overflow behavior.
      </Text>
      <div
        style={{
          width: 'min(30rem, 100%)',
          // border: '1px solid lightpink',
          // padding: 8,
          resize: 'inline',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    </>
  ),
];

export const FolderNavigation = () => {
  const items = useMemo(
    () => ['Root', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
    [],
  );

  const [lastIndex, setLastIndex] = useState(items.length - 1);
  const [isEditing, setIsEditing] = useState(false);

  const breadcrumbItems = useMemo(
    () =>
      items.slice(0, lastIndex + 1).map((item, index) => (
        <Breadcrumbs.Item
          key={`Breadcrumb${index}`}
          onClick={() => {
            if (lastIndex !== index) {
              setLastIndex(index);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {item}
        </Breadcrumbs.Item>
      )),
    [items, lastIndex],
  );

  return (
    <div style={{ display: 'inline-flex', width: 450 }}>
      <DropdownButton
        startIcon={<SvgFolder aria-hidden />}
        styleType='borderless'
        menuItems={(close) =>
          items.map((item, index) => (
            <MenuItem
              key={`Item${index}`}
              onClick={() => {
                setLastIndex(index);
                setIsEditing(false);
                close();
              }}
            >
              {item}
            </MenuItem>
          ))
        }
      />
      {isEditing ? (
        <Input
          defaultValue={items.slice(0, lastIndex + 1).join('/')}
          onChange={({ target: { value } }) => {
            const lastItem = value.substring(
              value.lastIndexOf('/', value.length - 2) + 1,
            );
            setLastIndex(items.findIndex((item) => lastItem.includes(item)));
          }}
          onKeyDown={({ key }) => key === 'Enter' && setIsEditing(false)}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      )}
    </div>
  );
};
