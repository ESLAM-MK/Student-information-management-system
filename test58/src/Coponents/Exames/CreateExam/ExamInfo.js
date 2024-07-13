import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { baseApiURL } from "../../../baseUrl";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
function ExamInfo({courseName, level , fullMark , date , time , duration,
  handleCourseNameChange,handlesemsterChange, handleTimeChange , handleFullMarkChange, handleLevelChange, handleDateChange , handleDurationChange }) {
    const [branch, setBranch] = useState();
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
      subject:"",
      semester:""
    });
    const [selected, setSelected] = useState({
      branch: "",
      semester: "",
      subject: "",
      highmark:""
    });
    const router = useLocation();
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
            setData({
              employeeId: response.data.user[0].employeeId,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              // post: response.data.user[0].post,
              department: response.data.user[0].department,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
              experience: response.data.user[0].experience,
              subject:response.data.user[0].subject,
              semester:response.data.user[0].semester
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
      searchFacultyHandler()
      getBranchData()
    }, []);
    // console.log(data);
  return (
    <div>
      <section className="exam-info">
        <p className="exam-info-text">exam information</p>
        <form>
          <div className="flex flex-wrap  items-center	">
            <div className="md:w-1/4 pr-4 pl-4 mb-3">
            <label htmlFor="subject" className="leading-7 text-base ">
                Select Subject
              </label>
              <select
                id="subject"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                defaultValue={courseName}
                onChange={(e)=>handleCourseNameChange(e)}
                // onChange={(e) =>
                //   setSelected({ ...selected, subject: e.target.value })
                // }
              >
                <option  value="" selected disabled hidden>-- Select --</option>
                <option  key={data.subject} value={data.subject}>{data.subject}</option>
                {/* {subject &&
                  subject.map((subject) => {
                    return (
                      <option value={subject.name} key={subject.name}>
                        {subject.name}
                      </option>
                    );
                  })} */}
              </select>
              {/* <label for="validationDefault04" className="form-label">
                Subject Name
              </label>
              <input
                type="text"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                id="validationDefault01"
                required
                onChange={handleCourseNameChange}
                value={courseName}
              ></input> */}
            </div>
            <div className="md:w-1/4 pr-4 pl-4 mb-3">
            <label htmlFor="semester" className="leading-7 text-base ">
                Select Year
              </label>
              <select
                id="semester"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              
                onChange={(e) =>
                  handlesemsterChange(e)
                }
              >
                <option  value="" selected disabled hidden>-- Select --</option>
                {}
                <option value={data.semester}>{data.semester?data.semester:"Prepatory"} Year</option>
                {/* <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3th Year</option>
                <option value="4">4th Year</option> */}
                {/* <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option> */}
              </select>

              {/* <label for="validationDefault02" className="form-label">
                Deartment
              </label>
              <input
                type="text"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                id="validationDefault01"
                required
                onChange={handleLevelChange}
                value={level}

              ></input> */}
            </div>
            <div className="md:w-1/4 pr-4 pl-4 mb-3">
            <label htmlFor="branch" className="leading-7 text-base ">
                Select Branch
              </label>
              <select
                id="branch"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"

                onChange={(e) =>
                  handleLevelChange(e)
                }
              >
              <option  value="" selected disabled hidden>-- Select --</option>
                {/* {branch &&
                  branch.map((branch) => {
                    return (
                      <option value={branch.name} key={branch.name}>
                        {branch.name}
                      </option>
                    );
                  })} */}
                   <option  key={data.department} value={data.department}>{data.department}</option>
              </select>
            </div>
           
            <div className="md:w-1/4 pr-4 pl-4 mb-3">
              <label for="validationDefault02" className="form-label">
                full mark
              </label>
              <input
                type="text"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                id="validationDefault02"
                required
                onChange={(e)=>handleFullMarkChange(e)}
                value={fullMark}

              ></input>
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="md:w-1/3 pr-4 pl-4     ">
              <label for="validationDefault03" className="form-label">
                date
              </label>
              <input
                type="date"
                className="block appearance-none  text-gray-200	w-full py-1 px-2 mb-1 text-base leading-normal bg-white  border border-gray-200 rounded"
                id="validationDefault03"
                required
                value={date}
                onChange={(e)=>handleDateChange(e)}
              ></input>
            </div>
            <div className="md:w-1/3 pr-4 pl-4 mb-3">
              <label for="validationDefault03" className="form-label">
                time
              </label>
              <input
                type="time"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white  border border-gray-200 rounded"
                id="validationDefault04"
                required
                onChange={(e)=>handleTimeChange(e)}
                value={time}
              ></input>
            </div>
            <div className="md:w-1/3 pr-4 pl-4 mb-3">
              <label for="validationDefault05" className="form-label">
                duration
              </label>
              <select
                id="subject"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                
                onChange={(e)=>handleDurationChange(e)}
                // onChange={(e) =>
                //   setSelected({ ...selected, subject: e.target.value })
                // }
              >
                <option   selected disabled hidden>-- Select --</option>
                <option  value={"30"}>30 Min</option>
                <option   value={"60"}>60 Min</option>
                <option   value={"120"}>120 Min</option>
                </select>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ExamInfo;
