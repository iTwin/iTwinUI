// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/footer.css';
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';

export type TitleTranslations = {
  termsOfService: string;
  privacy: string;
  termsOfUse: string;
  cookies: string;
  legalNotices: string;
};

export type FooterProps = {
  /**
   * Customize footer elements.
   */
  customElements?: FooterElement[];
  /**
   * Provide localized strings.
   */
  translatedTitles?: TitleTranslations;
};

export type FooterElement = {
  /**
   * Title of the footer element.
   */
  title: string;
  /**
   * URL of the footer element.
   */
  url?: string;
};

const footerTranslations: TitleTranslations = {
  cookies: 'Cookies',
  legalNotices: 'Legal notices',
  privacy: 'Privacy',
  termsOfService: 'Terms of service',
  termsOfUse: 'Terms of use',
};

/**
 * Footer element with all needed legal and info links.
 * @example
 * <Footer customElements={[{title: 'Bentley', url: 'https://www.bentley.com/'}]} />
 */
export const Footer: React.FC<FooterProps> = ({
  customElements,
  translatedTitles,
}) => {
  useTheme();

  const today = new Date();
  const titles = { ...footerTranslations, ...translatedTitles };
  const defaultElements = [
    {
      title: titles.termsOfService,
      url:
        'https://connect-agreementportal.bentley.com/AgreementApp/Home/Eula/view/readonly/BentleyConnect',
    },
    { title: titles.privacy, url: 'https://www.bentley.com/en/privacy-policy' },
    {
      title: titles.termsOfUse,
      url:
        'https://www.bentley.com/en/terms-of-use-and-select-online-agreement',
    },
    { title: titles.cookies, url: 'https://www.bentley.com/en/cookie-policy' },
    { title: titles.legalNotices, url: 'https://connect.bentley.com/Legal' },
  ];
  const elements = customElements
    ? [...defaultElements, ...customElements]
    : defaultElements;

  return (
    <footer className='iui-legal-footer'>
      <ul>
        <li>© {today.getFullYear()} Bentley Systems, Incorporated</li>
        {elements.map((element, index) => {
          return (
            <li key={`${element.title}-${index}`}>
              <span className='iui-footer-separator' />
              {element.url ? (
                <a href={element.url} target='_blank' rel='noreferrer'>
                  {element.title}
                </a>
              ) : (
                element.title
              )}
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
