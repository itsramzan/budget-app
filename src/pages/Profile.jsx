import React from "react";
import AvatarSection from "../components/Profile/AvatarSection";
import Details from "../components/Profile/Details";
import { useProfileQuery } from "../features/user/userApi";

const Profile = () => {
  const { isFetching, data, isError } = useProfileQuery();

  // Decide what to render
  let content = null;

  if (isFetching) content = <p>Loading...</p>;
  if (!isFetching && isError) content = <p>Something went wrong</p>;
  if (!isFetching && !isError && !data?.result) content = <p>No user found</p>;
  if (!isFetching && !isError && data?.result)
    content = (
      <>
        <AvatarSection data={data.result} />
        <Details data={data.result} />
      </>
    );

  return <div className="space-y-4">{content}</div>;
};

export default Profile;
