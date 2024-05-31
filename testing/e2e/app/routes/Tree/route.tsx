import {
  Tree,
  NodeData,
  NodeRenderProps,
  TreeNode,
  Checkbox,
} from '@itwin/itwinui-react';

type TestData = {
  id: string;
  label: string;
  subItems: TestData[];
};

export default function TreeTest() {
  const data = [
    {
      id: 'Node-1',
      label: 'Node-1',
      subItems: [],
    },
    {
      // Disabled
      id: 'Node-2',
      label: 'Node-2',
      subItems: [],
    },
    {
      // Expanded and selected
      id: 'Node-3',
      label: 'Node-3',
      subItems: [
        {
          // Expanded
          id: 'Node-3-1',
          label: 'Node-3-1',
          subItems: [
            {
              // Disabled
              id: 'Node-3-1-1',
              label: 'Node-3-1-1',
              subItems: [],
            },
            {
              // Collapsed
              id: 'Node-3-1-2',
              label: 'Node-3-1-2',
              subItems: [
                {
                  id: 'Node-3-1-2-1',
                  label: 'Node-3-1-2-1',
                  subItems: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const expandedIds = ['Node-3', 'Node-3-1'];
  const disabledIds = ['Node-2', 'Node-3-1-1'];
  const selectedIds = ['Node-3'];

  return (
    <>
      <Tree<TestData>
        data={data}
        getNode={(node: TestData): NodeData<TestData> => {
          return {
            subNodes: node.subItems,
            nodeId: node.id,
            node: node,
            isExpanded: expandedIds.some((id) => id === node.id),
            isDisabled: disabledIds.some((id) => id === node.id),
            isSelected: selectedIds.some((id) => id === node.id),
            hasSubNodes: node.subItems.length > 0,
          };
        }}
        nodeRenderer={({ node, ...rest }: NodeRenderProps<TestData>) => (
          <TreeNode
            label={node.label}
            onExpanded={(nodeId, isNodeExpanded) => {}}
            checkbox={
              <Checkbox id={`Checkbox-${node.id}`} disabled={rest.isDisabled} />
            }
            {...rest}
          />
        )}
      />
    </>
  );
}
