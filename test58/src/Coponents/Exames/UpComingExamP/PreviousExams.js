import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseApiURL } from '../../../baseUrl';
import toast from 'react-hot-toast';

function PreviousExams({ courseName, date, duration, fullMark, level, time, allquestions, semester, id }) {
  const userData = useSelector(state => state.userData);
  const enrollmentNo = userData.enrollmentNo;
  const semester2 = userData.semester;
  const [ExamAns, setExamAns] = useState({});

  useEffect(() => {
    // Fetch exam answers or perform other side effects
  }, []);

  return (
    <>
      <div className="flex flex-wrap m-0 mb-3 bg-black bg-opacity-70 lg:p-6 p-4 rounded">
        <div className="lg:w-1/4 w-full text-white mb-2 lg:mb-0">
          <div className="mb-1 flex items-center">
            <FontAwesomeIcon icon={faCalendarDays} className="title-icon mr-2" />
            <span>{date.slice(0, 10)}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStopwatch} className="title-icon mr-2" />
            <span>{time}</span>
          </div>
        </div>
        <div className="lg:w-1/3 w-full my-2 lg:my-0 text-white">
          <h5 className="capitalize">
            <span className="ins-name">Subject</span>: {courseName}
          </h5>
        </div>
        <div className="lg:w-1/5 w-1/2 text-white font-semibold mb-2 lg:mb-0">
          <h5 className="capitalize">
            <span className="ins-name">Duration</span>: {duration} Min
          </h5>
        </div>
        <div className="lg:w-1/6 w-1/2 text-white font-semibold mb-2 lg:mb-0">
          <h5 className="capitalize">
            <span className="ins-name">FullMark</span>: {fullMark}
          </h5>
        </div>
        <div className="lg:w-1/5 w-full flex justify-end lg:justify-center items-start text-white">
          <Link
            to={`/examresult/${enrollmentNo}/${courseName}/${fullMark}/${date}`}
            className="text-gray-100 py-2 px-4 rounded"
            style={{ backgroundColor: '#bf9b30' }}
          >
            ShowExamResult
          </Link>
        </div>
      </div>
    </>
  );
}

export default PreviousExams;
