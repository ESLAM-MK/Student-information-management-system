import React from 'react';
import './UpComingExamPagea.css';
import Title from '../../../Coponents/Exames/UpComingExamP/Title';
import ShowExams from '../../../Coponents/Exames/UpComingExamP/ShowUp';

export default function UpComingExamPagea() {
  return (
    <section className="py-6 md:py-12">
      <div className="container mx-auto px-4">
        <Title />
        <ShowExams />
        {/* <ShowPre /> */}
      </div>
    </section>
  );
}
