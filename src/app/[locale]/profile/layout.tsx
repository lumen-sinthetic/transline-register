import ProfileHeader from "@components/templates/profile/profile-header";
import ProfileSidebar from "@components/templates/profile/profile-sidebar";
import { PropsWithChildren } from "react";

function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ProfileHeader />
      <ProfileSidebar />
      {children}
    </>
  );
}

export default ProfileLayout;
