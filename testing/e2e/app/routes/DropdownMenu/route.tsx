import * as React from 'react';
import {
  Button,
  Checkbox,
  DropdownMenu,
  IconButton,
  List,
  ListItem,
  MenuDivider,
  MenuExtraContent,
  MenuItem,
  Surface,
} from '@itwin/itwinui-react';
import { useSearchParams } from 'react-router';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  const [searchParams] = useSearchParams();

  const menuType = searchParams.get('menuType') as
    | 'withSubmenu'
    | 'withHideMiddleware'
    | 'withExtraContent'
    | undefined;
  const hideMiddleware =
    searchParams.get('hideMiddleware') === 'false' ? false : undefined;
  const closeOnItemClick = searchParams.get('closeOnItemClick') === 'true';

  if (menuType === 'withSubmenu') {
    return <DropdownMenuWithSubmenus />;
  }
  if (menuType === 'withHideMiddleware') {
    return <DropdownMenuHideMiddleware hideMiddleware={hideMiddleware} />;
  }
  if (menuType === 'withExtraContent') {
    return <DropdownMenuWithExtraContent />;
  }
  if (menuType === 'contextMenu') {
    return <ContextMenu />;
  }
  return <DropdownMenuBasic closeOnItemClick={closeOnItemClick} />;
};

// ----------------------------------------------------------------------------

const DropdownMenuBasic = ({ closeOnItemClick = false }) => {
  return (
    <DropdownMenu
      closeOnItemClick={closeOnItemClick}
      menuItems={
        <>
          <MenuItem>Item #1</MenuItem>
          <MenuItem>Item #2</MenuItem>
          <MenuItem disabled>Item #3</MenuItem>
        </>
      }
    >
      <IconButton label='More'>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

const DropdownMenuWithSubmenus = () => {
  return (
    <DropdownMenu
      className='DropdownMenu'
      menuItems={(close) => [
        <MenuItem
          key='Item 1_1'
          data-testid='Item 1_1'
          subMenuItems={[
            <MenuItem key='Item 2_1' data-testid='Item 2_1' onClick={close}>
              Item 2_1
            </MenuItem>,
            <MenuItem key='Item 2_2' data-testid='Item 2_2' onClick={close}>
              Item 2_2
            </MenuItem>,
            <MenuItem
              key='Item 2_3'
              data-testid='Item 2_3'
              subMenuItems={[
                <MenuItem key='Item 3_1' data-testid='Item 3_1' onClick={close}>
                  Item 3_1
                </MenuItem>,
                <MenuItem
                  key='Item 3_2'
                  data-testid='Item 3_2'
                  onClick={close}
                  subMenuItems={[
                    <MenuItem
                      key='Item 3_2_1'
                      data-testid='Item 3_2_1'
                      onClick={close}
                    >
                      Item 3_2_1
                    </MenuItem>,
                  ]}
                >
                  Item 3_2
                </MenuItem>,
                <MenuItem
                  key='Item 3_3'
                  data-testid='Item 3_3'
                  subMenuItems={[
                    <MenuItem
                      key='Item 3_3_1'
                      data-testid='Item 3_3_1'
                      onClick={close}
                    >
                      Item 3_3_1
                    </MenuItem>,
                  ]}
                >
                  Item 3_3
                </MenuItem>,
              ]}
            >
              Item 2_3
            </MenuItem>,
          ]}
        >
          Item 1_1
        </MenuItem>,
        <MenuItem key='Item 1_2' data-testid='Item 1_2' onClick={close}>
          Item 1_2
        </MenuItem>,
        <MenuItem key='Item 1_3' data-testid='Item 1_3' onClick={close}>
          Item 1_3
        </MenuItem>,
      ]}
    >
      <Button data-testid='trigger'>Menu with submenu</Button>
    </DropdownMenu>
  );
};

const DropdownMenuWithExtraContent = () => {
  return (
    <DropdownMenu
      className='DropdownMenu'
      menuItems={() => [
        <MenuExtraContent key={0}>Test content</MenuExtraContent>,
        <MenuItem data-testid={`FocusTarget-0`} key={1}>
          Test0
        </MenuItem>,
        <MenuItem data-testid={`FocusTarget-1`} key={2}>
          <Checkbox />
          Test1
        </MenuItem>,
        <MenuDivider key={3} />,
        <MenuItem key={4} disabled>
          Test2
        </MenuItem>,
        <MenuItem data-testid={`FocusTarget-2`} key={5}>
          Test3
        </MenuItem>,
        <MenuExtraContent key={6}>
          <Button data-testid={`FocusTarget-3`}>Test4</Button>
        </MenuExtraContent>,
      ]}
    >
      <Button data-testid='trigger'>Menu with extra content</Button>
    </DropdownMenu>
  );
};

const DropdownMenuHideMiddleware = ({
  hideMiddleware,
}: {
  hideMiddleware?: boolean;
}) => {
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={() => close()}>
      Option #1
    </MenuItem>,
    <MenuItem key={2} onClick={() => close()}>
      Option #2
    </MenuItem>,
    <MenuItem key={3} onClick={() => close()} disabled>
      Option #3
    </MenuItem>,
  ];

  const items = new Array(30).fill(0);

  return (
    <Surface style={{ maxHeight: '200px' }}>
      <Surface.Body
        as={List}
        style={{ overflowY: 'auto', minWidth: 'min(200px, 20%)' }}
      >
        {items.map((_, i) => (
          <ListItem key={i} actionable>
            <ListItem.Content>Item {i}</ListItem.Content>
            <DropdownMenu
              menuItems={dropdownMenuItems}
              middleware={{ hide: hideMiddleware }}
            >
              <IconButton
                styleType='borderless'
                label='More options'
                size='small'
              >
                <SvgMore />
              </IconButton>
            </DropdownMenu>
          </ListItem>
        ))}
      </Surface.Body>
    </Surface>
  );
};

const ContextMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const [positionReference, setPositionReference] = React.useState<{
    getBoundingClientRect: () => Omit<DOMRectReadOnly, 'toJSON'>;
  } | null>(null);

  return (
    <div
      data-testid='context-menu-container'
      style={{ padding: 8, outline: 'solid' }}
      onContextMenu={(e) => {
        e.preventDefault();
        setVisible((prev) => !prev);
        setPositionReference({
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: e.clientX,
              y: e.clientY,
              top: e.clientY,
              right: e.clientX,
              bottom: e.clientY,
              left: e.clientX,
            };
          },
        });
      }}
    >
      <DropdownMenu
        closeOnItemClick
        visible={visible}
        onVisibleChange={(visible) => {
          setPositionReference(null);
          setVisible(visible);
        }}
        positionReference={positionReference}
        menuItems={
          <>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </>
        }
      >
        <IconButton label='More'>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </div>
  );
};
