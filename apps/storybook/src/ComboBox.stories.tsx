/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  ComboBox,
  ComboBoxProps,
  Label,
  MenuItem,
  StatusMessage,
  SelectOption,
  MenuItemSkeleton,
} from '@itwin/itwinui-react';
import { SvgCamera } from '@itwin/itwinui-icons-react';

export default {
  component: ComboBox,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    options: { control: { disable: true } },
    dropdownMenuProps: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 'clamp(300px, 50%, 100%)', minHeight: 380 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: { source: { excludeDecorators: true } },
  },
  title: 'Core/ComboBox',
} as Meta<ComboBoxProps<unknown>>;

const countriesList = [
  { label: 'Afghanistan', value: 'AF' },
  { label: 'Åland Islands', value: 'AX' },
  { label: 'Albania', value: 'AL' },
  { label: 'Algeria', value: 'DZ' },
  { label: 'American Samoa', value: 'AS' },
  { label: 'AndorrA', value: 'AD' },
  { label: 'Angola', value: 'AO' },
  { label: 'Anguilla', value: 'AI' },
  { label: 'Antarctica', value: 'AQ' },
  { label: 'Antigua and Barbuda', value: 'AG' },
  { label: 'Argentina', value: 'AR' },
  { label: 'Armenia', value: 'AM' },
  { label: 'Aruba', value: 'AW' },
  { label: 'Australia', value: 'AU' },
  { label: 'Austria', value: 'AT' },
  { label: 'Azerbaijan', value: 'AZ' },
  { label: 'Bahamas', value: 'BS' },
  { label: 'Bahrain', value: 'BH' },
  { label: 'Bangladesh', value: 'BD' },
  { label: 'Barbados', value: 'BB' },
  { label: 'Belarus', value: 'BY' },
  { label: 'Belgium', value: 'BE' },
  { label: 'Belize', value: 'BZ' },
  { label: 'Benin', value: 'BJ' },
  { label: 'Bermuda', value: 'BM' },
  { label: 'Bhutan', value: 'BT' },
  { label: 'Bolivia', value: 'BO' },
  { label: 'Bosnia and Herzegovina', value: 'BA' },
  { label: 'Botswana', value: 'BW' },
  { label: 'Bouvet Island', value: 'BV' },
  { label: 'Brazil', value: 'BR' },
  { label: 'British Indian Ocean Territory', value: 'IO' },
  { label: 'Brunei Darussalam', value: 'BN' },
  { label: 'Bulgaria', value: 'BG' },
  { label: 'Burkina Faso', value: 'BF' },
  { label: 'Burundi', value: 'BI' },
  { label: 'Cambodia', value: 'KH' },
  { label: 'Cameroon', value: 'CM' },
  { label: 'Canada', value: 'CA' },
  { label: 'Cape Verde', value: 'CV' },
  { label: 'Cayman Islands', value: 'KY' },
  { label: 'Central African Republic', value: 'CF' },
  { label: 'Chad', value: 'TD' },
  { label: 'Chile', value: 'CL' },
  { label: 'China', value: 'CN' },
  { label: 'Christmas Island', value: 'CX' },
  { label: 'Cocos (Keeling) Islands', value: 'CC' },
  { label: 'Colombia', value: 'CO' },
  { label: 'Comoros', value: 'KM' },
  { label: 'Congo', value: 'CG' },
  { label: 'Congo, The Democratic Republic of the', value: 'CD' },
  { label: 'Cook Islands', value: 'CK' },
  { label: 'Costa Rica', value: 'CR' },
  { label: "Cote D'Ivoire", value: 'CI' },
  { label: 'Croatia', value: 'HR' },
  { label: 'Cuba', value: 'CU' },
  { label: 'Cyprus', value: 'CY' },
  { label: 'Czech Republic', value: 'CZ' },
  { label: 'Denmark', value: 'DK' },
  { label: 'Djibouti', value: 'DJ' },
  { label: 'Dominica', value: 'DM' },
  { label: 'Dominican Republic', value: 'DO' },
  { label: 'Ecuador', value: 'EC' },
  { label: 'Egypt', value: 'EG' },
  { label: 'El Salvador', value: 'SV' },
  { label: 'Equatorial Guinea', value: 'GQ' },
  { label: 'Eritrea', value: 'ER' },
  { label: 'Estonia', value: 'EE' },
  { label: 'Ethiopia', value: 'ET' },
  { label: 'Falkland Islands (Malvinas)', value: 'FK' },
  { label: 'Faroe Islands', value: 'FO' },
  { label: 'Fiji', value: 'FJ' },
  { label: 'Finland', value: 'FI' },
  { label: 'France', value: 'FR' },
  { label: 'French Guiana', value: 'GF' },
  { label: 'French Polynesia', value: 'PF' },
  { label: 'French Southern Territories', value: 'TF' },
  { label: 'Gabon', value: 'GA' },
  { label: 'Gambia', value: 'GM' },
  { label: 'Georgia', value: 'GE' },
  { label: 'Germany', value: 'DE' },
  { label: 'Ghana', value: 'GH' },
  { label: 'Gibraltar', value: 'GI' },
  { label: 'Greece', value: 'GR' },
  { label: 'Greenland', value: 'GL' },
  { label: 'Grenada', value: 'GD' },
  { label: 'Guadeloupe', value: 'GP' },
  { label: 'Guam', value: 'GU' },
  { label: 'Guatemala', value: 'GT' },
  { label: 'Guernsey', value: 'GG' },
  { label: 'Guinea', value: 'GN' },
  { label: 'Guinea-Bissau', value: 'GW' },
  { label: 'Guyana', value: 'GY' },
  { label: 'Haiti', value: 'HT' },
  { label: 'Heard Island and Mcdonald Islands', value: 'HM' },
  { label: 'Holy See (Vatican City State)', value: 'VA' },
  { label: 'Honduras', value: 'HN' },
  { label: 'Hong Kong', value: 'HK' },
  { label: 'Hungary', value: 'HU' },
  { label: 'Iceland', value: 'IS' },
  { label: 'India', value: 'IN' },
  { label: 'Indonesia', value: 'ID' },
  { label: 'Iran, Islamic Republic Of', value: 'IR' },
  { label: 'Iraq', value: 'IQ' },
  { label: 'Ireland', value: 'IE' },
  { label: 'Isle of Man', value: 'IM' },
  { label: 'Israel', value: 'IL' },
  { label: 'Italy', value: 'IT' },
  { label: 'Jamaica', value: 'JM' },
  { label: 'Japan', value: 'JP' },
  { label: 'Jersey', value: 'JE' },
  { label: 'Jordan', value: 'JO' },
  { label: 'Kazakhstan', value: 'KZ' },
  { label: 'Kenya', value: 'KE' },
  { label: 'Kiribati', value: 'KI' },
  { label: "Korea, Democratic People'S Republic of", value: 'KP' },
  { label: 'Korea, Republic of', value: 'KR' },
  { label: 'Kuwait', value: 'KW' },
  { label: 'Kyrgyzstan', value: 'KG' },
  { label: "Lao People'S Democratic Republic", value: 'LA' },
  { label: 'Latvia', value: 'LV' },
  { label: 'Lebanon', value: 'LB' },
  { label: 'Lesotho', value: 'LS' },
  { label: 'Liberia', value: 'LR' },
  { label: 'Libyan Arab Jamahiriya', value: 'LY' },
  { label: 'Liechtenstein', value: 'LI' },
  { label: 'Lithuania', value: 'LT' },
  { label: 'Luxembourg', value: 'LU' },
  { label: 'Macao', value: 'MO' },
  { label: 'Macedonia, The Former Yugoslav Republic of', value: 'MK' },
  { label: 'Madagascar', value: 'MG' },
  { label: 'Malawi', value: 'MW' },
  { label: 'Malaysia', value: 'MY' },
  { label: 'Maldives', value: 'MV' },
  { label: 'Mali', value: 'ML' },
  { label: 'Malta', value: 'MT' },
  { label: 'Marshall Islands', value: 'MH' },
  { label: 'Martinique', value: 'MQ' },
  { label: 'Mauritania', value: 'MR' },
  { label: 'Mauritius', value: 'MU' },
  { label: 'Mayotte', value: 'YT' },
  { label: 'Mexico', value: 'MX' },
  { label: 'Micronesia, Federated States of', value: 'FM' },
  { label: 'Moldova, Republic of', value: 'MD' },
  { label: 'Monaco', value: 'MC' },
  { label: 'Mongolia', value: 'MN' },
  { label: 'Montserrat', value: 'MS' },
  { label: 'Morocco', value: 'MA' },
  { label: 'Mozambique', value: 'MZ' },
  { label: 'Myanmar', value: 'MM' },
  { label: 'Namibia', value: 'NA' },
  { label: 'Nauru', value: 'NR' },
  { label: 'Nepal', value: 'NP' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Netherlands Antilles', value: 'AN' },
  { label: 'New Caledonia', value: 'NC' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'Nicaragua', value: 'NI' },
  { label: 'Niger', value: 'NE' },
  { label: 'Nigeria', value: 'NG' },
  { label: 'Niue', value: 'NU' },
  { label: 'Norfolk Island', value: 'NF' },
  { label: 'Northern Mariana Islands', value: 'MP' },
  { label: 'Norway', value: 'NO' },
  { label: 'Oman', value: 'OM' },
  { label: 'Pakistan', value: 'PK' },
  { label: 'Palau', value: 'PW' },
  { label: 'Palestinian Territory, Occupied', value: 'PS' },
  { label: 'Panama', value: 'PA' },
  { label: 'Papua New Guinea', value: 'PG' },
  { label: 'Paraguay', value: 'PY' },
  { label: 'Peru', value: 'PE' },
  { label: 'Philippines', value: 'PH' },
  { label: 'Pitcairn', value: 'PN' },
  { label: 'Poland', value: 'PL' },
  { label: 'Portugal', value: 'PT' },
  { label: 'Puerto Rico', value: 'PR' },
  { label: 'Qatar', value: 'QA' },
  { label: 'Reunion', value: 'RE' },
  { label: 'Romania', value: 'RO' },
  { label: 'Russian Federation', value: 'RU' },
  { label: 'RWANDA', value: 'RW' },
  { label: 'Saint Helena', value: 'SH' },
  { label: 'Saint Kitts and Nevis', value: 'KN' },
  { label: 'Saint Lucia', value: 'LC' },
  { label: 'Saint Pierre and Miquelon', value: 'PM' },
  { label: 'Saint Vincent and the Grenadines', value: 'VC' },
  { label: 'Samoa', value: 'WS' },
  { label: 'San Marino', value: 'SM' },
  { label: 'Sao Tome and Principe', value: 'ST' },
  { label: 'Saudi Arabia', value: 'SA' },
  { label: 'Senegal', value: 'SN' },
  { label: 'Serbia and Montenegro', value: 'CS' },
  { label: 'Seychelles', value: 'SC' },
  { label: 'Sierra Leone', value: 'SL' },
  { label: 'Singapore', value: 'SG' },
  { label: 'Slovakia', value: 'SK' },
  { label: 'Slovenia', value: 'SI' },
  { label: 'Solomon Islands', value: 'SB' },
  { label: 'Somalia', value: 'SO' },
  { label: 'South Africa', value: 'ZA' },
  { label: 'South Georgia and the South Sandwich Islands', value: 'GS' },
  { label: 'Spain', value: 'ES' },
  { label: 'Sri Lanka', value: 'LK' },
  { label: 'Sudan', value: 'SD' },
  { label: 'Surilabel', value: 'SR' },
  { label: 'Svalbard and Jan Mayen', value: 'SJ' },
  { label: 'Swaziland', value: 'SZ' },
  { label: 'Sweden', value: 'SE' },
  { label: 'Switzerland', value: 'CH' },
  { label: 'Syrian Arab Republic', value: 'SY' },
  { label: 'Taiwan, Province of China', value: 'TW' },
  { label: 'Tajikistan', value: 'TJ' },
  { label: 'Tanzania, United Republic of', value: 'TZ' },
  { label: 'Thailand', value: 'TH' },
  { label: 'Timor-Leste', value: 'TL' },
  { label: 'Togo', value: 'TG' },
  { label: 'Tokelau', value: 'TK' },
  { label: 'Tonga', value: 'TO' },
  { label: 'Trinidad and Tobago', value: 'TT' },
  { label: 'Tunisia', value: 'TN' },
  { label: 'Turkey', value: 'TR' },
  { label: 'Turkmenistan', value: 'TM' },
  { label: 'Turks and Caicos Islands', value: 'TC' },
  { label: 'Tuvalu', value: 'TV' },
  { label: 'Uganda', value: 'UG' },
  { label: 'Ukraine', value: 'UA' },
  { label: 'United Arab Emirates', value: 'AE' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'United States', value: 'US' },
  { label: 'United States Minor Outlying Islands', value: 'UM' },
  { label: 'Uruguay', value: 'UY' },
  { label: 'Uzbekistan', value: 'UZ' },
  { label: 'Vanuatu', value: 'VU' },
  { label: 'Venezuela', value: 'VE' },
  { label: 'Viet Nam', value: 'VN' },
  { label: 'Virgin Islands, British', value: 'VG' },
  { label: 'Virgin Islands, U.S.', value: 'VI' },
  { label: 'Wallis and Futuna', value: 'WF' },
  { label: 'Western Sahara', value: 'EH' },
  { label: 'Yemen', value: 'YE' },
  { label: 'Zambia', value: 'ZM' },
  { label: 'Zimbabwe', value: 'ZW' },
];

const fetchOptions = async (): Promise<SelectOption<string>[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        countriesList.map((country) => ({
          ...country,
          sublabel: country.value,
          icon: (
            <img
              loading='lazy'
              style={{ width: 20, height: 15 }}
              src={`https://flagcdn.com/w20/${country.value.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${country.value.toLowerCase()}.png 2x`}
              alt=''
            />
          ),
        })),
      );
    }, 2000);
  });
};

