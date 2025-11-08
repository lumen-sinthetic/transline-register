import ProfileHeader from "@components/organisms/profile/profile-header";
import ProfileSidebar from "@components/organisms/profile/profile-sidebar";
import UserEditMenu from "@components/organisms/profile/user-edit-menu";
import DashboardProvider from "@shared/context/dashboard.provider";
import { PropsWithChildren } from "react";

function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <DashboardProvider>
      <ProfileHeader />
      <ProfileSidebar />
      <main className="pt-14">{children}</main>
      <UserEditMenu />
    </DashboardProvider>
  );
}

export default ProfileLayout;
