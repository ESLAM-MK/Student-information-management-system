import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Profile from "./Profile";
import Branch from "./Branch";
import Studentinfo from "./Studentinfo";
import Timetable from "./Timetable";
import Marks from "./Marks";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [dashboardData, setDashboardData] = useState({
    studentCount: "",
    facultyCount: "",
  });

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  useEffect(() => {
    getStudentCount();
    getFacultyCount();
  }, []);

  const getStudentCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/student/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            studentCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFacultyCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/faculty/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            facultyCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="h-screen bg-gray-900">
      {load && (
        <>
          <Navbar />
          <div className="pt-8">
            <div className="w-full mx-auto flex justify-center items-start flex-col container">
              <ul className="flex flex-wrap justify-evenly items-center gap-4 lg:gap-10 w-full mx-auto">
                {["Profile", "Student", "Staff", "Branch", "Subjects", "Admin","Student info", "Timetable", "Marks"].map((menu) => (
                  <li
                    key={menu}
                    className={`text-center rounded-sm px-4 py-2 w-full md:w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                      selectedMenu === menu
                        ? "bg-gray-800 text-yellow-400"
                        : "bg-gray-800 text-white"
                    }`}
                    onClick={() => setSelectedMenu(menu)}
                  >
                    {menu}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-900 p-10">
            {selectedMenu === "Branch" && <Branch />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "Student" && <Student />}
            {selectedMenu === "Staff" && <Faculty />}
            {selectedMenu === "Subjects" && <Subjects />}
            {selectedMenu === "Admin" && <Admin />}
            {selectedMenu === "Profile" && <Profile />}
            {selectedMenu === "Student info" && <Studentinfo />}
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Marks" && <Marks />}
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
