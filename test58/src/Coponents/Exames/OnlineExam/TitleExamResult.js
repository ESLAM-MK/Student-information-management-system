import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export default function TitleExamResult() {
  let dateto = new Date()
  let fullDate = dateto.toLocaleDateString("es-CL")
  return (
    <div>
      <div className="online-exam-hvr pt-5 mx-2 lg:mx-0">
        <p className="capitalize"> online exam </p>
        <div className="line-hvr"></div>
        <p className="mt-1 capitalize">{fullDate}</p>
      </div>
      {/*  start date and Introduction  */}
      <div className="lg:flex flex flex-wrap  lg:justify-between mx-2 lg:mx-0">
        {/*  start Introduction   */}
        <div className="w-full lg:w-1/2 pr-4 pl-4 p-0">
          <h2 className="capitalize fw-bolder">
            Introduction to React JS{' '}
          </h2>
          <p className="fw-medium my-2">Lev. 1, 20 Marks </p>
          <p>
            <span className=" fw-medium" style={{ color: '#BF9B30' }}>
              Instructor
            </span>{' '}
            : Tariq Ali{' '}
          </p>
        </div>
        {/*  end Introduction   */}
        {/*  start date ,time and duration  */}
        <div className="flex flex-wrap  fs-6 flex justify-between  w-full lg:w-2/5 pr-4 pl-4  m-0 p-0">
          {/*  start icon date and date card  */}
          <div className="card-dtd card-dtd1 bg-opacity-25 bg-black  flex lg:justify-center lg:w-1/3 pr-4 pl-4 py-3 fw-medium">
            {/*  icon date  */}
            <div className="me-3 ms-1 mt-1 lg:mt-0">
              <FontAwesomeIcon icon={faCalendarDays} className="title-icon" />
            </div>
            {/*  date  */}
            <div>
              <p>Date</p>
              <p className="my-2">Monday, June 5th</p>
            </div>
          </div>
          {/*  end icon date and date card  */}
          {/*  start icon time and time card  */}
          <div className="card-dtd card-dtd2 bg-opacity-25 bg-black flex mt-3 lg:justify-center lg:m-0  lg:w-1/3 pr-4 pl-4 py-3 fw-medium">
            {/*  icon time  */}
            <div className="me-3 mt-1 lg:mt-0">
              <FontAwesomeIcon icon={faClock} className="title-icon" />
            </div>
            {/*  time  */}
            <div>
              <p>Time</p>
              <p className="my-2">12:30 PM</p>
            </div>
          </div>
          {/*  end icon time and time card  */}
          {/*  start icon duration and duration card  */}
          <div className="card-dtd card-dtd3 bg-opacity-25 bg-black flex mt-3 lg:justify-center lg:m-0 lg:w-1/3 pr-4 pl-4 pe-2 py-3 fw-medium">
            {/*  icon duration  */}
            <div className="me-3 mt-1 lg:mt-0">
              <FontAwesomeIcon icon={faStopwatch} className="title-icon" />
            </div>
            {/*  duration  */}
            <div>
              <p className="mt-0">duration</p>
              <p className="my-2">1 Hour</p>
            </div>
          </div>
          {/*  end icon duration and duration card  */}
        </div>
        {/*  end date ,time and duration  */}
      </div>
    </div>
  );
}
