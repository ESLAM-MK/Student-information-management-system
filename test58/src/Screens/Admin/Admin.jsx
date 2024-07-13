import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import { baseApiURL } from "../../baseUrl";
import { FiSearch, FiUpload } from "react-icons/fi";

const Admin = () => {
  const [file, setFile] = useState();
  const [selected, setSelected] = useState("add");
  const [alladmins, setalladmins] = useState();
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profile: "5",
  });
  const [id, setId] = useState();
  const [search, setSearch] = useState();

  const getalladmins = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/admin/details/getalladmins`, { headers })
      .then((response) => {
        if (response.data.success) {
          setalladmins(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getalladmins()
    const uploadFileToStorage = async (file) => {
      toast.loading("Upload Photo To Storage");
      const storageRef = ref(
        storage,
        `Admin Profile/${data.department}/${data.employeeId}`
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
            toast.success("Profile Uploaded To Admin");
            setData({ ...data, profile: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [data, file]);

  const addAdminProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Admin");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/admin/details/addDetails`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          axios
            .post(
              `${baseApiURL()}/Admin/auth/register`,
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
                  gender: "",
                  profile: "",
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

  const updateAdminProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Admin");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/admin/details/updateDetails/${id}`, data, {
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
            profile: "",
            gender: "",
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

  const searchAdminHandler = (e) => {
    e.preventDefault();
    toast.loading("Getting Admin");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/admin/details/getDetails`,
        { employeeId: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length !== 0) {
            toast.success(response.data.message);
            setId(response.data.user[0]._id);
            setData({
              employeeId: response.data.user[0].employeeId,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
            });
          } else {
            toast.dismiss();
            toast.error("No Admin Found With ID");
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
      employeeId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      profile: "",
    });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Admin Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2 "
            }px-4 py-2 text-yellow-500 rounded-sm mr-6`}
            onClick={() => setMenuHandler("add")}
          >
            Add Admin
          </button>
          <button
            className={`${
              selected === "edit" && "border-b-2 "
            }px-4 py-2 text-yellow-500 rounded-sm mr-6`}
            onClick={() => setMenuHandler("edit")}
          >
            Edit Admin
          </button>
          <button
            className={`${
              selected === "all" && "border-b-2 "
            }px-4 py-2 text-yellow-500 rounded-sm`}
            onClick={() => setMenuHandler("all")}
          >
            View All Admins
          </button>
        </div>
      </div>
      {selected === "add" && (
        <form
          onSubmit={addAdminProfile}
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
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="w-[40%]">
            <label htmlFor="gender" className="leading-7 text-sm text-yellow-500 ">
              Select Gender
            </label>
            <select
              id="gender"
              className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              {" "}
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
              className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
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
            className="bg-gray-700 rounded px-6 py-3 rounded-sm my-6 text-white"
          >
            Add New Admin
          </button>
        </form>
      )}
      {selected === "edit" && (
        <div className="my-6 mx-auto w-full">
          <form
            onSubmit={searchAdminHandler}
            className="flex justify-center items-center border-2 mt-2 rounded w-[40%] mx-auto"
          >
            <input
              type="text"
              className="px-6 py-3 w-full outline-none"
              placeholder="Employee Id."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-4 text-2xl hover:text-blue-500" type="submit">
              <FiSearch className="text-white" />
            </button>
          </form>
          {search && id && (
            <form
              onSubmit={updateAdminProfile}
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
                  className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="employeeId" className="leading-7 text-sm text-yellow-500 ">
                  Enter Employee Id
                </label>
                <input
                  disabled
                  type="number"
                  id="employeeId"
                  value={data.employeeId}
                  onChange={(e) =>
                    setData({ ...data, employeeId: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="w-[40%]">
                <label htmlFor="gender" className="leading-7 text-sm text-yellow-500 ">
                  Select Gender
                </label>
                <select
                  id="gender"
                  className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
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
                  className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
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
                className="bg-gray-700  px-6 py-3 rounded-sm mb-6 text-white"
              >
                Update Admin
              </button>
            </form>
          )}
        </div>
      )}

        {/* All */}
        {selected === "all" && (
        <div className="my-6 mx-auto w-full">
           <div className="mb-10">
           <h2 className="text-center bg-green-800 p-4 font-bold text-white text-2xl">All Admins</h2>
           <table className="table-auto w-full  border-collapse border border-slate-400 text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300  p-2 text-yellow-800">Admin Name</th>
                  <th className="border border-slate-300  p-2 text-yellow-800">Gender</th>
                  <th className="border border-slate-300  p-2 text-yellow-800">ID</th>
                </tr>
              </thead>
          {alladmins.map((e)=>{
           return <>
          
              <tbody>
                <tr>
                  <td className="border border-slate-300 text-yellow-500">{e.firstName} {e.middleName} {e.lastName}</td>
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

export default Admin;
