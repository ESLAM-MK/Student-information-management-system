import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Material from "./Material";
import NoticeStudent from "../../components/NoticeStudent";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import UpComingExamPagea from "../../Pages/ExamPages/UpComingExamPagea/UpComingExamPagea";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!router.state) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  return (
    <section className="bg-gray-900 min-h-screen">
      {load && (
        <>
          <Navbar />
          <ul className="flex flex-wrap justify-evenly items-center gap-4 w-[85%] mx-auto my-8">
            {["My Profile", "Timetable", "Marks", "Material", "Notice", "Comming Exams"].map((menu) => (
              <li
                key={menu}
                className={`text-center rounded-sm px-4 py-2 w-full md:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === menu
                    ? "rounded bg-gray-800 text-yellow-400"
                    : "bg-gray-800 text-white"
                }`}
                onClick={() => setSelectedMenu(menu)}
              >
                {menu}
              </li>
            ))}
          </ul>
          {selectedMenu === "Timetable" && <Timetable />}
          {selectedMenu === "Marks" && <Marks />}
          {selectedMenu === "Material" && <Material />}
          {selectedMenu === "Notice" && <NoticeStudent />}
          {selectedMenu === "My Profile" && <Profile />}
          {selectedMenu === "Comming Exams" && <UpComingExamPagea />}
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
