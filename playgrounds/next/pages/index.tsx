import { Breadcrumbs, Button } from '@itwin/itwinui-react';
import Link from 'next/link.js';

export default function Home() {
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Item key={0} href='/'>
          as=undefined
        </Breadcrumbs.Item>
        <Breadcrumbs.Item
          as={Link}
          key={1}
          href='/?path=/docs/core-breadcrumbs'
        >
          as=Link
        </Breadcrumbs.Item>
        <Breadcrumbs.Item key={2}>Non link Breadcrumbs.Item</Breadcrumbs.Item>
      </Breadcrumbs>
    </>
  );
}
