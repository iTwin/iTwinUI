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

  const generateItem = React.useCallback(
    (index, parentNode = '', depth = 0) => {
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

  const data = React.useMemo(
    () =>
      Array(10000)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const getNode = React.useCallback(
    (node) => {
      return {
        subNodes: node.subItems,
        nodeId: node.id,
        node: node,
        isExpanded: expandedNodes[node.id],
        hasSubNodes: node.subItems.length > 0,
      };
    },
    [expandedNodes],
  );

  return (
    <Tree
      className='demo-tree'
      style={{ height: '400px' }}
      data={data}
      getNode={getNode}
      enableVirtualization
      nodeRenderer={React.useCallback(
        ({ node, ...rest }) => (
          <TreeNode label={node.label} onExpanded={onNodeExpanded} {...rest} />
        ),
        [onNodeExpanded],
      )}
    />
  );
};
