/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import {
  Footer,
  FooterProps,
  FooterElement,
  defaultFooterElements,
} from './Footer';

const renderComponent = (props?: Partial<FooterProps>) => {
  return render(<Footer {...props} />);
};

const customUrls: FooterElement[] = [
  {
    title: 'Custom link',
    url: 'https://www.bentley.com/',
  },
  {
    title: 'Products link',
  },
];

const assertFooterItems = (
  items: NodeListOf<HTMLLIElement>,
  data: FooterElement[],
) => {
  items.forEach((element, i) => {
    // Every second item is a separator
    if (i % 2 !== 0) {
      expect(element).toHaveClass('iui-legal-footer-separator');
      return;
    }

    const dataIndex = Math.floor(i / 2);
    expect(element.textContent).toBe(data[dataIndex].title);
    if (data[dataIndex].url) {
      expect((element.firstChild as HTMLAnchorElement).href).toBe(
        data[dataIndex].url,
      );
    }
  });
};

it('should show all default footer elements', () => {
  const { container } = renderComponent();
  const allLi = container.querySelectorAll<HTMLLIElement>('li');
  assertFooterItems(allLi, defaultFooterElements);
});

it('should show all default and custom footer elements', () => {
  const { container } = renderComponent({ customElements: customUrls });
  const allData = [...defaultFooterElements, ...customUrls];
  const allLi = container.querySelectorAll<HTMLLIElement>('li');
  assertFooterItems(allLi, allData);
});

it('should not show default footer elements', () => {
  const { container } = renderComponent({
    customElements: () => customUrls,
  });
  const allLi = container.querySelectorAll<HTMLLIElement>('li');
  assertFooterItems(allLi, customUrls);
});

it('should propagate className and style props correctly', () => {
  const { container } = renderComponent({
    className: 'custom-class',
    style: { position: 'fixed', bottom: 0 },
  });

  const footer = container.querySelector(
    '.iui-legal-footer.custom-class',
  ) as HTMLElement;

  expect(footer).toBeTruthy();
  expect(footer.style.position).toEqual('fixed');
  expect(footer.style.bottom).toEqual('0px');
});

it('should render custom children items', () => {
  const { container } = renderComponent({
    children: (
      <Footer.List>
        <Footer.Item key='custom-1'>
          <a href='https://www.bentley.com/'>Custom link 1</a>
        </Footer.Item>
        <Footer.Separator key='separator-1' />
        <Footer.Item key='custom-2'>
          <a href='https://itwin.github.io/iTwinUI-react/'>Custom link 2</a>
        </Footer.Item>
      </Footer.List>
    ),
  });

  const footer = container.querySelector('.iui-legal-footer') as HTMLElement;
  expect(footer).toBeTruthy();

  const allLi = container.querySelectorAll<HTMLLIElement>('li');
  assertFooterItems(allLi, [
    { title: 'Custom link 1', url: 'https://www.bentley.com/' },
    { title: 'Custom link 2', url: 'https://itwin.github.io/iTwinUI-react/' },
  ]);
});

it('should render default and custom children items', () => {
  const { container } = renderComponent({
    children: (
      <Footer.List>
        <Footer.Item key='custom-1'>
          <a href='https://www.bentley.com/'>Custom link 1</a>
        </Footer.Item>
        {defaultFooterElements.map((element, i) => (
          <React.Fragment key={i}>
            <Footer.Separator />
            <Footer.Item>
              {element.url ? (
                <a href={element.url}>{element.title}</a>
              ) : (
                element.title
              )}
            </Footer.Item>
          </React.Fragment>
        ))}
      </Footer.List>
    ),
  });

  const footer = container.querySelector('.iui-legal-footer') as HTMLElement;
  expect(footer).toBeTruthy();

  const allLi = container.querySelectorAll<HTMLLIElement>('li');
  assertFooterItems(allLi, [
    { title: 'Custom link 1', url: 'https://www.bentley.com/' },
    ...defaultFooterElements,
  ]);
});
