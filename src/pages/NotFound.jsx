import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full md:w-6/12 text-center space-y-4">
        <h1 className="text-3xl md:text-6xl font-bold">
          404 <span className="text-primary">Not Found</span>
        </h1>

        <p className="font-medium">Your requested page was not found!</p>

        <div className="flex justify-center items-center gap-4">
          <Link to="/" className="btn btn-outline btn-primary rounded-full">
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
