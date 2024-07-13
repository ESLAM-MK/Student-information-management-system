import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";

const Marks = () => {
  const { userData } = useSelector((state) => state);
  const [external, setExternal] = useState([]);
  const [subject, setSubject] = useState([]);

  let successSubject = 0;
  let failSubject = 0;
  let allSubject = 0;
  let TotalDegree = 0;
  let subjectDegree = 0;

  const getSubjectData = () => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getSubjectData();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `http://localhost:5000/api/marks/getMarks`,
        { enrollmentNo: userData.enrollmentNo },
        { headers: headers }
      )
      .then((response) => {
        if (response.data && response.data.Mark && response.data.Mark.length > 0) {
          setExternal(response.data.Mark[0].external);
        }
      })
      .catch((error) => {
        toast.dismiss();
        // toast.error(error.response.data.message);
      });
  }, [userData.enrollmentNo]);

  return (
    <div className="max-w-[90%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title={`Marks of year ${userData.semester}`} />
      
      {external && external.length > 0 ? (
        <div className="mt-14 w-full flex flex-wrap">
          {external.map((e, index) => {
            allSubject++;
            return (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                {Object.keys(e).map((item, i) => {
                  let matchedSubject = subject.find((subj) => subj.name === item);
                  if (matchedSubject) {
                    TotalDegree += parseInt(matchedSubject.highmark ? matchedSubject.highmark : 0);
                    subjectDegree += parseFloat(e[item]);

                    if ((parseFloat(e[item]) / parseFloat(matchedSubject.highmark)) * 100 < 50) {
                      failSubject++;
                      return (
                        <div key={i} className="border border-red-500 shadow-md p-4 mb-5">
                          <p className="text-red-500 text-2xl font-semibold pb-2 flex justify-between">
                            <span>{((parseFloat(e[item]) / parseFloat(matchedSubject.highmark)) * 100).toFixed(2)}%</span>
                            <span className="text-xl font-semibold pb-2 flex justify-center text-red-500">Fail</span>
                          </p>
                          <div className="flex justify-between items-center w-full text-lg mt-2">
                            <p className="w-full text-yellow-500">{item}</p>
                            <span className="text-yellow-500">{e[item]}</span>
                          </div>
                        </div>
                      );
                    } else {
                      successSubject++;
                      return (
                        <div key={i} className="border border-green-500 shadow-md p-4 mb-5">
                          <p className="text-green-500 text-2xl font-semibold pb-2 flex justify-between">
                            <span>{((parseFloat(e[item]) / parseFloat(matchedSubject.highmark)) * 100).toFixed(2)}%</span>
                            <span className="text-xl font-semibold pb-2 flex justify-center text-green-500">Success</span>
                          </p>
                          <div className="flex justify-between items-center w-full text-lg mt-2">
                            <p className="w-full text-yellow-500">{item}</p>
                            <span className="text-yellow-500">{e[item]}</span>
                          </div>
                        </div>
                      );
                    }
                  }
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-yellow-500 mt-5">No Marks Available At The Moment!</p>
      )}

      {allSubject !== 0 && (
        <>
          <p className="border-b-2 border-blue-500 text-2xl font-semibold pb-2 flex justify-center">
            <span className="text-blue-500 m-5">Succeeded Subjects: {successSubject}</span>
            <span className="text-blue-500 m-5">Failed Subjects: {failSubject}</span>
          </p>
          <p className="border-b-2 border-blue-500 text-2xl font-semibold pb-2 flex justify-center">
            <span className="text-blue-500 m-5">Total Score: {parseFloat((subjectDegree / TotalDegree) * 100).toFixed(1)}%</span>
            <span className="text-blue-500 m-5">GPA: {parseFloat((subjectDegree / TotalDegree) * 4).toFixed(1)}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Marks;
