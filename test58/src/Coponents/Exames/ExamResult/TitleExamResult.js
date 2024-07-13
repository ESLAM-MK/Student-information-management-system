import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const TitleExamResult = ({courseName,date,duration,time,level,fullMark}) => {
  let datato = new Date()
  let fullDate = datato.toLocaleDateString("es-CL")
  return (
    <div>
      <div className="online-exam-hvr pt-5 mx-2 lg:mx-0">
        <p className="capitalize mb-4 text-xl">
          <span className="hidden md:inline-block ">online</span> exam result
        </p>
        <div className="line-hvr"></div>
        <p className="mt-1 capitalize">{fullDate}</p>
      </div>
      {/*  start date and Introduction  */}
      <div className="lg:flex flex flex-wrap  lg:justify-between mx-2 lg:mx-0">
        {/*  start Introduction   */}
        <div className="w-full lg:w-1/2 mt-5  p-0">
          <h2 className="capitalize fw-bolder text-4xl font-bold">
            {courseName}
          </h2>
          <p className="fw-medium my-2">{fullMark} Marks </p>
        </div>
        {/*  end Introduction   */}
        {/*  start date ,time and duration  */}
        <div className="flex flex-wrap  fs-6 flex justify-between  w-full lg:w-2/5 pr-4 pl-4  m-0 p-0">
          {/*  start icon date and date card  */}
          <div className="card-dtd card-dtd1 bg-black bg-opacity-80 text-white   rounded  flex lg:justify-center lg:w-1/3 pr-4 pl-4 py-3 fw-medium">
            {/*  icon date  */}
            <div className="me-3 ms-1 mt-1 lg:mt-0">
              <FontAwesomeIcon icon={faCalendarDays} className="title-icon" />
            </div>
            <div  >
              <p>Date</p>
              
              <p className="my-2">{fullDate}</p>
            </div>
          </div>
          {/*  end icon date and date card  */}

        </div>
        {/*  end date ,time and duration  */}
      </div>
    </div>
  );
};

export default TitleExamResult;
