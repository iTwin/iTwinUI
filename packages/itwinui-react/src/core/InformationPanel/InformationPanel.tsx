/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useMergedRefs, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type InformationPanelProps = {
  /**
   * Is the panel open?
   * @default false
   */
  isOpen?: boolean;
  /**
   * Orientation of the panel.
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Set to false to make the panel non-resizable.
   * @default true
   */
  resizable?: boolean;
  /**
   * Content of the panel.
   */
  children?: React.ReactNode;
};

/**
 * InformationPanel provides a way to view additional content or attributes
 * without leaving the main content area (e.g. Table).
 *
 * The panel appears as an overlay on top of the main content.
 * @example
 * <InformationPanelWrapper>
 *   <Table ... /> // component to overlay
 *   <InformationPanel isOpen={true}>
 *     <InformationPanelHeader onClose={() => {}}>
 *       <Text variant='subheading'>InfoPanel heading</Text>
 *     </InformationPanelHeader>
 *     <InformationPanelBody>
 *       <Text>Metadata</Text>
 *       <InformationPanelContent ... />
 *       <Text>Attributes</Text>
 *       <InformationPanelContent ... />
 *     </InformationPanelBody>
 *   </InformationPanel>
 * </InformationPanelWrapper>
 */
export const InformationPanel = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    isOpen = false,
    orientation = 'vertical',
    resizable = true,
    children,
    ...rest
  } = props;

  const [infoPanelSize, setInfoPanelSize] = React.useState<{
    width: number | undefined;
    height: number | undefined;
  }>({ width: undefined, height: undefined });

  const infoPanelRef = React.useRef<HTMLDivElement>(null);
  const refs = useMergedRefs(forwardedRef, infoPanelRef);

  const startResize = (e: React.PointerEvent) => {
    if (!infoPanelRef.current) {
      return;
    }
    if (e.button != undefined && e.button !== 0) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    infoPanelRef.current.ownerDocument.addEventListener(
      'pointermove',
      onResize,
    );
    infoPanelRef.current.ownerDocument.addEventListener(
      'pointerup',
      () =>
        infoPanelRef.current?.ownerDocument.removeEventListener(
          'pointermove',
          onResize,
        ),
      { once: true },
    );
  };

  const onResize = React.useCallback(
    (e: PointerEvent) => {
      e.preventDefault();
      if (!infoPanelRef.current) {
        return;
      }
      const { right, bottom } = infoPanelRef.current.getBoundingClientRect();
      if (orientation === 'vertical') {
        setInfoPanelSize({ width: right - e.clientX, height: undefined });
      } else {
        setInfoPanelSize({ height: bottom - e.clientY, width: undefined });
      }
    },
    [orientation],
  );

  return (
    <Box
      className={cx(
        'iui-information-panel',
        {
          'iui-right': orientation === 'vertical',
          'iui-bottom': orientation === 'horizontal',
          'iui-visible': isOpen,
        },
        className,
      )}
      ref={refs}
      {...rest}
      style={{
        width: orientation === 'vertical' ? infoPanelSize.width : undefined,
        height: orientation === 'horizontal' ? infoPanelSize.height : undefined,
        ...props.style,
      }}
    >
      {resizable && (
        <Box className='iui-resizer' onPointerDown={startResize}>
          <Box className='iui-resizer-bar' />
        </Box>
      )}
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', InformationPanelProps>;
if (process.env.NODE_ENV === 'development') {
  InformationPanel.displayName = 'InformationPanel';
}
