import React from "react";
const heading = (props) => {
  return (
    <div className="flex justify-between items-center bg-gray-900 text-yellow-500 w-full">
      <p className="font-semibold text-3xl border-l-8 border-white pl-3">
        {props.title}
      </p>
    </div>
  );
};

export default heading;
