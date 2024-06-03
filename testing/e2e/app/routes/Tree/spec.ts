import { test, expect } from '@playwright/test';

test.describe('Tree keyboard navigation', () => {
  test('Keyboard navigation should work on virtualized tree', async ({
    page,
  }) => {
    await page.goto('/Tree?virtualization=true');

    const tree = page.getByRole('tree');
    const treeNodes = page.getByRole('treeitem');
    const focusedElement = page.locator('*:focus');
    const node3 = page.locator('#Node-3');
    const node31 = page.locator('#Node-3-1');
    const node312 = page.locator('#Node-3-1-2');

    expect((await treeNodes.all()).length).toBe(6);

    await tree.focus();

    // Go Up: Stay on the first node
    await page.keyboard.press('ArrowUp');
    expect(await focusedElement.getAttribute('id')).toBe('Node-1');

    // Go Left: Do nothing
    await page.keyboard.press('ArrowLeft');
    expect(await focusedElement.getAttribute('id')).toBe('Node-1');

    // Go Down: Node-1 -> Node-3 (skip disabled node)
    await page.keyboard.press('ArrowDown');
    expect(await focusedElement.getAttribute('id')).toBe('Node-3');

    // Go Up: Node-3 -> Node-1 (skip disabled node)
    await page.keyboard.press('ArrowUp');
    expect(await focusedElement.getAttribute('id')).toBe('Node-1');

    // Go Down: Node-1 -> Node-3-1
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    expect(await focusedElement.getAttribute('id')).toBe('Node-3-1');

    // Go Right: Focus checkbox
    await page.keyboard.press('ArrowRight');
    expect(await focusedElement.getAttribute('type')).toBe('checkbox');

    // Go Right: Focus expander button
    await page.keyboard.press('ArrowRight');
    expect(await focusedElement.getAttribute('type')).toBe('button');

    // Go Right: Do nothing
    await page.keyboard.press('ArrowRight');
    expect(await focusedElement.getAttribute('type')).toBe('button');
    expect(await node31.locator('*:focus').getAttribute('type')).toBe('button');

    // Go Down: Node-3-1 -> Node-3-1-2 (skip disabled sub-node)
    await page.keyboard.press('ArrowDown');
    expect(await focusedElement.getAttribute('id')).toBe('Node-3-1-2');

    // Go Right: Expand Node-3-1-2
    await page.keyboard.press('ArrowRight');
    expect((await treeNodes.all()).length).toBe(7);

    // Go Down: Node 3-1-2 -> Node 3-1-2-1
    await page.keyboard.press('ArrowDown');
    expect(await focusedElement.getAttribute('id')).toBe('Node-3-1-2-1');

    // Go Left: Node-3-1-2-1 -> Node-3-1-2
    await page.keyboard.press('ArrowLeft');
    expect(await focusedElement.getAttribute('id')).toBe('Node-3-1-2');

    // Go Left: Collapse Node-3-1-2
    await page.keyboard.press('ArrowLeft');
    expect((await treeNodes.all()).length).toBe(6);

    // Press Enter: Select Node-3-1-2
    await page.keyboard.press('Enter');
    await expect(node312).toHaveAttribute('aria-selected', 'true');

    // Go Up: Node-3-1-2 -> Node-3
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');

    // Press Enter: Deselect Node-3
    await page.keyboard.press('Enter');
    await expect(node3).not.toHaveAttribute('aria-selected', 'true');

    // Go to last focusable element inside node - expander button
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    expect(await focusedElement.getAttribute('type')).toBe('button');

    // Go Left: Focus checkbox
    await page.keyboard.press('ArrowLeft');
    expect(await focusedElement.getAttribute('type')).toBe('checkbox');

    // Go Left: Focus Node-3
    await page.keyboard.press('ArrowLeft');
    expect(await focusedElement.getAttribute('id')).toBe('Node-3');
  });
});
