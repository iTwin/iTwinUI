/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tree, TreeNode } from '@itwin/itwinui-react';

export default () => {
  const [expandedNodes, setExpandedNodes] = React.useState({});

  const onNodeExpanded = React.useCallback((nodeId, isExpanded) => {
    setExpandedNodes((oldExpanded) => ({
      ...oldExpanded,
      [nodeId]: isExpanded,
    }));
  }, []);

  const data = React.useMemo(
    () => [
      {
        id: 'Node-0',
        label: 'Node 0',
      },
      {
        id: 'Node-1',
        label: 'Node 1',
        subItems: [{ id: 'Subnode-1', label: 'Subnode 1' }],
      },
      {
        id: 'Node-2',
        label: 'Node 2',
        subItems: [{ id: 'Subnode-2', label: 'Subnode 2' }],
      },
    ],
    [],
  );

  const getNode = React.useCallback(
    (node) => {
      return {
        subNodes: node.subItems,
        nodeId: node.id,
        node: node,
        isExpanded: expandedNodes[node.id],
        hasSubNodes: node.subItems?.length > 0,
      };
    },
    [expandedNodes],
  );

  return (
    <Tree
      className='demo-tree'
      data={data}
      getNode={getNode}
      nodeRenderer={React.useCallback(
        ({ node, ...rest }) => (
          <TreeNode label={node.label} onExpanded={onNodeExpanded} {...rest} />
        ),
        [onNodeExpanded],
      )}
    />
  );
};
