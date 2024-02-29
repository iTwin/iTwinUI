import type { MetaFunction } from '@remix-run/node';
import { Button } from '@itwin/itwinui-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <>
      <Button>Hello World!</Button>
    </>
  );
}
