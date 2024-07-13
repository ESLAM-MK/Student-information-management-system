import React, { useEffect } from 'react';
import './OnlineExamPage.css';
import TitleExamResult from '../../../Coponents/Exames/ExamResult/TitleExamResult';
import ValiQuestion from '../../../Coponents/Exames/OnlineExam/ValiQuestion';
import Buttons from '../../../Coponents/Exames/OnlineExam/Buttons';
import { useState } from 'react';
import TimerBar from '../../../Coponents/Exames/OnlineExam/TimerBar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { baseApiURL } from '../../../baseUrl';
import { useNavigate } from 'react-router-dom';
export default function OnlineExamPage() {
  const navigate = useNavigate();
  const userData = useSelector(state => state.userData);
  const param = useParams()
  const courseName = param.courseName
  const level = param.level
  const semester = param.semester
  const fullMark = param.fullMark
  const date = param.date
  const userId = userData.enrollmentNo
  // const fullname = userData.fullname
  const [written,serwritten]=useState([])
  let getMark ;
  const [markAns,setmarkAns] = useState([])
  const HandleClick=(e,id,mark)=>{
    console.log(e.target.textContent);
     getMark = JSON.parse(localStorage.getItem("marks"))
    var currentTarget = e.currentTarget;
    // Accessing siblings using DOM methods
    var siblings = Array.from(currentTarget.parentNode.children).filter(function(child) {
        return child !== currentTarget;
    });

    // Now 'siblings' is an array containing all the sibling elements
    siblings.forEach((e1)=>{
      e1.classList.remove("bg-red-500")
      e1.classList.add("answer-btn")
    })
    currentTarget.classList.add("bg-red-500")
    currentTarget.classList.remove("answer-btn")
    // console.log(e.target);

    if(e.target.value === "true"){
      setmarkAns(()=>{
        let x = getMark ? {...getMark,[id]:mark}:[]
        return x
      })
    }else{
      setmarkAns(()=>{
        let x = getMark ? {...getMark,[id]:0}:[]
        return x
      })
    }
    serwritten({...written,[id]:e.target.textContent})
  }
  localStorage.setItem("marks",JSON.stringify(markAns))


  const HandleClickWritten=(e,id)=>{
    serwritten({...written,[id]:e.target.value})
 }
 console.log(written);
 
 const handleSubmit=()=>{
  let mcqMark = 0;
  console.log(markAns);
    mcqMark = Object.values(markAns).reduce((key,value)=>{
    return Number(key) + Number(value)
  },0)
  // console.log(mcqMark);

  const createData = {  };
  if (
    courseName === '' ||
    level === '' ||
    fullMark === '' ||
    date === '' ||
    userId === ''
    // allquestions===""
  ) {
    alert("Please fill out all fields");
    return;
  } else {
    createData.courseName =courseName;
    createData.level= level;
    createData.semester= semester;
    createData.fullMark = fullMark;
    createData.date = date;
    createData.allAns= written
    createData.mcqMark= mcqMark
    createData.date= date
    createData.userId= userId
    
    toast.dismiss();
    toast.success("Data Saved Correctly");
    console.log(createData);
    // const headers = {
    //   "Content-Type": "application/json",
    // };
    axios
      .post(`${baseApiURL()}/Exams/addExamsAns`,createData,)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        toast.dismiss();
        console.error(error);
        toast.error(error.response.data.message);
      }); 
      localStorage.removeItem('timeLeft');
      navigate('/student');
  }

 }
 
  return (
    <div>
      <section className="">
        <div className="overlay text-light"></div>
        <div className="container mx-auto">
          <TitleExamResult  {...param}/>
          
          <ValiQuestion  HandleClick={HandleClick} handleSubmit={handleSubmit} HandleClickWritten={HandleClickWritten} {...param} />
          <Buttons handleSubmit={handleSubmit}/>
        </div>
      </section>
    </div>
  );
}
