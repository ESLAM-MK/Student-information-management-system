import React, { useState } from 'react';

export default function Question({ Question,WrittenAnswer,mark,mcqAnswers,questionType,id,HandleClick }) {

  return (
    <div>
      {/*  start Questions   */}
      <div className="flex  flex-col	 text-white bg-black bg-opacity-90 rounded  w-full m-0 p-6  my-5  capitalize ">
        <div className="lg:mt-1 mt-0 ">
          <p className=" lg:my-4 mt-0 ques-num">question {Number(id)+1}</p>
          <h5 className="mb-2 ques-title text-xl">{Question}</h5>
          {/* <h5 className="mb-2 ques-title text-xl">{WrittenAnswer}</h5>
          <h5 className="mb-2 ques-title text-xl">{questionType}</h5> */}
          
        </div>
        {/* <div className="  flex  lg:mt-2  mt-0 lg:mb-4 mb-0">
          <img
            src={img}
            className={img ? 'img-ques rounded-4 mt-lg-2  mt-4 mb-4 ' : 'hidden'
 }
            alt="quesimg"
          />
        </div> */}
        <div className=" flex flex-col	 lg:w-3/5 pr-4 pl-4 mt-4 lg:mt-2  w-full  m-0 ">
        {mcqAnswers.map((e)=>{
          return <button  onClick={(e)=>HandleClick(e,id,mark)} type="button"   value={e.isCorrect} className="inline-block font-semibold align-middle text-center mb-3 font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline   py-2   answer-btn text-start">
            {e.value}
        </button>
        })}
          {/* <button
            type="button"
            className="inline-block align-middle text-center select-none hover:bg-black font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline py-2  answer-btn my-4 text-start"
          >
            {' '}
            B :{' '}
          </button>
          <button
            type="button"
            className="inline-block align-middle text-center select-none hover:bg-black font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline py-2  answer-btn mb-3 text-start"
          >
            {' '}
            C :{' '}
          </button> */}
        </div>
        <div className="flex justify-end items-end ">
          <p className="lg:me-0 me-3 ">Mark : {mark}</p>
        </div>
      </div>
    </div>
  );
}
