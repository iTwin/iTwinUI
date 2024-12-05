/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tree, TreeNode, TreeNodeExpander } from '@itwin/itwinui-react';

export default () => {
  const [expandedNodes, setExpandedNodes] = React.useState({});
  const disabledNodes = { 'Node-0': true, 'Node-2': true };

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
      Array(3)
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
        isDisabled: Object.keys(disabledNodes).some(
          (id) => node.id === id || node.id.startsWith(`${id}-`),
        ),
        hasSubNodes: node.subItems.length > 0,
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
          <TreeNode
            label={node.label}
            onExpanded={onNodeExpanded}
            expander={
              <TreeNodeExpander
                isExpanded={rest.isExpanded}
                onClick={(e) => {
                  onNodeExpanded(node.id, !rest.isExpanded);
                  e.stopPropagation();
                }}
              />
            }
            {...rest}
          />
        ),
        [onNodeExpanded],
      )}
    />
  );
};
