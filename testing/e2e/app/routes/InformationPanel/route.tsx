import { SvgDockBottom, SvgDockRight } from '@itwin/itwinui-icons-react';
import {
  Blockquote,
  Button,
  DefaultCell,
  IconButton,
  InformationPanel,
  InformationPanelBody,
  InformationPanelHeader,
  InformationPanelWrapper,
  Table,
  Text,
} from '@itwin/itwinui-react';
import React from 'react';
import { useState } from 'react';

const Resizing = () => {
  const [isVertical, setIsVertical] = useState(true);

  return (
    <>
      <InformationPanelWrapper style={{ height: '100%' }}>
        <MyTable />
        <InformationPanel
          isOpen={true}
          orientation={isVertical ? 'vertical' : 'horizontal'}
          id={'InformationPanel'}
        >
          <InformationPanelHeader
            actions={[
              <IconButton
                label={isVertical ? 'Pin to bottom' : 'Pin to right'}
                styleType='borderless'
                onClick={() => setIsVertical((cur) => !cur)}
                id={'OrientationButton'}
              >
                {isVertical ? (
                  <SvgDockBottom data-testid='toggle-dock' />
                ) : (
                  <SvgDockRight data-testid='toggle-dock' />
                )}
              </IconButton>,
            ]}
          >
            <Text variant='subheading'>Useful information</Text>
          </InformationPanelHeader>
          <InformationPanelBody>
            <Blockquote>A group of owls is called a parliament.</Blockquote>
            <Blockquote>
              The population of the earth is about 8 billion people, but there
              are an estimated 10 quintillion (that's 10,000,000,000,000,000)
              ants!
            </Blockquote>
            <Blockquote>
              Ostriches can run faster than humans, but they can't walk
              backwards.
            </Blockquote>
            <Blockquote>
              Elephants communicate using low-frequency infrasound.
            </Blockquote>
          </InformationPanelBody>
        </InformationPanel>
      </InformationPanelWrapper>
    </>
  );
};

function MyTable(): JSX.Element {
  const columns = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        width: '40%',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        Cell: (props: { value: any }) => {
          return <>${props.value}</>;
        },
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        cellRenderer: (props: any) => {
          return (
            <DefaultCell
              {...props}
              status={props.cellProps.row.original.status}
            >
              {props.cellProps.row.original.rating}/5
            </DefaultCell>
          );
        },
      },
    ],
    [],
  );

  const generateItem = React.useCallback(
    (index: number, parentRow = '', depth = 0): any => {
      const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
      const rating = Math.round(Math.random() * 5);
      return {
        product: `Product ${keyValue}`,
        price: ((index % 10) + 1) * 15,
        quantity: ((index % 10) + 1) * 150,
        rating: rating,
        status:
          rating >= 4 ? 'positive' : rating === 3 ? 'warning' : 'negative',
        subRows:
          depth < 1
            ? Array(Math.round(index % 2))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = React.useMemo(
    () =>
      Array(20)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const rowProps = React.useCallback((row: any) => {
    return {
      status: row.original.status,
    };
  }, []);

  return (
    <Table
      style={{ height: '100%' }}
      columns={columns}
      emptyTableContent='No data.'
      data={data}
      rowProps={rowProps}
      density='condensed'
    />
  );
}

export default Resizing;
