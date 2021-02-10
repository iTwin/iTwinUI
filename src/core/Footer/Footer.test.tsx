// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Footer, FooterElement } from './Footer';

const renderComponent = (elements?: FooterElement[]) => {
  return render(<Footer customElements={elements} />);
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

describe('Footer', () => {
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
    });
  });

  it('should show all default footer elements', () => {
    const customUrls: FooterElement[] = [
      {
        title: 'Custom link',
        url: 'https://www.bentley.com/',
      },
      {
        title: 'Products link',
      },
    ];
    const { container } = renderComponent(customUrls);
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
});
