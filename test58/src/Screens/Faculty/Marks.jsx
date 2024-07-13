import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
import { BiArrowBack } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Marks = () => {
  const router = useLocation();
  const [subject, setSubject] = useState();
  const userData = useSelector(state => state.userData);
  const [branch, setBranch] = useState();
  const [studentData, setStudentData] = useState();
  const [id, setId] = useState();
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    gender: "",
    experience: "",
    profile: "5",
    subject:""
  });
  const [selected, setSelected] = useState({
    branch: "",
    semester: "",
    subject: "",
    highmark:""
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

  const submitMarksHandler = () => {
    let container = document.getElementById("markContainer");
    if (selected.subject !== "-- Select --" && selected.subject) {
      container.childNodes.forEach((enroll) => {
        setStudentMarksHandler(
          enroll.id,
          document.getElementById(enroll.id + "marks").value
        );
      });
    } else {
      toast.dismiss();
      toast.error("there is no subject");
    }
  };

  const setStudentMarksHandler = (enrollment, value) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/addMarks`,
        {
          enrollmentNo: enrollment,
          external: [{ [selected.subject]: value }],
        },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.dismiss();
          toast.success(response.data.message);
        } else {
          toast.dismiss();
          toast.error("there is no subject");
        }
      })
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

  const searchFacultyHandler = () => {
    toast.loading("Getting Faculty");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/faculty/details/getDetails`,
        { employeeId: router.state.loginid },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setId(response.data.user[0]._id);
          setData({
            employeeId: response.data.user[0].employeeId,
            firstName: response.data.user[0].firstName,
            middleName: response.data.user[0].middleName,
            lastName: response.data.user[0].lastName,
            email: response.data.user[0].email,
            phoneNumber: response.data.user[0].phoneNumber,
            department: response.data.user[0].department,
            gender: response.data.user[0].gender,
            profile: response.data.user[0].profile,
            experience: response.data.user[0].experience,
            subject: response.data.user[0].subject
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  useEffect(() => {
    getBranchData();
    getSubjectData();
    searchFacultyHandler();
  }, []);

  const resetValueHandler = () => {
    setStudentData();
  };

  return (
    <div className="w-[85%] mx-auto flex flex-col justify-center items-start my-10">
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
          <div className="mt-10 w-full flex flex-wrap justify-evenly items-center gap-6">
            <div className="w-full sm:w-1/3">
              <label htmlFor="branch" className="leading-7 text-base text-yellow-500">
                Select Branch
              </label>
              <select
                id="branch"
                className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.branch}
                onChange={(e) =>
                  setSelected({ ...selected, branch: e.target.value })
                }
              >
                <option defaultValue hidden>-- Select --</option>
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
            <div className="w-full sm:w-1/3">
              <label htmlFor="semester" className="leading-7 text-base text-yellow-500">
                Select Year
              </label>
              <select
                id="semester"
                className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.semester}
                onChange={(e) =>
                  setSelected({ ...selected, semester: e.target.value })
                }
              >
                <option defaultValue hidden>-- Select --</option>
                <option value={userData.semester}>{userData.semester==="0" ? "Preparatory " :`Year ${userData.semester}`}</option>
              </select>
            </div>
            <div className="w-full sm:w-1/3">
              <label htmlFor="subject" className="leading-7 text-base text-yellow-500">
                Select Subject
              </label>
              <select
                id="subject"
                className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.subject}
                onChange={(e) =>
                  setSelected({ ...selected, subject: e.target.value })
                }
              >
                <option defaultValue hidden>-- Select --</option>
                <option key={data.subject} value={data.subject}>{data.subject}</option>
              </select>
            </div>
          </div>
          <button
            className="bg-gray-700 text-white px-4 py-2 mt-8 mx-auto rounded border-2 mb-2 text-black"
            onClick={loadStudentDetails}
          >
            Load Student Data
          </button>
        </>
      )}
      {studentData && studentData.length !== 0 && (
        <>
          <p className="mt-4 text-lg text-yellow-500">
            Branch : {selected.branch} <br /> Semester{" "}: {selected.semester} <br /> Subject : {selected.subject} <br />
            {subject.map((e)=>{
              if(e.name===selected.subject){
                return  (
                  <React.Fragment key={e.name}>
                    highmark : <span className="text-red-500"> {e.highmark}</span>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </p>
          <div
            className="w-full flex flex-wrap justify-center items-center mt-8 gap-4"
            id="markContainer"
          >
            {studentData.map((student) => {
              return (
                <div
                  key={student.enrollmentNo}
                  className="w-full sm:w-1/2 lg:w-1/3 flex justify-between items-center border-2 border-blue-500 rounded mb-4"
                  id={student.enrollmentNo}
                >
                  <p className="text-lg px-4 w-1/2 bg-gray-700 text-white">
                    {student.enrollmentNo}
                  </p>
                  <input
                    type="number"
                    className="px-6 py-2 focus:ring-0 outline-none w-1/2"
                    placeholder="Enter Marks"
                    id={`${student.enrollmentNo}marks`}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-gray-700 text-white px-6 py-3 mt-8 mx-auto rounded text-white"
            onClick={submitMarksHandler}
          >
            Upload Student Marks 
          </button>
        </>
      )}
    </div>
  );
};

export default Marks;
