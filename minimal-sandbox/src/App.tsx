import { Button } from '@itwin/itwinui-react';
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default function App() {
  return (
    <>
      <Button startIcon={<SvgPlaceholder />}>Hello world</Button>
    </>
  );
}
