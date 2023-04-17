/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, SelectOption } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState('');

  const courses = React.useMemo(
    () => [
      { label: 'User Interface Design', value: '6620', hasPrereq: false },
      { label: 'Machine Learning', value: '6630', hasPrereq: false },
      { label: 'Quality Assurance', value: '5710', hasPrereq: true },
      { label: 'Data mining', value: '5130', hasPrereq: true },
      { label: 'Digital Forensics', value: '5350', hasPrereq: true },
      { label: 'Wireless and Mobile Networks', value: '3370', hasPrereq: true },
      { label: 'Software Reverse Engineering', value: '7720', hasPrereq: false },
      { label: 'Web Application Development', value: '5000', hasPrereq: true },
      { label: 'Database Systems', value: '5120', hasPrereq: true },
    ],
    []
  );

  const options = React.useMemo(
    () =>
      courses.map(
        (course, index) =>
          ({
            ...course,
            sublabel: `COMP ${course.value}${course.hasPrereq ? ' - needs pre-requisite' : ''}`,
            disabled: course.hasPrereq,
          } as SelectOption<string>)
      ),
    []
  );

  return (
    <ComboBox
      options={options}
      value={value}
      onChange={setValue}
      inputProps={{ placeholder: 'Select elective' }}
    />
  );
};
