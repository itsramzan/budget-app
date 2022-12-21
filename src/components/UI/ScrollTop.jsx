import React from "react";
import { BsJournalArrowUp } from "react-icons/bs";
import scrollTop from "../../utils/scrollTop";

const ScrollTop = () => {
  return (
    <div
      className="fixed bottom-3 right-3 text-primary z-50 cursor-pointer"
      onClick={scrollTop}
      title="Back to top"
    >
      <BsJournalArrowUp className="text-xl" />
    </div>
  );
};

export default ScrollTop;
