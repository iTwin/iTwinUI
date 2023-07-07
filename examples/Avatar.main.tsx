/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Avatar, getUserColor } from '@itwin/itwinui-react';
import { SvgUser } from '@itwin/itwinui-icons-react';

const imgSrc =
  'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS5kYTRhN2U1ZWYsIDIwMjIvMTEvMjItMTM6NTA6MDcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMjIwM0I4MzlGNDMxMUVEQTc1MkVFQUU4NDhBOTQyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMjIwM0I4NDlGNDMxMUVEQTc1MkVFQUU4NDhBOTQyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyMjAzQjgxOUY0MzExRURBNzUyRUVBRTg0OEE5NDJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyMjAzQjgyOUY0MzExRURBNzUyRUVBRTg0OEE5NDJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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';

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--iui-size-s)',
        placeItems: 'center',
      }}
    >
      <Avatar
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        size='x-large'
        status='online'
      />
      <Avatar
        abbreviation='AU'
        backgroundColor={getUserColor('Anonymous user')}
        image={<SvgUser aria-hidden='true' />}
        title='Anonymous user'
        size='x-large'
        status='away'
      />
      <Avatar
        abbreviation='RR'
        backgroundColor={getUserColor('Robbie Robot')}
        image={<img src={imgSrc} alt='Profile picture of Robbie Robot.' />}
        title='Robbie Robot'
        size='x-large'
        status='busy'
      />
    </div>
  );
};
