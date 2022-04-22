/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Footer, FooterProps, FooterElement } from './Footer';

const renderComponent = (props?: Partial<FooterProps>) => {
  return render(<Footer {...props} />);
};

const urls: FooterElement[] = [
  {
    title: 'Terms of service',
    url:
      'https://connect-agreementportal.bentley.com/AgreementApp/Home/Eula/view/readonly/BentleyConnect',
  },
  {
    title: 'Privacy',
    url: 'https://www.bentley.com/en/privacy-policy',
  },
  {
    title: 'Terms of use',
    url: 'https://www.bentley.com/en/terms-of-use-and-select-online-agreement',
  },
  {
    title: 'Cookies',
    url: 'https://www.bentley.com/en/cookie-policy',
  },
  {
    title: 'Legal notices',
    url: 'https://connect.bentley.com/Legal',
  },
];

const customUrls: FooterElement[] = [
  {
    title: 'Custom link',
    url: 'https://www.bentley.com/',
  },
  {
    title: 'Products link',
  },
];

it('should show all default footer elements', () => {
  const { container } = renderComponent();
  const copyright = container.querySelector<HTMLLIElement>('li:first-child');
  const today = new Date();
  expect(copyright?.textContent).toBe(
    `© ${today.getFullYear()} Bentley Systems, Incorporated`,
  );
  const allLi = container.querySelectorAll<HTMLAnchorElement>('li > a');
  allLi.forEach((element, i) => {
    expect(element).toBeTruthy();
    expect(element.textContent).toBe(urls[i].title);
    expect(element.href).toBe(urls[i].url);
    expect((element.previousSibling as HTMLSpanElement).classList).toContain(
      'iui-separator',
    );
  });
});

it('should show all default and custom footer elements', () => {
  const { container } = renderComponent({ customElements: customUrls });
  const copyright = container.querySelector<HTMLLIElement>('li:first-child');
  const today = new Date();
  expect(copyright?.textContent).toBe(
    `© ${today.getFullYear()} Bentley Systems, Incorporated`,
  );
  const allData = [...urls, ...customUrls];
  allData.forEach((element) => {
    const link = screen.getByText(element.title) as HTMLAnchorElement;
    if (element.url) {
      expect(link.href).toBe(element.url);
    }
  });
});

it('should not show default footer elements', () => {
  const { container } = renderComponent({
    customElements: () => customUrls,
  });
  const allLi = container.querySelectorAll<HTMLAnchorElement>('li > a');
  allLi.forEach((element, i) => {
    expect(element).toBeTruthy();
    expect(element.textContent).toBe(customUrls[i].title);
    expect(element.href).toBe(customUrls[i].url);
    if (i > 0) {
      expect((element.previousSibling as HTMLSpanElement).classList).toContain(
        'iui-separator',
      );
    } else {
      expect(element.previousSibling as HTMLSpanElement).toBeNull();
    }
  });
});

it('should propagate classname and style props correctly', () => {
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
