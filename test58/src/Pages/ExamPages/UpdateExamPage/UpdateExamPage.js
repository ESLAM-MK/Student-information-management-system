import React from 'react';
import Title from '../../../Coponents/Exames/CreateExam/Title';
import ExamInfo from '../../../Coponents/Exames/CreateExam/ExamInfo';
import AddAndDeleteBtn from '../../../Coponents/Exames/CreateExam/AddAndDeleteBtn';
import Buttons from '../../../Coponents/Exames/CreateExam/Buttons';

export default function UpdateExamPage() {
  return (
    <>
      <div class="main-overlay">
        <div class="container">
          <Title
            title={'Update exam'}
            subTitle={'update exam details'}
            date={'6th june 2023'}
            btnTitle={'save'}
          />
          <ExamInfo />
          <div class="main-questions">
            <AddAndDeleteBtn />
            <Buttons />
          </div>
        </div>
      </div>
    </>
  );
}
