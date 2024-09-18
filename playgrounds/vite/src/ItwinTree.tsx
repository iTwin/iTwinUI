import { useCallback, useMemo, useState } from 'react';
import {
  Checkbox,
  DropdownMenu,
  IconButton,
  MenuItem,
  NodeData,
  Tree,
  TreeNode,
} from '@itwin/itwinui-react';

export const Virtualized = () => {
  type StoryData = {
    id: string;
    label: string;
    sublabel: string;
    subItems: StoryData[];
  };

  const [selectedNodes, setSelectedNodes] = useState<Record<string, boolean>>({
    'Node-0': true,
    'Node-3-2': true,
    'Node-22': true,
  });
  const onSelectedNodeChange = useCallback(
    (nodeId: string, isSelected: boolean) => {
      if (isSelected) {
        setSelectedNodes((oldSelected) => ({ ...oldSelected, [nodeId]: true }));
        console.log(`Selected node ${nodeId}`);
      } else {
        setSelectedNodes((oldSelected) => ({
          ...oldSelected,
          [nodeId]: false,
        }));
        console.log(`Unselected node ${nodeId}`);
      }
    },
    [],
  );

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'Node-2': true,
    'Node-2-1': true,
    'Node-3': true,
  });
  const onNodeExpanded = useCallback((nodeId: string, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedNodes((oldExpanded) => ({ ...oldExpanded, [nodeId]: true }));
      console.log(`Expanded node ${nodeId}`);
    } else {
      setExpandedNodes((oldExpanded) => ({
        ...oldExpanded,
        [nodeId]: false,
      }));
      console.log(`Closed node ${nodeId}`);
    }
  }, []);

  const [disabledNodes] = useState<Record<string, boolean>>({
    'Node-4': true,
    'Node-3-0': true,
    'Node-6': true,
    'Node-10': true,
  });

  const generateItem = useCallback(
    (index: number, parentNode = '', depth = 0): StoryData => {
      const keyValue = parentNode ? `${parentNode}-${index}` : `${index}`;
      return {
        id: `Node-${keyValue}`,
        label: `Node ${keyValue}`,
        sublabel: `Sublabel for Node ${keyValue}`,
        subItems:
          depth < 10
            ? Array(Math.round(index % 5))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = useMemo(
    () =>
      Array(100)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const getNode = useCallback(
    (node: StoryData): NodeData<StoryData> => {
      return {
        subNodes: node.subItems,
        nodeId: node.id,
        node: node,
        isExpanded: expandedNodes[node.id],
        isDisabled: disabledNodes[node.id],
        isSelected: selectedNodes[node.id],
        hasSubNodes: node.subItems.length > 0,
      };
    },
    [disabledNodes, expandedNodes, selectedNodes],
  );

  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick(1, close)}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={onClick(2, close)}>
      Item #2
    </MenuItem>,
    <MenuItem key={3} onClick={onClick(3, close)} disabled>
      Item #3
    </MenuItem>,
  ];

  return (
    <div className='sample-div' id='sample-div-id' style={{ width: '302px' }}>
      <Tree<StoryData>
        data={data}
        getNode={getNode}
        // enableVirtualization
        nodeRenderer={useCallback(
          ({ node, ...rest }) => (
            <TreeNode
              label={node.label}
              sublabel={node.sublabel}
              onExpanded={onNodeExpanded}
              onSelected={onSelectedNodeChange}
              checkbox={
                <Checkbox variant='eyeball' disabled={rest.isDisabled} />
              }
            >
              <DropdownMenu
                menuItems={dropdownMenuItems}
                id='itm-itwin-actions-drop-down'
                middleware={{ hide: true }}
              >
                <IconButton size='small' styleType='borderless'>
                  icon
                </IconButton>
              </DropdownMenu>
            </TreeNode>
          ),
          [onNodeExpanded, onSelectedNodeChange],
        )}
        style={{ height: 'min(400px, 90vh)' }}
      />
    </div>
  );
};
