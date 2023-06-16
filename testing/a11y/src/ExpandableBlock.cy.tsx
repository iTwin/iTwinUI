import React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';

describe('Expandable Block', () => {
  it('mounts', () => {
    cy.mount(
      <div style={{ width: 'min(100%, 300px)' }}>
        <ExpandableBlock title='Expandable Block'>
          Content in block!
        </ExpandableBlock>
      </div>,
    );
  });
});
