/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Get the portal container, create if it doesn't exist.
 */
function getContainer(containerId: string): HTMLElement {
  let container = document.getElementById(containerId);
  if (container === null) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }
  return container;
}

/**
 * Append the portal to the portal container.
 */
function appendElement(parentContainer: HTMLElement): HTMLElement {
  const element = document.createElement('div');
  parentContainer.appendChild(element);
  return element;
}

/**
 * Prop Description
 */
export type PortalProps = {
  /**
   * ID of container. Will not be removed from the dom, so keep it constant.
   * @default 'iui-react-portal-container'
   */
  parentId?: string;
};

/**
 * A higher order component for creating ReactDOM portals
 * +++++
 * {() => {
 *   const style = {
 *     backgroundColor: 'white',
 *     left: '50%',
 *     padding: 5,
 *     position: 'absolute'
 *   };
 *   return (
 *     <>
 *       <Portal>
 *         <span style={{...style, top: '50%'}}>I'm outside the dom tree!</span>
 *       </Portal>
 *       <Portal>
 *         <span style={{...style, top: '55%'}}>I'm in the same container div.</span>
 *       </Portal>
 *       <Portal parentId="different-container">
 *         <span style={{...style, top: '60%'}}>I'm in a different container.</span>
 *       </Portal>
 *     </>
 *   );
 * }}
 */
export class Portal extends React.Component<PortalProps> {
  private container: HTMLElement;
  private element: HTMLElement;

  constructor(props: PortalProps) {
    super(props);
    this.container = getContainer(
      props.parentId || 'iui-react-portal-container',
    );
    this.element = appendElement(this.container);
  }

  public componentWillUnmount(): void {
    this.container.removeChild(this.element);
  }

  public render(): JSX.Element {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

export default Portal;
