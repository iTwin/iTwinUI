import { Breadcrumbs } from '@itwin/itwinui-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Item key={0} onClick={() => console.log('Button clicked')}>
          button
        </Breadcrumbs.Item>
        <Breadcrumbs.Item key={1} href='/?path=page-refresh'>
          link (as=undefined)
        </Breadcrumbs.Item>
        <Breadcrumbs.Item
          as={Link}
          className='my-special-link'
          key={2}
          href='/?path=no-page-refresh'
        >
          link (as=Link)
        </Breadcrumbs.Item>
        <Breadcrumbs.Item key={3}>span 1</Breadcrumbs.Item>
        <Breadcrumbs.Item key={4}>span 2</Breadcrumbs.Item>
      </Breadcrumbs>
    </>
  );
}
