import { useState, useEffect } from "react";

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthChecked(true);
    // setTimeout(() => {
    //   setAuthChecked(true);
    // }, 2000);
  }, []);

  return authChecked;
};

export default useAuthCheck;
