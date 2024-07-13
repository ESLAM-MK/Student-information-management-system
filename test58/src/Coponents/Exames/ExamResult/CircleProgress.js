import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircleProgress = ({allAns,courseName,date,fullMark,level,mcqMark,semester,userId}) => {
  const percentage1 = (Number(mcqMark)/Number(fullMark))*100;
  const text = `${mcqMark}/${fullMark}`
  return (
    <>
      <div className="flex flex-wrap   flex justify-center  items-center m-0 p-0">
        <div className="progres-ovrly text-center lg:w-2/5 pr-4 pl-4">
          <div className="progres-circle my-5 relative">
            <CircularProgressbar
              value={percentage1}
              className="circle-progress-outside"
            />
            <CircularProgressbar
              value={percentage1}
              text={text}
              className="circle-progress-inside absolute start-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CircleProgress;
