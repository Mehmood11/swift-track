"use client";
import { IsFetching } from "@/components/custom-table/is-fetching";
import { useProfileListQuery } from "@/services/profile/profile-api";
import { ProfileSection } from ".";

export function MainProfile() {
  const { data, isLoading, isFetching }: any = useProfileListQuery(null);

  if (isLoading) {
    return <IsFetching isFetching={isFetching} />;
  }
  return <ProfileSection data={data} />;
}
