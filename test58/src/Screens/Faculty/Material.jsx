/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase/config";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../baseUrl";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";
const Material = () => {
  
  const [material, setMaterial] = useState([]);
  const { fullname} = useSelector((state) => state.userData);
  const userData= useSelector((state) => state.userData);
  const [subject, setSubject] = useState();
  const [file, setFile] = useState();
  const [selected, setSelected] = useState({
    title: "",
    subject: "",
    link: "",
    faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
  });
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/material/getMaterial`,
        { subject: userData.subject },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setMaterial(response.data.material);
        } else {
          // Error
        }
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(material);
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
      console.log(material);

  }, []);

  useEffect(() => {
    console.log(material);

    const uploadFileToStorage = async (file) => {
      toast.loading("Upload Material To Storage");
      const storageRef = ref(
        storage,
        `Material/${selected.subject}/${selected.title} - ${selected.faculty}`
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
            toast.success("Material Uploaded To Storage");
            setSelected({ ...selected, link: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [file]);

  const addMaterialHandler = () => {
    toast.loading("Adding Material");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/material/addMaterial`, selected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setSelected({
            title: "",
            subject: "",
            link: "",
            faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
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




  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Upload Material`} />
      </div>
     
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="w-[80%] mt-2 text-yellow-500">
            <label htmlFor="title">Material Title</label>
            <input
              type="text"
              id="title"
              className="bg-gray-700 text-white py-2 px-4 w-full mt-1"
              value={selected.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
            />
          </div>
          <div className="w-[80%] mt-2 text-yellow-500">
            <label htmlFor="subject">Material Subject</label>
            <select
              value={selected.subject}
              name="subject"
              id="subject"
              onChange={(e) =>
                setSelected({ ...selected, subject: e.target.value })
              }
              className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base accent-blue-700 mt-1 w-full"
            >
              <option defaultValue value="select">
                -- Select Subject --
              </option>
              {/* {subject &&
                subject.map((item) => {
                  return (
                    <option value={item.name} key={item.name}>
                      {item.name}
                    </option>
                  );
                })} */}
                <option value={userData.subject} key={userData.subject}>{userData.subject}</option>
            </select>
          </div>
          {!selected.link && (
            
            <label
              htmlFor="upload"
              className="px-2 bg-gray-700 text-white py-3 rounded-sm text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
            >
              Upload Material
              <span className="ml-2">
                <FiUpload />
              </span>
            </label>
          )}
          {selected.link && (
            <p
              className="px-2 border-2 border-blue-500 py-2 rounded text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
              onClick={() => setSelected({ ...selected, link: "" })}
            >
              Remove Selected Material
              <span className="ml-2">
                <AiOutlineClose />
              </span>
            </p>
          )}
          <input
            type="file"
            name="upload"
            id="upload"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="bg-gray-700 text-white0 text-white mt-8 px-4 py-2 rounded-sm"
            onClick={addMaterialHandler}
          >
            Add Material
          </button>
        </div>
      </div>

      <div className="mt-8 w-full">
      <h2 className="text-center bg-green-800 p-4 font-bold text-white text-2xl my-3">All Pervious Matrials</h2>
          {material &&
            material.reverse().map((item, index) => {
              return (
                <div
                  key={index}
                  className=" border-2 w-full rounded-md shadow-sm py-4 px-6 relative mb-4"
                >
                  <p
                    className={`text-xl font-medium  text-yellow-500 flex justify-start items-center ${
                      item.link && "cursor-pointer"
                    } group`}
                    onClick={() => item.link && window.open(item.link)}
                  >
                    {item.title}{" "}
                    {item.link && (
                      <span className="text-2xl text-yellow-500 group-hover:text-blue-500 ml-1">
                        <IoMdLink />
                      </span>
                    )}
                  </p>
                  <p className="text-base font-normal text-yellow-500 mt-1">
                    {item.subject} - {item.faculty}
                  </p>
                  <p className="text-sm absolute top-4 text-yellow-500 right-4 flex justify-center items-center">
                    <span className="text-base mr-1">
                      <HiOutlineCalendar />
                    </span>{" "}
                    {item.createdAt.split("T")[0].split("-")[2] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[1] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[0] +
                      " " +
                      item.createdAt.split("T")[1].split(".")[0]}
                  </p>
                </div>
              );
            })}
            {material && material.length === 0 && selected && (
            <p className="text-center text-yellow-400 my-4">No Pervois Materials For This Subject</p>
          )}
        </div>

    </div>
  );
};

export default Material;
