import ProfileHeader from "@components/organisms/profile/profile-header";
import ProfileSidebar from "@components/organisms/profile/profile-sidebar";
import UserEditMenu from "@components/organisms/profile/user-edit-menu";
import DashboardProvider from "@shared/context/dashboard.provider";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("profile") };
}

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
