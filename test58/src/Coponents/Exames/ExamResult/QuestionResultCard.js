import React from 'react';

export default function QuestionResultCard({ title, numOfQuestion }) {
  return (
    <div className="flex flex-wrap  flex justify-between  items-center mt-3 m-0 p-0">
      <div className="Questions fw-semibold  mt-5 m-0 p-0  lg:mt-0   lg:w-2/5 pr-4 pl-4">
        <h4>{title}:</h4>
      </div>
      <div className=" lg:me-12 m-0 p-0 mt-1 lg:mt-0 lg:w-1/4 pr-4 pl-4 flex justify-center items-center">
        <button className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-question py-2  text-white fw-bold w-full flex justify-center items-center">
          {numOfQuestion}
        </button>
      </div>
    </div>
  );
}
