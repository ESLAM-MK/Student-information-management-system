import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Notice from "../../components/Notice";
import Profile from "./Profile";
import Material from "./Material";
import Marks from "./Marks";
// import Student from "../Admin/Studentinfo";
import CreateNewExamPage from "../../Pages/ExamPages/CreateNewExamPage/CreateNewExamPage";
import AllExams from "./AllExams";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  return (
    <section className="bg-gray-900 min-h-screen">
      {load && (
        <>
          <Navbar />
          <ul className="flex flex-wrap justify-evenly items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-[85%] mx-auto my-4 sm:my-6 md:my-8">
            <li
              className={`text-center rounded-sm px-2 py-2 w-2/5 sm:w-1/4 md:w-1/5 lg:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "My Profile"
                  ? "rounded bg-gray-800 text-yellow-400 rounded-sm"
                  : "bg-gray-800 text-white rounded"
              }`}
              onClick={() => setSelectedMenu("My Profile")}
            >
              My Profile
            </li>
            {/* <li
              className={`text-center rounded-sm px-2 py-2 w-2/5 sm:w-1/4 md:w-1/5 lg:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Student Info"
                  ? "rounded bg-gray-800 text-yellow-400 rounded-sm"
                  : "bg-gray-800 text-white rounded"
              }`}
              onClick={() => setSelectedMenu("Student Info")}
            >
              Student Info
            </li> */}
            <li
              className={`text-center rounded-sm px-2 py-2 w-2/5 sm:w-1/4 md:w-1/5 lg:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Upload Marks"
                  ? "rounded bg-gray-800 text-yellow-400 rounded-sm"
                  : "bg-gray-800 text-white rounded"
              }`}
              onClick={() => setSelectedMenu("Upload Marks")}
            >
              Upload Marks
            </li>
            <li
              className={`text-center rounded-sm px-2 py-2 w-2/5 sm:w-1/4 md:w-1/5 lg:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Notice"
                  ? "rounded bg-gray-800 text-yellow-400 rounded-sm"
                  : "bg-gray-800 text-white rounded"
              }`}
              onClick={() => setSelectedMenu("Notice")}
            >
              Notice
            </li>
            <li
              className={`text-center rounded-sm px-2 py-2 w-2/5 sm:w-1/4 md:w-1/5 lg:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Material"
                  ? "rounded bg-gray-800 text-yellow-400 rounded-sm"
                  : "bg-gray-800 text-white rounded"
              }`}
              onClick={() => setSelectedMenu("Material")}
            >
              Material
            </li>
            <li
              className={`text-center rounded-sm px-2 py-2 w-2/5 sm:w-1/4 md:w-1/5 lg:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Exam"
                  ? "rounded bg-gray-800 text-yellow-400 rounded-sm"
                  : "bg-gray-800 text-white rounded"
              }`}
              onClick={() => setSelectedMenu("Exam")}
            >
              Create Exam
            </li>
            <li
              className={`text-center rounded-sm px-2 py-2 w-2/5 sm:w-1/4 md:w-1/5 lg:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "all"
                  ? "rounded bg-gray-800 text-yellow-400 rounded-sm"
                  : "bg-gray-800 text-white rounded"
              }`}
              onClick={() => setSelectedMenu("all")}
            >
              All Exams
            </li>
          </ul>
          <>
            <div className="pt-4 sm:pt-6 md:pt-8 bg-gray-900">
              {selectedMenu === "Upload Marks" && <Marks />}
              {selectedMenu === "Material" && <Material />}
              {selectedMenu === "Notice" && <Notice />}
              {selectedMenu === "My Profile" && <Profile />}
              {/* {selectedMenu === "Student Info" && <Student />} */}
              {selectedMenu === "Exam" && <CreateNewExamPage />}
              {selectedMenu === "all" && <AllExams />}
            </div>
          </>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
