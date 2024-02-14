/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Footer, defaultFooterElements } from '@itwin/itwinui-react';
import { SvgSmileyHappyHollow } from '@itwin/itwinui-icons-react';

export default () => {
  const customItem = (
    <Footer.Item key='copyright'>
      <SvgSmileyHappyHollow className='custom-content-footer-smiley-svg' />
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
                <React.Fragment
                  key={element.key || `${element.title}-${index}`}
                >
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
                </React.Fragment>
              );
            }),
        ]}
      </Footer.List>
    </Footer>
  );
};
