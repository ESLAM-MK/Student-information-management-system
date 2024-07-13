import React from 'react';
import './style.css';
import TitleExamResult from '../../../Coponents/Exames/ExamResult/TitleExamResult';
import TimerBar from '../../../Coponents/Exames/ExamResult/TimerBar';
import CircleProgress from '../../../Coponents/Exames/ExamResult/CircleProgress';
import QuestionResult from '../../../Coponents/Exames/ExamResult/QuestionResult';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function ExamResultPage() {
  const param = useParams()
  const subject = param.courseName
  const date = param.date
  const id = param.id
  const fullMark = param.fullMark
  const userData = useSelector(state => state.userData);
  let ExamAns = userData.ExamAns
    const answered = ExamAns?.filter((e)=>e.courseName === subject && e.date===date && e.fullMark  === fullMark && e.userId === id)
  let lastAns = Object.values(answered).pop()
  if(lastAns){
    return <>
     <div>
      <section className="">
        <div className="overlay text-light mb-5 pb-5"></div>
        <div className="container mx-auto">
          <TitleExamResult {...lastAns}/>
          <div className="mx-2 mx-lg-0  text-white mt-5 bg-black bg-opacity-80">
            <CircleProgress {...lastAns}/>
            <QuestionResult {...lastAns}/>
          </div>
        </div>
      </section>
    </div>
    </>
  }else{
    return<>
        <p className='text-center bg-red-700 text-white text-2xl mt-5 p-5'>Sorry , There is no answers for This exam</p>

    </>
  }
}

export default ExamResultPage;
