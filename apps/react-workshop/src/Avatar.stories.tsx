/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getUserColor, Avatar } from '@itwin/itwinui-react';
import { SvgUser } from '@itwin/itwinui-icons-react';

export default {
  title: 'Avatar',
};

export const Basic = () => {
  return (
    <Avatar abbreviation='TR' backgroundColor={getUserColor('Terry Rivers')} />
  );
};

export const WithImage = () => {
  return (
    <Avatar
      size='large'
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
    />
  );
};

export const WithIcon = () => {
  return (
    <Avatar
      size='large'
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      image={<SvgUser />}
    />
  );
};

export const Sizes = () => {
  return (
    <div style={{ display: 'flex', gap: 4, placeItems: 'center' }}>
      <Avatar
        size='small'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
      <Avatar
        size='medium'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
      <Avatar
        size='x-large'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
    </div>
  );
};

export const Statuses = () => {
  return (
    <div style={{ display: 'flex', gap: 4, placeItems: 'center' }}>
      <Avatar
        size='large'
        status='online'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
      <Avatar
        size='large'
        status='offline'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
      <Avatar
        size='large'
        status='busy'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
      <Avatar
        size='large'
        status='away'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
    </div>
  );
};

export const CustomStatusTranslation = () => {
  return (
    <Avatar
      size='large'
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      status='away'
      translatedStatusTitles={{
        away: 'AFK',
        busy: 'Do not disturb!',
        offline: 'Disconnected',
        online: 'Available',
      }}
    />
  );
};
