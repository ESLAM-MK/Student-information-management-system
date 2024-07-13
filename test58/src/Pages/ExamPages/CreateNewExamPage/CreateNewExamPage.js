import React, { useState } from 'react';
import './main.css';
import Title from '../../../Coponents/Exames/CreateExam/Title';
import ExamInfo from '../../../Coponents/Exames/CreateExam/ExamInfo';
import Buttons from '../../../Coponents/Exames/CreateExam/Buttons';
import AddAndDeleteBtn from '../../../Coponents/Exames/CreateExam/AddAndDeleteBtn';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { baseApiURL } from '../../../baseUrl';
import axios from 'axios';
export default function CreateNewExamPage() {
  // state object form field
  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');
  const [semester, setsemester] = useState('');
  const [fullMark, setFullMark] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [Question, setQuestion] = useState('');
  const [mark, setmark] = useState('');
  const [questionType, setquestionType] = useState(false);
  // const [image, setimage] = useState('');
  // const [WrittenAnswer, setwrettenAnswer] = useState('');
  const [mcqAnswers, setmcqAnswers] = useState([]); 
  const [allquestions,setallquestions]=useState([])
  // handle state change
  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
    // console.log(courseName);
  };
  const handlesemsterChange = (e) => {
    setsemester(e.target.value);
    // console.log(semester);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
    // console.log(level);
  };
  const handleFullMarkChange = (e) => {
    setFullMark(e.target.value);
    // console.log(fullMark);
  };
  const handleDateChange = (e) => {
    let x = e.target.value
    setDate(x);
    // console.log(date);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
    // console.log(time);
  };
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    // console.log(duration);
  };


    // 

    // const handleQuestionDelete = (index)=>{
    //   console.log(allquestions);
    //   console.log(index);
    //   delete allquestions[index]
    //   console.log(allquestions);

    // }
  // Qusetion
  const handleQuestionChange = (e,id) => {
    // setQuestion(e.target.value);
    setallquestions({...allquestions,[id-1]:{...allquestions[id-1],Question:e.target.value}})
    
  };

  const handleMcqAnswers=(event,id)=>{
    // setmcqAnswers(event)
    setallquestions({...allquestions,[id-1]:{...allquestions[id-1],mcqAnswers:event}})
    // console.log(allquestions);
  }
  const handleMarkChange = (e,id) => {
    // setmark(e.target.value);
    setallquestions({...allquestions,[id-1]:{...allquestions[id-1],mark:e.target.value}})
  };
  const handleSelectChange = (event,id) => {
    const selectedValue = event.target.value;
    setquestionType(selectedValue === 'mcq');
    setallquestions({...allquestions,[id-1]:{...allquestions[id-1],questionType:event.target.value}})
  };
  // console.log(allquestions);
  // const handleWrittenAnswerChange = (e,id) => {
  //   // setwrettenAnswer(e.target.value);
  //   console.log(id);
  //   setallquestions({...allquestions,[id-1]:{...allquestions[id-1],WrittenAnswer:e.target.value}})
  // };
  // const handleImageChange = (e) => {
  //   setimage(e.target.files[0]);
  // };

  let DateTo = new Date()
  let fullDate  = DateTo.toLocaleDateString("en-ca")

  // console.log(allquestions);
  // handle submit event
  const handleSubmit = (e) => {
    const createData = {  };
    if (
      courseName === '' ||
      level === '' ||
      fullMark === '' ||
      date === '' ||
      time === '' ||
      duration === '' 
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
      createData.time= time;
      createData.duration= duration;
      // createData.question= Question;
      // createData.mark= mark;
      // createData.questionType =questionType;
      // createData.semester =semester;
      createData.allquestions= allquestions
      // createData.image image;
      
      toast.dismiss();
      toast.success("Data Saved Correctly");
      // console.log(createData);
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/Exams/addExams`,createData, {
          headers: headers,
        })
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        }); 
      window.location.reload()
    }
  };

  return (
  
    <>
      <div className='bg-black bg-opacity-90'>

      <div className="container mx-auto mb-5 pb-5">
      <p> 
        
  
      
    </p>
        <Title
          title={'create new exam'}
          subTitle={'add exam details'}
          date={fullDate}
          btnTitle={'puplish'}
        />
        <ExamInfo
          courseName={courseName}
          handleCourseNameChange={handleCourseNameChange}
          level={level}
          semester={semester}
          handleLevelChange={handleLevelChange}
          fullMark={fullMark}
          handleFullMarkChange={handleFullMarkChange}
          date={date}
          handleDateChange={handleDateChange}
          time={time}
          handleTimeChange={handleTimeChange}
          duration={duration}
          handleDurationChange={handleDurationChange}
          handlesemsterChange={handlesemsterChange}
        />
        <div class="main-questions">
          <AddAndDeleteBtn
            question={Question}
            handleQuestionChange={handleQuestionChange}
            mark={mark}
            handleMarkChange={handleMarkChange}
            questionType={questionType}
            handleSelectChange={handleSelectChange}
            // image={image}
            // handleImageChange={handleImageChange}
            // WrittenAnswer={WrittenAnswer}
            // handleWrittenAnswerChange={handleWrittenAnswerChange}
            handleMcqAnswers={handleMcqAnswers}
            mcqAnswers= {mcqAnswers}
            allquestions={allquestions}
          />
          <Buttons handleSubmit={handleSubmit} />
        </div>
      </div>
      </div>
    </>
  );
}
