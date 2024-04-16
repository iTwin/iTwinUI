import { ButtonGroup, IconButton } from '@itwin/itwinui-react';
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';
import { useSearchParams } from '@remix-run/react';

export default function ButtonGroupTest() {
  const [searchParams] = useSearchParams();

  const orientation = searchParams.get('orientation') || 'horizontal';

  return (
    <ButtonGroup role='toolbar' orientation={orientation as any}>
      <IconButton label='Button 1'>
        <SvgPlaceholder />
      </IconButton>
      <IconButton label='Button 2' isActive>
        <SvgPlaceholder />
      </IconButton>
      <IconButton disabled label='Button 3'>
        <SvgPlaceholder />
      </IconButton>
    </ButtonGroup>
  );
}
