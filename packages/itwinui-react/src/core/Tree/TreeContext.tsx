/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

export type TreeContextProps = {
  /**
   * Depth of the node.
   */
  nodeDepth: number;
  /**
   * List of sub-node IDs. Used for an accessibility attribute and keyboard navigation.
   */
  subNodeIds?: string[];
  /**
   * ID of the parent node. Used for keyboard navigation.
   */
  parentNodeId?: string;
  /**
   * Number of nodes that are under the same parent node or in the root. Used for an accessibility attribute.
   */
  groupSize: number;
  /**
   * Node index in the list of nodes under the same parent node or in the root. Used for an accessibility attribute.
   */
  indexInGroup: number;
  /**
   * Function that scrolls to the node's parent node.
   */
  scrollToParent?: () => void;
};

export const TreeContext = React.createContext<TreeContextProps | undefined>(
  undefined,
);

export const useTreeContext = () => {
  const context = React.useContext(TreeContext);
  if (context == undefined) {
    throw new Error('TreeContext must be used within a TreeContext.Provider');
  }
  return context;
};
