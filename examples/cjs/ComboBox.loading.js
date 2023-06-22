'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var countriesList = React.useMemo(function () {
    return [
      { label: 'Afghanistan', value: 'AF' },
      { label: 'Åland Islands', value: 'AX' },
      { label: 'Albania', value: 'AL' },
      { label: 'Algeria', value: 'DZ' },
      { label: 'American Samoa', value: 'AS' },
      { label: 'Andorra', value: 'AD' },
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
  }, []);
  var fetchOptions = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          new Promise(function (resolve) {
            setTimeout(function () {
              resolve(
                countriesList.map(function (country) {
                  return __assign(__assign({}, country), {
                    sublabel: country.value,
                    icon: (
                      <img
                        loading='lazy'
                        style={{ width: 20, height: 15 }}
                        src={'https://flagcdn.com/w20/'.concat(
                          country.value.toLowerCase(),
                          '.png',
                        )}
                        srcSet={'https://flagcdn.com/w40/'.concat(
                          country.value.toLowerCase(),
                          '.png 2x',
                        )}
                        alt=''
                      />
                    ),
                  });
                }),
              );
            }, 2000);
          }),
        ];
      });
    });
  };
  var _a = React.useState([]),
    options = _a[0],
    setOptions = _a[1];
  var _b = React.useState(),
    selectedValue = _b[0],
    setSelectedValue = _b[1];
  var _c = React.useState(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var onChange = React.useCallback(function (value) {
    setSelectedValue(value);
  }, []);
  var emptyContent = React.useMemo(
    function () {
      return isLoading ? (
        <>
          {new Array(6).fill(null).map(function (_, index) {
            return (
              <itwinui_react_1.MenuItemSkeleton
                key={index}
                hasIcon
                hasSublabel
                contentWidth={''.concat(
                  Math.min(Math.max(Math.random() * 100, 25), 60),
                  '%',
                )}
              />
            );
          })}
        </>
      ) : (
        'No options found'
      );
    },
    [isLoading],
  );
  return (
    <itwinui_react_1.ComboBox
      inputProps={{ placeholder: 'Select a country' }}
      value={selectedValue}
      onChange={onChange}
      emptyStateMessage={emptyContent}
      options={options}
      onShow={React.useCallback(
        function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  if (!isLoading) {
                    return [2 /*return*/];
                  }
                  _a = setOptions;
                  return [4 /*yield*/, fetchOptions()];
                case 1:
                  _a.apply(void 0, [_b.sent()]);
                  setIsLoading(false);
                  return [2 /*return*/];
              }
            });
          });
        },
        [isLoading],
      )}
    />
  );
};
