/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { NodeData, Tree, NodeRenderProps, TreeProps } from './Tree';
import { TreeNode } from './TreeNode';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';

type TestData = {
  id: string;
  label: string;
  subItems: TestData[];
};
const onNodeExpanded = jest.fn();
const onNodeSelected = jest.fn();

const renderComponent = ({
  props,
  expandedIds = ['Node-1'],
  disabledIds = [],
  selectedIds = [],
}: {
  props?: Partial<TreeProps<TestData>>;
  expandedIds?: string[];
  disabledIds?: string[];
  selectedIds?: string[];
} = {}) => {
  const data: TestData[] = [
    {
      id: 'Node-1',
      label: 'Facility 1',
      subItems: [
        { id: 'Node-1-1', label: 'Unit 1', subItems: [] },
        { id: 'Node-1-2', label: 'Unit 2', subItems: [] },
      ],
    },
    {
      id: 'Node-2',
      label: 'Facility 2',
      subItems: [],
    },
  ];

  return render(
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
          onExpanded={onNodeExpanded}
          onSelected={onNodeSelected}
          checkbox={
            <Checkbox id={`Checkbox-${node.id}`} disabled={rest.isDisabled} />
          }
          {...rest}
        />
      )}
      {...props}
    />,
  );
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('should render in its most basic state', () => {
  const { container } = renderComponent();
  const tree = container.querySelector('.iui-tree');
  expect(tree).toBeTruthy();
  expect(tree).toHaveAttribute('role', 'tree');

  //Only render nodes with expanded parents
  const treeNodes = container.querySelectorAll('li');
  expect(treeNodes).toHaveLength(4);
  const visibleNodeIds = ['Node-1', 'Node-1-1', 'Node-1-2', 'Node-2'];
  treeNodes.forEach((item, index) => {
    expect(item.id).toBe(visibleNodeIds[index]);
  });
});

it('should add className and style correctly', () => {
  const { container } = renderComponent({
    props: { className: 'test-class', style: { width: '100px' } },
  });

  const tree = container.querySelector('.iui-tree.test-class') as HTMLElement;
  expect(tree).toBeTruthy();
  expect(tree.style.width).toBe('100px');
});

it('should not render node if any parent above is not expanded', () => {
  const data = [
    {
      id: 'Node-1',
      label: 'Node-1',
      subItems: [
        {
          id: 'Node-1-1',
          label: 'Node-1-1',
          subItems: [
            {
              id: 'Node-1-1-1',
              label: 'Node-1-1-1',
              subItems: [],
            },
          ],
        },
      ],
    },
  ];

  const { container } = renderComponent({
    props: { data },
    expandedIds: ['Node-1-1'],
  });

  const treeNodes = container.querySelectorAll('li');
  expect(treeNodes.length).toBe(1);
  expect(treeNodes[0].id).toBe('Node-1');
});

