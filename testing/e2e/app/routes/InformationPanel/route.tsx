import { SvgDockBottom, SvgDockRight } from '@itwin/itwinui-icons-react';
import {
  IconButton,
  InformationPanel,
  InformationPanelBody,
  InformationPanelHeader,
  InformationPanelWrapper,
} from '@itwin/itwinui-react';
import React from 'react';

const Resizing = () => {
  const [isVertical, setIsVertical] = React.useState(true);

  return (
    <>
      <InformationPanelWrapper
        style={{ height: '100%' }}
        id={'InformationPanelWrapper'}
      >
        <InformationPanel
          isOpen={true}
          orientation={isVertical ? 'vertical' : 'horizontal'}
          id={'InformationPanel'}
        >
          <InformationPanelHeader
            actions={[
              <IconButton
                label={isVertical ? 'Pin to bottom' : 'Pin to right'}
                styleType='borderless'
                onClick={() => setIsVertical((cur) => !cur)}
              >
                {isVertical ? <SvgDockBottom /> : <SvgDockRight />}
              </IconButton>,
            ]}
          />
          <InformationPanelBody />
        </InformationPanel>
      </InformationPanelWrapper>
    </>
  );
};

export default Resizing;
