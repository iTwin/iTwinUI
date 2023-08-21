/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Footer, FooterElement } from '@itwin/itwinui-react';

export default () => {
  const customElements = (defaultElements: FooterElement[]) => {
    const customUrls: Record<string, string> = {
      privacy: 'https://www.bentley.com/',
      cookies: 'https://www.bentley.com/',
      legalNotices: 'https://www.bentley.com/',
    };
    const translatedTitles: Record<string, string> = {
      termsOfService: 'Terms of service translated',
      privacy: 'Privacy translated',
      termsOfUse: 'Terms of use translated',
      cookies: 'Cookies translated',
      legalNotices: 'Legal notices translated',
    };
    const customElements: FooterElement[] = [
      {
        title: 'Custom Element 1',
        url: 'https://www.bentley.com/',
      },
      {
        title: 'Custom Element 2',
      },
    ];
    const customizedDefaultElements = defaultElements.map(
      ({ key, title, url }) => ({
        key: key,
        title: key ? translatedTitles[key] ?? title : title,
        url: key ? customUrls[key] ?? url : url,
      }),
    );
    return [...customizedDefaultElements, ...customElements];
  };
  return <Footer customElements={customElements} />;
};
