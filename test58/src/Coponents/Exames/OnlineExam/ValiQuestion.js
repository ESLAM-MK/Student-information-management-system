import React from 'react';
import Question from './Question';
import code1 from '../../../images/code-snap.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import WrittenQuestions from './WrittenQuestions';
import TimerBar from './TimerBar';
import { useNavigate } from 'react-router-dom';

export default function ValiQuestion({courseName,date,duration,time,level,fullMark,HandleClick,HandleClickWritten,id,handleSubmit}) {

  const navigate = useNavigate();
  //  create a timer object
  let duration1 = duration/60
  const [timeLeft, setTimeLeft] = useState(0);
  //   create a timer object effect

  // Handle Date 
  function addZero(i) {
    if (i < 10){i = "0" + i}
    return i;
  }
  let ExamFullDate = new Date(date.slice(0,4),Number(date.slice(5,7))-1,date.slice(8,10),time.slice(0,2),time.slice(3,5))
  const laterDate = ExamFullDate
  const today = Date.now()
  let TodayFullDate =  new Date(today)
  const TodaydateC = TodayFullDate.toISOString().slice(0,10)
  const ExamDateC = ExamFullDate.toISOString().slice(0,10)
  const TodayTimeXC = `${addZero(TodayFullDate.getHours())}:${addZero(TodayFullDate.getMinutes())}:${addZero(TodayFullDate.getSeconds())}`
  const ExamTimeXC = `${addZero(ExamFullDate.getHours())}:${addZero(ExamFullDate.getMinutes())}:${addZero(ExamFullDate.getSeconds())}`
  
  const ExamTimeLeftedXc = `${addZero(ExamFullDate.getHours())}:${addZero(ExamFullDate.getMinutes())}:${addZero(ExamFullDate.getSeconds())}`
  // Different between now and exam start
  let differentHour = (addZero(TodayFullDate.getHours()) - addZero(ExamFullDate.getHours()))
  let differentMin = (addZero(TodayFullDate.getMinutes()) - addZero(ExamFullDate.getMinutes()))
  let differentSec = (addZero(TodayFullDate.getSeconds()) - addZero(ExamFullDate.getSeconds()))
  let allDifferentSeconds = differentHour*60*60 + differentMin *60 + differentSec
  // width bar
  const barWidth = `${(allDifferentSeconds / (duration*60)) * 100}%`;

  const hanldeLaterTime = (h)=>{
    return laterDate.setTime(laterDate.getTime() + (h*60*1000))
  }

  const questionsData = useSelector(state => state.allquestions.exmas[id]);
  const questionsData1 = useSelector(state => state.allquestions);
  const allquestions = questionsData.allquestions[0]
    //
    useEffect(() => {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft + 1;
          localStorage.setItem('timeLeft', newTimeLeft.toString());
          return newTimeLeft;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }, []);
  
  
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }
  

    useEffect(() => {
      hanldeLaterTime(duration)
     let  laterDateNow = `${addZero(laterDate.getHours())}:${addZero(laterDate.getMinutes())}:${addZero(laterDate.getSeconds())}`
     
      if (TodayTimeXC >= laterDateNow) {
          handleSubmit()
      }
    }, [timeLeft, duration, navigate]);

  // const questions = [
  //   {
  //     id: 1,
  //     Question: 'choose the right option out the following :',
  //     img: code1,
  //     marks: '2 marks',
  //   },
  //   {
  //     id: 2,
  //     Question: 'what is the type used in the following exmple :',
  //     img: '',
  //     marks: '3 marks',
  //   },
  //   {
  //     id: 3,
  //     Question: 'what is the type of function  used in the following exmple :',
  //     img: "",
  //     marks: '2 marks',
  //   },
  //   {
  //     id: 4,
  //     Question: 'choose the right option out the following :',
  //     img: '',
  //     marks: '3 marks',
  //   },
  //   {
  //     id: 5,
  //     Question: 'choose the right option out the following :',
  //     img: '',
  //     marks: '3 marks',
  //   },
  // ];
  return (
    <>
      {/* {questions.map((ques, index) => {
        return <Question key={index} {...ques} />;
      })} */}
      {/* <TimerBar duration={duration/60} laterDateNow={laterDateNow?laterDateNow:"8"}  /> */}
       {/*  start bar timer  */}
       <div class="mt-lg-3 mt-5 mx-2 mx-lg-0">
        {/*  strat timer  */}
        <div class="me-lg-5 me-0">
          <h4 class=" text-end fw-medium">{formatTime(allDifferentSeconds)} Min</h4>
        </div>
        {/*  start bar  */}
        <div className="bg-white rounded mt-3">
          <div
            className="bar "
            style={{
              width: barWidth,
            }}
          />
        </div>
      </div>

      {Object.entries(allquestions).map(([key,value])=>{
       if(value.questionType==="mcq"){
        return <Question key={key} id={key} HandleClick={HandleClick} {...value} />;
       }else{
        return <WrittenQuestions key={key} HandleClickWritten={HandleClickWritten} id={key} {...value}/>
       }
      })}

    </>
  );
}