export const Basic: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(() => countriesList, []);

  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      onChange={(value: string) => action(value ?? '')()}
      {...args}
    />
  );
};
Basic.args = {
  inputProps: { placeholder: 'Select a country' },
} as ComboBoxProps<string>;
Basic.argTypes = {
  value: { control: { disable: true } },
};

export const Controlled: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(() => countriesList, []);
  const [countryValue, setCountryValue] = React.useState<string>('CA');

  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      {...args}
      value={countryValue}
      onChange={(value: string) => {
        action(value)();
        setCountryValue(value);
      }}
    />
  );
};
Controlled.args = { ...Basic.args, value: 'CA' };

export const DisabledItems: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(
    () =>
      countriesList.map(
        (country, index) =>
          ({
            ...country,
            sublabel: `${country.value}${index % 2 ? ' -- disabled' : ''}`,
            disabled: index % 2 !== 0,
            icon: (
              <img
                loading='lazy'
                style={{ width: 20, height: 15 }}
                src={`https://flagcdn.com/w20/${country.value.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${country.value.toLowerCase()}.png 2x`}
                alt=''
              />
            ),
          } as SelectOption<string>),
      ),
    [],
  );
  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      onChange={(value: string) => action(value ?? '')()}
      {...args}
    />
  );
};
DisabledItems.args = { ...Basic.args };

