import React from "react";
import AvatarUploadModal from "./AvatarUploadModal";

const AvatarSection = ({ data }) => {
  const { avatarUrl, username, bio } = data;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-40 w-40 rounded-full ring-4 ring-primary"
          />
        ) : (
          <h3 className="h-40 w-40 rounded-full flex justify-center items-center text-6xl ring-4 ring-primary text-primary font-bold">
            {username.slice(0, 1)}
          </h3>
        )}
        <AvatarUploadModal />
      </div>

      <h3 className="text-2xl text-primary font-bold mt-2">{username}</h3>
      {bio && <p className="font-medium">{bio}</p>}
    </div>
  );
};

export default AvatarSection;
