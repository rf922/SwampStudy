import React from "react";

const Loading = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-300 border-r-transparent align-[-0.125em] motion-reduce:animate-none"
      role="status"
    ></div>
  );
};
export default Loading;
