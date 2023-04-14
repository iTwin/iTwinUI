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
      { label: 'User Interface Design', value: '6620' },
      { label: 'Machine Learning', value: '6630' },
      { label: 'Quality Assurance', value: '5710' },
      { label: 'Data mining', value: '5130' },
      { label: 'Digital Forensics', value: '5350' },
      { label: 'Wireless and Mobile Networks', value: '3370' },
      { label: 'Software Reverse Engineering', value: '7720' },
      { label: 'Web Application Development', value: '5000' },
      { label: 'Database Systems', value: '5120' },
    ],
    []
  );

  const isDisabled = (courseNumber) => {
    return courseNumber >= 6000;
  };

  const options = React.useMemo(
    () =>
      courses.map(
        (course, index) =>
          ({
            ...course,
            sublabel: `COMP ${course.value}${
              isDisabled(course.value) ? ' - needs pre-requisite' : ''
            }`,
            disabled: isDisabled(course.value),
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
