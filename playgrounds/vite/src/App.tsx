import { useState, useCallback, useMemo } from 'react';
import { Tree, TreeNode, type NodeData, Checkbox } from '@itwin/itwinui-react';
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default function App() {
  type StoryData = {
    id: string;
    label: string;
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
    'Node-0': true,
    'Node-0-0': true,
    'Node-0-0-0': true,
    'Node-0-0-0-0': true,
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
  const generateItem = useCallback(
    (index: number, parentNode = '', depth = 0): StoryData => {
      const keyValue = parentNode ? `${parentNode}-${index}` : `${index}`;
      return {
        id: `Node-${keyValue}`,
        label: `Node ${keyValue}`,
        subItems:
          depth < 10
            ? Array(1)
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = useMemo(
    () =>
      Array(1000)
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
        isSelected: selectedNodes[node.id],
        hasSubNodes: node.subItems.length > 0,
      };
    },
    [expandedNodes, selectedNodes],
  );

  return (
    <Tree<StoryData>
      data={data}
      getNode={getNode}
      // enableVirtualization
      nodeRenderer={useCallback(
        ({ node, ...rest }) => (
          <TreeNode
            label={node.label}
            onExpanded={onNodeExpanded}
            onSelected={onSelectedNodeChange}
            checkbox={<Checkbox variant='eyeball' disabled={rest.isDisabled} />}
            icon={<SvgPlaceholder />}
            style={{ width: 'fit-content', minWidth: '100%' }}
            {...rest}
          />
        ),
        [onNodeExpanded, onSelectedNodeChange],
      )}
      style={{ height: 'min(400px, 90vh)', width: '250px' }}
    />
  );
}
