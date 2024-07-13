import React, { useEffect } from "react";
import { useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
import { useSelector } from "react-redux";
const NoticeStudent = () => {
  const userData = useSelector(state => state.userData);
  const [notice, setNotice] = useState("");
  const noticeFilter = notice && (notice?.filter((e)=>Number(e.semester) === Number(userData.semester)))
  const getNoticeHandler = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/notice/getNotice`,  {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
            setNotice(response.data.notice);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    getNoticeHandler()
  }, []);



  return (
    <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10 text-yellow-400">
        <div className="mt-8 w-full text-yellow-400">
        {noticeFilter && noticeFilter?.map((item, index) => {
             return <div
             key={item._id}
             className=" border-2 w-full rounded-md shadow-sm py-4 px-6 mb-4 relative text-yellow-500"
           >
             <p
               className={`text-xl font-medium flex justify-start items-center ${
                 item.link && "cursor-pointer"
               } group`}
               onClick={() => item.link && window.open(item.link)}
             >
               {item.title} 
               {item.link && (
                 <span className="text-2xl group-hover:text-gray-500 ml-1">
                   <IoMdLink />
                 </span>
                 
               )}
               
             </p>
             <p className="text-base font-normal mt-1">
               {item.description}
             </p>
             
             <p className="text-sm absolute top-4 right-4 flex justify-center items-center">
             <span> ({item.subject})</span>
               <span className="text-base mr-1">
                 <HiOutlineCalendar />
               </span>
         
               {item.createdAt.split("T")[0].split("-")[2] +
                 "/" +
                 item.createdAt.split("T")[0].split("-")[1] +
                 "/" +
                 item.createdAt.split("T")[0].split("-")[0] +
                 " " +
                 item.createdAt.split("T")[1].split(".")[0]}
             </p>
             
           </div>
            })}
            {!noticeFilter && <p>There is no Notice Right Now !</p>}
        </div>
    </div>
  );
};

export default NoticeStudent;