export const WithLabel: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(() => countriesList, []);

  return (
    <>
      <Label htmlFor='combo-input'>Country</Label>
      <ComboBox
        options={options}
        onChange={(value: string) => action(value ?? '')()}
        inputProps={{
          id: 'combo-input', // passing id to inputProps so it can be used in Label htmlFor
          placeholder: 'Select a country',
        }}
        {...args}
      />
    </>
  );
};
WithLabel.args = {
  inputProps: { id: 'combo-input', placeholder: 'Select a country' },
} as ComboBoxProps<string>;

export const WithStatus: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(() => countriesList, []);

  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      onChange={(value: string) => action(value ?? '')()}
      status='negative'
      {...args}
    />
  );
};
WithStatus.args = {
  inputProps: { placeholder: 'Select a country' },
  status: 'negative',
};

export const CustomRenderer: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(() => countriesList, []);
  const [selectedValue, setSelectedValue] = React.useState('AF');

  const onChange = React.useCallback((value: string) => {
    action(value ?? '')();
    setSelectedValue(value);
  }, []);

  const itemRenderer = React.useCallback(
    ({ value, label }, { isSelected, id }) => (
      <MenuItem key={id} id={id} isSelected={isSelected} value={value}>
        <em
          style={{
            textTransform: 'uppercase',
            fontWeight: isSelected ? 'bold' : undefined,
          }}
        >
          {label}
        </em>
      </MenuItem>
    ),
    [],
  ) as NonNullable<ComboBoxProps<string>['itemRenderer']>;

  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      value={selectedValue}
      onChange={onChange}
      itemRenderer={itemRenderer}
      {...args}
    />
  );
};
CustomRenderer.args = {
  inputProps: { placeholder: 'Select a country' },
};

