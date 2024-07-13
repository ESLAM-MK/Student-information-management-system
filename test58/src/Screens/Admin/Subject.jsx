import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";
const Subjects = () => {
  const [data, setData] = useState({
    name: "",
    code: "",
    highmark:"",
    branch:""
  });
  const [branch, setBranch] = useState();
  console.log(data);
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
  const [selected, setSelected] = useState("add");
  const [subject, setSubject] = useState();
  useEffect(() => {
    getSubjectHandler();
    getBranchData();
  }, []);

  const getSubjectHandler = () => {
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const addSubjectHandler = () => {
    toast.loading("Adding Subject");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/subject/addSubject`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setData({ name: "", code: "",highmark:"" , branch:""});
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteSubjectHandler = (id) => {
    toast.loading("Deleting Suject");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .delete(`${baseApiURL()}/subject/deleteSubject/${id}`, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getSubjectHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };



  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Subject Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2 "
            }px-4 py-2 text-yellow-500 rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Subject
          </button>
          <button
            className={`${
              selected === "view" && "border-b-2 "
            }px-4 py-2 text-yellow-500 rounded-sm`}
            onClick={() => setSelected("view")}
          >
            View Subject
          </button>
        </div>
      </div>
      {selected === "add" && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <div className="w-[40%] mb-4">
            <label htmlFor="code" className="leading-7 text-sm text-yellow-500">
              Enter Subject Code
            </label>
            <input
              type="number"
              id="code"
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="name" className="leading-7 text-sm text-yellow-500 ">
              Enter Subject Name
            </label>
            <input
              type="name"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="highmark" className="leading-7 text-sm text-yellow-500 ">
              Enter Full Mark
            </label>
            <input
              type="number"
              id="highmark"
              value={data.highmark}
              onChange={(e) => setData({ ...data, highmark: e.target.value })}
              className="w-full bg-gray-800 text-white rounded border  outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="branch" className="leading-7 text-sm text-yellow-500 ">
              Enter Branch
            </label>
            <select
              id="branch"
              className="px-2 bg-gray-800 text-white  py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.branch}
              onChange={(e) => setData({ ...data, branch: e.target.value })}
            >
              <option defaultValue hidden>-- Select --</option>
              {branch?.map((branch) => {
                return (
                  <option value={branch.name} key={branch.name}>
                    {branch.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="mt-6 bg-gray-700 rounded px-6 py-3 text-white"
            onClick={addSubjectHandler}
          >
            Add Subject
          </button>
        </div>
      )}
      {selected === "view" && (
        <div className="mt-8 w-full">
          <ul>
            {subject &&
              subject.map((item) => {
                return (
                  <li
                    key={item.code}
                    className="bg-gray-700 text-white rounded py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
                  >
                    <div>
                      {item.code} - {item.name}  - {item.branch}
                    </div>
                    <button
                      className="text-2xl hover:text-red-500"
                      onClick={() => deleteSubjectHandler(item._id)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
            <Toaster position="bottom-center" />

    </div>
  );
};

export default Subjects;
