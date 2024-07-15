import { Breadcrumbs, Button } from '@itwin/itwinui-react';

export default function BreadcrumbsTest() {
  const items = Array(5)
    .fill(null)
    .map((_, index) => (
      <Breadcrumbs.Item key={index} data-testid='item'>
        Item {index}
      </Breadcrumbs.Item>
    ));

  return (
    <>
      <div id='container'>
        <Breadcrumbs
          overflowButton={(visibleCount: number) => {
            return <Button styleType='borderless'>{visibleCount}</Button>;
          }}
        >
          {items}
        </Breadcrumbs>
      </div>
    </>
  );
}
