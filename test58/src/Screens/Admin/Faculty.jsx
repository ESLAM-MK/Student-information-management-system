import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import { baseApiURL } from "../../baseUrl";
import { FiSearch, FiUpload } from "react-icons/fi";

const Faculty = () => {
  const [subject, setSubject] = useState();
  const [file, setFile] = useState();
  const [selected, setSelected] = useState("add");
  const [allfaculties, setallfaculties] = useState();
  const [branch, setBranch] = useState();
  const [selectedsubject, setSelectedsubject] = useState({  
    branch: "",
    semester: "",
    subject: "",
    highmark:""
  });
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
  const [id, setId] = useState();
  const [search, setSearch] = useState();

  const getallfaculties = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/faculty/details/getallfaculties`, { headers })
      .then((response) => {
        if (response.data.success) {
          setallfaculties(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
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
      });
  };

  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Upload Photo To Storage");
      const storageRef = ref(
        storage,
        `Faculty Profile/${data.department}/${data.employeeId}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          toast.error("Something Went Wrong!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Profile Uploaded To Faculty");
            setData({ ...data, profile: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [data, file]);

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
    getBranchData();
    getallfaculties();
    getSubjectData();
  }, []);

  const addFacultyProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Faculty");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/faculty/details/addDetails`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          axios
            .post(
              `${baseApiURL()}/faculty/auth/register`,
              { loginid: data.employeeId, password: 112233 },
              {
                headers: headers,
              }
            )
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
                setData({
                  employeeId: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  department: "",
                  gender: "",
                  experience: "",
                  // post: "",
                  profile: "",
                  subject:"",
                  semester:""
                });
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const updateFacultyProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Faculty");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/faculty/details/updateDetails/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setFile();
          setSearch();
          setId();
          setData({
            employeeId: "",
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            department: "",
            gender: "",
            experience: "",
            // post: "",
            profile: "",
            subject:"",
            semester:""
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const searchFacultyHandler = (e) => {
    e.preventDefault();
    toast.loading("Getting Faculty");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/faculty/details/getDetails`,
        { employeeId: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setId(response.data.user[0]._id);
          setData({
            employeeId: response.data.user[0].employeeId,
            firstName: response.data.user[0].firstName,
            middleName: response.data.user[0].middleName,
            lastName: response.data.user[0].lastName,
            email: response.data.user[0].email,
            phoneNumber: response.data.user[0].phoneNumber,
            // subject: response.data.user[0].subject,

            // post: response.data.user[0].post,
            department: response.data.user[0].department,
            gender: response.data.user[0].gender,
            profile: response.data.user[0].profile,
            experience: response.data.user[0].experience,
            subject:response.data.user[0].subject,
            semester:response.data.user[0].semester,
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
  const setMenuHandler = (type) => {
    setSelected(type);
    setFile("");
    setSearch("");
    setId("");
    setData({
      enrollmentNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      semester: "",
      branch: "",
      gender: "",
      profile: "",
      subject:"",
      semester:""
    });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Staff Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2 "
            }px-4 py-2 text-yellow-500 rounded-sm mr-6 mr-6`}
            onClick={() => setMenuHandler("add")}
          >
            Add Staff
          </button>
          <button
            className={`${
              selected === "edit" && "border-b-2 "
            }px-4 py-2 text-yellow-500 rounded-sm mr-6 `}
            onClick={() => setMenuHandler("edit")}
          >
            Edit Staff
          </button>
          <button
            className={`${
              selected === "all" && "border-b-2 "
            }px-4 py-2 text-yellow-500 rounded-sm mr-6`}
            onClick={() => setMenuHandler("all")}
          >
            View All Staffs
          </button>
        </div>
      </div>
      {selected === "add" && (
        <form
          onSubmit={addFacultyProfile}
          className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
        >
          <div className="w-[40%]">
            <label htmlFor="firstname" className="leading-7 text-sm text-yellow-500 ">
              Enter First Name
            </label>
            <input
              type="text"
              id="firstname"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="middlename" className="leading-7 text-sm text-yellow-500 ">
              Enter Middle Name
            </label>
            <input
              type="text"
              id="middlename"
              value={data.middleName}
              onChange={(e) => setData({ ...data, middleName: e.target.value })}
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="lastname" className="leading-7 text-sm text-yellow-500 ">
              Enter Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="employeeId" className="leading-7 text-sm text-yellow-500 ">
              Enter Employee Id
            </label>
            <input
              type="number"
              id="employeeId"
              value={data.employeeId}
              onChange={(e) => setData({ ...data, employeeId: e.target.value })}
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="email" className="leading-7 text-sm text-yellow-500 ">
              Enter Email Address
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="phoneNumber" className="leading-7 text-sm text-yellow-500 ">
              Enter Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) =>
                setData({ ...data, phoneNumber: e.target.value })
              }
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="branch" className="leading-7 text-sm text-yellow-500 ">
              Select Department
            </label>
            <select
              id="branch"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.department}
              onChange={(e) => setData({ ...data, department: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              {branch?.map((branch) => {
                return (
                  <option value={branch.name} key={branch.name}>
                    {branch.name}
                  </option>
                );
              })}
            </select>
          </div>
          
          <div className="w-[40%]">
              <label htmlFor="subject" className="leading-7 text-sm text-yellow-500 ">
                Select Subject
              </label>
              <select
                id="subject"
                className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.subject}
                onChange={(e) =>
                  setData({ ...data, subject: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
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

            <div className="w-[40%]">
            <label htmlFor="semester" className="leading-7 text-sm text-yellow-500 ">
              Select Year
            </label>
            <select
              id="semester"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.semester}
              onChange={(e) => setData({ ...data, semester: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              <option value="0">preparatory</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              {/* <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option> */}
            </select>
          </div>

            <div className="w-[40%]">
              <label htmlFor="gender" className="leading-7 text-sm text-yellow-500 ">
                Select Gender
              </label>
              <select
                id="gender"
                className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={data.gender}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
              >
                <option defaultValue>-- Select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="w-[40%]">
              <label htmlFor="experience" className="leading-7 text-sm text-yellow-500 ">
                Enter Experience
              </label>
              <input
                type="number"
                id="experience"
                value={data.experience}
                onChange={(e) =>
                  setData({ ...data, experience: e.target.value })
                }
                className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            
            <div className="w-[40%]">
              <label htmlFor="file" className="leading-7 text-sm text-yellow-500 ">
                Select Profile
              </label>
              <label
                htmlFor="file"
                className="px-2 bg-gray-800 text-white py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
              >
                Upload
                <span className="ml-2">
                  <FiUpload />
                </span>
              </label>
              <input
                hidden
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
         
          <button
            type="submit"
            className="bg-blue-500 px-6 py-3 rounded-sm my-6 text-white"
          >
            Add New Staff
          </button>
        </form>
      )}
      {selected === "edit" && (
        <div className="my-x6 mx-auto w-full">
          <form
            className="flex justify-center items-center border-2 mt-2 rounded w-[40%] mx-auto"
            onSubmit={searchFacultyHandler}
          >
            <input
              type="text"
              className="px-6 py-3 w-full outline-none"
              placeholder="Employee Id."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-4 text-2xl hover:text-blue-500">
              <FiSearch />
            </button>
          </form>
          {search && id && (
            <form
              onSubmit={updateFacultyProfile}
              className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
            >
              <div className="w-[40%]">
                <label htmlFor="firstname" className="leading-7 text-sm text-yellow-500 ">
                  Enter First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  value={data.firstName}
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="middlename" className="leading-7 text-sm text-yellow-500 ">
                  Enter Middle Name
                </label>
                <input
                  type="text"
                  id="middlename"
                  value={data.middleName}
                  onChange={(e) =>
                    setData({ ...data, middleName: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="lastname" className="leading-7 text-sm text-yellow-500 ">
                  Enter Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={data.lastName}
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="employeeId" className="leading-7 text-sm text-yellow-500 ">
                  Enrollment No
                </label>
                <input
                  disabled
                  type="number"
                  id="employeeId"
                  value={data.employeeId}
                  onChange={(e) =>
                    setData({ ...data, employeeId: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="email" className="leading-7 text-sm text-yellow-500 ">
                  Enter Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="phoneNumber" className="leading-7 text-sm text-yellow-500 ">
                  Enter Phone Number
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  value={data.phoneNumber}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="email" className="leading-7 text-sm text-yellow-500 ">
                  Enter Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              {/* <div className="w-[40%]">
                <label htmlFor="post" className="leading-7 text-sm text-yellow-500 ">
                  POST
                </label>
                <input
                  type="text"
                  id="post"
                  value={data.post}
                  onChange={(e) => setData({ ...data, post: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div> */}
              <div className="w-[40%]">
                <label htmlFor="experience" className="leading-7 text-sm text-yellow-500 ">
                  Experience
                </label>
                <input
                  type="number"
                  id="experience"
                  value={data.experience}
                  onChange={(e) =>
                    setData({ ...data, experience: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
            <label htmlFor="branch" className="leading-7 text-sm text-yellow-500 ">
              Select Department
            </label>
            <select
              id="branch"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.department}
              onChange={(e) => setData({ ...data, department: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              {branch?.map((branch) => {
                return (
                  <option value={branch.name} key={branch.name}>
                    {branch.name}
                  </option>
                );
              })}
            </select>
          </div>
          
          <div className="w-[40%]">
              <label htmlFor="subject" className="leading-7 text-sm text-yellow-500 ">
                Select Subject
              </label>
              <select
                id="subject"
                className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.subject}
                onChange={(e) =>
                  setData({ ...data, subject: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
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

            <div className="w-[40%]">
            <label htmlFor="semester" className="leading-7 text-sm text-yellow-500 ">
              Select Year
            </label>
            <select
              id="semester"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.semester}
              onChange={(e) => setData({ ...data, semester: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              <option value="0">preparatory</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              {/* <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option> */}
            </select>
          </div>

              <div className="w-[40%]">
                <label htmlFor="file" className="leading-7 text-sm text-yellow-500 ">
                  Select New Profile
                </label>
                <label
                  htmlFor="file"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
                >
                  Upload
                  <span className="ml-2">
                    <FiUpload />
                  </span>
                </label>
                <input
                  hidden
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className="bg-gray-700 rounded px-6 py-3 rounded-sm mb-6 text-white"
              >
                Update Faculty
              </button>
            </form>
          )}
        </div>
      )}
      
      {/* All */}
      {selected === "all" && (
        <div className="my-6 mx-auto w-full">
           <div className="mb-10">
           <h2 className="text-center bg-green-800 p-4 font-bold text-white text-2xl">All Doctors</h2>
           <table className="table-auto w-full  border-collapse border border-slate-400 text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300  p-2 text-yellow-800">Docotor Name</th>
                  <th className="border border-slate-300  p-2 text-yellow-800">Department</th>
                  <th className="border border-slate-300  p-2 text-yellow-800">Subject</th>
                  <th className="border border-slate-300  p-2 text-yellow-800">Gender</th>
                  <th className="border border-slate-300  p-2 text-yellow-800">ID</th>
                </tr>
              </thead>
          {allfaculties.map((e)=>{
           return <>
          
              <tbody>
                <tr>
                  <td className="border border-slate-300 text-yellow-500">{e.firstName} {e.middleName} {e.lastName}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.department}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.subject}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.gender}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.employeeId}</td>
                </tr>
              </tbody>
           </>
          })}
              </table>
           </div>
        </div>
      )}
            <Toaster position="bottom-center" />

    </div>
  );
};

export default Faculty;