export const WithMessage: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(() => countriesList, []);

  return (
    <ComboBox
      options={options}
      message='This is a message'
      inputProps={{ placeholder: 'Select a country' }}
      onChange={(value: string) => action(value ?? '')()}
      {...args}
    />
  );
};
WithMessage.args = {
  inputProps: { placeholder: 'Select a country' },
  message: 'This is a message',
};

export const WithCustomMessageIcon: Story<Partial<ComboBoxProps<string>>> = (
  args,
) => {
  const options = React.useMemo(() => countriesList, []);

  return (
    <ComboBox
      options={options}
      message={
        <StatusMessage startIcon={<SvgCamera />}>
          This is a message
        </StatusMessage>
      }
      inputProps={{ placeholder: 'Select a country' }}
      onChange={(value: string) => action(value ?? '')()}
      {...args}
    />
  );
};
WithCustomMessageIcon.args = {
  inputProps: { placeholder: 'Select a country' },
  message: (
    <StatusMessage startIcon={<SvgCamera />}>This is a message</StatusMessage>
  ),
};

export const Loading: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const [options, setOptions] = React.useState<SelectOption<string>[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(true);

  const onChange = React.useCallback((value: string) => {
    action(value ?? '')();
    setSelectedValue(value);
  }, []);

  const emptyContent = React.useMemo(() => {
    return isLoading ? (
      <>
        {new Array(6).fill(null).map((_, index) => {
          return (
            <MenuItemSkeleton
              key={index}
              hasIcon
              hasSublabel
              contentWidth={`${Math.min(
                Math.max(Math.random() * 100, 25),
                60,
              )}%`}
            />
          );
        })}
      </>
    ) : (
      'No options found'
    );
  }, [isLoading]);

  return (
    <ComboBox
      inputProps={{ placeholder: 'Select a country' }}
      value={selectedValue}
      onChange={onChange}
      {...args}
      emptyStateMessage={emptyContent}
      options={options}
      onShow={React.useCallback(async () => {
        if (!isLoading) {
          return;
        }
        setOptions(await fetchOptions());
        setIsLoading(false);
      }, [isLoading])}
    />
  );
};
Loading.args = {
  inputProps: { placeholder: 'Select a country' },
};

export const Virtualized: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(() => countriesList, []);

  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      onChange={(value: string) => action(value ?? '')()}
      enableVirtualization
      {...args}
    />
  );
};
Virtualized.args = {
  inputProps: { placeholder: 'Select a country' },
  enableVirtualization: true,
} as ComboBoxProps<string>;
Virtualized.argTypes = {
  value: { control: { disable: true } },
};

export const MultipleSelect: Story<Partial<ComboBoxProps<string>>> = (args) => {
  const options = React.useMemo(() => countriesList, []);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
    'CA',
    'AX',
  ]);

  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      {...args}
      multiple
      value={selectedOptions}
      onChange={(selected, event) => {
        action(event.value + ' ' + event.type ?? '')();
        setSelectedOptions(selected);
      }}
    />
  );
};
