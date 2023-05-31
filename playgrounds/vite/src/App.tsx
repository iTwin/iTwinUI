import { ExpandableBlock } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <ExpandableBlock title='Expandable Block' caption='caption' disabled>
        Content in block!
      </ExpandableBlock>
    </div>
  );
};
