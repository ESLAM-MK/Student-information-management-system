import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { set_allquestions } from '../../../redux/actions';
function UpComingExams({courseName,date,duration,fullMark,level,time ,allquestions,semester,id}) {
  function addZero(i) {
    if (i < 10){i = "0" + i}
    return i;
  }
  const dispatch = useDispatch()
  let ExamFullDate = new Date(date.slice(0,4),Number(date.slice(5,7))-1,date.slice(8,10),time.slice(0,2),time.slice(3,5))
  const laterDate = ExamFullDate
  const today = Date.now()
  let TodayFullDate =  new Date(today)
  const TodaydateC = TodayFullDate.toISOString().slice(0,10)
  const ExamDateC = ExamFullDate.toISOString().slice(0,10)
  const TodayTimeXC = `${addZero(TodayFullDate.getHours())}:${addZero(TodayFullDate.getMinutes())}:${addZero(TodayFullDate.getSeconds())}`
  const ExamTimeXC = `${addZero(ExamFullDate.getHours())}:${addZero(ExamFullDate.getMinutes())}:${addZero(ExamFullDate.getSeconds())}`
  const [handleDate,sethandleDate] = useState(false)
  const [handlePervDate,sethandlePrevDate] = useState(false)
  const [handleFutDate,sethandleFutDate] = useState(false)
  const hanldeLaterTime = (h)=>{
    // console.log(examDate);
    return laterDate.setTime(laterDate.getTime() + (h*60*1000))
  }
  // console.log(ExamFullDate);
  // console.log(TodayFullDate);
  // console.log(TodaydateC);
  // console.log(ExamDateC);
  // console.log(TodayTimeXC);
  // console.log(ExamTimeXC);
  // console.log(TodayTimeXC == ExamTimeXC);
  useEffect(()=>{
    hanldeLaterTime(duration)
    // // console.log(laterDate);
    // console.log(laterDate);
    const laterDateNow = `${addZero(laterDate.getHours())}:${addZero(laterDate.getMinutes())}:${addZero(laterDate.getSeconds())}`

    // console.log(ExamTimeXC);
    // console.log(TodayTimeXC);
    // console.log(laterDateNow);
    // console.log(TodayTimeXC>ExamTimeXC);
    // console.log(time);
    // console.log(ExamDateC);
    // console.log(laterDateNow);
    // dispatch(
    //   set_allquestions({
    //     courseName:courseName,
    //     date:date,
    //     duration:duration,
    //     fullMark:fullMark,
    //     level:level,
    //     time:time,
    //     allquestions:allquestions,
    //     semester:semester,
    //     // laterDateNow:laterDateNow
    //   }))
    if(ExamDateC == TodaydateC &&  ExamTimeXC < TodayTimeXC  && TodayTimeXC < laterDateNow  ){
      sethandleDate(true)
    }

      

  },[allquestions,courseName,date,duration,fullMark,level,semester,time,dispatch,date,TodayTimeXC,ExamTimeXC])
  return (
    <>
    
      <div className="flex    m-0  mb-3 bg-black bg-opacity-70 lg:p-6 p-6 rounded ">
        <div className="lg:w-1/4 pr-4 pl-4 w-full text-white">
          <div className="mb-1">
            <FontAwesomeIcon icon={faCalendarDays} className="title-icon" />
            <span className=""> {date.slice(0,10)} </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faStopwatch} className="title-icon" />
            <span className=""> {time} </span>
          </div>
        </div>
        <div className="lg:w-1/3 pr-4 pl-4 w-full my-4 lg:my-0 text-white">
          <div>
            <h5 className=" capitalize "> <span className='ins-name'>Subject</span> : {courseName}</h5>
         
          </div>
        </div>
        <div className="lg:w-1/5 pr-4 pl-4 w-1/2 text-white bold ">
          <h5 className="  capitalize fw-semibold "><span className='ins-name'>Duration</span> : {duration} Min</h5>
        </div>
        <div className="lg:w-1/6 pr-4 pl-4 text-white  w-1/2">
        <h5 className="  capitalize fw-semibold "><span className='ins-name'>FullMark</span> : {fullMark}</h5>
        </div>
        <div className="lg:w-1/5 pr-4 pl-4 flex justify-center items-center  mt-2 lg:mt-0  lg:justify-end">
          <Link
            to={`/student/${courseName}/${date}/${duration}/${time}/${level}/${fullMark}/${semester}/${id}`}
            className="  flex justify-center items-center align-middle text-center select-none  font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline join-btn uppercase"
            style={handleDate ? {height:"40px"}:{height:"40px",pointerEvents:"none",backgroundColor:"gray"}}
            
          >
            join exam
          </Link>
        </div>
      </div>
    </>
  );
}

export default UpComingExams;
