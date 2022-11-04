/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';

export default () => {
  return (
    <div>
      <ul className='iui-menu' role='menu'>
        <li className='iui-menu-content' role='presentation'>
          <div className='iui-text-leading'>Terry Rivers</div>
          <div className='iui-text-block iui-text-muted' style={{ marginBottom: '8px;' }}>
            terry.rivers@email.com
          </div>
          <div className='iui-input-with-icon' aria-expanded='false' aria-haspopup='listbox'>
            <div className='iui-select-button' tab-index='0' aria-expanded='false'>
              <span className='iui-content'>User</span>
            </div>
            <span className='iui-end-icon iui-actionable'>
              <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                <path d='m4.8067 6h6.3953a.27961.27961 0 0 1 .24043.44321l-3.1736 3.45707a.33969.33969 0 0 1 -.48085 0l-3.2217-3.45707a.26909.26909 0 0 1 .24042-.44321z'></path>
              </svg>
            </span>
          </div>
        </li>
        <li role='separator' className='iui-menu-divider'></li>
        <li className='iui-menu-item' role='menuitem' tab-index='-1' aria-haspopup='false'>
          <span className='iui-content'>
            <div className='iui-menu-label'>View profile</div>
          </span>
        </li>
        <li className='iui-menu-item' role='menuitem' tab-index='-1' aria-haspopup='false'>
          <span className='iui-content'>
            <div className='iui-menu-label'>Sign out</div>
          </span>
        </li>
      </ul>
    </div>
  );
};
