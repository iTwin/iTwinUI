import { SideNavigation, SidenavButton } from '@itwin/itwinui-react';
import {
  SvgHome,
  SvgFlag,
  SvgFolderOpened,
  SvgSettings,
} from '@itwin/itwinui-icons-react';

export default function Page() {
  return (
    <SideNavigation
      items={[
        <SidenavButton startIcon={<SvgHome />} key={0}>
          Home
        </SidenavButton>,
        <SidenavButton startIcon={<SvgFlag />} key={1}>
          Issues
        </SidenavButton>,
        <SidenavButton startIcon={<SvgFolderOpened />} key={2} disabled>
          Documents
        </SidenavButton>,
      ]}
      secondaryItems={[
        <SidenavButton startIcon={<SvgSettings />} key={3}>
          Settings
        </SidenavButton>,
      ]}
    />
  );
}
