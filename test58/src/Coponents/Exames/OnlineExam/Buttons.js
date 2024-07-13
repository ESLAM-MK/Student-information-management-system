import React from 'react';

export default function Buttons({handleSubmit}) {
  return (
    <div>
      <div className="buttons pb-5 m-0 mt-5 flex flex-wrap  justify-center md:justify-end ">
        <button onClick={(e)=>handleSubmit(e)} className="inline-block align-middle text-center select-none  font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-3 save-btn w-full lg:py-2 md:w-1/5 pr-4 pl-4  uppercase md:mx-auto lg:mx-0 fw-semibold">
          submit
        </button>
      </div>
    </div>
  );
}
