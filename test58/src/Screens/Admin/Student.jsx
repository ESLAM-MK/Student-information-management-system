import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import { baseApiURL } from "../../baseUrl";
import { FiSearch, FiUpload } from "react-icons/fi";
const Student = () => {
  const [file, setFile] = useState();
  const [selected, setSelected] = useState("add");
  const [branch, setBranch] = useState();
  const [allstudents, setallstudents] = useState();
  const [search, setSearch] = useState();
  const [data, setData] = useState({
    enrollmentNo: "4",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    gender: "",
    profile: "5",      
    parentPhone:"",
    Addresse:"",
    NationalId:"",
    religion:"",
    highSchool:""
  });
  const [id, setId] = useState();
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


  const getallStudents = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/student/details/getallStudents`, { headers })
      .then((response) => {
        if (response.data.success) {
          setallstudents(response.data.user);
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
        `Student Profile/${data.branch}/${data.semester} Semester/${data.enrollmentNo}`
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
            toast.success("Profile Uploaded To Storage");
            setData({ ...data, profile: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [data, file]);

  useEffect(() => {
    getBranchData();
    getallStudents()
  }, []);

  const addStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/addDetails`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          // axios
          //   .post(
          //     `${baseApiURL()}/student/auth/register`,
          //     { loginid:4465
          //       //  data.enrollmentNo
          //       , password: 112233 },
          //     {
          //       headers: headers,
          //     }
          //   )
          //   .then((response) => {
          //     toast.dismiss();
          //     if (response.data.success) {
                toast.success(response.data.message);
                setFile();
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
                  parentPhone:"",
                  Addresse:"",
                  NationalId:"",
                  religion:"",
                  highSchool:""
                });
          //     } else {
          //       toast.error(response.data.message);
          //     }
          //   })
          //   .catch((error) => {
          //     toast.dismiss();
          //     toast.error(error.response.data.message);
          //   });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };
  const updateStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/updateDetails/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
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
            parentPhone:"",
            Addresse:"",
            NationalId:"",
            religion:"",
            highSchool:""
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

  const searchStudentHandler = (e) => {
    e.preventDefault();
    toast.loading("Getting Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { enrollmentNo: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.error("No Student Found!");
          } else {
            toast.success(response.data.message);
            setData({
              enrollmentNo: response.data.user[0].enrollmentNo,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              semester: response.data.user[0].semester,
              branch: response.data.user[0].branch,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
              parentPhone:response.data.user[0].parentPhone,
              Addresse:response.data.user[0].Addresse,
              NationalId:response.data.user[0].NationalId,
              religion:response.data.user[0].religion,
              highSchool:response.data.user[0].highSchool
            });
            setId(response.data.user[0]._id);
          }
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
      parentPhone:"",
      Addresse:"",
      NationalId:"",
      religion:"",
      highSchool:""
    });
  };

  return (
   <div >

<div className="w-[85%] mx-auto  mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2 "
            } px-4 py-2 text-yellow-500 rounded-sm mr-6`}
            onClick={() => setMenuHandler("add")}
          >
            Add Student
          </button>
          <button
            className={`${
              selected === "edit" && "border-b-2 "
            } px-4 py-2 text-yellow-500 rounded-sm`}
            onClick={() => setMenuHandler("edit")}
          >
            Edit Student
          </button>
          <button
            className={`${
              selected === "all" && "border-b-2 "
            } px-4 py-2 text-yellow-500 rounded-sm`}
            onClick={() => setMenuHandler("all")}
          >
            View All Student
          </button>
        </div>
      </div>
      {selected === "add" && (
        <form
          onSubmit={addStudentProfile}
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
          {/* <div className="w-[40%]">
            <label htmlFor="enrollmentNo" className="leading-7 text-sm text-yellow-500 ">
              Enter Enrollment No
            </label>
            <input
              type="number"
              id="enrollmentNo"
              value={data.enrollmentNo}
              onChange={(e) =>
                setData({ ...data, enrollmentNo: e.target.value })
              }
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div> */}
         
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
            <label htmlFor="parentPhone" className="leading-7 text-sm text-yellow-500 ">
              Enter Parent-Phone Number
            </label>
            <input
              type="number"
              id="parentPhone"
              value={data.parentPhone}
              onChange={(e) =>
                setData({ ...data, parentPhone: e.target.value })
              }
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="Addresse" className="leading-7 text-sm text-yellow-500 ">
              Enter Addresse
            </label>
            <input
              type="text"
              id="Addresse"
              value={data.Addresse}
              onChange={(e) =>
                setData({ ...data, Addresse: e.target.value })
              }
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="NationalId" className="leading-7 text-sm text-yellow-500 ">
              Enter National-Id
            </label>
            <input
              type="number"
              id="NationalId"
              value={data.NationalId}
              onChange={(e) =>
                setData({ ...data, NationalId: e.target.value })
              }
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="highSchool" className="leading-7 text-sm text-yellow-500 ">
              Enter highSchool Year
            </label>
            <input
              type="number"
              id="highSchool"
              value={data.highSchool}
              onChange={(e) =>
                setData({ ...data, highSchool: e.target.value })
              }
              className="w-full bg-gray-800 text-white rounded  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="religion" className="leading-7 text-sm text-yellow-500 ">
              Select religion
            </label>
            <select
              id="religion"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.religion}
              onChange={(e) => setData({ ...data, religion: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              <option value="Muslim">مسلم</option>
              <option value="Christian">مسيحي</option>
              {/* <option value="Jewish">يهودي</option> */}
              <option value="other">ديانه اخري</option>
              {/* <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option> */}
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
            <label htmlFor="branch" className="leading-7 text-sm text-yellow-500 ">
              Select Branch
            </label>
            <select
              id="branch"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.branch}
              onChange={(e) => setData({ ...data, branch: e.target.value })}
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="w-[40%]">
            <label htmlFor="file" className="leading-7 text-sm text-yellow-500 ">
              Select Profile
            </label>
            <label
              htmlFor="file"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
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
            className="bg-gray-600 text-white  px-6 py-3 rounded-sm mb-6 text-white"
          >
            Add New Student
          </button>
        </form>
      )}
      {selected === "edit" && (
        <div className="my-6 mx-auto w-full">
          <form
            className="flex justify-center items-center border-2 mt-3 rounded w-[40%] mx-auto"
            onSubmit={searchStudentHandler}
          >
            <input
              type="text"
              className="px-6 py-3 w-full outline-none"
              placeholder="Enrollment No."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-4 text-2xl hover:text-blue-500" type="submit">
              <FiSearch className="text-white" />
            </button>
          </form>
          {search && id && (
            <form
              onSubmit={updateStudentProfile}
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
                <label htmlFor="enrollmentNo" className="leading-7 text-sm text-yellow-500 ">
                  Enrollment No
                </label>
                <input
                  disabled
                  type="number"
                  id="enrollmentNo"
                  value={data.enrollmentNo}
                  onChange={(e) =>
                    setData({ ...data, enrollmentNo: e.target.value })
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
              {/* <div className="w-[40%]">
                <label htmlFor="semester" className="leading-7 text-sm text-yellow-500 ">
                year
                </label>
                <select
                  disabled
                  id="semester"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.semester}
                  onChange={(e) =>
                    setData({ ...data, semester: e.target.value })
                  }
                >
                  <option defaultValue>-- Select --</option>
                  <option value="0"></option>
                  <option value="1">1st year</option>
                  <option value="2">2nd year</option>
                  <option value="3">3rd year</option>
                  <option value="4">4th year</option>
                  <option value="5">5th year</option>
                  <option value="6">6th year</option>
                  <option value="7">7th year</option>
                  <option value="8">8th year</option>
                </select>
              </div> */}
              {/* <div className="w-[40%]">
                <label htmlFor="branch" className="leading-7 text-sm text-yellow-500 ">
                  Branch
                </label>
                <select
                  disabled
                  id="branch"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.branch}
                  onChange={(e) => setData({ ...data, branch: e.target.value })}
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
              </div> */}
                  <div className="w-[40%]">
            <label htmlFor="branch" className="leading-7 text-sm text-yellow-500 ">
              Select Branch
            </label>
            <select
              id="branch"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.branch}
              onChange={(e) => setData({ ...data, branch: e.target.value })}
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
                <label htmlFor="gender" className="leading-7 text-sm text-yellow-500 ">
                  Select Gender
                </label>
                <select
                  id="gender"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
          
              <button
                type="submit"
                className="bg-gray-700 rounded px-6 py-3 rounded-sm mb-6 text-white"
              >
                Update Student
              </button>
            </form>
          )}
        </div>
      )}

      {/* All */}
      {selected === "all" && (
        <div className="my-6 mx-auto w-full">
           <div className="mb-10">
           <h2 className="text-center bg-green-800 p-4 font-bold text-white text-2xl">Prepratory Students</h2>
           <table className="table-auto w-full  border-collapse border border-slate-400 text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2 text-yellow-700">Student Name</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Branch</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Gender</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">ID</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Password</th>
                </tr>
              </thead>
          {allstudents.map((e)=>{
            if(e.semester == "0"){
           return <>
          
              <tbody>
                <tr>
                  <td className="border border-slate-300 text-yellow-500">{e.firstName} {e.middleName} {e.lastName}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.branch}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.gender}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.enrollmentNo}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.password}</td>
                </tr>
              </tbody>
        
           </>
           }
          })}
              </table>
           </div>
          <div className="mb-10">
            <h2 className="text-center bg-green-600 p-4 font-bold text-white text-2xl">First Year Students</h2>
            <table className="table-auto w-full  border-collapse border border-slate-400 text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2 text-yellow-700">Student Name</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Branch</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Gender</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">ID</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Password</th>
                </tr>
              </thead>
          {allstudents.map((e)=>{
            if(e.semester == "1"){
           return <>   
              <tbody>
                <tr>
                  <td className="border border-slate-300 text-yellow-500">{e.firstName} {e.middleName} {e.lastName}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.branch}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.gender}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.enrollmentNo}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.password}</td>
                </tr>
              </tbody>
  
       
           </>
           }
          })}
          </table>
          </div>
          <div className="mb-10">
         <h2 className="text-center bg-green-400 p-4 font-bold text-white text-2xl">Second Year Students</h2>
         <table className="table-auto w-full  border-collapse border border-slate-400 text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2 text-yellow-700">Student Name</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Branch</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Gender</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">ID</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Password</th>
                </tr>
              </thead>
          {allstudents.map((e)=>{
            if(e.semester == "2"){
           return <>
              <tbody>
                <tr>
                  <td className="border border-slate-300 text-yellow-500">{e.firstName} {e.middleName} {e.lastName}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.branch}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.gender}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.enrollmentNo}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.password}</td>
                </tr>
              </tbody>
          
           </>
           }
          })}
          </table>
          </div>
          <div className="mb-10">
          <h2 className="text-center bg-teal-800 p-4 font-bold text-white text-2xl">Third Year Students</h2>  
           <table className="table-auto w-full  border-collapse border border-slate-400 text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2 text-yellow-700">Student Name</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Branch</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Gender</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">ID</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Password</th>
                </tr>
              </thead>
          {allstudents.map((e)=>{
            if(e.semester == "3"){
           return <>

              <tbody>
                <tr>
                  <td className="border border-slate-300 text-yellow-500">{e.firstName} {e.middleName} {e.lastName}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.branch}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.gender}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.enrollmentNo}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.password}</td>
                </tr>
              </tbody>
          
           </>
           }
          })}
            </table>
            </div>
            <h2 className="text-center bg-teal-600 p-4 font-bold text-white text-2xl">Forth Year Students</h2>
            <div >
           <table className="table-auto w-full  border-collapse border border-slate-400 text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2 text-yellow-700">Student Name</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Branch</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Gender</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">ID</th>
                  <th className="border border-slate-300 p-2 text-yellow-700">Password</th>
                </tr>
              </thead>
          {allstudents.map((e)=>{
            if(e.semester == "4"){
           return <>
           
              <tbody>
                <tr>
                  <td className="border border-slate-300 text-yellow-500">{e.firstName} {e.middleName} {e.lastName}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.branch}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.gender}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.enrollmentNo}</td>
                  <td className="border border-slate-300 text-yellow-500">{e.password}</td>
                </tr>
              </tbody>
          
           </>
           }
          })}
            </table>
            </div>
        </div>
      )}
    </div>
    <Toaster position="bottom-center" />
   </div>
  );
};

export default Student;
