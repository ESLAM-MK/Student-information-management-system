import React from 'react';

export default function WrittenQuestions({ Question,WrittenAnswer,mark,mcqAnswers,questionType,id,HandleClickWritten }) {
  return (
    <div>
      {/*  start Questions   */}
      <div className="flex  flex-col	 text-white bg-black bg-opacity-90 rounded  w-full m-0 p-6  my-5  capitalize ">
        <div className="lg:mt-1 mt-0 ">
          <p className=" lg:my-4 mt-0 ques-num">question {Number(id)+1}</p>
          <h5 className="mb-4 ques-title text-xl">{Question}</h5>
        </div>
        <input type='text' placeholder='Write Your Answer'  onChange={(e)=>HandleClickWritten(e,id)} className='w-1/2 outline-0 text-black p-2 rounded'/>
        <div className="flex justify-end items-end ">
          <p className="lg:me-0 me-3 ">Mark : {mark}</p>
        </div>
      </div>
    </div>
  );
}
