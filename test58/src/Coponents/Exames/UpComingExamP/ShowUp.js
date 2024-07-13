import React from 'react';
import UpComingExams from './UpComingExams';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { baseApiURL } from '../../../baseUrl';
import { set_allquestions } from '../../../redux/actions';
import ShowPre from './ShowPre';
import Heading from '../../../components/Heading';
import PreviousExams from './PreviousExams';
function ShowExams() {
  const [selected, setSelected] = useState("up");
  const dispatch = useDispatch();
  const [Exam,setExam] = useState()

  const userData = useSelector(state => state.userData);
  const fullname = userData.fullname;
  const employeeId = userData.enrollmentNo;
  const semester = userData.semester;
  const branch = userData.branch;
  let examFiltert= Exam?.filter((e1)=>e1.level===branch)
  useEffect(() => {
        axios
      .get(`${baseApiURL()}/Exams/getExams${semester}`)
      .then((response) => {
          let x = response.data.examFilter
          setExam(x);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, [dispatch]);
  useEffect(()=>{
    dispatch(
      set_allquestions({
        exmas:examFiltert
      }))
  },[Exam,dispatch])
  return (
    <>
        <div className="flex justify-between items-center w-full">
        <Heading title="Exams" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "up" && "border-b-2 "
            }text-yellow-500 px-4 py-2 text-white  rounded-sm mr-6`}
            onClick={() => setSelected("up")}
          >
            UpComingExam
          </button>
          <button
            className={`${
              selected === "pr" && "border-b-2  "
            }text-yellow-500 px-4 py-2 text-white rounded-sm`}
            onClick={() => setSelected("pr")}
          >
            PreviousExams
          </button>
        </div>
      </div>
      {selected === "up" && (
         <div className="my-5">
         <h4 className="mb-4 capitalize text-2xl text-yellow-500 mb-4">upcoming exams</h4>
           {Exam && examFiltert.map((e,index)=>{
             let {courseName,date,duration,fullMark,level,time ,allquestions,semester} = e
             let ExamFullDate = new Date(date.slice(0,4),Number(date.slice(5,7))-1,date.slice(8,10),time.slice(0,2),time.slice(3,5))
             const today = Date.now()
             let TodayFullDate =  new Date(today)
             const TodaydateC = TodayFullDate.toISOString().slice(0,10)
             const ExamDateC = ExamFullDate.toISOString().slice(0,10)
             if(TodaydateC <= ExamDateC){
               return <UpComingExams id={index} key={index} {...e}  />
             }
           })}
         </div>
      )}


{selected === "pr" && (
         <div className="my-5">
         <h4 className="mb-4 capitalize text-2xl text-yellow-500">previous exams</h4>
           {Exam && examFiltert.map((e,index)=>{
             let {courseName,date,duration,fullMark,level,time ,allquestions,semester} = e
             let ExamFullDate = new Date(date.slice(0,4),Number(date.slice(5,7))-1,date.slice(8,10),time.slice(0,2),time.slice(3,5))
             const today = Date.now()
             let TodayFullDate =  new Date(today)
             const TodaydateC = TodayFullDate.toISOString().slice(0,10)
             const ExamDateC = ExamFullDate.toISOString().slice(0,10)
             if(TodaydateC > ExamDateC){
               return <PreviousExams id={index} key={index} {...e}  />
             }
           })}
         </div>
      )}
    </>
  );
}

export default ShowExams;
