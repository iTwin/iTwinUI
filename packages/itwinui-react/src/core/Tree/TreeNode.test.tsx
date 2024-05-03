/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { TreeNode } from './TreeNode.js';
import { type TreeContextProps, TreeContext } from './TreeContext.js';
import { Checkbox } from '../Checkbox/Checkbox.js';
import { SvgMore as SvgPlaceholder } from '../../utils/index.js';

const renderComponent = ({
  props,
  contextProps,
}: {
  props?: Partial<React.ComponentProps<typeof TreeNode>>;
  contextProps?: Partial<TreeContextProps>;
} = {}) => {
  return render(
    <TreeContext.Provider
      value={{ nodeDepth: 0, groupSize: 1, indexInGroup: 0, ...contextProps }}
    >
      <TreeNode
        nodeId='testId'
        label='label'
        sublabel='sublabel'
        onExpanded={vi.fn()}
        {...props}
      />
    </TreeContext.Provider>,
  );
};

it('should render in its most basic state', () => {
  const { container } = renderComponent();

  const treeItem = container.querySelector('li');
  expect(treeItem).toBeTruthy();
  expect(treeItem).toHaveAttribute('role', 'treeitem');
  expect(treeItem).toHaveAttribute('id', 'testId');
  expect(treeItem).not.toHaveAttribute('aria-expanded');
  expect(treeItem).toHaveAttribute('aria-disabled', 'false');
  expect(treeItem).toHaveAttribute('aria-selected', 'false');
  expect(treeItem).toHaveAttribute('aria-level', '1');
  expect(treeItem).toHaveAttribute('aria-posinset', '1');
  expect(treeItem).toHaveAttribute('aria-setsize', '1');

  const treeNode = container.querySelector('.iui-tree-node');
  expect(treeNode).toBeTruthy();
  expect(treeNode).toHaveAttribute('style', '--level: 0;');
  expect(treeNode?.classList.contains('iui-disabled')).toBe(false);
  expect(treeNode?.classList.contains('iui-active')).toBe(false);

  const title = container.querySelector('.iui-tree-node-content-title');
  expect(title).toBeTruthy();
  expect(title?.textContent).toBe('label');
  const caption = container.querySelector('.iui-tree-node-content-caption');
  expect(caption).toBeTruthy();
  expect(caption?.textContent).toBe('sublabel');
});

it('should add className and style correctly', () => {
  const { container } = renderComponent({
    props: { className: 'test-class', style: { width: '100px' } },
  });

  const treeItem = container.querySelector(
    '.iui-tree-item.test-class',
  ) as HTMLElement;
  expect(treeItem).toBeTruthy();
  expect(treeItem.style.width).toBe('100px');
});

it('should render node with correct depth', () => {
  const { container } = renderComponent({ contextProps: { nodeDepth: 2 } });

  const treeNode = container.querySelector('.iui-tree-node');
  expect(treeNode).toBeTruthy();
  expect(treeNode).toHaveAttribute('style', '--level: 2;');
});

it('should render node with a checkbox', () => {
  const { container } = renderComponent({
    props: {
      checkbox: <Checkbox variant='eyeball' className='testClass' />,
    },
  });

  expect(
    container.querySelector('.iui-tree-node-checkbox .testClass'),
  ).not.toBeDisabled();
});

it('should render node with an icon', () => {
  const { container } = renderComponent({
    props: { icon: <SvgPlaceholder className='testClass' /> },
  });

  expect(
    container.querySelector('.iui-tree-node-content-icon .testClass'),
  ).toBeTruthy();
});

it('should render custom expander', () => {
  const { container } = renderComponent({
    props: {
      hasSubNodes: true,
      expander: <button className='testClass'>Expand</button>,
    },
  });

  expect(container.querySelector('button.testClass')).toBeTruthy();
});

it.each([true, false])(
  'should render node when isExpanded is %s',
  (isExpanded) => {
    const onExpanded = vi.fn();
    const onSelected = vi.fn();
    const { container } = renderComponent({
      props: {
        isExpanded,
        hasSubNodes: true,
        onExpanded,
        onSelected,
      },
      contextProps: { subNodeIds: ['subNode1', 'subNode2'] },
    });

    const treeItem = container.querySelector('li');
    expect(treeItem).toBeTruthy();
    expect(treeItem).toHaveAttribute('aria-expanded', isExpanded.toString());

    const subTree = container.querySelector('.iui-sub-tree');
    expect(subTree).toBeTruthy();
    expect(subTree).toHaveAttribute('role', 'group');
    expect(subTree).toHaveAttribute('aria-owns', 'subNode1 subNode2');

    const expanderIcon = container.querySelector(
      '.iui-tree-node-content-expander-icon',
    ) as HTMLElement;
    expect(expanderIcon).toBeTruthy();
    expect(
      expanderIcon.classList.contains(
        'iui-tree-node-content-expander-icon-expanded',
      ),
    ).toBe(isExpanded);

    const expanderButton = container.querySelector(
      '.iui-button[data-iui-variant="borderless"][data-iui-size="small"]',
    ) as HTMLButtonElement;
    expect(expanderButton).toBeTruthy();

    expect(onExpanded).not.toHaveBeenCalled();
    fireEvent.click(expanderButton);
    expect(onExpanded).toHaveBeenCalledWith('testId', !isExpanded);
    expect(onSelected).not.toHaveBeenCalled();
  },
);

