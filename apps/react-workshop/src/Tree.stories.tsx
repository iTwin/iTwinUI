/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useState, useCallback, useMemo } from 'react';
import {
  Tree,
  TreeNode,
  type NodeData,
  Checkbox,
  TreeNodeExpander,
  ProgressRadial,
} from '@itwin/itwinui-react';
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default {
  title: 'Tree',
};

export const Basic = () => {
  type StoryData = {
    id: string;
    label: string;
    sublabel: string;
    subItems: StoryData[];
  };

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
      Array(8)
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
        hasSubNodes: node.subItems.length > 0,
      };
    },
    [expandedNodes],
  );

  return (
    <Tree<StoryData>
      data={data}
      getNode={getNode}
      nodeRenderer={useCallback(
        ({ node, ...rest }) => (
          <TreeNode label={node.label} onExpanded={onNodeExpanded} {...rest} />
        ),
        [onNodeExpanded],
      )}
    />
  );
};

export const Full = () => {
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
      Array(8)
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

  return (
    <Tree<StoryData>
      data={data}
      getNode={getNode}
      nodeRenderer={useCallback(
        ({ node, ...rest }) => (
          <TreeNode
            label={node.label}
            sublabel={node.sublabel}
            onExpanded={onNodeExpanded}
            onSelected={onSelectedNodeChange}
            checkbox={<Checkbox variant='eyeball' disabled={rest.isDisabled} />}
            icon={<SvgPlaceholder />}
            {...rest}
          />
        ),
        [onNodeExpanded, onSelectedNodeChange],
      )}
    />
  );
};

export const AsyncLoading = () => {
  type StoryData = {
    id: string;
    label: string;
    subItems: StoryData[];
    hasSubNodes?: boolean;
    isLoading?: boolean;
  };

  const generateItem = useCallback((index: number): StoryData => {
    return {
      id: `Node-${index}`,
      label: `Node ${index}`,
      subItems: [],
      hasSubNodes: true,
    };
  }, []);

  const [data, setData] = useState(() =>
    Array(8)
      .fill(null)
      .map((_, index) => generateItem(index)),
  );

  const [selectedNodes, setSelectedNodes] = useState<Record<string, boolean>>(
    {},
  );
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

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {},
  );
  const onNodeExpanded = useCallback(
    (nodeId: string, isExpanded: boolean, node: StoryData) => {
      if (isExpanded && !node.subItems.length && node.hasSubNodes) {
        // Mocking API call
        setTimeout(() => {
          setData((oldData) => {
            const newData = [...oldData];
            const newNode = newData.find((item) => item.id === nodeId);
            if (!newNode) {
              return oldData;
            }
            newNode.subItems = [
              { id: `Async-${nodeId}`, label: `Async ${nodeId}`, subItems: [] },
            ];
            return newData;
          });
        }, 1000);
      }
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
    },
    [],
  );

  const getNode = useCallback(
    (node: StoryData): NodeData<StoryData> => {
      return {
        subNodes:
          !node.subItems.length && node.hasSubNodes
            ? [
                {
                  id: `Async-${node.id}`,
                  label: '',
                  subItems: [],
                  isLoading: true,
                },
              ]
            : node.subItems,
        nodeId: node.id,
        node: node,
        isExpanded: expandedNodes[node.id],
        isSelected: selectedNodes[node.id],
        hasSubNodes: !!node.hasSubNodes,
      };
    },
    [expandedNodes, selectedNodes],
  );

  return (
    <Tree<StoryData>
      data={data}
      getNode={getNode}
      nodeRenderer={useCallback(
        ({ node, ...rest }) => (
          <TreeNode
            label={node.isLoading ? 'Loading...' : node.label}
            onExpanded={(nodeId, isExpanded) =>
              onNodeExpanded(nodeId, isExpanded, node)
            }
            onSelected={onSelectedNodeChange}
            checkbox={<Checkbox variant='eyeball' disabled={rest.isDisabled} />}
            icon={
              node.isLoading ? (
                <ProgressRadial size='x-small' indeterminate />
              ) : (
                <SvgPlaceholder />
              )
            }
            {...rest}
          />
        ),
        [onNodeExpanded, onSelectedNodeChange],
      )}
    />
  );
};

export const CustomizedExpander = () => {
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

  const [disabledNodes] = useState({
    'Node-4': true,
    'Node-3': true,
    'Node-6': true,
    'Node-10': true,
  });

  const isNodeDisabled = useCallback(
    (nodeId: string) => {
      return Object.keys(disabledNodes).some(
        (id) => nodeId === id || nodeId.startsWith(`${id}-`),
      );
    },
    [disabledNodes],
  );

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
      Array(8)
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
        isDisabled: isNodeDisabled(node.id),
        isSelected: selectedNodes[node.id],
        hasSubNodes: node.subItems.length > 0,
      };
    },
    [expandedNodes, isNodeDisabled, selectedNodes],
  );

  return (
    <Tree<StoryData>
      data={data}
      getNode={getNode}
      nodeRenderer={useCallback(
        ({ node, ...rest }) => (
          <TreeNode
            label={node.label}
            sublabel={node.sublabel}
            onExpanded={onNodeExpanded}
            onSelected={onSelectedNodeChange}
            checkbox={<Checkbox variant='eyeball' disabled={rest.isDisabled} />}
            icon={<SvgPlaceholder />}
            // Allows to expand disabled nodes
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
        [onNodeExpanded, onSelectedNodeChange],
      )}
    />
  );
};

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
      Array(100000)
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

  return (
    <Tree<StoryData>
      data={data}
      getNode={getNode}
      enableVirtualization
      nodeRenderer={useCallback(
        ({ node, ...rest }) => (
          <TreeNode
            label={node.label}
            sublabel={node.sublabel}
            onExpanded={onNodeExpanded}
            onSelected={onSelectedNodeChange}
            checkbox={<Checkbox variant='eyeball' disabled={rest.isDisabled} />}
            icon={<SvgPlaceholder />}
            style={{ width: '100%' }}
            {...rest}
          />
        ),
        [onNodeExpanded, onSelectedNodeChange],
      )}
      style={{ height: 'min(400px, 90vh)' }}
    />
  );
};

export const Small = () => {
  type StoryData = {
    id: string;
    label: string;
    sublabel: string;
    subItems: StoryData[];
  };

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
      Array(8)
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
        hasSubNodes: node.subItems.length > 0,
      };
    },
    [expandedNodes],
  );

  return (
    <Tree<StoryData>
      data={data}
      size='small'
      getNode={getNode}
      nodeRenderer={useCallback(
        ({ node, ...rest }) => (
          <TreeNode
            label={node.label}
            sublabel={node.sublabel}
            onExpanded={onNodeExpanded}
            icon={<SvgPlaceholder />}
            {...rest}
          />
        ),
        [onNodeExpanded],
      )}
    />
  );
};

export const VirtualizedWithHorizontalScroll = () => {
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
      Array(100000)
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
      enableVirtualization
      nodeRenderer={useCallback(
        ({ node, ...rest }) => (
          <TreeNode
            label={node.label}
            onExpanded={onNodeExpanded}
            onSelected={onSelectedNodeChange}
            checkbox={<Checkbox variant='eyeball' disabled={rest.isDisabled} />}
            icon={<SvgPlaceholder />}
            style={{ minWidth: '100%' }}
            {...rest}
          />
        ),
        [onNodeExpanded, onSelectedNodeChange],
      )}
      style={{ height: 'min(400px, 90vh)', width: '250px' }}
    />
  );
};
