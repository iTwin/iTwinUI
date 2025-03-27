import * as React from 'react';
import {
  ButtonGroup,
  Checkbox,
  IconButton,
  Tree,
  TreeNode,
} from '@itwin/itwinui-react';
import { Svg2D, Svg3D, SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default function App() {
  return (
    <div
      style={{
        height: 600,
        width: 400,
      }}
    >
      <TestTree />
    </div>
  );
}

type TreeData = {
  id: string;
  label: string;
  children: TreeData[];
};

function createTreeNodes(parentId = '', depth = 0): TreeData[] {
  return Array(10)
    .fill(0)
    .map((_, index) => {
      const id = `${parentId}${parentId.length > 0 ? '-' : 'Node-'}${index}`;
      return {
        id,
        label: id,
        children: depth < 1 ? createTreeNodes(id, depth + 1) : [],
      };
    });
}

const data = createTreeNodes();

function TestTree() {
  const [, setExpanded] = React.useState<{ [nodeId: string]: boolean }>({});
  const [selected, setSelected] = React.useState<{ [nodeId: string]: boolean }>(
    {},
  );

  return (
    <Tree<TreeData>
      style={{
        height: '100%',
      }}
      size='small'
      enableVirtualization={true}
      data={data}
      getNode={React.useCallback(
        (node) => ({
          nodeId: node.id,
          node,
          hasSubNodes: node.children.length > 0,
          subNodes: node.children,
          isExpanded: true,
          isSelected: selected[node.id],
        }),
        [selected],
      )}
      nodeRenderer={React.useCallback(
        ({ node, ...nodeProps }) => (
          <TreeNode
            {...nodeProps}
            label={node.label}
            onExpanded={(nodeId, isExpanded) =>
              setExpanded((prev) => ({ ...prev, [nodeId]: isExpanded }))
            }
            onSelected={(nodeId, isSelected) => {
              setSelected((prev) => ({ ...prev, [nodeId]: isSelected }));
            }}
            icon={<SvgPlaceholder />}
            checkbox={<Checkbox variant='eyeball' />}
          >
            <ButtonGroup>
              <IconButton styleType='borderless'>
                <Svg2D />
              </IconButton>
              <IconButton styleType='borderless'>
                <Svg3D />
              </IconButton>
            </ButtonGroup>
          </TreeNode>
        ),
        [],
      )}
    />
  );
}