it('should render disabled node', () => {
  const onSelected = vi.fn();
  const onExpanded = vi.fn();
  const { container } = renderComponent({
    props: {
      isDisabled: true,
      hasSubNodes: true,
      checkbox: <Checkbox disabled />,
      onSelected,
      onExpanded,
    },
  });

  expect(container.querySelector('li')).toHaveAttribute(
    'aria-disabled',
    'true',
  );

  const treeNode = container.querySelector('.iui-tree-node') as HTMLElement;
  expect(treeNode).toBeTruthy();
  expect(treeNode?.classList.contains('iui-disabled')).toBe(true);

  expect(
    container.querySelector('.iui-tree-node-checkbox input'),
  ).toBeDisabled();

  const button = container.querySelector(
    '.iui-button[data-iui-variant="borderless"][data-iui-size="small"]',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button).toHaveAttribute('aria-disabled', 'true');

  fireEvent.click(button);
  expect(onSelected).not.toHaveBeenCalled();

  fireEvent.dblClick(treeNode);
  expect(onExpanded).not.toHaveBeenCalled();
});

it('should render selected node', () => {
  const onSelected = vi.fn();
  const { container } = renderComponent({
    props: {
      isSelected: true,
      onSelected,
    },
  });

  expect(container.querySelector('li')).toHaveAttribute(
    'aria-selected',
    'true',
  );

  const treeNode = container.querySelector('.iui-tree-node') as HTMLElement;
  expect(treeNode).toBeTruthy();
  expect(treeNode?.classList.contains('iui-active')).toBe(true);

  expect(onSelected).not.toHaveBeenCalled();
  fireEvent.click(treeNode);
  expect(onSelected).toHaveBeenCalledWith('testId', false);
});

it('should render checkbox with  checkboxProps correctly', () => {
  const { container } = renderComponent({
    props: {
      checkbox: <Checkbox variant='eyeball' className='testClass' />,
      checkboxProps: {
        style: { color: 'green' },
        className: 'custom-checkbox-class',
      },
    },
  });

  const treeNode = container.querySelector('.iui-tree-node') as HTMLElement;
  expect(treeNode).toBeTruthy();

  const checkbox = container.querySelector(
    '.custom-checkbox-class',
  ) as HTMLElement;

  expect(checkbox).toBeTruthy();
  expect(checkbox?.style.color).toBe('green');
});

it('should render icon with iconProps correctly', () => {
  const { container } = renderComponent({
    props: {
      icon: <SvgPlaceholder />,
      iconProps: {
        style: { color: 'orange' },
        className: 'custom-icon-class',
      },
    },
  });

  const treeNode = container.querySelector('.iui-tree-node') as HTMLElement;
  expect(treeNode).toBeTruthy();

  const icon = container.querySelector('.custom-icon-class') as HTMLElement;
  expect(icon).toBeTruthy();

  expect(icon?.style.color).toBe('orange');
});

it('should render sublabel with sublabelProps correctly', () => {
  const { container } = renderComponent({
    props: {
      sublabelProps: {
        style: { color: 'red' },
        className: 'custom-sublabel-class',
      },
    },
  });

  const treeNode = container.querySelector('.iui-tree-node') as HTMLElement;
  expect(treeNode).toBeTruthy();

  const sublabel = container.querySelector(
    '.custom-sublabel-class',
  ) as HTMLElement;

  expect(sublabel).toBeTruthy();
  expect(sublabel?.style.color).toBe('red');
});

it('should render label with labelProps correctly', () => {
  const { container } = renderComponent({
    props: {
      labelProps: {
        style: { color: 'blue' },
        className: 'custom-label-class',
      },
    },
  });

  const treeNode = container.querySelector('.iui-tree-node') as HTMLElement;
  expect(treeNode).toBeTruthy();

  const label = container.querySelector('.custom-label-class') as HTMLElement;

  expect(label).toBeTruthy();
  expect(label?.style.color).toBe('blue');
});

it('should render label with nodeProps correctly', () => {
  const { container } = renderComponent({
    props: {
      nodeProps: {
        style: { color: 'blue' },
        className: 'custom-node-class',
      },
    },
  });

  const treeNode = container.querySelector('.custom-node-class') as HTMLElement;
  expect(treeNode).toBeTruthy();

  expect(treeNode?.style.color).toBe('blue');
});

it('should render label with subNodeProps correctly', () => {
  const { container } = renderComponent({
    props: {
      hasSubNodes: true,
      subNodeProps: {
        style: { color: 'blue' },
        className: 'custom-subnode-class',
      },
    },
  });

  const treeNode = container.querySelector('.iui-tree-node') as HTMLElement;
  expect(treeNode).toBeTruthy();

  const subnode = container.querySelector(
    '.custom-subnode-class',
  ) as HTMLElement;

  expect(subnode).toBeTruthy();
  expect(subnode?.style.color).toBe('blue');
});
