import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { username } = user || {};

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full md:w-6/12 text-center space-y-4">
        {user ? (
          <>
            <h1 className="text-3xl md:text-6xl font-bold">
              Hey <span className="text-primary">{username}</span>
            </h1>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-6xl font-bold">
              Budget <span className="text-primary">App</span>
            </h1>
          </>
        )}

        <p className="font-medium">
          Track your income & expense totally free of cost!
        </p>

        <div className="flex justify-center items-center gap-4">
          <Link
            to={`${user ? "/budget" : "/register"}`}
            className="btn btn-outline btn-primary rounded-full"
          >
            {user ? "Add New Budget" : "Join Now"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
