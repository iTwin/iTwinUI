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
      <InformationPanelWrapper style={{ height: '100%' }}>
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
                id={'OrientationButton'}
              >
                {isVertical ? (
                  <SvgDockBottom data-testid='toggle-dock' />
                ) : (
                  <SvgDockRight data-testid='toggle-dock' />
                )}
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
