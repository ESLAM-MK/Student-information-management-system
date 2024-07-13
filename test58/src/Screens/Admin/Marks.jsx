import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";
import { useLocation } from "react-router-dom";

const Marks = () => {
  const router = useLocation();
  const [flag, setFlag] = useState(false);
  const [subject, setSubject] = useState();
  const [addition, setAddition] = useState(0);
  const [marks, setMarks] = useState();
  const [branch, setBranch] = useState();
  const [studentData, setStudentData] = useState();
  const [selected, setSelected] = useState({
    branch: "",
    semester: "",
    subject: "",
    highmark: "",
  });

  const loadStudentDetails = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { branch: selected.branch, semester: selected.semester },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setStudentData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const GetAllMarks = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/marks/getAllMarks`, { headers })
      .then((response) => {
        if (response.data.success) {
          setMarks(response.data.Mark);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const loadAdditionValue = (e) => {
    if (e.target.value) {
      setAddition(e.target.value);
    } else {
      setAddition(0);
    }
  };

  const setStudentMarksHandler = () => {
    if (addition) {
      setStudentMarks(selected.subject, addition);
    } else {
      toast.dismiss();
      toast.error("enter Valid Value");
    }
  };

  const setStudentMarks = (sub, value) => {
    setFlag((e) => !e);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/updateMarksBySubject`,
        {
          subject: sub,
          additionalDegree: value,
        },
        { headers }
      )
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getSubjectData = () => {
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
    getBranchData();
    getSubjectData();
    GetAllMarks();
  }, [flag]);

  const resetValueHandler = () => {
    setStudentData();
  };

  return (
    <div className="w-[90%] lg:w-[85%] mx-auto flex flex-col justify-center items-start my-10 section h-screen bg-gray-900">
      <div className="relative flex justify-between items-center w-full">
        <Heading title={`Upload Marks`} />
        {studentData && (
          <button
            className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
            onClick={resetValueHandler}
          >
            <span className="mr-2">
              <BiArrowBack className="text-red-500" />
            </span>
            Close
          </button>
        )}
      </div>
      {!studentData && (
        <>
          <div className="mt-10 w-full flex flex-col lg:flex-row justify-evenly items-center gap-x-6">
            <div className="w-full mb-4 lg:mb-0">
              <label
                htmlFor="branch"
                className="leading-7 text-base text-yellow-500"
              >
                Select Branch
              </label>
              <select
                id="branch"
                className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full mt-1"
                value={selected.branch}
                onChange={(e) =>
                  setSelected({ ...selected, branch: e.target.value })
                }
              >
                <option defaultValue hidden>
                  -- Select --
                </option>
                {branch &&
                  branch.map((branch) => {
                    return (
                      <option value={branch.name} key={branch.name}>
                        {branch.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full mb-4 lg:mb-0">
              <label
                htmlFor="semester"
                className="leading-7 text-base text-yellow-500"
              >
                Select Semester
              </label>
              <select
                id="semester"
                className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full mt-1"
                value={selected.semester}
                onChange={(e) =>
                  setSelected({ ...selected, semester: e.target.value })
                }
              >
                <option defaultValue hidden>
                  -- Select --
                </option>
                <option value="0">Preparatory</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="subject"
                className="leading-7 text-base text-yellow-500"
              >
                Select Subject
              </label>
              <select
                id="subject"
                className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full mt-1"
                value={selected.subject}
                onChange={(e) =>
                  setSelected({ ...selected, subject: e.target.value })
                }
              >
                <option defaultValue hidden>
                  -- Select --
                </option>
                {subject &&
                  subject.map((subject) => {
                    return (
                      <option value={subject.name} key={subject.name}>
                        {subject.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <button
            className="bg-gray-700 text-white px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500"
            onClick={loadStudentDetails}
          >
            Load Student Data
          </button>
        </>
      )}
      {studentData && studentData.length !== 0 && (
        <>
          <p className="mt-4 text-lg text-yellow-500">
            Branch: {selected.branch} <br /> Year: {selected.semester} <br /> Subject: {selected.subject} <br />
            {subject.map((e) => {
              if (e.name === selected.subject) {
                return (
                  <>
                    Highmark: <span className="text-red-500"> {e.highmark}</span>
                    <br />
                    <div className="w-full flex flex-wrap justify-center items-center mt-8 gap-4">
                      {marks?.map((mark) => {
                        return mark.external.map((e) => {
                          if (e[selected.subject]) {
                            return (
                              <div
                                key={mark.enrollmentNo}
                                className="w-full md:w-1/2 lg:w-1/2 flex justify-between items-center border-2 rounded p-2"
                                id={mark.enrollmentNo}
                              >
                                <p className="text-lg  w-1/2 bg-gray-700 text-white">
                                  {mark.enrollmentNo}
                                </p>
                                <input
                                  disabled
                                  type="number"
                                  className="px-2 py-2 focus:ring-0 outline-none w-1/2"
                                  placeholder={e[selected.subject]}
                                  id={`${mark.enrollmentNo}marks`}
                                />
                              </div>
                            );
                          }
                          return null;
                        });
                      })}
                    </div>
                  </>
                );
              }
              return null;
            })}
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-evenly items-center w-full gap-4">
            <div className="w-full md:w-1/3">
              <label
                htmlFor="addition"
                className="leading-7 text-lg text-yellow-500"
              >
                Additional Value
              </label>
              <input
                type="number"
                id="addition"
                placeholder="0"
                className="px-6 py-2 w-full rounded bg-gray-700 text-white mt-1"
                onChange={loadAdditionValue}
              />
            </div>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded border-2 border-blue-500 w-full md:w-1/3"
              onClick={setStudentMarksHandler}
            >
              Set Marks
            </button>
          </div>
        </>
      )}
      {studentData?.length === 0 && (
        <p className="mt-10 text-lg text-red-500">
          No Data Found For {selected.branch}, {selected.semester}
        </p>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Marks;
