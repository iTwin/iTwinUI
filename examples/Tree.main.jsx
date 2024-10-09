/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tree, TreeNode } from '@itwin/itwinui-react';

export default () => {
  const generateItem = React.useCallback((index, parentNode = '') => {
    const keyValue = parentNode ? `${parentNode}-${index}` : `${index}`;
    return {
      id: `Node-${keyValue}`,
      label: `Node ${keyValue}`,
    };
  }, []);

  const data = React.useMemo(
    () =>
      Array(3)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const getNode = React.useCallback((node) => {
    return {
      nodeId: node.id,
      node: node,
    };
  }, []);

  return (
    <Tree
      className='demo-tree'
      data={data}
      getNode={getNode}
      nodeRenderer={React.useCallback(
        ({ node, ...rest }) => (
          <TreeNode label={node.label} {...rest} />
        ),
        [],
      )}
    />
  );
};
