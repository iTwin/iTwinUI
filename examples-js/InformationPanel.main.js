/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  Button,
  InformationPanel,
  InformationPanelBody,
  InformationPanelContent,
  InformationPanelHeader,
  InformationPanelWrapper,
  Input,
  Label,
  Table,
  Text,
} from '@itwin/itwinui-react';
import * as React from 'react';
export default () => {
  const [openRowIndex, setOpenRowIndex] = React.useState(1);
  return React.createElement(
    InformationPanelWrapper,
    null,
    React.createElement(Table, {
      columns: [
        { id: 'name', Header: 'Name', accessor: 'name' },
        {
          Header: 'Details',
          Cell: ({ row }) =>
            React.createElement(
              Button,
              { onClick: () => setOpenRowIndex(row.index) },
              'Details',
            ),
        },
      ],
      data: [...Array(3).fill(null)].map((_, index) => ({
        name: `Row${index}`,
      })),
      emptyTableContent: 'No data.',
      style: { minWidth: '450px' },
    }),
    React.createElement(
      InformationPanel,
      { isOpen: openRowIndex != undefined && openRowIndex !== -1 },
      React.createElement(
        InformationPanelHeader,
        { onClose: () => setOpenRowIndex(-1) },
        React.createElement(
          Text,
          { variant: 'subheading' },
          'Row ',
          openRowIndex ?? 0,
        ),
      ),
      React.createElement(
        InformationPanelBody,
        null,
        React.createElement(
          InformationPanelContent,
          { displayStyle: 'inline' },
          React.createElement(Label, { htmlFor: 'name-input' }, 'File name'),
          React.createElement(Input, {
            size: 'small',
            id: 'name-input',
            value: `Row ${openRowIndex ?? 0}`,
            readOnly: true,
          }),
          React.createElement(Label, { htmlFor: 'author-input' }, 'Author'),
          React.createElement(Input, {
            size: 'small',
            id: 'author-input',
            defaultValue: 'DJ Terry',
            readOnly: true,
          }),
          React.createElement(Label, { htmlFor: 'year-input' }, 'Year'),
          React.createElement(Input, {
            size: 'small',
            id: 'year-input',
            defaultValue: '2021',
            readOnly: true,
          }),
        ),
      ),
    ),
  );
};
