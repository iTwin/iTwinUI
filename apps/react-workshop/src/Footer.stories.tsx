/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Fragment } from 'react';
import {
  defaultFooterElements,
  Footer,
  type FooterElement,
} from '@itwin/itwinui-react';
import { SvgSmileyHappyHollow } from '@itwin/itwinui-icons-react';

export default {
  title: 'Footer',
};

export const Basic = () => {
  return <Footer translatedTitles={{ cookies: 'Cookies translated' }} />;
};

export const AppendedCustomElements = () => {
  return (
    <Footer
      customElements={[
        {
          title: 'Custom',
          url: 'https://www.bentley.com/',
        },
      ]}
    />
  );
};

export const OnlyCustomElements = () => {
  return (
    <Footer
      customElements={() => [
        { title: 'Custom Element 1', url: 'https://www.bentley.com/' },
        { title: 'Custom Element 2' },
        { title: 'Custom Element 3' },
        { title: 'Custom Element 4' },
      ]}
    />
  );
};

export const CustomizedDefaultAndCustomElements = () => {
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
      { title: 'Custom Element 1', url: 'https://www.bentley.com/' },
      { title: 'Custom Element 2' },
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

export const BottomFixed = () => {
  return (
    <div>
      <Footer style={{ position: 'fixed', bottom: 0 }} />
    </div>
  );
};

export const CustomContent = () => {
  const customItem = (
    <Footer.Item key='copyright'>
      <SvgSmileyHappyHollow style={{ width: 12, height: 12, marginRight: 4 }} />
      <span>Powered by Happiness © {new Date().getFullYear()}</span>
    </Footer.Item>
  );
  return (
    <Footer>
      <Footer.List>
        {[
          customItem,
          ...defaultFooterElements
            .filter((el) => el.key !== 'copyright')
            .flatMap((element, index) => {
              return (
                <Fragment key={element.key || `${element.title}-${index}`}>
                  <Footer.Separator />
                  <Footer.Item>
                    {element.url ? (
                      <a href={element.url} target='_blank' rel='noreferrer'>
                        {element.title}
                      </a>
                    ) : (
                      element.title
                    )}
                  </Footer.Item>
                </Fragment>
              );
            }),
          ,
        ]}
      </Footer.List>
    </Footer>
  );
};
