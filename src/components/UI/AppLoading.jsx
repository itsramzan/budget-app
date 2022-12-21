import React from "react";
import loadingGif from "../../assets/images/loading.gif";

const AppLoading = () => {
  return (
    <div className="h-screen w-full grid place-content-center">
      <div className="w-52">
        <img src={loadingGif} alt="" />
      </div>
    </div>
  );
};

export default AppLoading;