it.each([false, true])(
  'should handle arrow key navigation when enableVirtualization is %s',
  async (enableVirtualization) => {
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

    const { container } = renderComponent({
      props: { data, enableVirtualization },
      expandedIds: ['Node-3', 'Node-3-1'],
      disabledIds: ['Node-2', 'Node-3-1-1'],
      selectedIds: ['Node-3'],
    });

    const tree = container.querySelector('.iui-tree') as HTMLElement;
    expect(tree).toBeTruthy();
    const treeNodes = container.querySelectorAll('.iui-tree-node');
    expect(treeNodes.length).toBe(6);

    fireEvent.focus(tree);

    // Go Up: Stay on the first node
    await userEvent.keyboard('{ArrowUp}');
    expect(document.activeElement?.id).toBe('Node-1');

    // Go Left: Do nothing
    await userEvent.keyboard('{ArrowUp}');
    expect(document.activeElement?.id).toBe('Node-1');
    expect(onNodeExpanded).not.toHaveBeenCalled();
    expect(onNodeSelected).not.toHaveBeenCalled();

    // Go Down: Node-1 -> Node-3 (skip disabled node)
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement?.id).toBe('Node-3');

    // Go Up: Node-3 -> Node-1 (skip disabled node)
    await userEvent.keyboard('{ArrowUp}');
    expect(document.activeElement?.id).toBe('Node-1');

    // Go Down: Node-1 -> Node-3 (skip disabled node)
    await userEvent.keyboard('{ArrowDown}');

    // Go Down: Node-3 -> Node-3-1
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement?.id).toBe('Node-3-1');

    expect(
      Array.from(container.querySelectorAll('#Node-3-1-1, #Node-3-1')).map(
        (el) => el.id,
      ),
    ).toEqual(['Node-3-1', 'Node-3-1-1']);

    // Go Right: Focus checkbox
    await userEvent.keyboard('{ArrowRight}');
    expect((document.activeElement as HTMLInputElement)?.type).toBe('checkbox');

    // Go Right: Focus expander button
    await userEvent.keyboard('{ArrowRight}');
    expect((document.activeElement as HTMLButtonElement)?.type).toContain(
      'button',
    );

    // Go Right: Do nothing
    await userEvent.keyboard('{ArrowRight}');
    expect(
      container.querySelector('#Node-3-1')?.contains(document.activeElement),
    ).toBe(true);
    expect(onNodeExpanded).not.toHaveBeenCalled();
    expect(onNodeSelected).not.toHaveBeenCalled();

    // Go Down: Node-3-1 -> Node-3-1-2 (skip disabled sub-node)
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement?.id).toBe('Node-3-1-2');

    // Go Right: Expand Node-3-1-1
    await userEvent.keyboard('{ArrowRight}');
    expect(onNodeExpanded).toHaveBeenNthCalledWith(1, 'Node-3-1-2', true);

    // Go Down: Stay on the last node
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement?.id).toBe('Node-3-1-2');

    // Go Left: Node-3-1-2 -> Node-3-1
    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement?.id).toBe('Node-3-1');

    // Go Left: Collapse Node-3-1
    await userEvent.keyboard('{ArrowLeft}');
    expect(onNodeExpanded).toHaveBeenNthCalledWith(2, 'Node-3-1', false);

    // Press Space: Select Node-3-1
    await userEvent.keyboard('{Enter}');
    expect(onNodeSelected).toHaveBeenNthCalledWith(1, 'Node-3-1', true);

    // Go Up: Node-3-1 -> Node-3
    await userEvent.keyboard('{ArrowUp}');

    // Press Enter: Deselect Node-3
    await userEvent.keyboard('{Enter}');
    expect(onNodeSelected).toHaveBeenNthCalledWith(2, 'Node-3', false);

    // Go to last focusable element inside node - expander button
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowRight}');
    expect((document.activeElement as HTMLButtonElement)?.type).toContain(
      'button',
    );

    // Go Left: Focus checkbox
    await userEvent.keyboard('{ArrowLeft}');
    expect((document.activeElement as HTMLInputElement)?.type).toBe('checkbox');

    // Go Left: Focus Node-3
    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement?.id).toBe('Node-3');
  },
);

it('should set correct computed aria attributes to nodes', () => {
  const data = [
    {
      id: 'Node-1',
      label: 'Node-1',
      subItems: [],
    },
    {
      id: 'Node-2',
      label: 'Node-2',
      subItems: [
        {
          id: 'Node-2-1',
          label: 'Node-2-1',
          subItems: [],
        },
        {
          id: 'Node-2-2',
          label: 'Node-2-2',
          subItems: [],
        },
      ],
    },
    {
      id: 'Node-3',
      label: 'Node-3',
      subItems: [],
    },
  ];
  const { container } = renderComponent({
    props: { data },
    expandedIds: ['Node-2'],
  });

  const tree = container.querySelector('.iui-tree') as HTMLElement;
  expect(tree).toBeTruthy();
  const treeNodes = container.querySelectorAll('li');
  expect(treeNodes.length).toBe(5);

  // Node-3
  const node3 = treeNodes[4] as HTMLElement;
  expect(node3.getAttribute('aria-level')).toBe('1');
  expect(node3.getAttribute('aria-setsize')).toBe('3');
  expect(node3.getAttribute('aria-posinset')).toBe('3');

  // Node-2-1
  const node3_1 = treeNodes[2] as HTMLElement;
  expect(node3_1.getAttribute('aria-level')).toBe('2');
  expect(node3_1.getAttribute('aria-setsize')).toBe('2');
  expect(node3_1.getAttribute('aria-posinset')).toBe('1');
});
