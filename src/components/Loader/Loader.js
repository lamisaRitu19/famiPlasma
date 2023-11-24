import React from "react";

const Loader = () => {
  return (
    <div className="text-center py-96">
      <span className="loading loading-ring loading-lg text-textRed"></span>
      <span className="loading loading-ring loading-lg text-textRed"></span>
      <span className="loading loading-ring loading-lg text-textRed"></span>
    </div>
  );
};

export default Loader;
