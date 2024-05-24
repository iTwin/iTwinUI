import type { MetaFunction } from '@remix-run/node';
import { Button } from '@itwin/itwinui-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix Playground' },
    {
      name: 'description',
      content: 'Playground for testing iTwinUI components in Remix.',
    },
  ];
};

export default function Index() {
  return (
    <>
      <Button>Hello World!</Button>
    </>
  );
}
